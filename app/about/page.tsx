import Link from "next/link";
import { headers } from "next/headers";
import { Footer } from "../components/Footer";
import Padding from "../components/ui/Padding";

const stats = [
    "650+ Locations",
    "Across the U.S. and Canada",
    "75K+ Clients Served",
    "Founded in 2010",
];

const timelineSections = [
    {
        heading: "Opus Virtual Offices",
        subheading: "Who Are We? ",
        body: "Opus Virtual Offices, is the complete office solutions company that has been taking care of your business needs since 2010. Headquartered at 1875 NW Corporate Blvd, Suite 300, Boca Raton, FL 33431. We have offices in over 650 locations throughout the U.S. and Canada, with locations in the top tier markets, such as Miami, L.A., Chicago, N.Y. and more. Wherever your business growth and development takes you, we've got you covered.",
    },
    {
        heading: "How We Started",
        subheading: "A Virtual Office Company That Does More.",
        body: "The concept was a virtual office, what followed after that was the complete office solution. Our CEO saw a void in the marketplace for businesses of varying sizes. Wanting to level the playing field, so everyone has the opportunity to chase their dreams, he created unique office solution packages to satisfy varying business needs. The driving force of Opus Virtual Offices is our client, and serving them best is what makes us exceptional.",
    },
    {
        heading: "Our Shared Passion for Your Future",
        subheading: "Empowering Your Business Journey",
        body: "As a company we are committed to your growth and success. That's why we created different tiered service packages, such as our complete virtual office solution, the Opus Virtual Mailing Address, and our Live Call Answering Service. Whatever your needs are we have a service that fits the bill. Grow your company, expand into new markets, capture more leads and close more deals with Opus Virtual Offices.",
    },
    {
        heading: "Why Choose Opus Virtual Offices?",
        subheading: "We're your partner for success.",
        body: "With a prestigious business address and your own dedicated receptionist, you can establish and grow your company the way you want. Choose our premium all-inclusive virtual office solution for only $99/mo and you get unlimited live call answering and call forwarding, a prestigious physical business address with complete mail management services via our proprietary Mail-X app, a dedicated business line with up to four extensions, meeting room access on an as needed basis for a low hourly fee and much more. Our friendly team is always on hand to assist you.",
    },
];

