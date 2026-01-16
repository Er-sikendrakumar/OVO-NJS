import React from "react";
import Link from "next/link";

interface CTASectionProps {
    href: string;
    text: string;
}

// Format text to make CAPS words and price bold
const formatText = (text: string) => {
    // Split by words and process
    const parts = text.split(/(\b[A-Z]{2,}\b|\$\d+\/mo)/g);

    return parts.map((part, index) => {
        // Check if it's all caps (2+ letters) or a price like $99/mo
        if (/^[A-Z]{2,}$/.test(part) || /^\$\d+\/mo$/.test(part)) {
            return <span key={index} className="font-bold">{part}</span>;
        }
        return part;
    });
};

const PremiumSection: React.FC<CTASectionProps> = ({ href, text }) => {
    return (
        <div className="hidden md:flex w-full justify-center py-10 px-8 max-w-[1280px] m-0">
            <Link
                href={href}
                className="
          w-full
          max-w-[1280px]
         rounded-[12px] bg-[linear-gradient(63deg,#065986_16.72%,#0086C9_83.39%)] shadow-[0_12px_16px_-4px_rgba(16,24,40,0.08),_0_4px_6px_-2px_rgba(16,24,40,0.03)] p-[12px] text-[20px] leading-[30px] text-center text-white md:text-[18px] lg:text-[20px] md:leading-[28px] lg:leading-[30px]"
            >
                <span className="font-bold underline">CLICK HERE</span>{" "}
                <span className="font-light">
                    {formatText(text)}
                </span>
            </Link>
        </div>
    );
};

export default PremiumSection;
