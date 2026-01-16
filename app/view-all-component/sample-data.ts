import type { RepeaterItem } from "@/app/components/RepeaterSection";
import bundlesBaJson from "../../newsite/json/bundles_ba.json";
import businessAddressJson from "../../newsite/json/business-address-ba.json";
import servicesJson from "../../newsite/json/services.json";
import specialJson from "../../newsite/json/special.json";
import allStatesBaJson from "../../newsite/json/all-states_ba.json";
import businessServiceJson from "../../newsite/json/industry/business-service.json";

export { bundlesBaJson, businessAddressJson, servicesJson, specialJson, allStatesBaJson, businessServiceJson };

export const normalizeImageUrl = (value?: string | null) => {
  if (!value) return "/assets/mail-center.webp";
  if (value.startsWith("http")) return value;
  if (value.startsWith("/assets/")) return value;
  const origin = "https://www.opusvirtualoffices.com";
  return value.startsWith("/") ? `${origin}${value}` : `${origin}/${value}`;
};

const stripHtml = (value: string) =>
  (value || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/?[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/[^\x00-\x7F]+/g, " ")
    .replace(/\s+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\s+/g, " ")
    .trim();

const normalizeCopy = (value: string) =>
  value
    .replace(/\u0192\?T/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/\u2019/g, "'");

const servicesData = servicesJson?.data ?? {};
const remoteHeroImage =
  "https://www.opusvirtualoffices.com/newsite/wp-content/uploads/2024/05/Virtual-Offices-in-Atlanta-Prime-Business-Location.webp";

export const includedOfficeFeatures = (servicesData.regular_services ?? []).map(
  (item: {
    title?: string;
    description?: string;
    read_more_link?: string;
  }) => ({
    title: item.title ?? "Service",
    description: stripHtml(item.description ?? ""),
    href: item.read_more_link ?? "",
  })
);

export const includedFeatureUpgrades = (servicesData.optional_upgrades ?? []).map(
  (item: { title?: string; description?: string; order?: string | number }) => ({
    title: item.title ?? "Upgrade",
    description: stripHtml(item.description ?? ""),
    order: item.order ?? "0",
  })
);

export const optionalUpgradeCards = (servicesData.optional_upgrades ?? []).map(
  (item: { title?: string; description?: string }) => ({
    title: item.title ?? "Upgrade",
    price: "",
    body: stripHtml(item.description ?? ""),
  })
);

export const specialLocations = specialJson?.data?.locations ?? [];
export const businessAddressLocations = businessAddressJson?.data?.all_popular ?? [];

export const normalizedLocations = businessAddressLocations.map(
  (
    item: {
      id?: string;
      city?: string;
      state?: string;
      state_abbr?: string;
      name?: string;
      top_premium?: string;
      Premium?: string;
      point_x?: string;
      point_y?: string;
      location_image_url?: string | null;
      city_featured_image_url?: string | null;
    },
    index: number
  ) => ({
    id: item.id ?? String(index),
    city: item.city ?? "",
    state: item.state ?? "",
    name: item.name ?? "",
    address: item.name ?? "",
    abbr: item.state_abbr ?? "",
    showpopular: item.top_premium ?? "0",
    point_x: item.point_x ?? "",
    point_y: item.point_y ?? "",
    image: normalizeImageUrl(
      item.location_image_url ?? item.city_featured_image_url
    ),
    premium: item.Premium === "1",
  })
);

export const defaultState = normalizedLocations[0]?.state || "Florida";
export const stateLocations = normalizedLocations.filter(
  (location) => location.state === defaultState
);
export const defaultCity = stateLocations[0]?.city || "Orlando";
export const stateCities = Array.from(
  new Set(stateLocations.map((location) => location.city).filter(Boolean))
);

export const stateMap = {
  lat: Number.parseFloat(stateLocations[0]?.point_x ?? "28.5384"),
  lng: Number.parseFloat(stateLocations[0]?.point_y ?? "-81.3789"),
  zoom: 12,
};

export const sampleHeroData = {
  city: "Orlando",
  state: "FL",
  price: 99,
  signupUrl: "/signup/?locid=776",
  address: {
    line1: "123 Main St",
    city: "Orlando",
    state: "FL",
    zip: "32801",
    phone: "(407) 555-1234",
  },
  images: { hero: [remoteHeroImage] },
  features: { showMailX: 1 },
  locationDescription: "Sample location description.",
  addressOnlyOptionAvailable: 1,
  addressOnlyUrl: "/prestigious-business-address/",
};

export const sampleNonOpusHeroData = {
  city: "Miami",
  state: "FL",
  price: 89,
  signupUrl: "/signup/?locid=889",
  address: {
    line1: "456 Ocean Dr",
    city: "Miami",
    state: "FL",
    zip: "33131",
    phone: "(305) 555-9876",
  },
  images: { hero: [remoteHeroImage] },
  features: { showMailX: 0 },
  locationDescription: "Sample non-opus location description.",
  addressOnlyOptionAvailable: 0,
  addressOnlyUrl: "/prestigious-business-address/",
};

export const sampleOverviewData = {
  heading: "Downtown Orlando",
  body: "Sample overview copy for the demo view-all page.",
  map: {
    city: "Orlando",
    lat: 28.5384,
    lng: -81.3789,
    zoom: 12,
  },
};

export const sampleRepeaterItems: RepeaterItem[] = [
  {
    title: "Sample Repeater Title",
    body: "Sample repeater body text that spans multiple sentences.",
    image: remoteHeroImage,
    layout: "image_text",
  },
  {
    title: "Sample Text Only",
    body: "Sample text only body that includes multiple sentences. It will split into columns.",
    layout: "text_only",
  },
];

export const sampleMapRepeaterItems: RepeaterItem[] = [
  {
    title: "Sample Repeater",
    body: "Sample repeater body content.",
    image: remoteHeroImage,
    layout: "image_text",
  },
];

export const sampleReviewItems = [
  {
    id: 1,
    reviewerName: "Jordan Lee",
    reviewText: "Great experience with the team and the address service.",
    rating: 5,
  },
  {
    id: 2,
    reviewerName: "Alex Kim",
    reviewText: "Fast setup and helpful support.",
    rating: 4,
  },
];

export const sampleFaqs = [
  {
    question: "How quickly can I activate a virtual office?",
    answer: "Most locations can be activated within one business day.",
  },
  {
    question: "Can I upgrade my plan later?",
    answer: "Yes, upgrades are available at any time.",
  },
];

export const sampleLocationsFaqs = [
  {
    question: "How does mail handling work?",
    answer: "We notify you and can forward on request.",
  },
];

export const sampleDeals = [
  {
    name: "Growth Suite",
    category: "Growth",
    offer: "20% off",
    description: "Sample offer for demo view.",
    image: remoteHeroImage,
    url: "https://example.com/deal/growth",
  },
  {
    name: "Ops Toolkit",
    category: "Operations",
    offer: "Free trial",
    description: "Sample offer for demo view.",
    image: remoteHeroImage,
    url: "https://example.com/deal/ops",
  },
];

export const sampleFeatureList = [
  "Prestigious Business Address",
  "Professional Live Call Answering",
  "Personalized Call Transferring",
  "Business Phone/Fax Number",
];

export const sampleComparisonData = {
  features: [
    "Unlimited Live Call Answer",
    "Corporate Mailing Address",
    "Local Business Number",
    "Unlimited Call Transfer",
    "Callout Services*",
    "Unlimited Toll-Free Calls*",
    "Unlimited Texting*",
    "Short Term Contract",
    "Setup Fee",
    "Cost Per Mo.",
  ],
  providers: [
    {
      name: "Opus Virtual Offices",
      logo: "/opus.svg",
      is_featured: true,
      features_data: {
        unlimited_live_call_answer: true,
        corporate_mailing_address: true,
        local_business_number: true,
        unlimited_call_transfer: true,
        callout_services: true,
        unlimited_toll_free_calls: true,
        unlimited_texting: true,
        contract_length: "3 Months",
        setup_fee: "$100",
        monthly_cost: "$99 / Month",
        monthly_cost_subtitle: "All Locations",
      },
    },
    {
      name: "Alliance Virtual Offices",
      logo: "/alliance.svg",
      features_data: {
        unlimited_live_call_answer: "50 Min. Included",
        corporate_mailing_address: true,
        local_business_number: true,
        unlimited_call_transfer: true,
        callout_services: false,
        unlimited_toll_free_calls: "50 Min. Included",
        unlimited_texting: false,
        contract_length: "6 Months",
        setup_fee: "$200",
        monthly_cost: "$174 - $224",
        monthly_cost_subtitle: "per month",
      },
    },
  ],
};

export const sampleFeaturePriceContent = {
  testimonial: {
    author: "Sample Reviewer",
    source: "VirtualOfficeReviews.com",
    avatar: "/newsite/wp-content/uploads/2024/05/Virtual-Offices-in-Atlanta-Prime-Business-Location.webp",
    content: "Sample testimonial content for the feature price section.",
  },
  analysis: [
    { type: "text", content: "Sample analysis paragraph one." },
    { type: "text", content: "Sample analysis paragraph two." },
  ],
  comparison: sampleComparisonData,
  footnote: "Sample footnote text.",
  cta: {
    title: "Start Today",
    pricing_text: "$99",
    pricing_subtitle: "per month",
    button_text: "Get Started",
  },
};

export const sampleMeetingHero = {
  did_you_know_badge: "Did you know?",
  title: { desktop: "Meeting Room Access" },
  description: { desktop: "Book meeting rooms across the country." },
  subtitle: "Flexible spaces for teams and clients.",
  cta: { text: "Book a Room", url: "/meeting-rooms", disclaimer: "Subject to availability." },
  highlight_text: "Meet in premium spaces",
  banner_images: [
    remoteHeroImage,
    remoteHeroImage,
    remoteHeroImage,
    remoteHeroImage,
  ],
};

export const sampleMeetingLocations = [
  {
    name: "Orlando Meeting Room",
    city: "Orlando",
    state_abbr: "FL",
    image: remoteHeroImage,
    link: "/meeting-rooms/orlando",
  },
  {
    name: "Miami Meeting Room",
    city: "Miami",
    state_abbr: "FL",
    image: remoteHeroImage,
    link: "/meeting-rooms/miami",
  },
];

export const sampleSearchFeatures = [
  { id: "feature-1", text: "Live Call Answering" },
  { id: "feature-2", text: "Prestigious Business Address" },
  { id: "feature-3", text: "Company Phone/Fax Number" },
];

export const sampleSearchLocations = [
  {
    id: "loc-1",
    name: "Orlando",
    city: "Orlando",
    state: "Florida",
    state_abbr: "FL",
    link: "/virtual-office/florida/orlando/location-1499/",
  },
  {
    id: "loc-2",
    name: "Miami",
    city: "Miami",
    state: "Florida",
    state_abbr: "FL",
    link: "/virtual-office/florida/miami/location-1285/",
  },
];

export const samplePaidSearchHero = {
  search_placeholder: "Search Over 650+ locations",
  search_help_text: "Type the City or State",
  title: "Establish your business presence",
  subtitle: "All-Inclusive | No Hidden Fees",
  features: sampleSearchFeatures.map((item) => item.text),
  badges: {
    google_rating: "/wp-content/themes/ThemeDec23/assets/images/paidsearch/google-rating.svg",
    all_inclusive: "/wp-content/themes/ThemeDec23/assets/images/paidsearch/all-inclusive.webp",
  },
};

export const sampleIndustryHero = {
  heading: "Industry Hero Heading",
  descriptionHtml: "<p>Sample industry hero description.</p>",
  image: remoteHeroImage,
};

export const sampleIndustrySections = [
  {
    main_heading: "Sample Industry Section",
    industry_paragraph: "<p>Sample industry details paragraph.</p>",
  },
];

export const sampleVirtualOfficeFeatures = {
  title: normalizeCopy(businessServiceJson.services?.heading ?? "Services"),
  heading: normalizeCopy(businessServiceJson.services?.heading ?? "Service Heading"),
  content: normalizeCopy(businessServiceJson.services?.description ?? "Sample description."),
  contentHtml: normalizeCopy(businessServiceJson.services?.description ?? "Sample description."),
  imagepath: businessServiceJson.services?.image ?? remoteHeroImage,
  features: (businessServiceJson.features ?? []).map((feature: any, index: number) => ({
    title: normalizeCopy(feature.title ?? `Feature ${index + 1}`),
    description: normalizeCopy(feature.description ?? "Sample feature description."),
  })),
};

export const sampleBusinessServiceSections = (businessServiceJson.industry_content ?? []).map(
  (section: any) => ({
    main_heading: normalizeCopy(section.main_heading ?? "Section heading"),
    industry_paragraph: normalizeCopy(section.industry_paragraph ?? "<p>Sample paragraph.</p>"),
  })
);

export const sampleInteractiveCards = [
  {
    bgClass:
      "bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(119,119,119,1)_100%),linear-gradient(0deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%)]",
    bgImage: remoteHeroImage,
    text: "Click to view demo",
    hasButton: true,
  },
  {
    bgClass:
      "bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(119,119,119,1)_100%)]",
    bgImage: remoteHeroImage,
    text: "Bundle & Save",
    hasButton: false,
    href: "/cost-comparison/",
    isNextJs: false,
  },
];

export const sampleLocationsContent = {
  heading: "Locations Content",
  description: "<p>Left column description.</p>",
  body: "<p>Right column body content.</p>",
};

export const sampleTextWithImage = {
  title: "Sample Text With Image",
  body: "Sample text-with-image body for location components.",
  image: remoteHeroImage,
};

export const sampleStateSearchData = {
  state: defaultState,
  image: normalizeImageUrl(businessAddressLocations[0]?.location_image_url),
  locations: stateLocations,
  map: stateMap,
};

const splitAddress = (value: string) => {
  const parts = value.split(",").map((part) => part.trim());
  if (parts.length <= 1) {
    return { address1: value, address2: "" };
  }
  return {
    address1: parts.slice(0, 2).join(", "),
    address2: parts.slice(2).join(", "),
  };
};

export const sampleStateLocationsPopular = (() => {
  const popular = stateLocations[0];
  const address = splitAddress(popular?.name ?? "");
  return {
    city: popular?.city ?? defaultCity,
    address1: address.address1,
    address2: address.address2,
    image: normalizeImageUrl(popular?.image),
    premium: popular?.premium ?? false,
  };
})();

export const sampleStateLocationsAdditional = stateLocations.slice(1, 3).map((item) => {
  const address = splitAddress(item.name ?? "");
  return {
    city: item.city,
    address1: address.address1,
    address2: address.address2,
    image: normalizeImageUrl(item.image),
    premium: item.premium ?? false,
  };
});
