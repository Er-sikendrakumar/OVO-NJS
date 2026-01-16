<?php
/**
 * Example: How to submit Gravity Forms via REST API
 *
 * This file demonstrates how to call the generic form submission endpoint
 * for different forms (ebook form 29, newsletter form 25, etc.)
 */

// ==============================================================
// EXAMPLE 1: Submit Ebook Form (Form ID 29)
// ==============================================================

function submit_ebook_form_via_api($email) {
    $api_url = home_url('/wp-json/opus/v1/forms/submit/29');

    $data = array(
        'input_1' => $email  // Email field
    );

    $response = wp_remote_post($api_url, array(
        'body' => json_encode($data),
        'headers' => array(
            'Content-Type' => 'application/json',
        ),
        'timeout' => 30
    ));

    if (is_wp_error($response)) {
        return array(
            'success' => false,
            'error' => $response->get_error_message()
        );
    }

    $body = wp_remote_retrieve_body($response);
    return json_decode($body, true);
}

// Usage:
// $result = submit_ebook_form_via_api('user@example.com');


// ==============================================================
// EXAMPLE 2: Submit Newsletter Form (Form ID 25)
// ==============================================================

function submit_newsletter_form_via_api($email) {
    $api_url = home_url('/wp-json/opus/v1/forms/submit/25');

    $data = array(
        'input_1' => $email  // Adjust field ID based on your form structure
    );

    $response = wp_remote_post($api_url, array(
        'body' => json_encode($data),
        'headers' => array(
            'Content-Type' => 'application/json',
        ),
        'timeout' => 30
    ));

    if (is_wp_error($response)) {
        return array(
            'success' => false,
            'error' => $response->get_error_message()
        );
    }

    $body = wp_remote_retrieve_body($response);
    return json_decode($body, true);
}

// Usage:
// $result = submit_newsletter_form_via_api('user@example.com');


// ==============================================================
// EXAMPLE 3: Submit Form with Multiple Fields
// ==============================================================

function submit_complex_form_via_api($form_id, $fields) {
    $api_url = home_url("/wp-json/opus/v1/forms/submit/{$form_id}");

    // $fields should be an array like:
    // array(
    //     'input_1' => 'value1',
    //     'input_2' => 'value2',
    //     'input_3' => 'value3'
    // )

    $response = wp_remote_post($api_url, array(
        'body' => json_encode($fields),
        'headers' => array(
            'Content-Type' => 'application/json',
        ),
        'timeout' => 30
    ));

    if (is_wp_error($response)) {
        return array(
            'success' => false,
            'error' => $response->get_error_message()
        );
    }

    $body = wp_remote_retrieve_body($response);
    return json_decode($body, true);
}

// Usage:
// $fields = array(
//     'input_1' => 'John Doe',
//     'input_2' => 'john@example.com',
//     'input_3' => '555-1234'
// );
// $result = submit_complex_form_via_api(29, $fields);


// ==============================================================
// EXAMPLE 4: Using cURL (Alternative Method)
// ==============================================================

function submit_form_via_curl($form_id, $fields) {
    $api_url = home_url("/wp-json/opus/v1/forms/submit/{$form_id}");

    $ch = curl_init($api_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Accept: application/json'
    ));

    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($http_code !== 200) {
        return array(
            'success' => false,
            'error' => "HTTP Error: {$http_code}"
        );
    }

    return json_decode($response, true);
}


// ==============================================================
// EXAMPLE 5: JavaScript/AJAX Example (for frontend)
// ==============================================================

/*
<!-- HTML -->
<form id="ebook-form">
    <input type="email" id="email" name="email" placeholder="Enter your email" required>
    <button type="submit">Submit</button>
</form>

<script>
jQuery(document).ready(function($) {
    $('#ebook-form').on('submit', function(e) {
        e.preventDefault();

        var email = $('#email').val();

        $.ajax({
            url: '/wp-json/opus/v1/forms/submit/29',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                input_1: email
            }),
            success: function(response) {
                if (response.success) {
                    alert('Form submitted successfully!');
                    console.log('Entry ID:', response.entry_id);
                } else {
                    alert('Error: ' + response.message);
                }
            },
            error: function(xhr, status, error) {
                alert('Failed to submit form: ' + error);
            }
        });
    });
});
</script>
*/


// ==============================================================
// EXAMPLE 6: Direct Usage in Template Files
// ==============================================================

// Example usage in a WordPress template:
/*
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['ebook_email'])) {
    $email = sanitize_email($_POST['ebook_email']);

    $result = submit_ebook_form_via_api($email);

    if ($result['success']) {
        echo '<p class="success">Thank you! Check your email for the ebook.</p>';
    } else {
        echo '<p class="error">Error: ' . esc_html($result['message']) . '</p>';
    }
}
?>

<form method="POST">
    <input type="email" name="ebook_email" required>
    <button type="submit">Get Free Ebook</button>
</form>
*/


// ==============================================================
// RESPONSE FORMAT
// ==============================================================

/*
Success Response:
{
    "success": true,
    "message": "Form submitted successfully",
    "form_id": 29,
    "entry_id": 12345,
    "confirmation_message": "Thank you for your submission!"
}

Error Response:
{
    "success": false,
    "message": "Error message here",
    "form_id": 29
}
*/
