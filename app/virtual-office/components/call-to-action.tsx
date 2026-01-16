'use client';

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface CallToActionProps {
    cityName: string;
    locId: string;
    price?: number;
}

const man_holding_tablet = "/man-holding-tablet.webp";

function CallToAction({ cityName, locId, price = 99 }: CallToActionProps) {
    const signupUrl = `/signup/?btn=4&locid=${locId}`;

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
                .free-ebook-main.wrapper-ebook-main {
                    align-items: center;
                    border-radius: 16px;
                    background: url(/vos-cta-bg-dsk.webp) center center / cover no-repeat, #fff;
                    box-shadow: 0 4px 8px -2px rgba(16, 24, 40, 0.10), 0 2px 4px -2px rgba(16, 24, 40, 0.06);
                }
                .free-ebook-main.wrapper-ebook-main .ebook-left {
                    display: flex;
                    padding: 20px 64px;
                    max-width: 767px;
                    width: 100%;
                }
                .free-ebook-main.wrapper-ebook-main .ebook-left-one {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    align-items: flex-start;
                    justify-content: center;
                    padding-right: 30px;
                }
                .heading-ebook p {
                    color: #475467;
                }
                .loc-wrapper-ebook-btn {
                    width: 100%;
                    max-width: 600px;
                }
                .loc-wrapper-ebook-btn a {
                    padding: 16px 22px;
                    width: 100%;
                    font-size: 18px;
                    font-style: normal;
                    font-weight: 600;
                    line-height: 28px;
                    height: 60px;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }
                .free-ebook-main.wrapper-ebook-main .ebook-right-img {
                    padding-top: 0;
                }
                .free-ebook-main.wrapper-ebook-main .ebook-right-img img {
                    width: auto;
                    max-width: 500px;
                }
                @media (max-width: 767px) {
                    .free-ebook-main.wrapper-ebook-main {
                        border-radius: 16px;
                        background: url(/vos-mobile.webp) center center / cover no-repeat, #fff;
                        box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.10), 0px 2px 4px -2px rgba(16, 24, 40, 0.06);
                    }
                    .free-ebook-main.wrapper-ebook-main .ebook-left {
                        padding: 20px 16px 20px 14px !important;
                        margin-bottom: 0;
                    }
                    .free-ebook-main.wrapper-ebook-main .ebook-right-img {
                        padding-top: 20px;
                    }
                    .free-ebook-main.wrapper-ebook-main .ebook-right-img img {
                        width: 316px;
                    }
                    .loc-wrapper-ebook-btn a {
                        padding: 8px 12px;
                        font-size: 14px;
                        line-height: 20px;
                        height: 36px;
                    }
                    .free-ebook-main.wrapper-ebook-main .heading-ebook h2 {
                        letter-spacing: -0.72px;
                        text-align: center;
                    }
                    .heading-ebook p {
                        text-align: center;
                    }
                }
            `
            }} />
            <div className="max-w-screen-xl mx-auto py-[30px] px-4 sm:px-6 md:px-8">
                <div className="free-ebook-main wrapper-ebook-main flex flex-col md:flex-row">
                    {/* Left side - Content */}
                    <div className="ebook-left">
                        <div className="ebook-left-one">
                            <div className="heading-ebook flex flex-col gap-[12px]">
                                <h2 className="font-semibold text-[#101828] lg:text-[36px] text-[30px] leading-[120%] tracking-[-0.72px]">
                                    Establish your business presence in {cityName}
                                </h2>
                                <p className="font-normal lg:text-[20px] text-[18px] leading-[140%] tracking-[0] text-[#535862]">
                                    All-Inclusive Virtual Office Services for <strong>Only ${price}</strong>
                                </p>
                            </div>
                            <div className="loc-wrapper-ebook-btn">
                                <Link
                                    href={signupUrl}
                                    className="btn-brand-blue bg-[#0086C9] hover:bg-[#026AA2] text-white rounded-lg transition-colors"
                                >
                                    Get started with this location
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Image */}
                    <div className="ebook-right-img flex items-center justify-center">
                        <Image
                            src="/vos-cta-img.webp"
                            alt="Call to Action"
                            width={500}
                            height={500}
                            className="w-full h-[300px]"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CallToAction