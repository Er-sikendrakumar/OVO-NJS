'use client';

import React, { useState } from 'react'
import { motion } from "framer-motion";
import { Button } from '@/app/components/ui/button';
import { FeaturesBox } from '@/app/components/FeaturesBox';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import { FeaturesBoxLocations } from '@/app/components/FeaturesBoxLocations';

const businessAddressBg = "/business-address-bg_1761590800705.webp";
const receptionistCardBg = "/receptionist-card-bg_1761593285326.webp";
const cashHandsHoldingBg = "/cash-hands-holding_1761593304143.webp";
const multipleProfessionalsBg = "/multiple-professionals_1761593320843.webp";
const promoVideo = "/Opus VO - 45 Sec Promo - 1920x1080_1761681440103.mp4";
const playerCover = "/player-cover_1761748637474.webp";

// TypeScript interface for header data
interface LocationHeaderData {
    city: string;
    state: string;
    price: number;
    address: {
        line1: string;
        suite?: string;
        city: string;
        state: string;
        zip: string;
        phone: string;
    };
    images: {
        hero: string[];
    };
    features: {
        showMailX?: number;
    };
    addressOnlyOptionAvailable: number;
    addressOnlyUrl?: string;
    signupUrl: string;
}

const baseFeatures = [
    "Prestigious Business Address",
    "Professional Live Call Answering",
    "Personalized Call Transferring",
    "Business Phone/Fax Number",
    "Professional Mail Receipt",
    "Voicemail/Fax Converted to Email",
];

