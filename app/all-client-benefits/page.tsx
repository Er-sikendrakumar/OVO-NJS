import AllClientsBenefitPage, {
  DealItem,
} from "../components/AllClientsBenifit";
import { Footer } from "../components/Footer";

export default async function AllClientBenefitsPage() {
  const DEALS: DealItem[] = [
    {
      name: "Opus Referral Program",
      category: "BUSINESS TOOLS",
      offer: "Earn $50",
      description:
        "For every friend you refer to opus who signs up to our virtual office program, you'll receive a $50 gift card* (or credit towards your next payment).",
      image: "/portal/assets/img/logo.svg",
      url: "https://www.opusvirtualoffices.com/portal/refer-a-client",
    },
    {
      name: "Incorporate.com",
      category: "SETUP YOUR BUSINESS",
      offer: "Get 20% off",
      description:
        "incorporate.com has incorporated more than 500,000 small businesses. We can trace our roots back more than a century.",
      image: "/portal/assets/img/incorporate.com_logo_base.png",
      url: "https://www.incorporate.com/?affiliate=96210&aname=opus/",
    },
    {
      name: "EasyReviewSite",
      category: "MARKETING TOOLS",
      offer: "Get Reviewed",
      description:
        "Build consumer trust, improve your online search ranking and increase sales with 5-star reviews.",
      image: "/portal/assets/img/easy-review.jpg",
      url: "https://www.team.easyreviewsite.com/",
    },
    {
      name: "Blue Light IT",
      category: "BUSINESS TOOLS",
      offer: "IT Management",
      description:
        "Cloud Services, Remote Backups, Software Development, Network Monitoring.",
      image: "/portal/assets/img/bluelightlogo-2.png",
      url: "https://www.bluelightit.com/",
    },
    {
      name: "Shopify",
      category: "SETUP YOUR BUSINESS",
      offer: "New Website",
      description:
        "Start selling products today with merchants from products to orders to customers.",
      image: "/portal/assets/img/shopify_logo3.png",
      url: "https://www.shopify.com/",
    },
    {
      name: "Wix",
      category: "SETUP YOUR BUSINESS",
      offer: "Setup Shop",
      description:
        "Create a website using simple drag and drop tools and ready-made designs.",
      image: "/portal/assets/img/wixlogo.png",
      url: "http://wixstats.com/?a=13001&c=2149&s1=",
    },
    {
      name: "Upwork",
      category: "BUSINESS TOOLS",
      offer: "Pay $0 Till You Hire",
      description:
        "World's work marketplace connecting millions of businesses with independent talent.",
      image: "https://a.impactradius-go.com/display-ad/13634-1073970",
      url: "https://upwork.pxf.io/c/6492693/1073970/13634",
    },
    {
      name: "Easyship",
      category: "SHIPPING DEALS",
      offer: "Save On Shipping",
      description:
        "All-in-one shipping platform for cross-border shipping.",
      image:
        "https://cdn.prod.website-files.com/660e658c0cfb31720d893396/66c7122a289dc00863909820_Easyship%20Logo.svg",
      url: "https://easyship.ilbqy6.net/c/6492693/1597879/10435",
    },
    {
      name: "DocuSign",
      category: "BUSINESS TOOLS",
      offer: "DocuSign",
      description:
        "eSignature solution for preparing, signing, and managing agreements.",
      image:
        "https://docucdn-a.akamaihd.net/olive/images/2.72.0/global-assets/ds-logo-default.svg",
      url: "https://docusign.pxf.io/c/6492693/1874106/19450",
    },
    {
      name: "Marriott Bonvoy",
      category: "TRAVEL",
      offer: "Marriott Bonvoy",
      description:
        "Rewards program allowing members to purchase Bonvoy points for hotel stays.",
      image:
        "https://th.bing.com/th/id/OIP.PGh0KVKVBh4OTVLb-97N_gHaEK?w=283&h=180&c=7&r=0&o=7&pid=1.7&rm=3",
      url: "https://marriott.pxf.io/c/6492693/887284/4937",
    },
    {
      name: "JetBlue TrueBlue",
      category: "TRAVEL",
      offer: "JetBlue TrueBlue",
      description:
        "Program allowing members to purchase TrueBlue miles for award flights.",
      image:
        "https://tse4.mm.bing.net/th/id/OIP.7ilf_a9TYnCmUJuWfVUjIwHaBn?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
      url: "https://jetblue.jyeh.net/c/6492693/927607/4883",
    },
  ];

  return (
    <main className="w-full bg-white">
      <AllClientsBenefitPage deals={DEALS} />
      <Footer />
    </main>
  );
}
