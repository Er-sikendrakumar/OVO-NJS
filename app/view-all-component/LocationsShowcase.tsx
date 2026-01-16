"use client";

import React from "react";
import { ComponentBlock } from "@/app/view-all-component/ComponentBlock";
import {
  sampleHeroData,
  sampleLocationsContent,
  sampleLocationsFaqs,
  sampleOverviewData,
  sampleRepeaterItems,
  sampleTextWithImage,
} from "@/app/view-all-component/sample-data";

import LocationsContent from "@/app/locations/components/content";
import { Faqs } from "@/app/locations/components/faqs";
import LocationsHero from "@/app/locations/components/hero";
import { HeroCta } from "@/app/locations/components/hero-cta";
import { Repeater as LocationsRepeater } from "@/app/locations/components/repeater";
import { TextWithImage } from "@/app/locations/components/text-with-image";
import { TextWithMaps } from "@/app/locations/components/text-with-maps";
import CallToAction from "../locations/components/call-to-action";

export function LocationsShowcase() {
  return (
    <>
      <ComponentBlock name="LocationsHero" jsonName="N/A">
        <LocationsHero data={sampleHeroData} />
      </ComponentBlock>

      <ComponentBlock name="HeroCta" jsonName="N/A">
        <HeroCta locId="776" />
      </ComponentBlock>

      <ComponentBlock name="LocationsContent" jsonName="N/A">
        <LocationsContent
          heading={sampleLocationsContent.heading}
          description={sampleLocationsContent.description}
          body={sampleLocationsContent.body}
        />
      </ComponentBlock>

      <ComponentBlock name="LocationsFaqs" jsonName="N/A">
        <Faqs data={sampleLocationsFaqs} />
      </ComponentBlock>

      <ComponentBlock name="CallToAction" jsonName="N/A">
        <CallToAction cityName="orlando" locId="776" price={99} />
      </ComponentBlock>

      <ComponentBlock name="LocationsRepeater" jsonName="N/A">
        <LocationsRepeater items={sampleRepeaterItems.map(item => ({ ...item, layout: item.layout || "image_text" }))} cityName="Orlando" locId="776" price={99} />
      </ComponentBlock>

      <ComponentBlock name="TextWithImage" jsonName="N/A">
        <TextWithImage
          title={sampleTextWithImage.title}
          body={sampleTextWithImage.body}
          image={sampleTextWithImage.image}
          reversed={false}
        />
      </ComponentBlock>

      <ComponentBlock name="TextWithMaps" jsonName="N/A">
        <TextWithMaps data={sampleOverviewData} />
      </ComponentBlock>
    </>
  );
}
