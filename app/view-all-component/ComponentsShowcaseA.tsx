"use client";

import React from "react";
import AboutAddress from "@/app/components/AboutAddress";
import { ActionSearchBar } from "@/app/components/ActionSearchBar";
import { AffiliateFeatureList } from "@/app/components/AffiliateFeatureList";
import { AffiliateHeroText } from "@/app/components/AffiliateHeroText";
import { AffiliateLoginCard } from "@/app/components/AffiliateLoginCard";
import AllClientsBenifit from "@/app/components/AllClientsBenifit";
import BenefitsVirtualBusinessAddress from "@/app/components/BenefitsVirtualBusinessAddress";
import { BestVirtualOfficeSection } from "@/app/components/BestVirtualOfficeSection";
import { Booking } from "@/app/components/Booking";
import { BookingCTA } from "@/app/components/BookingCTA";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import BundleAndSave from "@/app/components/BundleAndSave";
import BundleAndSaveForCostComparison from "@/app/components/BundleAndSaveForCostComparison";
import BusinessAddressBenefits from "@/app/components/BusinessAddressBenefits";
import BusinessAddressOverviewSection from "@/app/components/BusinessAddressOverviewSection";
import BusinessSection from "@/app/components/BusinessSection";
import { CantactQna } from "@/app/components/CantactQna";
import CantactUs from "@/app/components/CantactUs";
import CityLocationHero from "@/app/components/CityLocationHero";
import CitySelectDropdown from "@/app/components/CitySelectDropdown";
import ClientsBenefit from "@/app/components/ClientsBenefit";
import { ComparisonTable as ComparisonTableBase } from "@/app/components/ComparisonTable";
import { CompetitorPricingComparison } from "@/app/components/CompetitorPricingComparison";
import { CTABanner } from "@/app/components/CTABanner";
import CtaVirtualBusinessAdd from "@/app/components/CtaVirtualBusinessAdd";
import CuratedGrowth from "@/app/components/CuratedGrowth";
import { DealsPagination } from "@/app/components/DealsPagination";
import { EbookBanner } from "@/app/components/EbookBanner";
import FaqAllVirtualBusinessAddress from "@/app/components/FaqAllVirtualBusinessAddress";
import { FaqSection } from "@/app/components/FaqSection";
import { FaqSectionForSupport } from "@/app/components/FaqSectionForSupport";
import { ComparisonTable as FeatureComparisonTableComparisonTable } from "@/app/components/FeatureComparisonTable";
import { ComparisonTable as FeatureComparisonTableForFeaturesComparisonTable } from "@/app/components/FeatureComparisonTableForFeatures";
import { FeatureComparisonTablePaidSearch } from "@/app/components/FeatureComparisonTablePaidSearch";
import { FeatureCompetitorComparison } from "@/app/components/FeatureCompetitorComparison";
import { FeaturePriceDetailsTableAddress as FeaturePriceDetailsTableAddressForFeaturesComponent } from "@/app/components/FeaturePriceDetailsTableAddressForFeatures";
import { FeaturePriceDetailsTableAddressForSpecial } from "@/app/components/FeaturePriceDetailsTableAddressForSpecial";
import { FeaturesBox } from "@/app/components/FeaturesBox";
import { FeaturesBoxLocations } from "@/app/components/FeaturesBoxLocations";
import { FeaturesBoxLocationsNonOpus } from "@/app/components/FeaturesBoxLocationsNonOpus";
import FeatureSectionVirtualAdd from "@/app/components/FeatureSectionVirtualAdd";
import { FindYourOfficeLocation } from "@/app/components/FindYourOfficeLocation";
import { Footer } from "@/app/components/Footer";
import { GlobalLoadingOverlay } from "@/app/components/GlobalLoadingOverlay";
import GetVirtualBusinessAddress from "@/app/components/GetVirtualBusinessAddress";
import { HomePageClient } from "@/app/components/HomePageClient";
import { HomePageCTABanner } from "@/app/components/HomePageCTABanner";
import { HomePopularLocations } from "@/app/components/HomePopularLocations";
import ImageCard from "@/app/components/ImageCard";
import IncludedFeatures from "@/app/components/IncludedFeatures";
import IncludedVirtualOfficeFeatures from "@/app/components/IncludedVirtualOfficeFeatures";
import { IndustryDetails } from "@/app/components/IndustryDetails";
import { IndustryHeroBanner } from "@/app/components/IndustryHeroBanner";
import { InteractiveCardsGrid } from "@/app/components/InteractiveCardsGrid";
import { IntroSection } from "@/app/components/IntroSection";
import LiveReceptionistDetails from "@/app/components/LiveReceptionist.Details";
import LiveReceptionistCTA from "@/app/components/LiveReceptionistCTA";
import LiveReceptionistHero from "@/app/components/LiveReceptionisthero";
import LocationBreadcrumb from "@/app/components/LocationBreadcrumb";
import LocationBreadcrumbNonOpus from "@/app/components/LocationBreadcrumbNonOpus";
import LocationHeroCard from "@/app/components/LocationHeroCard";
import { LocationOverviewSection } from "@/app/components/LocationOverviewSection";
import LocationResultsWithMap from "@/app/components/LocationResultsWithMap";
import LocationSection from "@/app/components/LocationSection";
import { OurTopLocations } from "@/app/components/OurTopLocations";

