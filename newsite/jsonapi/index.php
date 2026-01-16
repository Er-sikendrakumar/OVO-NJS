<?php
/**
 * JSON API - Standalone JSON file server
 * Bypasses WordPress for maximum performance
 *
 * Usage: /jsonapi/all-states -> serves /json/all-states.json
 */

// Prevent direct execution without proper routing
if (php_sapi_name() === 'cli') {
    die('This script cannot be run from command line.');
}

// Configuration
define('JSON_DIR', __DIR__ . '/../json/');
define('CACHE_MAX_AGE', 3600); // 1 hour cache

// Whitelist of allowed files (security: only serve explicitly approved files)
$ALLOWED_FILES = [
    'all-states',      // /json/all-states.json - Countries and states data
    'reviews4',        // /json/reviews4.json - 4 latest reviews (orderby=date, order=desc, per_page=4)
    'popular-slider',  // /json/popular-slider.json - Popular locations for slider (with_flagged=true, only_top_premium=false)
    'toppremium',      // /json/toppremium.json - Top premium locations only (only_top_premium=true)
    'homepage',        // /json/homepage.json - Homepage SEO data
    'virtual-office',  // /json/virtual-office.json - Virtual office page SEO data
    'business-address', // /json/business-address.json - Business address page SEO data
];

// Allowed path patterns for hierarchical JSON files
// Pattern: /jsonapi/{state}/{endpoint} -> /json/states/{state}/{state}_{endpoint}.json
$ALLOWED_PATTERNS = [
    '/^([a-z0-9\-]+)\/(citiesvirtual|citiesbusiness|citiespopular|locations_vo|locations_ba)$/',
];

/**
 * Transform URL path to file path
 * Example: florida/citiesvirtual -> states/florida/florida_citiesvirtual
 */
function transform_path_to_filename($path) {
    global $ALLOWED_PATTERNS;

    // Check if path matches state cities pattern
    if (preg_match('/^([a-z0-9\-]+)\/(citiesvirtual|citiesbusiness|citiespopular|locations_vo|locations_ba)$/', $path, $matches)) {
        $state = $matches[1];
        $endpoint = $matches[2];
        // Transform: {state}/{endpoint} -> states/{state}/{state}_{endpoint}
        return "states/{$state}/{$state}_{$endpoint}";
    }

    // No transformation needed for simple files
    return $path;
}

/**
 * Security: Validate filename or path
 */
function validate_filename($filename) {
    global $ALLOWED_FILES, $ALLOWED_PATTERNS;

    // Must not contain path traversal attempts
    if (strpos($filename, '..') !== false || strpos($filename, './') !== false) {
        return false;
    }

    // Check if it's in the simple whitelist
    if (in_array($filename, $ALLOWED_FILES, true)) {
        // Additional security: must be alphanumeric with hyphens only
        if (!preg_match('/^[a-z0-9\-]+$/i', $filename)) {
            return false;
        }
        return true;
    }

    // Check if it matches any allowed patterns (for hierarchical paths)
    foreach ($ALLOWED_PATTERNS as $pattern) {
        if (preg_match($pattern, $filename)) {
            return true;
        }
    }

    return false;
}

/**
 * Get requested filename from URL path
 */
function get_requested_file() {
    // Get the path after /jsonapi/
    $request_uri = $_SERVER['REQUEST_URI'] ?? '';

    // Remove query string if present
    $request_uri = strtok($request_uri, '?');

    // Extract filename from path
    // Example: /jsonapi/all-states -> all-states
    $path_parts = explode('/jsonapi/', $request_uri, 2);

    if (count($path_parts) < 2 || empty($path_parts[1])) {
        return null;
    }

    // Get filename and remove trailing slashes
    $filename = rtrim($path_parts[1], '/');

    // Remove .json extension if provided
    $filename = preg_replace('/\.json$/i', '', $filename);

    return $filename;
}

/**
 * Send HTTP error response
 */
function send_error($code, $message) {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');

    echo json_encode([
        'success' => false,
        'error' => $message,
        'code' => $code
    ], JSON_PRETTY_PRINT);

    exit;
}

/**
 * Send CORS headers (adjust as needed for your domain)
 */
function send_cors_headers() {
    // Allow from any origin (adjust for production)
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');

    // Handle preflight
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit;
    }
}

/**
 * Main execution
 */
function main() {
    // Only allow GET requests
    if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
        send_error(405, 'Method not allowed. Only GET requests are supported.');
    }

    // Send CORS headers
    send_cors_headers();

    // Get requested filename
    $filename = get_requested_file();

    if ($filename === null || $filename === '') {
        send_error(400, 'No file specified. Usage: /jsonapi/{filename}');
    }

    // Validate filename against whitelist
    if (!validate_filename($filename)) {
        send_error(403, 'File not allowed or invalid filename format.');
    }

    // Transform path to actual filename (e.g., florida/citiesvirtual -> states/florida/florida_citiesvirtual)
    $actual_filename = transform_path_to_filename($filename);

    // Construct file path
    $file_path = JSON_DIR . $actual_filename . '.json';

    // Security: Ensure the resolved path is within JSON_DIR
    $real_json_dir = realpath(JSON_DIR);
    $real_file_path = realpath($file_path);

    if ($real_file_path === false || strpos($real_file_path, $real_json_dir) !== 0) {
        send_error(403, 'Invalid file path.');
    }

    // Check if file exists
    if (!file_exists($file_path)) {
        send_error(404, 'File not found. The requested JSON file does not exist.');
    }

    // Check if file is readable
    if (!is_readable($file_path)) {
        send_error(500, 'File is not readable.');
    }

    // Get file metadata
    $file_size = filesize($file_path);
    $last_modified = filemtime($file_path);

    // Set response headers
    header('Content-Type: application/json; charset=utf-8');
    header('Content-Length: ' . $file_size);
    header('Last-Modified: ' . gmdate('D, d M Y H:i:s', $last_modified) . ' GMT');
    header('Cache-Control: public, max-age=' . CACHE_MAX_AGE);
    header('ETag: "' . md5_file($file_path) . '"');

    // Handle conditional requests (304 Not Modified)
    $etag = md5_file($file_path);
    $if_none_match = $_SERVER['HTTP_IF_NONE_MATCH'] ?? '';

    if ($if_none_match === '"' . $etag . '"') {
        http_response_code(304);
        exit;
    }

    // Send success response
    http_response_code(200);

    // Output file contents
    readfile($file_path);

    exit;
}

// Run
main();