function LocationsHero({ data }: { data: LocationHeaderData }) {
    const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Handle showMailX flag - conditionally include last feature
    const includedFeatures = data?.features?.showMailX === 1
        ? baseFeatures
        : baseFeatures.slice(0, -1);

    // Handle addressOnlyOptionAvailable flag
    const addressOnlyCard = {
        bgClass: "bg-[linear-gradient(0deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%),linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(119,119,119,1)_100%)]",
        bgImage: businessAddressBg,
        text: data?.addressOnlyOptionAvailable === 1 ? "Address Only" : "In The News",
        hasButton: false,
        href: data?.addressOnlyOptionAvailable === 1
            ? (data?.addressOnlyUrl || "/prestigious-business-address/")
            : "/blog/category/in-the-news/",
    };

    const interactiveCards = [
        {
            bgClass:
                "bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(119,119,119,1)_100%),linear-gradient(0deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%)]",
            bgImage: receptionistCardBg,
            text: "Click to view demo",
            hasButton: true,
            href: undefined,
        },
        {
            bgClass:
                "bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(119,119,119,1)_100%)]",
            bgImage: cashHandsHoldingBg,
            text: "Bundle & Save",
            hasButton: false,
            href: "/cost-comparison/",
        },
        {
            bgClass:
                "bg-[linear-gradient(0deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.5)_100%),linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(119,119,119,1)_100%)]",
            bgImage: multipleProfessionalsBg,
            text: "Is a virtual office for me?",
            hasButton: false,
            href: "/is-a-virtual-office-for-me/",
        },
        addressOnlyCard,
    ];

    // Get hero images from data, fallback to placeholder if none
    const heroImages = data?.images?.hero && data.images.hero.length > 0
        ? data.images.hero
        : ["/new-york-aerial-view_1761593422460.webp"];

    // Format address
    const formatAddress = () => {
        if (!data?.address) return "";
        const { line1, suite, city, state, zip } = data.address;
        let address = line1;
        if (suite) address += `, ${suite}`;
        address += `\n${city}, ${state} ${zip}`;
        return address;
    };

    // Handle image carousel navigation
    const handlePreviousImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? heroImages.length - 1 : prev - 1
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === heroImages.length - 1 ? 0 : prev + 1
        );
    };

    // Get full image URL (handle both relative and absolute paths)
    const getImageUrl = (imagePath: string) => {
        if (!imagePath) return "/new-york-aerial-view_1761593422460.webp";
        // If already a full URL, return as-is
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
            return imagePath;
        }
        // Get base URL dynamically
        const baseUrl = typeof window !== 'undefined'
            ? (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
                ? 'https://njs.opusvirtualoffices.com'
                : `${window.location.protocol}//${window.location.host}`)
            : 'https://www.opusvirtualoffices.com';
        // For all other paths (including those starting with /), prepend base URL
        return `${baseUrl}${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`;
    };

    return (
        <section className="flex flex-col items-center w-full bg-basewhite pt-[72px] lg:pt-[104px]">
            <div className="flex flex-col w-full items-center gap-4 sm:gap-4 md:gap-4 px-0 py-6 sm:py-8 md:pb-10">
                <div className='flex flex-col lg:flex-row w-full lg:gap-[40px] gap-[8px] px-4 sm:px-6 md:px-8 max-w-screen-xl mx-auto'>
                    <div className='flex flex-col py-0 gap-[8px] w-full pb-[12px]'>
                        <div className='flex flex-row items-center gap-[8px]'>
                            <span className='font-inter font-semibold text-[14px] leading-[100%] text-[#717680]'>Locations</span>
                            <ChevronRight className='w-[16px] h-[16px] min-w-[16px] min-h-[16px] text-[]' />
                            <span className='font-inter font-semibold text-[14px] leading-[100%] tracking-[0] text-[#717680]'>{data?.state || ""}</span>
                            <ChevronRight className='w-[16px] h-[16px] min-w-[16px] min-h-[16px] text-[]' />
                            <span className='font-inter font-semibold text-[14px] leading-[100%] tracking-[0] text-[#026AA2]'>{data?.city || ""}</span>
                        </div>
                        <span className='font-inter font-medium lg:text-[36px] text-[20px] leading-[120%] tracking-[-2%]'>
                            Virtual office in <span className='font-bold text-[#36BFFA]'>{data?.city || ""}</span>
                        </span>
                        <span className='font-inter font-normal lg:text-[16px] text-[12px] text-[#475467] leading-[130%]'>
                            {data?.city || ""} Virtual Business Address & Live Receptionist Answering Service
                        </span>
                    </div>

                    <div className='flex flex-row items-center lg:gap-[32px] gap-[12px] justify-end'>
                        <Image src={'/locations/review-companies-1.svg'} alt='office building' width={130} height={46}
                            className='lg:w-[130px] lg:h-[46px] w-[76px] h-[24px]'
                        />
                        <Image src={'/locations/review-companies-2.svg'} alt='office building' width={130} height={46}
                            className='lg:w-[130px] lg:h-[46px] w-[76px] h-[24px]'
                        />
                        <Image src={'/locations/review-companies-3.svg'} alt='office building' width={130} height={46}
                            className='lg:w-[130px] lg:h-[46px] w-[76px] h-[24px]'
                        />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 md:gap-8 max-w-screen-xl w-full px-4 sm:px-6 md:px-8 py-0">
                    <motion.div
                        className="flex lg:flex-col flex-row flex-1 items-start justify-start h-full w-full max-w-[696px] overflow-hidden rounded-[16px]"
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0 }}
                    >
                        <div className='flex overflow-hidden relative lg:max-h-[400px] h-[214px] lg:h-[400px] w-full'>
                            {heroImages.length > 0 && (
                                <Image
                                    src={getImageUrl(heroImages[currentImageIndex])}
                                    alt={`${data?.city || ""} virtual office`}
                                    className='object-cover w-full h-full'
                                    fill
                                    unoptimized
                                />
                            )}
                            {heroImages.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePreviousImage}
                                        className='lg:flex hidden bg-white w-[36px] h-[36px] min-w-[36px] min-h-[36px] rounded-full items-center justify-center absolute left-[16px] top-1/2 -translate-y-1/2 z-10 hover:bg-gray-100 transition-colors'
                                        aria-label="Previous image"
                                    >
                                        <ChevronLeft className='w-[20px] h-[20px] min-w-[20px] min-h-[20px] text-[#414651]' />
                                    </button>
                                    <button
                                        onClick={handleNextImage}
                                        className='lg:flex hidden bg-white w-[36px] h-[36px] min-w-[36px] min-h-[36px] rounded-full items-center justify-center absolute right-[16px] top-1/2 -translate-y-1/2 z-10 hover:bg-gray-100 transition-colors'
                                        aria-label="Next image"
                                    >
                                        <ChevronRight className='w-[20px] h-[20px] min-w-[20px] min-h-[20px] text-[#414651]' />
                                    </button>
                                </>
                            )}

                            {heroImages.length > 1 && (
                                <div className='flex flex-row items-center gap-[12px] bg-white rounded-full p-[8px] absolute bottom-[16px] left-1/2 -translate-x-1/2 z-10'>
                                    {heroImages.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`w-[8px] h-[8px] min-w-[8px] min-h-[8px] rounded-full transition-colors ${index === currentImageIndex ? 'bg-[#0086C9]' : 'lg:bg-white bg-gray-300'
                                                }`}
                                            aria-label={`Go to image ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col bg-[#36BFFA] min-h-[214px] lg:min-h-fit lg:px-[32px] px-[12px] py-[12px] justify-between lg:gap-[8px] gap-[12px] w-full'>
                            <div className='flex flex-row items-center w-full justify-between gap-[16px]'>
                                <span className='font-inter font-semibold lg:text-[36px] text-[14px] leading-[120%] tracking-[-2%] text-white'>
                                    {data?.city || ""}, {data?.state || ""}
                                </span>
                                <div className='lg:flex hidden flex-row items-center gap-[4px]'>
                                    <Star fill='white' className='w-[20px] h-[20px] min-w-[20px] min-h-[20px] text-white' />
                                    <Star fill='white' className='w-[20px] h-[20px] min-w-[20px] min-h-[20px] text-white' />
                                    <Star fill='white' className='w-[20px] h-[20px] min-w-[20px] min-h-[20px] text-white' />
                                    <Star fill='white' className='w-[20px] h-[20px] min-w-[20px] min-h-[20px] text-white' />
                                    <Star fill='white' className='w-[20px] h-[20px] min-w-[20px] min-h-[20px] text-white' />
                                </div>
                            </div>

                            <div className='flex lg:flex-row flex-col items-center w-full justify-between gap-[12px]'>
                                <span className='font-inter lg:font-semibold font-normal lg:text-[18px] text-[12px] text-white leading-[130%] tracking-[0] w-full whitespace-pre-line'>
                                    {formatAddress()}
                                    {data?.address?.phone && `\n${data.address.phone}`}
                                </span>
                                <div className='flex-row items-end lg:flex hidden'>
                                    <span className='font-inter font-bold text-[48px] leading-[100%] tracking-[-2%] text-white'>
                                        ${data?.price || 99}
                                    </span>
                                    <span className='font-inter font-bold text-[36px] leading-[100%] tracking-[-2%] text-white'>/mo</span>
                                </div>

                                <div className='lg:hidden flex flex-row items-center justify-between w-full'>
                                    <div className='flex flex-row items-center gap-[1.6px]'>
                                        <Star fill='white' className='w-[8.8px] h-[8.8px] min-w-[8.8px] min-h-[8.8px] text-white' />
                                        <Star fill='white' className='w-[8.8px] h-[8.8px] min-w-[8.8px] min-h-[8.8px] text-white' />
                                        <Star fill='white' className='w-[8.8px] h-[8.8px] min-w-[8.8px] min-h-[8.8px] text-white' />
                                        <Star fill='white' className='w-[8.8px] h-[8.8px] min-w-[8.8px] min-h-[8.8px] text-white' />
                                        <Star fill='white' className='w-[8.8px] h-[8.8px] min-w-[8.8px] min-h-[8.8px] text-white' />
                                    </div>

                                    <div className='flex-row items-end flex'>
                                        <span className='font-inter font-bold lg:text-[48px] text-[20px] leading-[100%] tracking-[-2%] text-white'>
                                            ${data?.price || 99}
                                        </span>
                                        <span className='font-inter font-bold lg:text-[36px] text-[20px] leading-[100%] tracking-[-2%] text-white'>/mo</span>
                                    </div>
                                </div>
                            </div>

                            <a
                                href={data?.signupUrl || "#"}
                                className='lg:hidden text-nowrap flex py-[8px] px-[12px] w-full items-center text-[#414651] justify-center text-center rounded-[8px] bg-white
                            font-inter font-semibold text-[14px] leading-[100%] tracking-[0] transition-colors border border-[#D5D7DA]'>
                                Select this location
                            </a>
                        </div>
                    </motion.div>

                    <div className="flex lg:w-full flex-col justify-between gap-[56px] w-full max-w-[488px]">
                        <FeaturesBoxLocations features={includedFeatures} />

                        <span className='font-inter font-normal text-[20px] leading-[120%] text-[#475467]'>
                            All for only <span className='text-[#0086C9]'>${data?.price || 99}</span>/month
                        </span>

                        <a
                            href={data?.signupUrl || "#"}
                            className='lg:flex hidden py-[16px] px-[32px] w-full items-center justify-center text-center rounded-[8px] bg-[#36BFFA] text-white
                            font-inter font-semibold text-[18px] leading-[100%] tracking-[0] hover:bg-[#2ea8d9] transition-colors'>
                            Select This Location
                        </a>
                    </div>
                </div>

                <div className="flex flex-col items-start justify-center gap-2 w-full">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 max-w-[1280px] w-full px-4 sm:px-6 md:px-8 mx-auto">
                        {interactiveCards.map((card, index) => {
                            const cardContent = (
                                <motion.div
                                    className={`flex items-end gap-2 ${card.bgClass} flex-1 h-full rounded-xl overflow-hidden shadow-shadows-shadow-lg relative bg-cover bg-center cursor-pointer`}
                                    style={card.bgImage ? { backgroundImage: `url(${card.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
                                    whileHover={{ scaleY: 1.1, scaleX: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={card.hasButton ? () => setIsVideoDialogOpen(true) : undefined}
                                >
                                    {card.bgImage && (
                                        <motion.div
                                            className="absolute inset-0 z-0"
                                            style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.5) 100%), linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(119,119,119,1) 100%)' }}
                                            initial={{ opacity: 1 }}
                                            whileHover={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-center h-[42px] px-2 z-10">
                                        <p className="font-text-sm-text-md-bold font-[number:var(--text-sm-text-md-bold-font-weight)] text-[#ffffff] text-[length:var(--text-sm-text-md-bold-font-size)] text-center tracking-[var(--text-sm-text-md-bold-letter-spacing)] leading-[var(--text-sm-text-md-bold-line-height)] [font-style:var(--text-sm-text-md-bold-font-style)] text-xs sm:text-sm">
                                            {card.text}
                                        </p>
                                    </div>
                                    {card.hasButton && (
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+4px)] w-[68px] h-[68px] bg-[#00000000] rounded-[100000000px] backdrop-blur-[2.0px] backdrop-brightness-[110%] [-webkit-backdrop-filter:blur(2.0px)_brightness(110%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)] z-10">
                                            <img
                                                className="w-full h-full"
                                                alt="Button"
                                                src="/figmaAssets/button.svg"
                                                width="68"
                                                height="68"
                                                loading="eager"
                                            />
                                        </div>
                                    )}
                                </motion.div>
                            );

                            return (
                                <div
                                    key={index}
                                    className={`flex w-full items-start h-[130px] ${index === 0 ? 'hidden sm:flex' : ''}`}
                                    data-testid={`card-interactive-${index}`}
                                >
                                    {card.href ? (
                                        <a href={card.href} className="flex flex-1 h-full">
                                            {cardContent}
                                        </a>
                                    ) : (
                                        cardContent
                                    )}
                                </div>
                            );
                        })}

                        <div
                            className="flex w-full items-start h-[130px]"
                            data-testid="card-pricing"
                        >
                            <a href="/signup/?btn=902" className="flex flex-1 h-full">
                                <motion.div
                                    className="flex items-end gap-2 bg-[linear-gradient(180deg,rgba(54,191,250,1)_0%,rgba(3,137,209,1)_100%),linear-gradient(0deg,rgba(54,191,250,1)_0%,rgba(54,191,250,1)_100%)] flex-1 h-full rounded-xl overflow-hidden shadow-shadows-shadow-lg relative cursor-pointer group"
                                    initial="rest"
                                    whileHover="hover"
                                    variants={{
                                        rest: { scaleY: 1, scaleX: 1, },
                                        hover: { scaleY: 1.1, scaleX: 1.1 }
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div
                                        className="absolute top-0 inset-x-0 flex items-center justify-center pt-3"
                                        variants={{
                                            rest: { opacity: 1 },
                                            hover: { opacity: 1 }
                                        }}
                                    >
                                        <p className="font-medium text-[#ffffff] text-xs sm:text-sm text-center tracking-[0] leading-normal whitespace-nowrap">
                                            ALL-INCLUSIVE
                                        </p>
                                    </motion.div>

                                    {/* Mobile version - always visible */}
                                    <div className="lg:hidden absolute inset-0 flex flex-col items-center justify-center gap-1">
                                        <p className="font-bold text-[#ffffff] text-center tracking-[-0.96px] whitespace-nowrap text-4xl">
                                            $99/mo
                                        </p>
                                        <p className="font-medium text-[#ffffff] text-center tracking-[0] leading-normal whitespace-nowrap text-xs">
                                            No Hidden Fees
                                        </p>
                                    </div>

                                    {/* Desktop version - hover animation */}
                                    <motion.div
                                        className="hidden lg:flex absolute top-[24px] left-0 right-0 bottom-[42px] flex-col items-center justify-center"
                                        variants={{
                                            rest: { gap: 1, },
                                            hover: { gap: 12 }

                                        }}

                                        transition={{ duration: 0.3 }}
                                    >
                                        <motion.p
                                            className="font-bold text-[#ffffff] text-center tracking-[-0.96px] whitespace-nowrap text-[48px]"
                                            variants={{
                                                rest: { y: 0 },
                                                hover: { y: 4 }
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            $99/mo
                                        </motion.p>
                                        <motion.p
                                            className="font-medium text-[#ffffff] text-center tracking-[0] leading-normal whitespace-nowrap text-sm"
                                            variants={{
                                                rest: { opacity: 0, height: "0px", y: 0 },
                                                hover: { opacity: 1, height: "auto", y: -4 }
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            NO HIDDEN FEES
                                        </motion.p>
                                    </motion.div>

                                    <motion.div
                                        className="absolute inset-x-0 bottom-0 flex items-center justify-center h-[42px] px-2"
                                        variants={{
                                            rest: { opacity: 1 },
                                            hover: { opacity: 1 }
                                        }}
                                    >
                                        <p className="font-text-sm-text-md-bold font-[number:var(--text-sm-text-md-bold-font-weight)] text-[#ffffff] text-[length:var(--text-sm-text-md-bold-font-size)] text-center tracking-[var(--text-sm-text-md-bold-letter-spacing)] leading-[var(--text-sm-text-md-bold-line-height)] [font-style:var(--text-sm-text-md-bold-font-style)] text-xs sm:text-sm">
                                            Sign Up Now
                                        </p>
                                    </motion.div>
                                </motion.div>
                            </a>
                        </div>
                    </div>

                    <div
                        className="sm:hidden w-full px-4 sm:px-6 md:px-8 mx-auto max-w-[1280px] flex flex-col items-center gap-3"
                        data-testid="video-promo-mobile"
                    >
                        <video
                            className="w-full rounded-xl shadow-shadows-shadow-lg"
                            controls
                            preload="none"
                            poster={playerCover}
                        >
                            <source src={promoVideo} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <p className="font-semibold text-gray-600 text-center">
                            Click to view demo
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LocationsHero