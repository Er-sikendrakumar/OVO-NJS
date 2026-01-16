export type OpenGraphType =
  | "website"
  | "article"
  | "book"
  | "profile"
  | "music.song"
  | "music.album"
  | "music.playlist"
  | "music.radio_station"
  | "video.movie"
  | "video.episode"
  | "video.tv_show"
  | "video.other";

export type FeatureComparisonFile = {
  success: boolean;
  data: {
    hero: {
      title: string;
      subtitle: string;
    };
    testimonial: {
      author: string;
      source: string;
      avatar: string;
      content: string;
    };
    comparison: {
      features: string[];
      providers: Array<{
        name: string;
        logo: string;
        is_featured?: boolean;
        features_data: {
          unlimited_live_call_answer: string | boolean;
          corporate_mailing_address: string | boolean;
          local_business_number: string | boolean;
          unlimited_call_transfer: string | boolean;
          callout_services: string | boolean;
          unlimited_toll_free_calls: string | boolean;
          unlimited_texting: string | boolean;
          contract_length: string | boolean;
          setup_fee: string | boolean;
          monthly_cost: string | boolean;
          monthly_cost_subtitle?: string;
        };
      }>;
    };
    footnote?: string;
    analysis: Array<{
      type: string;
      content: string;
    }>;
    cta: {
      title: string;
      pricing_text: string;
      pricing_subtitle: string;
      button_text: string;
      secondary_button_text?: string;
      secondary_button_url?: string;
    };
  };
  seo: {
    title: string;
    meta_description: string;
    canonical?: string;
    og?: {
      title?: string;
      description?: string;
      url?: string;
      type?: OpenGraphType;
      image?: string;
    };
  };
};
