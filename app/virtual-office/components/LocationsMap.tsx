"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";

interface LocationData {
  id: number;
  location_name: string;
  city: string;
  state: string;
  state_abbr: string;
  address: string;
  premium: number;
  showpopular: number;
  opusowned: number;
  point_x: number;
  point_y: number;
  image: {
    url: string;
    alttext: string | null;
  };
  url: string;
  phone: string;
}

interface LocationsMapProps {
  locations: LocationData[];
  selectedLocation?: LocationData | null;
  onMapReady?: (showInfoWindow: (locationId: number) => void) => void;
}

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const getRelativeUrl = (fullUrl: string) => {
  try {
    const url = new URL(fullUrl);
    return url.pathname;
  } catch {
    return fullUrl;
  }
};

const getBaseUrl = () => {
  if (typeof window === 'undefined') return 'https://www.opusvirtualoffices.com';

  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (isLocalhost) return 'https://njs.opusvirtualoffices.com';

  return `${window.location.protocol}//${window.location.host}`;
};

const getImageUrl = (imagePath: string) => {
  if (!imagePath) return "/assets/mail-center.webp"; // fallback

  // If it's the default non-premium image, use our local version
  if (imagePath.includes("non-premium-default.jpg")) {
    return "/assets/mail-center.webp";
  }

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  const baseUrl = getBaseUrl();
  return `${baseUrl}${imagePath.startsWith("/") ? imagePath : "/" + imagePath}`;
};

const formatPhone = (phone: string) => {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};

