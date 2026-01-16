"use client";

import React from "react";
import { TextWithImage } from "@/app/locations/components/text-with-image";
import LocationsContent from "@/app/locations/components/content";
import CallToAction from "@/app/locations/components/call-to-action";
import OverviewTextWithMap from "./OverviewTextWithMap";

export interface RepeaterItem {
  title?: string;
  body?: string;
  image?: string | { url: string; alt?: string; title?: string };
  layout?: "image_text" | "text_only" | "cta_block";
  imageAlignment?: "left" | "right";
}

interface RepeaterProps {
  overviewData?: any;
  items: RepeaterItem[];
  cityName: string;
  locId: string;
  price?: number;
}

export function RepeaterSection({ overviewData, items, cityName, locId, price = 99 }: RepeaterProps) {
  if (!items || items.length === 0) return null;

  return (
    <>
      {items.map((item, index) => {
        if (item.layout === "cta_block") {
          return <CallToAction key={`cta-${index}`} cityName={cityName} locId={locId} price={price} />;
        }

        if (item.layout === "text_only" && item.body) {
          const bodyText = item.body;
          const paragraphs = bodyText.split("\n\n");
          let firstColumn = "";
          let secondColumn = "";

          if (paragraphs.length >= 2) {
            const midPoint = Math.ceil(paragraphs.length / 2);
            firstColumn = paragraphs.slice(0, midPoint).join("\n\n").trim();
            secondColumn = paragraphs.slice(midPoint).join("\n\n").trim();
          } else {
            const sentences = bodyText.split(/\.(?=\s+[A-Z])/);
            const midPoint = Math.ceil(sentences.length / 2);
            firstColumn = sentences.slice(0, midPoint).join(". ").trim() + (sentences.length > 1 ? "." : "");
            secondColumn = sentences.slice(midPoint).join(". ").trim();
          }

          return (
            <div key={`text-only-${index}`} className={`${index == 0 ? 'pt-[40px]' : 'none'} w-full`}>
            <LocationsContent
              heading={item.title || ""}
              description={firstColumn}
              body={secondColumn}
            />
            </div>
          );
        }


        // if (item.layout === "image_text" && index === 0) {
        //   return (
        //     <OverviewTextWithMap
        //       key={`overview-${index}`}
        //       overviewData={overviewData}
        //       reversed={false}
        //     />
        //   );
        // }

        // Handle explicit image_text layout OR default for items with image/title/body but no layout
        if ((item.layout === "image_text" || !item.layout) && item.title && item.body && item.image) {
          // If imageAlignment specified, use it; otherwise alternate (even=right, odd=left)
          const reversed = item.imageAlignment
            ? item.imageAlignment !== "right"
            : index % 2 !== 0;

          // Extract image URL from string or object
          const getImagePath = (img: string | { url: string; alt?: string; title?: string }): string => {
            return typeof img === 'string' ? img : img.url;
          };

          const getImageUrl = (imagePath: string) => {
            if (!imagePath) return "";
            if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
              return imagePath;
            }
            return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
          };

          const imagePath = getImagePath(item.image);

          return (
            <div key={`image-text-${index}`} className={`${index == 0 ? 'pt-[30px] lg:pt-[0px]' : 'none'} w-full`}>
              <TextWithImage
                title={item.title}
                body={item.body}
                image={getImageUrl(imagePath)}
                reversed={reversed}
              />
            </div>
          );
        }
        return null;
      })}
    </>
  );
}