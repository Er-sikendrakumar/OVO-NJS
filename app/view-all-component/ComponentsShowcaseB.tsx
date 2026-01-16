"use client";

import React from "react";
import { ComponentBlock } from "@/app/view-all-component/ComponentBlock";
import {
  allStatesBaJson,
  defaultCity,
  defaultState,
  optionalUpgradeCards,
  sampleComparisonData,
  sampleFaqs,
  sampleFeatureList,
  sampleFeaturePriceContent,
  sampleHeroData,
  sampleMeetingHero,
  sampleMeetingLocations,
  sampleNonOpusHeroData,
  sampleOverviewData,
  sampleRepeaterItems,
  sampleReviewItems,
  sampleSearchFeatures,
  sampleSearchLocations,
  samplePaidSearchHero,
  sampleStateLocationsAdditional,
  sampleStateLocationsPopular,
  sampleStateSearchData,
  sampleVirtualOfficeFeatures,
  specialLocations,
  stateMap,
  stateLocations,
} from "@/app/view-all-component/sample-data";

import { MapRepeater } from "@/app/components/MapRepeater";
import { MeetingRoom as MeetingHeroComponent } from "@/app/components/MeetingHero";
import { MeetingRoomLocations } from "@/app/components/MeetingRoomLocations";
import MobileLocationSlider from "@/app/components/MobileLocationSlider";
import { Navbar } from "@/app/components/Navbar";
import NonOpusLocationHeroCard from "@/app/components/NonOpusLocationHeroCard";
import { NoSurprisePopup } from "@/app/components/NoSurprisePopup";
import OfficeSolutionBanner from "@/app/components/OfficeSolutionBanner";
import OptionalVirtualOfficeUpgrades from "@/app/components/OptionalVirtualOfficeUpgrades";
import { OverviewSection } from "@/app/components/OverviewSection";
import OverviewTextWithMap from "@/app/components/OverviewTextWithMap";
import { SpecialSearchFeature as PaidSearchSpecialSearchFeature } from "@/app/components/PaidSearchFeatureHero";
import { PaidSearchFeatureHeroForPaidSearch } from "@/app/components/PaidSearchFeatureHeroForPaidSearch";
import { FeaturePriceDetailsTableAddress as PaidSearchFeaturePriceDetailsTableAddress } from "@/app/components/PaidSearchFeaturePrice";
import PaidSearchMobileSlider from "@/app/components/PaidSearchMobileSlider";
import { SpecialLocationSlider as PaidSearchSpecialLocationSlider } from "@/app/components/PaidSearchSlider";
import { PlumberVideoPlayer } from "@/app/components/PlumberVideoPlayer";
import { PopularBusinessAddressLocations } from "@/app/components/PopularBusinessAddressLocations";
import { PopularLocations } from "@/app/components/PopularLocations";
import PremiumSection from "@/app/components/PremiumSection";
import { PrestigiousBusinessAddressClient } from "@/app/components/PrestigiousBusinessAddressClient";
import { PriceDetailsTableAddress } from "@/app/components/PriceDetailsTableAddress";
import { PromoPopularLocations } from "@/app/components/PromoPopularLocations";
import { PromotionPopup } from "@/app/components/PromotionPopup";
import RadiusSelector from "@/app/components/RadiusSelector";
import { RepeaterSection } from "@/app/components/RepeaterSection";
import { Reviews } from "@/app/components/Reviews";
import { SearchWithAction } from "@/app/components/SearchWithAction";
import { SectionSpacer } from "@/app/components/SectionSpacer";
import { BestValuePill, ComparisonTableSpecial } from "@/app/components/SpecialFeatureComparisonTable";
import { SpecialLocationSlider as SpecialLocationSliderComponent } from "@/app/components/SpecialSlider";
import StateLocations from "@/app/components/StateLocations";
import StateSearch from "@/app/components/StateSearch";
import StateSelector from "@/app/components/StateSelector";
import { StatesList } from "@/app/components/StatesList";
import SuccessSeekersVirtualBusinessAddress from "@/app/components/SuccessSeekersVirtualBusinessAddress";
import { TopPremiumSlider } from "@/app/components/TopPremiumSlider";
import { Tracking } from "@/app/components/Tracking";
import { TrackingCodeCapture } from "@/app/components/TrackingCodeCapture";
import VirtualBusinessAddressCompany from "@/app/components/VirtualBusinessAddressCompany";
import { VirtualOfficeFeatures } from "@/app/components/VirtualOfficeFeatures";
import { WhoBenefitsSection } from "@/app/components/WhoBenefitsSection";
import ZipSearchHeader from "@/app/components/ZipSearchHeader";
import { GlobalLoadingOverlay } from "@/app/components/GlobalLoadingOverlay";
import Spacing from "@/app/components/Spacing";

import { Info as AnsweringInfo } from "@/app/components/answering/Info";

