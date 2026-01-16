"use client";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { MailIcon } from "lucide-react";
import { useLoading } from "@/app/components/GlobalLoadingOverlay";
import { Tracking } from "@/app/components/Tracking";
import Image from "next/image";

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { showLoading, hideLoading } = useLoading();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setSubmitStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");
    showLoading();

    try {
      // Determine the base URL - use staging URL for localhost, relative URL for staging/production
      const isLocalhost =
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1");
      const baseUrl = isLocalhost ? "https://njs.opusvirtualoffices.com" : "";

      const response = await fetch(
        `${baseUrl}/wp-json/opus/v1/forms/submit/25`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input_3: email,
          }),
        }
      );

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response from server");
      }

      const data = await response.json();

      if (data.success) {
        setSubmitStatus("success");
        setEmail("");
      } else {
        setSubmitStatus("error");
        setErrorMessage(
          data.message || "Failed to subscribe. Please try again."
        );
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("Failed to subscribe. Please try again.");
      console.error("Error submitting newsletter form:", error);
    } finally {
      setIsSubmitting(false);
      hideLoading();
    }
  };
  const popularLocations = [
    { name: "Atlanta", href: "/virtual-office/georgia/atlanta/location-684/" },
    {
      name: "Chicago",
      href: "/virtual-office/illinois/chicago/location-1430/",
    },
    { name: "Dallas", href: "/virtual-office/texas/dallas/location-1255/" },
    {
      name: "Los Angeles",
      href: "/virtual-office/california/los-angeles/location-1362/",
    },
    { name: "Miami", href: "/virtual-office/florida/miami/location-1285/" },
    {
      name: "New York",
      href: "/virtual-office/new-york/new-york/location-1450/",
    },
    { name: "Tampa", href: "/virtual-office/florida/tampa/location-885/" },
  ];

  const aboutLinks = [
    { name: "About Us", href: "/about/", isNextJs: true },
    { name: "Contact Us", href: "/contact-us/", isNextJs: true },
    {
      name: "In The News",
      href: "/blog/category/in-the-news/",
      isNextJs: false,
    },
    { name: "Affiliate Program", href: "/affiliate-program/", isNextJs: true },
    { name: "Partners", href: "/clientbenefits/", isNextJs: true },
    { name: "Privacy Policy", href: "/privacy-policy/", isNextJs: true },
    {
      name: "Terms of Use",
      href: "/opus-virtual-offices-terms-of-use/",
      isNextJs: true,
    },
  ];

  const servicesLinks = [
    { name: "Virtual Offices", href: "/virtual-office/", isNextJs: true },
    {
      name: "Business Address",
      href: "/prestigious-business-address/",
      isNextJs: true,
    },
    {
      name: "Live Call Answering",
      href: "/live-answering-service/",
      isNextJs: true,
    },
    {
      name: "Mailing Address",
      href: "/corporate-mailing-address-service/",
      isNextJs: true,
    },
    {
      name: "Meeting Rooms",
      href: "https://www.opusmeetingrooms.com/",
      isNextJs: true,
    },
    { name: "Bundles", href: "/cost-comparison/", isNextJs: true },
  ];

  const resourceLinks = [
    { name: "Blog", href: "/blog/", isNextJs: false },
    {
      name: "What is a Virtual Office?",
      href: "/blog/what-is-a-virtual-office/",
      isNextJs: true,
    },
    {
      name: "Is a Virtual Office Right for Me?",
      href: "/is-a-virtual-office-for-me/",
      isNextJs: false,
    },
    { name: "FAQs", href: "/faq/", isNextJs: true },
  ];

  return (
    <footer className="bg-[#182230] w-full" data-testid="footer">
      {/* Main Footer Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10 pb-6 lg:pt-16 lg:pb-12">
        <div className="max-w-[1280px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            {/* Logo and Supporting Content - Mobile & Desktop */}
            <div className="flex flex-col gap-6 md:gap-[49px] h-auto lg:h-auto lg:max-w-[320px] lg:min-w-[320px] py-3 md:py-0">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <img
                  src="/opus-logo-icon.svg"
                  alt="Opus VO Logo"
                  className="h-[70.4px] max-w-[98.8px] md:h-[77px] w-full md:max-w-[109px]"
                  data-testid="img-footer-logo-icon"
                />
                <img
                  src="/opus-logo-text.svg"
                  alt="Opus Virtual Offices"
                  className="h-[60.3px] max-w-[183.5px] md:h-[66px] w-full md:max-w-[202px]"
                  data-testid="img-footer-logo-text"
                />
              </Link>

              {/* App Store Badges */}
              <div className="flex gap-3 md:gap-[17px] md:justify-between">
                <a
                  href="https://apps.apple.com/us/app/opus-vo/id1618812016"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  data-testid="link-app-store"
                >
                  <img
                    src="/App-store-download.svg"
                    alt="Download on the App Store"
                    className="h-[44px] w-[151px]"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.opusvo.opusvo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  data-testid="link-google-play"
                >
                  <img
                    src="/google-play-download.svg"
                    alt="Get it on Google Play"
                    className="h-[45px] w-[152px]"
                  />
                </a>
              </div>

              {/* BBB Badge */}
              <div className="flex items-start gap-3.5">
                <div className="flex items-start md:items-center justify-left md:justify-center gap-[14px]">
                  <Image
                    src="/locations/review-companies-4.svg"
                    alt="BBB A+ rating"
                    width={107}
                    height={38}
                    className="!h-[37.76px] w-[107.15px]"
                  />
                  <Image
                    src="/locations/review-companies-5.svg"
                    alt="Trustpilot"
                    width={80}
                    height={38}
                    className="!h-[37.5 px]  w-[79.27px]"
                  />
                  <Image
                    src="/locations/review-companies-6.svg"
                    alt="Google rating"
                    width={105}
                    height={34}
                    className="w-[105.5px] h-[33.5px]"
                  />
                </div>
              </div>
            </div>

            {/* Links Section - Desktop Only */}
            <div className="hidden lg:flex flex-1 gap-8">
              {/* Services */}
              <div className="flex flex-col gap-4 flex-1">
                <div
                  className="text-[#d0d5dd] text-base font-medium"
                  data-testid="heading-services"
                >
                  Services
                </div>
                <div className="flex flex-col gap-3">
                  {servicesLinks.map((link, index) =>
                    link.isNextJs ? (
                      <Link
                        key={index}
                        href={link.href}
                        className="text-[#ffffff] text-base font-semibold hover:underline"
                        data-testid={`link-about-${index}`}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        key={index}
                        href={
                          link.href.startsWith("http")
                            ? link.href
                            : `https://${link.href}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#ffffff] text-base font-semibold hover:underline"
                        data-testid={`link-about-${index}`}
                      >
                        {link.name}
                      </a>
                    )
                  )}
                </div>
              </div>

              {/* About */}
              <div className="flex flex-col gap-4 flex-1">
                <div
                  className="text-[#d0d5dd] text-base font-medium"
                  data-testid="heading-about"
                >
                  About
                </div>
                <div className="flex flex-col gap-3">
                  {aboutLinks.map((link, index) =>
                    link.isNextJs ? (
                      <Link
                        key={index}
                        href={link.href}
                        className="text-[#ffffff] text-base font-semibold hover:underline"
                        data-testid={`link-about-${index}`}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        key={index}
                        href={link.href}
                        className="text-[#ffffff] text-base font-semibold hover:underline"
                        data-testid={`link-about-${index}`}
                      >
                        {link.name}
                      </a>
                    )
                  )}
                </div>
              </div>

              {/* Most Popular Locations */}
              <div className="flex flex-col gap-4 flex-1">
                <div
                  className="text-[#d0d5dd] text-base font-medium"
                  data-testid="heading-locations"
                >
                  Popular Locations
                </div>
                <div className="flex flex-col gap-3">
                  {popularLocations.map((location, index) => (
                    <Link
                      key={index}
                      href={location.href}
                      prefetch={false}
                      className="text-[#ffffff] text-base font-semibold hover:underline"
                      data-testid={`link-location-${index}`}
                    >
                      {location.name}
                    </Link>
                  ))}
                  <a
                    href="/our-top-locations/"
                    className="text-[#ffffff] text-base font-semibold underline md:w-[206px]"
                    data-testid="link-all-locations"
                  >
                    View All Popular Locations
                  </a>
                </div>
              </div>

              {/* Resources */}
              <div className="flex flex-col gap-4 flex-1">
                <div
                  className="text-[#d0d5dd] text-base font-medium"
                  data-testid="heading-resources"
                >
                  Resources
                </div>
                <div className="flex flex-col gap-3">
                  {resourceLinks.map((link, index) =>
                    link.isNextJs ? (
                      <Link
                        key={index}
                        href={link.href}
                        className="text-[#ffffff] text-base font-semibold hover:underline"
                        data-testid={`link-resource-${index}`}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        key={index}
                        href={link.href}
                        className="text-[#ffffff] text-base font-semibold hover:underline"
                        data-testid={`link-resource-${index}`}
                      >
                        {link.name}
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Links Section */}
          <div className="lg:hidden mt-[24px] flex items-start gap-9 flex-col">
            <h3 className="text-[20px] leading-[30px] font-bold text-[#D0D5DD]">
              Most Popular Locations
            </h3>

            {/* Services - Mobile */}
            <div className="flex items-start gap-4 flex-col">
              <div
                className="text-[#d0d5dd] text-base font-medium"
                data-testid="heading-services-mobile"
              >
                Services
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                <div className="flex flex-col gap-3 flex-1 min-w-[150px]">
                  {servicesLinks.map((link, index) =>
                    link.isNextJs ? (
                      <Link
                        key={index}
                        href={link.href}
                        className="text-[#ffffff] text-base font-semibold hover:underline"
                        data-testid={`link-services-mobile-${index}`}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        key={index}
                        href={
                          link.href.startsWith("http")
                            ? link.href
                            : `https://${link.href}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#ffffff] text-base font-semibold hover:underline"
                        data-testid={`link-services-${index}`}
                      >
                        {link.name}
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* About - Mobile */}
            <div className="flex items-start gap-4 flex-col">
              <div
                className="text-[#d0d5dd] text-base font-medium"
                data-testid="heading-about-mobile"
              >
                About
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                <div className="flex flex-col gap-3 flex-1 min-w-[150px]">
                  {aboutLinks.map((link, index) =>
                    link.isNextJs ? (
                      <Link
                        key={index}
                        href={link.href}
                        className="text-[#ffffff] text-base font-semibold hover:underline"
                        data-testid={`link-about-mobile-${index}`}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        key={index}
                        href={link.href}
                        className="text-[#ffffff] text-base font-semibold hover:underline"
                        data-testid={`link-about-mobile-${index}`}
                      >
                        {link.name}
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Popular Locations - Mobile */}
            <div className="flex items-start gap-4 flex-col">
              <div
                className="text-[#d0d5dd] text-base font-medium"
                data-testid="heading-locations-mobile"
              >
                Popular Locations
              </div>
              <div className="flex flex-wrap flex-col md:flex-row gap-x-8 gap-y-3">
                <div className="flex flex-col gap-3 flex-1 min-w-[150px]">
                  {popularLocations.map((location, index) => (
                    <Link
                      key={index + 4}
                      href={location.href}
                      prefetch={false}
                      className="text-[#ffffff] text-base font-semibold hover:underline"
                      data-testid={`link-location-mobile-${index + 4}`}
                    >
                      {location.name}
                    </Link>
                  ))}
                </div>
              </div>
              <a
                href="/our-top-locations/"
                className="text-[#EAECF0] text-base font-semibold underline w-full block"
                data-testid="link-all-locations-mobile"
              >
                View All Popular Locations
              </a>
            </div>

            {/* Resources - Mobile */}
            <div className="flex items-start gap-4 flex-col">
              <div
                className="text-[#d0d5dd] text-base font-medium"
                data-testid="heading-resources-mobile"
              >
                Resources
              </div>
              <div className="gap-x-8 gap-y-3">
                <div className="flex flex-col gap-3 flex-1 w-full">
                  {resourceLinks.map((link, index) =>
                    link.isNextJs ? (
                      <Link
                        key={index}
                        href={link.href}
                        className="text-[#ffffff] text-base font-semibold hover:underline"
                        data-testid={`link-resource-mobile-${index}`}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        key={index}
                        href={link.href}
                        className="text-[#ffffff] text-base font-semibold hover:underline"
                        data-testid={`link-resource-mobile-${index}`}
                      >
                        {link.name}
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="px-[7.5px] md:px-0 w-full">
      <div className=" w-full bg-[#101828]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-5 lg:py-12 ">
          <div className="h-auto lg:h-[62px] flex flex-col lg:flex-row gap-8 lg:gap-0 lg:justify-between lg:items-start">
            {/* Newsletter Text */}
            <div className="flex flex-col gap-2 lg:max-w-[768px]">
              <div
                className="text-white text-lg lg:text-xl font-semibold flex flex-row gap-1"
                data-testid="heading-newsletter"
              >
                Join our newsletter
                <span className="hidden md:block">{"->"}</span>
              </div>
              <p
                className="text-[#ffffff] text-base"
                data-testid="text-newsletter-description"
              >
                Stay updated with the latest news, tips, and exclusive offers
                directly in your inbox.
              </p>
            </div>

            {/* Newsletter Form */}
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col lg:flex-row gap-4 lg:w-[400px]"
            >
              <div className="flex-1">
                <div className="h-[44px] bg-white border border-[#d5d7da] rounded-lg px-3.5 py-2.5 flex items-center gap-2">
                  <MailIcon className="w-5 h-5 text-[#a4a7ae]" />
                  <Input
                    type="email"
                    name="input_3"
                    id="input_25_3"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="flex-1 border-0 shadow-none p-0 h-auto text-[#717680] text-base focus-visible:ring-0 focus-visible:ring-offset-0"
                    data-testid="input-newsletter-email"
                  />
                </div>
                {submitStatus === "success" && (
                  <p className="text-green-400 text-sm mt-2">
                    Successfully subscribed!
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-red-400 text-sm mt-2">{errorMessage}</p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-[44px] gap-1.5 px-[16px] md:px-[18px] py-[10px] md:py-3 w-full lg:w-auto bg-blue-light400 hover:bg-blue-light700 transition-colors rounded-lg border border-solid border-[#36bff9] hover:border-blue-light700 shadow-shadows-shadow-xs font-text-sm-text-md-semibold font-[number:var(--text-sm-text-md-semibold-font-weight)] text-basewhite text-[length:var(--text-sm-text-md-semibold-font-size)] tracking-[var(--text-sm-text-md-semibold-letter-spacing)] leading-[var(--text-sm-text-md-semibold-line-height)] [font-style:var(--text-sm-text-md-semibold-font-style)] disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="button-subscribe"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 md:mt-8 pt-8 md:pt-8 border-t border-[#182230] flex flex-col lg:flex-row gap-6 lg:justify-between lg:items-center">
            <p
              className="text-[#d0d5dd] text-base order-2 lg:order-1"
              data-testid="text-copyright"
            >
              © 2026 Opus Virtual Offices. All rights reserved.
            </p>

            {/* Social Icons */}
            <div
              className="flex gap-6 order-1 lg:order-2"
              data-testid="social-icons"
            >
              <a
                href="https://www.facebook.com/opusvo/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#98a2b3] hover:text-white transition-colors"
                data-testid="link-facebook"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/opusvo/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#98a2b3] hover:text-white transition-colors"
                data-testid="link-instagram"
              >
                <img src="/instagram.svg" alt="Instagram" className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/opus-virtual-offices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#98a2b3] hover:text-white transition-colors"
                data-testid="link-linkedin"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@OpusVirtualOffices"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#98a2b3] hover:text-white transition-colors"
                data-testid="link-youtube"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Tracking Scripts */}
      <Tracking />
    </footer>
  );
}
