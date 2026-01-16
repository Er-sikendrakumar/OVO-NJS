"use client";

import { useState } from "react";
import Link from "next/link";

const linkReplacements = [
  {
    token: "Compare the two \u00BB",
    fallbackToken: "Compare the two",
    href: "/blog/virtual-business-address-vs-po-box-whats-best-for-your-llc/",
    text: "Compare the two \u00BB",
  },
  {
    token: "Step-by-step guide here \u00BB",
    fallbackToken: "Step-by-step guide here",
    href: "https://www.opusvirtualoffices.com/",
    text: "Step-by-step guide here \u00BB",
  },
  {
    token: "Here's how it helps scale \u00BB",
    fallbackToken: "Here's how it helps scale",
    href: "/blog/why-virtual-offices-are-revolutionizing-business-operations-for-entrepreneurs-in-los-angeles-miami-and-houston/",
    text: "Here's how it helps scale \u00BB",
  },
  {
    token: "Here's how it works \u00BB",
    fallbackToken: "Here's how it works",
    href: "/blog/why-local-seo-matters-how-a-virtual-office-can-boost-your-online-visibility/",
    text: "Here's how it works \u00BB",
  },
  {
    token: "Learn more \u00BB",
    fallbackToken: "Learn more",
    href: "/blog/can-i-use-a-virtual-address-for-llc-registration/",
    text: "Learn more \u00BB",
  },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "What is a virtual business address, and how does it work?",
    answer:
      "A virtual business address is a real, physical mailing address that businesses can use without maintaining a permanent office space. It provides a professional presence, allowing companies to receive mail, register their business, and enhance credibility while working remotely.",
  },
  {
    question: "Is a virtual business address legal for LLC registration?",
    answer:
      "Yes. Opus addresses are real commercial locations that meet state and IRS requirements. Learn more Â»",
  },
  {
    question:
      "Can I use a virtual business address for my Google Business Profile and local SEO?",
    answer:
      "Yes--many Opus clients use their virtual address to improve local SEO and verify their Google Business profile. Here's how it works Â»",
  },
  {
    question: "How does mail handling work with a virtual business address?",
    answer:
      "Your mail is received securely at your selected location. We notify you of arrivals and offer forwarding, scanning, or pickup options.",
  },
  {
    question:
      "What's the difference between a virtual business address and a P.O. Box?",
    answer:
      "A virtual business address is a real street address in a commercial building--P.O. Boxes are not acceptable for business registration, licensing, or Google verification. Compare the two »",
  },
  {
    question: "Can I receive packages at my virtual business address?",
    answer:
      "Yes, most locations accept packages. You can also opt for mail forwarding, scanning, or custom handling.",
  },
  {
    question:
      "Is a virtual business address suitable for remote entrepreneurs and freelancers?",
    answer:
      "Absolutely. A virtual business address gives your company that professional feel. It protects your privacy and keeps your home address off public records.",
  },
  {
    question:
      "How does a virtual business address help with business expansion and scalability?",
    answer:
      "A virtual office allows you to expand into new markets without physical office space. It also supports hiring in different states by giving you a presence in key regions. Here's how it helps scale Â»",
  },
  {
    question: "Are virtual business addresses secure and compliant?",
    answer:
      "Yes. Opus enforces strict identity verification and mail handling policies to prevent misuse.",
  },
  {
    question: "How do I get started with a virtual business address from Opus?",
    answer:
      "It’s easy. Choose your city, sign up online in minutes, and start using your new address right away for registrations, websites, and marketing. Step-by-step guide here »",
  },
];

const leftFaqs = faqs.slice(0, 5);
const rightFaqs = faqs.slice(5);

export default function FaqAllVirtualBusinessAddress() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const normalizeAnswer = (answer: string) =>
    answer
      .replace(/\u00C2\u00BB/g, "\u00BB")
      .replace(/A\u017B/g, "\u00BB")
      .replace(/\u017B/g, "\u00BB");
  const renderAnswer = (answer: string) => {
    const normalized = normalizeAnswer(answer);
    const replacement = linkReplacements.find(
      (item) =>
        normalized.includes(item.token) ||
        normalized.includes(item.fallbackToken)
    );

    if (!replacement) {
      return normalized;
    }

    const match = normalized.includes(replacement.token)
      ? replacement.token
      : replacement.fallbackToken;
    const [before, after] = normalized.split(match);
    return (
      <>
        {before}
        <Link href={replacement.href} className="text-[#475467] underline">
          {replacement.text}
        </Link>
        {after}
      </>
    );
  };

  const renderFaqColumn = (items: typeof faqs, offset: number) => (
    <div className="flex flex-col gap-6">
      {items.map((faq, index) => {
        const itemIndex = offset + index;
        const isOpen = openIndex === itemIndex;
        const isLastItem = index === items.length - 1;
        return (
          <div
            key={faq.question}
            className={`${
              isLastItem ? "border-b-0" : "border-b border-[#EAECF0] pb-8"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : itemIndex)}
              className="flex w-full items-start justify-between gap-6 text-left"
            >
              <h4 className="text-[#101828] font-inter text-[18px] font-medium leading-[28px]">
                {faq.question}
              </h4>
              <span className="mt-[2px] shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                    stroke="#98A2B3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {!isOpen && (
                    <path
                      d="M12 8V16"
                      stroke="#98A2B3"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </svg>
              </span>
            </button>
            {isOpen && (
              <p className="mt-2 text-[#475467] font-inter text-[16px] font-normal leading-[24px] max-w-[calc(100%-48px)]">
                {renderAnswer(faq.answer)}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-4 py-10 sm:px-8">
        <h2 className="text-[#101828] font-inter text-[36px] font-semibold leading-[44px] tracking-[-0.72px]">
          Frequently Asked Questions
        </h2>

        <div className="grid gap-[62px] md:grid-cols-2">
          {renderFaqColumn(leftFaqs, 0)}
          {renderFaqColumn(rightFaqs, leftFaqs.length)}
        </div>
      </div>
    </section>
  );
}