import { SearchInputForBusiness } from "@/app/components/prestigious-business/SearchInputForBusiness";
import { MostPopularCities } from "@/app/components/prestigious-business/MostPopularCities";
import { GetYourOfficeSection } from "@/app/components/prestigious-business/GetYourOfficeSection";
import { FAQSection as PrestigiousFAQSection } from "@/app/components/prestigious-business/FAQSection";
import { Header } from "../components/answering/Header";

export function ComponentsShowcaseB() {
  return (
    <>
      <ComponentBlock name="MapRepeater" jsonName="N/A">
        <MapRepeater items={sampleRepeaterItems.map(item => ({ ...item, layout: item.layout ?? 'image_text' }))} cityName={defaultCity} locId="776" price={99} />
      </ComponentBlock>

      <ComponentBlock name="MeetingHero" jsonName="N/A">
        <MeetingHeroComponent hero={sampleMeetingHero} />
      </ComponentBlock>

      <ComponentBlock name="MeetingRoomLocations" jsonName="N/A">
        <MeetingRoomLocations
          title="Meeting Rooms Near You"
          description="Sample meeting room locations."
          locations={sampleMeetingLocations}
        />
      </ComponentBlock>

      <ComponentBlock name="MobileLocationSlider" jsonName="special.json">
        <MobileLocationSlider locations={specialLocations} />
      </ComponentBlock>

      <ComponentBlock name="Navbar" jsonName="N/A">
        <Navbar />
      </ComponentBlock>

      <ComponentBlock name="NonOpusLocationHeroCard" jsonName="N/A">
        <NonOpusLocationHeroCard data={sampleNonOpusHeroData} />
      </ComponentBlock>

      <ComponentBlock name="NoSurprisePopup" jsonName="N/A">
        <NoSurprisePopup />
      </ComponentBlock>

      <ComponentBlock name="OfficeSolutionBanner" jsonName="N/A">
        <OfficeSolutionBanner />
      </ComponentBlock>

      <ComponentBlock name="OptionalVirtualOfficeUpgrades" jsonName="services.json">
        <OptionalVirtualOfficeUpgrades items={optionalUpgradeCards} />
      </ComponentBlock>

      <ComponentBlock name="OverviewSection" jsonName="N/A">
        <OverviewSection data={sampleOverviewData} />
      </ComponentBlock>

      <ComponentBlock name="OverviewTextWithMap" jsonName="N/A">
        <OverviewTextWithMap overviewData={sampleOverviewData} />
      </ComponentBlock>

      <ComponentBlock name="PaidSearchFeatureHero" jsonName="N/A">
        <PaidSearchSpecialSearchFeature
          searchPlaceholder="Search over 650+ locations"
          helperText="Type the City or State"
          headline="Establish your business presence"
          features={sampleSearchFeatures}
          locations={sampleSearchLocations}
          rating={{ score: "4.8", label: "Google Rating" }}
          badge={{ price: "$99", period: "per month", topText: "Only", bottomText: "All inclusive" }}
        />
      </ComponentBlock>

      <ComponentBlock name="PaidSearchFeatureHeroForPaidSearch" jsonName="N/A">
        <PaidSearchFeatureHeroForPaidSearch hero={samplePaidSearchHero} />
      </ComponentBlock>

      <ComponentBlock name="PaidSearchFeaturePrice" jsonName="N/A">
        <PaidSearchFeaturePriceDetailsTableAddress comparison={sampleFeaturePriceContent.comparison} />
      </ComponentBlock>

      <ComponentBlock name="PaidSearchMobileSlider" jsonName="special.json">
        <PaidSearchMobileSlider locations={specialLocations} />
      </ComponentBlock>

      <ComponentBlock name="PaidSearchSlider" jsonName="special.json">
        <PaidSearchSpecialLocationSlider locations={specialLocations} />
      </ComponentBlock>

      <ComponentBlock name="PlumberVideoPlayer" jsonName="N/A">
        <PlumberVideoPlayer src="https://www.youtube.com/embed/UwE4xFcg6nw?rel=0&modestbranding=1&autohide=1" />
      </ComponentBlock>

      <ComponentBlock name="PopularBusinessAddressLocations" jsonName="N/A">
        <PopularBusinessAddressLocations />
      </ComponentBlock>

      <ComponentBlock name="PopularLocations" jsonName="N/A">
        <PopularLocations />
      </ComponentBlock>

      <ComponentBlock name="PremiumSection" jsonName="N/A">
        <PremiumSection
          href="/virtual-office"
          text="ALL-INCLUSIVE $99/mo with premium amenities"
        />
      </ComponentBlock>

      <ComponentBlock name="PrestigiousBusinessAddressClient" jsonName="N/A">
        <PrestigiousBusinessAddressClient faqs={sampleFaqs} />
      </ComponentBlock>

      <ComponentBlock name="PriceDetailsTableAddress" jsonName="N/A">
        <PriceDetailsTableAddress />
      </ComponentBlock>

      <ComponentBlock name="PromoPopularLocations" jsonName="N/A">
        <PromoPopularLocations />
      </ComponentBlock>

      <ComponentBlock name="PromotionPopup" jsonName="N/A">
        <PromotionPopup />
      </ComponentBlock>

      <ComponentBlock name="RadiusSelector" jsonName="N/A">
        <RadiusSelector />
      </ComponentBlock>

      <ComponentBlock name="RepeaterSection" jsonName="N/A">
        <RepeaterSection
          items={sampleRepeaterItems}
          overviewData={sampleOverviewData}
          cityName={defaultCity}
          locId="776"
          price={99}
        />
      </ComponentBlock>

      <ComponentBlock name="Reviews" jsonName="N/A">
        <Reviews testimonials={sampleReviewItems} />
      </ComponentBlock>

      <ComponentBlock name="SearchWithAction" jsonName="N/A">
        <GlobalLoadingOverlay>
          <SearchWithAction browseLink={{ href: "/our-top-locations/", label: "Browse Our Top Locations" }} />
        </GlobalLoadingOverlay>
      </ComponentBlock>

      <ComponentBlock name="SectionSpacer" jsonName="N/A">
        <SectionSpacer />
      </ComponentBlock>

      <ComponentBlock name="Spacing" jsonName="N/A">
        <Spacing vertical={24} />
      </ComponentBlock>

      <ComponentBlock name="SpecialFeatureComparisonTable.BestValuePill" jsonName="N/A">
        <BestValuePill />
      </ComponentBlock>

      <ComponentBlock name="SpecialFeatureComparisonTable.ComparisonTableSpecial" jsonName="N/A">
        <ComparisonTableSpecial comparison={sampleComparisonData} />
      </ComponentBlock>

      <ComponentBlock name="SpecialSlider" jsonName="special.json">
        <SpecialLocationSliderComponent locations={specialLocations} />
      </ComponentBlock>

      <ComponentBlock name="StateLocations" jsonName="business-address-ba.json">
        <StateLocations
          popular={sampleStateLocationsPopular}
          additional={sampleStateLocationsAdditional}
          state={defaultState}
          map={{ ...stateMap, city: defaultCity }}
        />
      </ComponentBlock>

      <ComponentBlock name="StateSearch" jsonName="business-address-ba.json">
        <StateSearch data={sampleStateSearchData} />
      </ComponentBlock>

      <ComponentBlock name="StateSelector" jsonName="all-states_ba.json">
        <StateSelector states={allStatesBaJson?.data?.[0]?.states ?? []} />
      </ComponentBlock>

      <ComponentBlock name="StatesList" jsonName="all-states_ba.json">
        <StatesList statesData={allStatesBaJson as any} />
      </ComponentBlock>

      <ComponentBlock name="SuccessSeekersVirtualBusinessAddress" jsonName="N/A">
        <SuccessSeekersVirtualBusinessAddress />
      </ComponentBlock>

      <ComponentBlock name="TopPremiumSlider" jsonName="N/A">
        <TopPremiumSlider />
      </ComponentBlock>

      <ComponentBlock name="Tracking" jsonName="N/A">
        <Tracking />
      </ComponentBlock>

      <ComponentBlock name="TrackingCodeCapture" jsonName="N/A">
        <TrackingCodeCapture />
      </ComponentBlock>

      <ComponentBlock name="VirtualBusinessAddressCompany" jsonName="N/A">
        <VirtualBusinessAddressCompany />
      </ComponentBlock>

      <ComponentBlock name="VirtualOfficeFeatures" jsonName="industry/business-service.json">
        <VirtualOfficeFeatures {...sampleVirtualOfficeFeatures} />
      </ComponentBlock>

      <ComponentBlock name="WhoBenefitsSection" jsonName="N/A">
        <WhoBenefitsSection />
      </ComponentBlock>

      <ComponentBlock name="ZipSearchHeader" jsonName="N/A">
        <ZipSearchHeader zipLabel="32801" />
      </ComponentBlock>

      <ComponentBlock name="AnsweringHeader" jsonName="N/A">
        <Header />
      </ComponentBlock>

      <ComponentBlock name="AnsweringInfo" jsonName="N/A">
        <AnsweringInfo testimonials={[]} />
      </ComponentBlock>

      <ComponentBlock name="PrestigiousBusiness.SearchInputForBusiness" jsonName="N/A">
        <SearchInputForBusiness />
      </ComponentBlock>

      <ComponentBlock name="PrestigiousBusiness.MostPopularCities" jsonName="N/A">
        <MostPopularCities />
      </ComponentBlock>

      <ComponentBlock name="PrestigiousBusiness.GetYourOfficeSection" jsonName="N/A">
        <GetYourOfficeSection />
      </ComponentBlock>

      <ComponentBlock name="PrestigiousBusiness.FAQSection" jsonName="N/A">
        <PrestigiousFAQSection data={sampleFaqs.map((item) => ({ ...item, answer: `<p>${item.answer}</p>` }))} />
      </ComponentBlock>
    </>
  );
}