import { ComponentBlock } from "@/app/view-all-component/ComponentBlock";
import {
  bundlesBaJson,
  businessAddressJson,
  defaultCity,
  defaultState,
  includedFeatureUpgrades,
  includedOfficeFeatures,
  sampleBusinessServiceSections,
  sampleComparisonData,
  sampleDeals,
  sampleFaqs,
  sampleFeatureList,
  sampleFeaturePriceContent,
  sampleHeroData,
  sampleInteractiveCards,
  sampleMapRepeaterItems,
  sampleOverviewData,
  sampleReviewItems,
  stateCities,
  stateLocations,
  stateMap,
} from "@/app/view-all-component/sample-data";

export function ComponentsShowcaseA() {
  return (
    <>
      <ComponentBlock name="AboutAddress" jsonName="N/A">
        <AboutAddress address="123 Main St" city="Orlando" state="FL" />
      </ComponentBlock>

      <ComponentBlock name="ActionSearchBar" jsonName="N/A">
        <ActionSearchBar />
      </ComponentBlock>

      <ComponentBlock name="AffiliateFeatureList" jsonName="N/A">
        <AffiliateFeatureList />
      </ComponentBlock>

      <ComponentBlock name="AffiliateHeroText" jsonName="N/A">
        <AffiliateHeroText />
      </ComponentBlock>

      <ComponentBlock name="AffiliateLoginCard" jsonName="N/A">
        <AffiliateLoginCard />
      </ComponentBlock>
      <ComponentBlock name="AffiliateProgram" jsonName="N/A">
        <div className="text-center text-sm text-[#026aa2]">
          No render available (file is empty).
        </div>
      </ComponentBlock>

      <ComponentBlock name="AllClientsBenifit" jsonName="N/A">
        <AllClientsBenifit deals={sampleDeals} />
      </ComponentBlock>

      <ComponentBlock name="BenefitsVirtualBusinessAddress" jsonName="N/A">
        <BenefitsVirtualBusinessAddress />
      </ComponentBlock>

      <ComponentBlock name="BestVirtualOfficeSection" jsonName="N/A">
        <BestVirtualOfficeSection
          city={defaultCity}
          state={defaultState}
          image="/assets/mail-center.webp"
          items={sampleMapRepeaterItems.map(item => ({
            ...item,
            layout: item.layout || "image_text"
          }))}
          locId="776"
          price={99}
        />
      </ComponentBlock>

      <ComponentBlock name="Booking" jsonName="N/A">
        <Booking
          title="Book a Meeting Room"
          subtitle="Sample booking subtitle text."
          buttonText="Reserve Now"
          buttonUrl="/meeting-rooms"
        />
      </ComponentBlock>

      <ComponentBlock name="BookingCTA" jsonName="N/A">
        <BookingCTA
          title="Meet Your Clients"
          description="Sample booking CTA description."
          features={["On-demand rooms", "Premium locations"]}
          image="/newsite/wp-content/uploads/2024/05/Virtual-Offices-in-Atlanta-Prime-Business-Location.webp"
          cta={{ text: "Book Now", url: "/meeting-rooms" }}
        />
      </ComponentBlock>

      <ComponentBlock name="Breadcrumbs" jsonName="N/A">
        <Breadcrumbs stateLabel="Florida" cityLabel="Orlando" />
      </ComponentBlock>

      <ComponentBlock name="BundleAndSave" jsonName="bundles_ba.json">
        <BundleAndSave phonebundlesdata={bundlesBaJson} />
      </ComponentBlock>

      <ComponentBlock name="BundleAndSaveForCostComparison" jsonName="bundles_ba.json">
        <BundleAndSaveForCostComparison phonebundlesdata={bundlesBaJson} />
      </ComponentBlock>

      <ComponentBlock name="BusinessAddressBenefits" jsonName="N/A">
        <BusinessAddressBenefits />
      </ComponentBlock>

      <ComponentBlock name="BusinessAddressOverviewSection" jsonName="N/A">
        <BusinessAddressOverviewSection
          city="Orlando"
          stateAbbr="FL"
          imageSrc="/assets/mail-center.webp"
        />
      </ComponentBlock>

      <ComponentBlock name="BusinessSection" jsonName="N/A">
        <BusinessSection />
      </ComponentBlock>

      <ComponentBlock name="CantactQna" jsonName="N/A">
        <CantactQna />
      </ComponentBlock>

      <ComponentBlock name="CantactUs" jsonName="N/A">
        <CantactUs />
      </ComponentBlock>

      <ComponentBlock name="CityLocationHero" jsonName="N/A">
        <CityLocationHero
          city="Orlando"
          state="Florida"
          stateAbbrev="FL"
          address={{
            street: "123 Main St",
            city: "Orlando",
            state: "FL",
            zip: "32801",
            phone: "(407) 555-1234",
          }}
          price="$99"
          image="/assets/mail-center.webp"
          companyName="Opus VO"
        />
      </ComponentBlock>

      <ComponentBlock name="CitySelectDropdown" jsonName="business-address-ba.json">
        <CitySelectDropdown options={[defaultCity]} value={defaultCity} />
      </ComponentBlock>

      <ComponentBlock name="ClientsBenefit" jsonName="N/A">
        <ClientsBenefit />
      </ComponentBlock>

      <ComponentBlock name="ComparisonTable" jsonName="N/A">
        <ComparisonTableBase />
      </ComponentBlock>

      <ComponentBlock name="CompetitorPricingComparison" jsonName="N/A">
        <CompetitorPricingComparison />
      </ComponentBlock>

      <ComponentBlock name="CTABanner" jsonName="N/A">
        <CTABanner />
      </ComponentBlock>

      <ComponentBlock name="CtaVirtualBusinessAdd" jsonName="N/A">
        <CtaVirtualBusinessAdd />
      </ComponentBlock>

      <ComponentBlock name="CuratedGrowth" jsonName="N/A">
        <CuratedGrowth />
      </ComponentBlock>

      <ComponentBlock name="DealsPagination" jsonName="N/A">
        <DealsPagination
          currentPage={1}
          totalPages={5}
          paginationItems={[1, 2, "ellipsis", 5]}
          goToPage={() => undefined}
        />
      </ComponentBlock>

      <ComponentBlock name="EbookBanner" jsonName="N/A">
        <EbookBanner />
      </ComponentBlock>

      <ComponentBlock name="FaqAllVirtualBusinessAddress" jsonName="N/A">
        <FaqAllVirtualBusinessAddress />
      </ComponentBlock>

      <ComponentBlock name="FaqSection" jsonName="N/A">
        <FaqSection data={sampleFaqs} />
      </ComponentBlock>

      <ComponentBlock name="FaqSectionForSupport" jsonName="N/A">
        <FaqSectionForSupport />
      </ComponentBlock>

      <ComponentBlock name="FeatureComparisonTable" jsonName="N/A">
        <FeatureComparisonTableComparisonTable comparison={sampleComparisonData} />
      </ComponentBlock>

      <ComponentBlock name="FeatureComparisonTableForFeatures" jsonName="N/A">
        <FeatureComparisonTableForFeaturesComparisonTable
          comparison={sampleComparisonData}
          footnote="Sample footnote"
        />
      </ComponentBlock>

      <ComponentBlock name="FeatureComparisonTablePaidSearch" jsonName="N/A">
        <FeatureComparisonTablePaidSearch comparison={sampleComparisonData} />
      </ComponentBlock>

      <ComponentBlock name="FeatureCompetitorComparison" jsonName="N/A">
        <FeatureCompetitorComparison
          content={{ hero: { title: "Competitor Comparison", subtitle: "Sample subtitle." } }}
        />
      </ComponentBlock>

      <ComponentBlock name="FeaturePriceDetailsTableAddressForFeatures" jsonName="N/A">
        <FeaturePriceDetailsTableAddressForFeaturesComponent
          content={sampleFeaturePriceContent}
        />
      </ComponentBlock>

      <ComponentBlock name="FeaturePriceDetailsTableAddressForSpecial" jsonName="N/A">
        <FeaturePriceDetailsTableAddressForSpecial
          isSpecial
          content={sampleFeaturePriceContent}
        />
      </ComponentBlock>

      <ComponentBlock name="FeaturesBox" jsonName="N/A">
        <FeaturesBox features={sampleFeatureList} />
      </ComponentBlock>

      <ComponentBlock name="FeaturesBoxLocations" jsonName="N/A">
        <FeaturesBoxLocations features={sampleFeatureList} />
      </ComponentBlock>

      <ComponentBlock name="FeaturesBoxLocationsNonOpus" jsonName="N/A">
        <FeaturesBoxLocationsNonOpus features={sampleFeatureList} />
      </ComponentBlock>

      <ComponentBlock name="FeatureSectionVirtualAdd" jsonName="N/A">
        <FeatureSectionVirtualAdd />
      </ComponentBlock>

      <ComponentBlock name="FindYourOfficeLocation" jsonName="N/A">
        <FindYourOfficeLocation />
      </ComponentBlock>

      <ComponentBlock name="Footer" jsonName="N/A">
        <Footer />
      </ComponentBlock>

      <ComponentBlock name="GetVirtualBusinessAddress" jsonName="N/A">
        <GetVirtualBusinessAddress />
      </ComponentBlock>

      <ComponentBlock name="GlobalLoadingOverlay" jsonName="N/A">
        <GlobalLoadingOverlay>
          <div className="text-sm text-[#475467]">Overlay Provider</div>
        </GlobalLoadingOverlay>
      </ComponentBlock>

      <ComponentBlock name="HomePageClient" jsonName="N/A">
        <HomePageClient testimonials={sampleReviewItems} />
      </ComponentBlock>

      <ComponentBlock name="HomePageCTABanner" jsonName="N/A">
        <HomePageCTABanner />
      </ComponentBlock>

      <ComponentBlock name="HomePopularLocations" jsonName="N/A">
        <HomePopularLocations />
      </ComponentBlock>

      <ComponentBlock name="ImageCard" jsonName="N/A">
        <ImageCard
          imageSrc="/assets/mail-center.webp"
          imageAlt="Sample location"
          cityName="Orlando"
          address="123 Main St"
          subAddress="Suite 100"
          isHighlight
        />
      </ComponentBlock>

      <ComponentBlock name="IncludedFeatures" jsonName="services.json">
        <IncludedFeatures optionalUpgrades={includedFeatureUpgrades} />
      </ComponentBlock>

      <ComponentBlock name="IncludedVirtualOfficeFeatures" jsonName="services.json">
        <IncludedVirtualOfficeFeatures items={includedOfficeFeatures} />
      </ComponentBlock>

      <ComponentBlock name="IndustryDetails" jsonName="industry/business-service.json">
        <IndustryDetails
          servicesHeading="Sample Services"
          servicesDescriptionHtml="<p>Sample services description.</p>"
          sections={sampleBusinessServiceSections}
        />
      </ComponentBlock>

      <ComponentBlock name="IndustryHeroBanner" jsonName="industry/business-service.json">
        <IndustryHeroBanner
          heading="Industry Hero Heading"
          descriptionHtml="<p>Sample industry hero description.</p>"
          image="/assets/mail-center.webp"
        />
      </ComponentBlock>

      <ComponentBlock name="InteractiveCardsGrid" jsonName="N/A">
        <InteractiveCardsGrid interactiveCards={sampleInteractiveCards} locId="776" />
      </ComponentBlock>

      <ComponentBlock name="IntroSection" jsonName="N/A">
        <IntroSection />
      </ComponentBlock>

      <ComponentBlock name="LiveReceptionist.Details" jsonName="N/A">
        <LiveReceptionistDetails />
      </ComponentBlock>

      <ComponentBlock name="LiveReceptionistCTA" jsonName="N/A">
        <LiveReceptionistCTA
          headline="Live Receptionist for only $79/month"
          callLabel="CALL"
          phoneNumber="(800) 555-0000"
        />
      </ComponentBlock>

      <ComponentBlock name="LiveReceptionisthero" jsonName="N/A">
        <LiveReceptionistHero companyName="Opus VO" />
      </ComponentBlock>

      <ComponentBlock name="LocationBreadcrumb" jsonName="business-address-ba.json">
        <LocationBreadcrumb
          city={defaultCity}
          state={defaultState}
          citySlug={defaultCity.toLowerCase().replace(/\s+/g, "-")}
          stateSlug={defaultState.toLowerCase().replace(/\s+/g, "-")}
        />
      </ComponentBlock>

      <ComponentBlock name="LocationBreadcrumbNonOpus" jsonName="business-address-ba.json">
        <LocationBreadcrumbNonOpus
          city={defaultCity}
          state={defaultState}
          citySlug={defaultCity.toLowerCase().replace(/\s+/g, "-")}
          stateSlug={defaultState.toLowerCase().replace(/\s+/g, "-")}
          address={{
            line1:"La 565 street",
            city: defaultCity,
            state: defaultState,
            zip: "32801",
            phone: "(407) 555-1234",
          }}
        />
      </ComponentBlock>

      <ComponentBlock name="LocationHeroCard" jsonName="N/A">
        <LocationHeroCard data={sampleHeroData} />
      </ComponentBlock>

      <ComponentBlock name="LocationOverviewSection" jsonName="N/A">
        <LocationOverviewSection data={sampleOverviewData} />
      </ComponentBlock>

      <ComponentBlock name="LocationResultsWithMap" jsonName="business-address-ba.json">
        <LocationResultsWithMap
          state={defaultState}
          locations={stateLocations}
          map={stateMap}
        />
      </ComponentBlock>

      <ComponentBlock name="LocationSection" jsonName="business-address-ba.json">
        <LocationSection
          state={defaultState}
          city={defaultCity}
          cities={stateCities}
          dropdownOptions={stateCities}
          onCityChange={() => undefined}
          locations={stateLocations}
          map={stateMap}
          repeaterData={[]}
          overviewData={sampleOverviewData}
          headerData={{ signupUrl: "/signup/?locid=776", price: 99 }}
        />
      </ComponentBlock>

      <ComponentBlock name="OurTopLocations" jsonName="business-address-ba.json">
        <OurTopLocations locationsData={businessAddressJson} />
      </ComponentBlock>
    </>
  );
}
