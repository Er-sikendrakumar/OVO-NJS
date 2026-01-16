import React from 'react'
import Image from 'next/image'
import { TextWithImage } from './text-with-image'
import LocationsContent from './content'
import CallToAction from './call-to-action'

// TypeScript interfaces for repeater data
export interface RepeaterItem {
    title?: string;
    body?: string;
    image?: string | { url: string; alt?: string; title?: string };
    layout: "image_text" | "text_only" | "cta_block";
    imageAlignment?: "left" | "right";
}

interface RepeaterProps {
    items: RepeaterItem[];
    cityName: string;
    locId: string;
    price?: number;
}

export const Repeater = ({ items, cityName, locId, price = 99 }: RepeaterProps) => {
    if (!items || items.length === 0) {
        return null;
    }

    return (
        <>
            {items.map((item, index) => {
                // Handle CTA Block
                if (item.layout === "cta_block") {
                    return (
                        <CallToAction
                            key={`cta-${index}`}
                            cityName={cityName}
                            locId={locId}
                            price={price}
                        />
                    );
                }

                // Handle Text Only (2 columns)
                if (item.layout === "text_only" && item.body) {
                    // Split body into two parts for two columns
                    const bodyText = item.body;

                    // Try to split at paragraph boundaries first (double newline)
                    const paragraphs = bodyText.split('\n\n');

                    let firstColumn = '';
                    let secondColumn = '';

                    if (paragraphs.length >= 2) {
                        // Split paragraphs evenly
                        const midPoint = Math.ceil(paragraphs.length / 2);
                        firstColumn = paragraphs.slice(0, midPoint).join('\n\n').trim();
                        secondColumn = paragraphs.slice(midPoint).join('\n\n').trim();
                    } else {
                        // If no paragraph breaks, split by sentences
                        const sentences = bodyText.split(/\.(?=\s+[A-Z])/);
                        const midPoint = Math.ceil(sentences.length / 2);
                        firstColumn = sentences.slice(0, midPoint).join('. ').trim() + (sentences.length > 1 ? '.' : '');
                        secondColumn = sentences.slice(midPoint).join('. ').trim();
                    }

                    return (
                        <LocationsContent
                            key={`text-only-${index}`}
                            heading={item.title || ""}
                            description={firstColumn}
                            body={secondColumn}
                        />
                    );
                }

                // Handle Image with Text
                if (item.layout === "image_text" && item.title && item.body && item.image) {
                    const reversed = item.imageAlignment === "right";

                    // Extract image URL from string or object
                    const getImagePath = (img: string | { url: string; alt?: string; title?: string }): string => {
                        return typeof img === 'string' ? img : img.url;
                    };

                    // Get full image URL (same logic as hero component)
                    const getImageUrl = (imagePath: string) => {
                        if (!imagePath) return "";
                        // If already a full URL, return as-is
                        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
                            return imagePath;
                        }
                        // Get base URL dynamically
                        const baseUrl = typeof window !== 'undefined'
                            ? (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
                                ? 'https://njs.opusvirtualoffices.com'
                                : `${window.location.protocol}//${window.location.host}`)
                            : 'https://www.opusvirtualoffices.com';
                        // For all other paths (including those starting with /), prepend base URL
                        return `${baseUrl}${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`;
                    };

                    const imagePath = getImagePath(item.image);

                    return (
                        <TextWithImage
                            key={`image-text-${index}`}
                            title={item.title}
                            body={item.body}
                            image={getImageUrl(imagePath)}
                            reversed={reversed}
                        />
                    );
                }

                // Fallback for invalid/missing data
                return null;
            })}
        </>
    );
}

