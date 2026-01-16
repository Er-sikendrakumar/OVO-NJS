"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CityLocationHeroProps {
  city: string;
  state: string;
  stateAbbrev: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
  };
  price: string;
  image?: string;
  companyName?: string;
}

export default function CityLocationHero({
  city,
  state,
  stateAbbrev,
  address,
  price,
  image,
  companyName = "Web Design Agency",
}: CityLocationHeroProps) {
  const features = [
    "Prestigious Business Address",
    "Professional Live Call Answering",
    "Personalized Call Transferring",
    "Business Phone/Fax Number",
    "Professional Mail Receipt",
    "Voicemail/Fax Converted to Email",
    "Digital Mail Notifications by Mail X",
  ];

  return (
    <div className="w-full bg-basewhite">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="max-w-[1440px] mx-auto px-8 xl:px-16 py-8">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-8">
            {/* Left: Breadcrumbs & Title */}
            <div className="flex-1">
              {/* Breadcrumbs */}
              <nav className="flex items-center gap-2 mb-4">
                <Link
                  href="/"
                  className="text-sm font-semibold text-gray-600 hover:text-blue-light700 transition-colors"
                >
                  Opus Virtual Offices
                </Link>
                <ChevronRight className="w-4 h-4 text-gray-600" />
                <Link
                  href="/virtual-office/"
                  className="text-sm font-semibold text-gray-600 hover:text-blue-light700 transition-colors"
                >
                  Locations
                </Link>
                <ChevronRight className="w-4 h-4 text-gray-600" />
                <Link
                  href={`/virtual-office/${state.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm font-semibold text-gray-600 hover:text-blue-light700 transition-colors"
                >
                  {state}
                </Link>
                <ChevronRight className="w-4 h-4 text-gray-300" />
                <span className="text-sm font-semibold text-blue-light700">
                  {city}
                </span>
              </nav>

              {/* Title */}
              <h1 className="text-4xl font-medium text-gray-900 mb-3">
                Virtual office in {city}
              </h1>
              <p className="text-base text-gray-600">
                {city} Virtual Business Address & Live Receptionist Answering
                Service
              </p>
            </div>

            {/* Right: Review Badges */}
            <div className="flex items-center gap-8 ml-8">
              {/* BBB - 131×46px */}
              <img
                src="/locations/review-companies-1.svg"
                alt="BBB Accredited Business"
                className="h-12 w-auto"
              />
              {/* Trustpilot - 97×47px */}
              <img
                src="/locations/review-companies-2.svg"
                alt="Trustpilot Reviews"
                className="h-12 w-auto"
              />
              {/* Google - 129×41px */}
              <img
                src="/locations/review-companies-3.svg"
                alt="Google Reviews"
                className="h-10 w-auto"
              />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-2 gap-8">
            {/* Left Column: Image with Location Card Inside */}
            <div className="flex flex-col">
              {/* Image with Attribution Card Container */}
              <div className="flex flex-col rounded-2xl overflow-hidden">
                {/* Image */}
                <div className="relative w-full h-[400px] bg-gray-100">
                  {image ? (
                    <img
                      src={image}
                      alt={`${city} virtual office location`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-400">Location Image</span>
                    </div>
                  )}
                </div>

                {/* Location Attribution Card - INSIDE image container */}
                <div className="bg-blue-light400 px-8 py-3 flex flex-col gap-2">
                  {/* City Name and Stars Row */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-4xl font-semibold text-basewhite">
                      {city}, {stateAbbrev}
                    </h3>
                    {/* 5 Star Rating */}
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-5 h-5 text-basewhite fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* Address and Price Row */}
                  <div className="flex justify-between items-end">
                    {/* Address - Multi-line, left-aligned */}
                    <div className="flex flex-col text-sm text-basewhite leading-snug">
                      <span>{address.street}</span>
                      <span>
                        {address.city} {address.state}
                        {address.zip}
                      </span>
                      <span>{address.phone}</span>
                    </div>

                    {/* Price - Right side */}
                    <p className="text-5xl font-bold text-basewhite">{price}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Features List */}
            <div className="flex flex-col justify-between items-start min-w-[480px] h-[560px]">
              {/* Features-list - VERTICAL, itemSpacing: 12px, NO background/border/padding */}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-3 max-w-[213px]">
                  When We Say All-Inclusive,  We Mean ALL-INCLUSIVE:
                </h3>

                {/* Frame 426 - 7 features with 12px spacing */}
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-blue-light400"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <span className="text-lg text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* "All for only" - Text with styled $99, width: 356px, layoutAlign: INHERIT */}
              <p className="text-xl text-gray-700 w-[356px]">
                All for only{" "}
                <span className="font-bold" style={{ color: "#0086C9" }}>
                  $99
                </span>
                /month
              </p>

              {/* Button - Full width (488px), layoutAlign: STRETCH */}
              <button className="w-full bg-blue-light400 hover:bg-blue-light700 text-basewhite font-semibold text-lg py-4 px-[22px] rounded-lg transition-colors">
                Select This Location
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="px-4 py-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-4 overflow-x-auto">
            <Link
              href="/virtual-office/"
              className="text-sm font-semibold text-gray-600 hover:text-blue-light700 transition-colors whitespace-nowrap"
            >
              Locations
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-600 flex-shrink-0" />
            <Link
              href={`/virtual-office/${state.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm font-semibold text-gray-600 hover:text-blue-light700 transition-colors whitespace-nowrap"
            >
              {state}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
            <span className="text-sm font-semibold text-blue-light700 whitespace-nowrap">
              {city}
            </span>
          </nav>

          {/* Hero Section */}
          <div className="mb-6">
            <h1 className="text-xl font-medium text-gray-900 mb-2">
              Virtual office in {city}
            </h1>
            <p className="text-xs text-gray-600 mb-4">
              {city} Virtual Business Address & Live Receptionist Answering
              Service
            </p>

            {/* CTA Button */}
            <button className="w-full bg-blue-light400 hover:bg-blue-light700 text-basewhite font-semibold text-sm py-3 px-4 rounded-lg transition-colors mb-4">
              Select this location
            </button>
          </div>

          {/* Image & Location Card */}
          <div className="mb-6">
            {/* Image with Attribution Card Container */}
            <div className="flex flex-col rounded-2xl overflow-hidden">
              {/* Image */}
              <div className="relative w-full h-[240px] bg-gray-100">
                {image ? (
                  <img
                    src={image}
                    alt={`${city} virtual office location`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Location Image</span>
                  </div>
                )}
              </div>

              {/* Location Card - INSIDE image container */}
              <div className="bg-blue-light400 p-3 flex flex-col gap-2">
                {/* City Name and Stars Row */}
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-basewhite">
                    {city}, {stateAbbrev}
                  </h3>
                  {/* 5 Star Rating */}
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-3 h-3 text-basewhite fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Address */}
                <p className="text-xs text-basewhite leading-relaxed">
                  {address.street} {address.city} {address.state} {address.zip}{" "}
                  {address.phone}
                </p>

                {/* Price and Company */}
                <div className="flex items-baseline gap-2">
                  <p className="text-xl font-bold text-basewhite">{price}</p>
                  <p className="text-base font-medium text-basewhite">
                    {companyName}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features List - NO background/border/padding per Figma */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              When We Say All-Inclusive,  We Mean ALL-INCLUSIVE:
            </h3>

            {/* Check items - 3 features + See All link */}
            <div className="space-y-3">
              {features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-blue-light400"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <span className="text-base text-gray-700">{feature}</span>
                </div>
              ))}

              {/* See All Features Link - Check item text with chevron icon */}
              <Link
                href="#features"
                className="flex items-center gap-3 text-base text-blue-light700 hover:text-blue-900 font-normal"
              >
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-blue-light700"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
                <span>See All Features</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