export default async function AboutPage() {
    // Get current hostname for dynamic icon URLs
    const headersList = await headers();
    const host = headersList.get('host') || 'www.opusvirtualoffices.com';
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const baseUrl = `${protocol}://${host}`;

    const cards = [
        {
            title: "Our Mission",
            icon: `${baseUrl}/newsite/wp-content/uploads/2024/07/target.svg`,
            description:
                "We champion the idea that entrepreneurs deserve the freedom to shape their business in ways that suit them best. We offer adaptable, risk minimized solutions for building a business that's not only credible and marketable, but also agile. Our commitment is to empower contemporary businesses with the flexibility they need and want. We provide cost effective office solutions, exceptional service, and a wide range of locations, all tailored to fit your unique business needs.",
        },
        {
            title: "Our Vision",
            icon: `${baseUrl}/newsite/wp-content/uploads/2024/07/eye.svg`,
            description: "Embracing flexibility, we envision a work style that enriches your life. Our goal is to empower professionals and businesses of all size, giving them the liberty and resources to succeed from anywhere. We're dedicated to facilitating remote work, fostering a positive work life balance, and ensuring productivity wherever you are, all the while creating a professional image for your business.",
        },
    ];

    return (
        <div className="bg-white pt-[72px] lg:pt-[104px]">
            {/* Hero */}
            <section className="py-5 lg:py-[40px]">
                <div className="max-w-[1280px] px-[16px] lg:px-0 mx-auto flex flex-col lg:flex-row gap-12 lg:gap-10 items-start">
                    <div className="max-w-full lg:max-w-[620px] py-2 lg:p-2">
                        <h1
                            className="text-[48px] leading-[60px] mb-6 font-semibold text-[#2E323C] translate-[-0.93px] lg:tracking-[-0.96px] "
                            style={{ fontFamily: "Inter, var(--inter-font)" }}
                        >
                            LEARN MORE ABOUT
                            OPUS VIRTUAL OFFICES
                        </h1>
                        <p className="text-[#3e465a] text-[16px] leading-[24px] lg:text-[18px] lg:leading-[28px] w-full">
                            We offer the complete office solution you need to grow your company, expand your reach and establish a
                            strong business presence.
                        </p>
                        <div className="flex flex-wrap items-center gap-2 lg:gap-2 py-4 text-sm font-semibold text-[#3E465A]">
                            {stats.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 lg:gap-2 ps-0">
                                    <span className="text-[14px] leading-5">{item}</span>
                                    {idx !== stats.length - 1 && (
                                        <span className="text-[#D9D9D9] w-[2px]">|</span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className=" ">
                            <h2 className="text-[20px] leading-[30px] pb-2 font-semibold text-[#3e465a]">The Premier Virtual Office Provider</h2>
                            <p className="text-[#3e465a] text-[16px] leading-[24px] lg:text-[18px] lg:leading-[28px] w-full font-normal tracking-[-0.1px] lg:tracking-[-0.01px]">
                                Charting the course for a flexible work tomorrow. We are dedicated to enhancing the success of remote companies, small businesses and home-based professionals. Our approach enables entrepreneurs to function with adaptability, reduced overhead and foster sustainable growth. Crafting a future where work flexibility is not just a concept, but a reality.
                            </p>
                        </div>
                    </div>

                    <div className="relative rounded-sm overflow-hidden bg-[url('/Frame-280.webp')] bg-cover bg-center bg-no-repeat  max-w-full lg:max-w-[620px] w-full">
                        <div className="relative flex flex-col gap-6 px-4 py-4 lg:px-8 lg:py-6">
                            {cards.map((card) => (
                                <div
                                    key={card.title}
                                    className="bg-white shadow-[0_12px_30px_rgba(0,0,0,0.08)] rounded-xl px-6 py-6 lg:px-6 lg:py-4 flex flex-col gap-[8px]"
                                >
                                    <div className="flex items-left gap-5 flex-col">
                                        <img src={card.icon} alt="" className="h-9 w-9" />
                                        <h3 className="text-2xl font-semibold text-[#1f2937] pb-[6px]">{card.title}</h3>
                                    </div>
                                    <div className="w-14 h-[3px] bg-[#065986]" />
                                    <p className="text-[#2E323C] text-[16px] leading-[24px] lg:text-[18px] lg:leading-[28px] tracking-[-.01px] lg:tracking-[-0.05px]">{card.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Locations Banner */}
            <section className="bg-[#065986] text-white py-10 px-4 lg:px-0">
                <div className="max-w-[1280px] px-8 mx-auto text-center ">
                    <h3 className="text-[36px] font-semibold leading-[44px] pb-5 tracking-[-0.72px]">650+ LOCATIONS</h3>
                    <p className="max-w-3xl mx-auto text-[16px] leading-[24px] lg:text-[20px] lg:leading-[30px] pb-8 text-[#B9E6FE] font-normal">
                        Our network is home to 650+ virtual office locations throughout the U.S. and Canada, with offices in top tier
                        markets, such as Miami, L.A., Chicago and N.Y. When you choose Opus Virtual Offices you choose success.
                    </p>
                    <div className="flex justify-center">
                        <Link href="/virtual-office/" className="inline-flex items-center justify-center gap-[6px] py-[12px] px-[18px] rounded-[8px] border border-[#D0D5DD] bg-white text-[#344054] font-inter font-semibold text-[16px] leading-[24px] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] hover:bg-[#f9fafb]">See Locations</Link>
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className="pt-5 lg:pt-10 pb-[20px] lg:pb-[40px]">
                <div className="max-w-[1280px] px-8 mx-auto flex flex-col gap-8 pb-0 lg: lg:pb-[84px]">
                    {timelineSections.map((section) => (
                        <div key={section.heading} className="pb-[0px]">
                            <h2 className="text-[30px] lg:text-[30px] leading-[38px] lg:leading-[38px] font-semibold text-[#2E323C] pb-[12px] tracking-[-0.1px] lg:tracking-normal">{section.heading}</h2>
                            <p className="text-[18px] font-semibold text-[#3E465A] leading-[28px] pb-[16px]">{section.subheading}</p>
                            <p className="text-[16px] lg:text-[18px] text-[#3E465A] leading-[24px] lg:leading-[28px] w-full">{section.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pricing Banner */}
            <section className="bg-[#065986] text-white py-5 lg:py-10 px-8 lg:px-8">
                <div className="max-w-[932px] m-auto flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-4 lg:gap-8 px-4 lg:px-0">
                    <h3 className="text-[48px] md:text-[48px] lg:text-[40px] xl:text-[48px] leading-[60px] tracking-[0.96px] md:leading-[60px] lg:leading-[56px] font-semibold text-center lg:text-left flex flex-col lg:flex-row gap-0 lg:gap-5">
                        All-Inclusive <span className="text-[48px] text-[#B9E6FE] leading-[60px] tracking-[-0.96px]">No hidden Fees</span>
                    </h3>
                    <Link
                        href="/virtual-office/"
                        className=" inline-flex text-[16px] leading-[24px] items-center justify-center rounded-md bg-white text-[#344054] tracking-[-0.96px] font-semibold py-[12px] px-[18px] shadow-sm hover:bg-[#f9fafb]"
                    >
                        See Locations
                    </Link>
                </div>
            </section>
            <Footer />
        </div>
    );
}