export const LocationsMap = ({
  locations,
  selectedLocation,
  onMapReady,
}: LocationsMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const infoWindowsRef = useRef<any[]>([]);
  const locationMapRef = useRef<Map<number, { marker: any; infoWindow: any }>>(
    new Map(),
  );
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (!locations || locations.length === 0 || !mapRef.current) return;

    const initializeMap = () => {
      if (!mapRef.current) return;

      try {
        // Using legacy blocking loader - no need for importLibrary
        // The script loads synchronously and all classes are immediately available
        if (!mapRef.current) return;

        // Calculate bounds to fit all locations
        const bounds = new window.google.maps.LatLngBounds();

        // Clear existing markers and info windows
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];
        infoWindowsRef.current.forEach((infoWindow) => infoWindow.close());
        infoWindowsRef.current = [];
        locationMapRef.current.clear();

        // Calculate center point
        const lats = locations.map((loc) => loc.point_x);
        const lngs = locations.map((loc) => loc.point_y);
        const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
        const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;

        // Create map
        const map = new window.google.maps.Map(mapRef.current, {
          zoom: 7,
          center: { lat: centerLat, lng: centerLng },
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        });

        mapInstanceRef.current = map;

        // Inject global CSS for InfoWindow overflow and padding
        if (!document.getElementById("gm-iw-overflow-style")) {
          const style = document.createElement("style");
          style.id = "gm-iw-overflow-style";
          style.textContent = `
                        .gm-style-iw-d {
                            overflow: hidden !important;
                        }
                        .gm-style-iw .gm-style-iw-d {
                            overflow: hidden !important;
                        }
                        .gm-style-iw-ch {
                            padding: 3.2px !important;
                        }
                    `;
          document.head.appendChild(style);
        }

        // Add markers for all locations with custom info windows
        locations.forEach((location) => {
          const position = { lat: location.point_x, lng: location.point_y };
          bounds.extend(position);

          // Create standard marker with default red pin icon (no custom icon = default red marker)
          const marker = new window.google.maps.Marker({
            position,
            map,
            title: `${location.city} - ${location.address}`,
            animation: window.google.maps.Animation.DROP,
            // No icon property = uses default red Google Maps marker
            optimized: false, // Better for hover interactions
          });

          // Create custom info window content with new design
          const imageUrl = getImageUrl(location.image.url);
          const infoContent = `
<style>
    /* Hide the InfoWindow close button (X) */
    .gm-ui-hover-effect,
    button[title="Close"],
    button[aria-label="Close"],
    .gm-style-cc,
    div[role="button"][aria-label*="Close"],
    div[role="button"][title*="Close"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
    }
    /* Hide any close button in the InfoWindow */
    .gm-style > div > div > div > div > div > button,
    .gm-style-iw-d > button {
        display: none !important;
    }
</style>
<div style="
    font-family: 'Inter', sans-serif;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    overflow: hidden;
    position: relative;
">
    <!-- Top Image -->
    <div style="
        width: 100%;
        height: 140px;
        overflow: hidden;
        border-radius: 5.11px;
    ">
        <img 
            src="${imageUrl}" 
            alt="${location.image.alttext || location.city}"
            style="
                width: 100%;
                max-width: 198px;
                height: 100%;
                object-fit: cover;
                display: block;
                border-radius: 5.11px;
            "
        />
    </div>

    <!-- Text Section -->
    <div style="padding: 10.22px">
        
    <div
                style="
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                "
    >
    <!-- Title -->
    <div style="
    font-family: Inter;
    font-weight: 600;
    font-size: 10px;
    line-height: 11.93px;
    letter-spacing: 0%;
    color: #101828;
    leading-trim: none;
    ">
    ${location.city}
    </div>

    ${
      location.premium === 1
        ? `
        <div style="
            padding: 2.36px;
            border-radius: 9999px;
            border: 0.59px solid #75E0A7;
            background-color: #ECFDF3;
            display: flex;
            flex-direction: row;
            gap: 4.72px;
            align-items: center;
        ">
            <div style="
                border: 1px solid #75E0A7;
                background-color: #FFFFFF;
                border-radius: 9999px;
                padding: 1.18px 4.72px;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                color: #067647;
                font-size: 7.08px;
                line-height: 100%;
                letter-spacing: 0;
                font-weight: 500;
            ">
                Premium
            </div>
            <span style="
                color: #067647;
                font-size: 7.08px;
                line-height: 100%;
                letter-spacing: 0;
                font-weight: 500;
            ">
                Location
            </span>
        </div>
    `
        : ""
    }
    
    </div>

<!-- Subtitle -->
<div style="
    margin-top: 4px;
    font-family: Inter;
    font-weight: 400;
    font-size: 8px;
    line-height: 8.52px;
    letter-spacing: 0%;
    color: #475467;
    leading-trim: none;
">
    ${location.address.split(",")[0].trim()}
</div>
    </div>

    <!-- Pointer Arrow -->
    <div style="
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid white;
        filter: drop-shadow(0 2px 2px rgba(0,0,0,0.08));
    "></div>

</div>
`;
          // Create info window
          const infoWindow = new window.google.maps.InfoWindow({
            content: infoContent,
            maxWidth: 210,
          });

          infoWindowsRef.current.push(infoWindow);

          // Function to hide close button and apply padding
          const styleInfoWindow = () => {
            // Use multiple attempts with increasing delays to catch the DOM elements
            const applyStyles = (attempt = 0) => {
              if (attempt > 5) return; // Stop after 5 attempts

              // Hide close button
              const closeButtons = document.querySelectorAll(
                '.gm-ui-hover-effect, button[title="Close"], button[aria-label="Close"]',
              );
              closeButtons.forEach((btn) => {
                (btn as HTMLElement).style.display = "none";
              });

              // Apply padding to Google Maps InfoWindow containers
              // Try multiple selectors to find the element
              const iwContent =
                document.querySelector(".gm-style-iw.gm-style-iw-c") ||
                document.querySelector(".gm-style-iw-c") ||
                document.querySelector('[class*="gm-style-iw-c"]');
              const iwDiv =
                document.querySelector(".gm-style-iw-d") ||
                document.querySelector('[class*="gm-style-iw-d"]');
              const iwCh =
                document.querySelector(".gm-style-iw-ch") ||
                document.querySelector('[class*="gm-style-iw-ch"]');

              if (iwContent) {
                (iwContent as HTMLElement).style.paddingLeft = "5.54px";
                (iwContent as HTMLElement).style.setProperty(
                  "padding-left",
                  "5.54px",
                  "important",
                );
              }
              if (iwDiv) {
                // Apply overflow hidden with multiple methods
                (iwDiv as HTMLElement).style.cssText +=
                  "overflow: hidden !important;";
                (iwDiv as HTMLElement).style.overflow = "hidden";
                (iwDiv as HTMLElement).style.setProperty(
                  "overflow",
                  "hidden",
                  "important",
                );
                (iwDiv as HTMLElement).setAttribute(
                  "style",
                  (iwDiv as HTMLElement).getAttribute("style") +
                    " overflow: hidden !important;",
                );

                // Apply padding
                (iwDiv as HTMLElement).style.paddingRight = "5.54px";
                (iwDiv as HTMLElement).style.paddingBottom = "6.39px";
                (iwDiv as HTMLElement).style.setProperty(
                  "padding-right",
                  "5.54px",
                  "important",
                );
                (iwDiv as HTMLElement).style.setProperty(
                  "padding-bottom",
                  "6.39px",
                  "important",
                );

                // Also try to apply to parent elements if needed
                const parent = (iwDiv as HTMLElement).parentElement;
                if (parent && parent.classList.contains("gm-style-iw")) {
                  parent.style.overflow = "hidden";
                  parent.style.setProperty("overflow", "hidden", "important");
                }
              }

              // Apply padding to .gm-style-iw-ch
              if (iwCh) {
                (iwCh as HTMLElement).style.padding = "3.2px";
                (iwCh as HTMLElement).style.setProperty(
                  "padding",
                  "3.2px",
                  "important",
                );
              }

              // If elements not found, try again
              if (!iwContent && attempt < 5) {
                setTimeout(() => applyStyles(attempt + 1), 50);
              }
            };

            setTimeout(() => applyStyles(), 50);
          };

          // Show info window on marker click only (not hover)
          marker.addListener("click", () => {
            // Close all other info windows
            infoWindowsRef.current.forEach((iw) => iw.close());
            infoWindow.open(map, marker);
            styleInfoWindow();
          });

          markersRef.current.push(marker);

          // Store mapping of location ID to marker and info window for external control
          locationMapRef.current.set(location.id, { marker, infoWindow });
        });

        // Expose function to show info window by location ID
        const showInfoWindowById = (locationId: number) => {
          const locationData = locationMapRef.current.get(locationId);
          if (locationData) {
            // Close all other info windows
            infoWindowsRef.current.forEach((iw) => iw.close());
            // Open the requested info window
            locationData.infoWindow.open(map, locationData.marker);
            // Style the InfoWindow (hide close button and apply padding)
            const applyStyles = (attempt = 0) => {
              if (attempt > 5) return;

              // Hide close button
              const closeButtons = document.querySelectorAll(
                '.gm-ui-hover-effect, button[title="Close"], button[aria-label="Close"]',
              );
              closeButtons.forEach((btn) => {
                (btn as HTMLElement).style.display = "none";
              });

              // Apply padding to Google Maps InfoWindow containers
              const iwContent =
                document.querySelector(".gm-style-iw.gm-style-iw-c") ||
                document.querySelector(".gm-style-iw-c") ||
                document.querySelector('[class*="gm-style-iw-c"]');
              const iwDiv =
                document.querySelector(".gm-style-iw-d") ||
                document.querySelector('[class*="gm-style-iw-d"]');
              const iwCh =
                document.querySelector(".gm-style-iw-ch") ||
                document.querySelector('[class*="gm-style-iw-ch"]');

              if (iwContent) {
                (iwContent as HTMLElement).style.paddingLeft = "5.54px";
                (iwContent as HTMLElement).style.setProperty(
                  "padding-left",
                  "5.54px",
                  "important",
                );
              }
              if (iwDiv) {
                // Apply overflow hidden with multiple methods
                (iwDiv as HTMLElement).style.cssText +=
                  "overflow: hidden !important;";
                (iwDiv as HTMLElement).style.overflow = "hidden";
                (iwDiv as HTMLElement).style.setProperty(
                  "overflow",
                  "hidden",
                  "important",
                );
                (iwDiv as HTMLElement).setAttribute(
                  "style",
                  (iwDiv as HTMLElement).getAttribute("style") +
                    " overflow: hidden !important;",
                );

                // Apply padding
                (iwDiv as HTMLElement).style.paddingRight = "5.54px";
                (iwDiv as HTMLElement).style.paddingBottom = "6.39px";
                (iwDiv as HTMLElement).style.setProperty(
                  "padding-right",
                  "5.54px",
                  "important",
                );
                (iwDiv as HTMLElement).style.setProperty(
                  "padding-bottom",
                  "6.39px",
                  "important",
                );

                // Also try to apply to parent elements if needed
                const parent = (iwDiv as HTMLElement).parentElement;
                if (parent && parent.classList.contains("gm-style-iw")) {
                  parent.style.overflow = "hidden";
                  parent.style.setProperty("overflow", "hidden", "important");
                }
              }

              // Apply padding to .gm-style-iw-ch
              if (iwCh) {
                (iwCh as HTMLElement).style.padding = "3.2px";
                (iwCh as HTMLElement).style.setProperty(
                  "padding",
                  "3.2px",
                  "important",
                );
              }

              if (!iwContent && attempt < 5) {
                setTimeout(() => applyStyles(attempt + 1), 50);
              }
            };
            setTimeout(() => applyStyles(), 50);
          }
        };

        // Call onMapReady callback if provided
        if (onMapReady) {
          onMapReady(showInfoWindowById);
        }

        // Fit map to show all markers with padding
        if (locations.length > 1) {
          map.fitBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 });
        } else if (locations.length === 1) {
          map.setCenter({
            lat: locations[0].point_x,
            lng: locations[0].point_y,
          });
          map.setZoom(12);
        }
      } catch (error) {
        console.error("Failed to initialize Google Maps:", error);
      }
    };

    // Load Google Maps JavaScript API with the provided API key
    // Using legacy blocking loader (no loading=async parameter)
    // This ensures all libraries are fully loaded before onload fires
    if (!window.google && !scriptLoadedRef.current) {
      scriptLoadedRef.current = true;
      const script = document.createElement("script");
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        // With legacy loader, everything is ready when onload fires
        initializeMap();
      };
      script.onerror = () => {
        console.error(
          "Google Maps API failed to load. Please check your API key and domain restrictions.",
        );
      };
      document.head.appendChild(script);
    } else if (window.google?.maps) {
      initializeMap();
    }

    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
      infoWindowsRef.current.forEach((infoWindow) => infoWindow.close());
      infoWindowsRef.current = [];
    };
  }, [locations]);

  if (!locations || locations.length === 0) {
    return (
      <div className="w-full h-[600px] relative overflow-hidden rounded-lg bg-gray-100 hidden lg:flex items-center justify-center">
        <p className="text-gray-600">No locations available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] hidden lg:flex relative overflow-hidden rounded-lg">
      <div ref={mapRef} className="w-full h-full rounded-lg" />
    </div>
  );
};