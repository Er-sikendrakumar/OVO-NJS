"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { Menu } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Extract location ID from URL if on a location page
  const locationMatch = pathname.match(
    /\/virtual-office\/[^/]+\/[^/]+\/location-(\d+)/
  );
  const isPrestigiousBA = pathname.includes("/prestigious-business-address/");
  const locationId = locationMatch ? locationMatch[1] : null;

  const signupUrl = isPrestigiousBA
    ? "/signup/?btn=901&sutype=mail"
    : locationId
    ? `/signup/?btn=901&locid=${locationId}`
    : "/signup/?btn=901";

  // Check if we're on affiliate pages (with or without trailing slash)
  const isAffiliateProgramPage =
    pathname === "/affiliate-program" || pathname === "/affiliate-program/";
  const isAffiliateSignInPage =
    pathname === "/affiliate-signin" || pathname === "/affiliate-signin/";

  return (
    <nav
      className="fixed top-0 left-0 right-0 w-full bg-white border-b border-gray-200 shadow-sm z-50"
      data-testid="navbar"
    >
      {/* Affiliate Pages Desktop Navigation */}
      {isAffiliateProgramPage || isAffiliateSignInPage ? (
        <div className="hidden lg:block">
          <div className="max-w-[1280px] mx-auto px-8 py-3">
            <div className="flex items-center justify-between h-20">
              {/* Left: Logo */}
              <Link
                href="/"
                className="flex items-center gap-2"
                data-testid="link-home"
              >
                <img
                  src="/opus-logo-icon.svg"
                  alt="Opus VO Logo"
                  className="h-[70px] w-auto"
                  loading="eager"
                  data-testid="img-logo-icon"
                />
                <img
                  src="/opus-logo-text.svg"
                  alt="Opus Virtual Offices"
                  className="h-[60px] w-auto"
                  loading="eager"
                  data-testid="img-logo-text"
                />
              </Link>

              {/* Right: Button (varies by page) */}
              {isAffiliateProgramPage ? (
                <Link href="/affiliate-signin/">
                  <Button
                    className="h-auto gap-1.5 px-[18px] py-3 bg-blue-light400 hover:bg-blue-light700 transition-colors rounded-lg border border-solid border-[#36bff9] hover:border-blue-light700 shadow-shadows-shadow-xs font-text-sm-text-md-semibold font-[number:var(--text-sm-text-md-semibold-font-weight)] text-basewhite text-[length:var(--text-sm-text-md-semibold-font-size)] tracking-[var(--text-sm-text-md-semibold-letter-spacing)] leading-[var(--text-sm-text-md-semibold-line-height)] [font-style:var(--text-sm-text-md-semibold-font-style)]"
                    data-testid="button-affiliate-signin"
                  >
                    Affiliate Sign In
                  </Button>
                </Link>
              ) : (
                <Link href="/affiliate-program/">
                  <Button
                    className="h-auto gap-1.5 px-[18px] py-3 bg-blue-light400 hover:bg-blue-light700 transition-colors rounded-lg border border-solid border-[#36bff9] hover:border-blue-light700 shadow-shadows-shadow-xs font-text-sm-text-md-semibold font-[number:var(--text-sm-text-md-semibold-font-weight)] text-basewhite text-[length:var(--text-sm-text-md-semibold-font-size)] tracking-[var(--text-sm-text-md-semibold-letter-spacing)] leading-[var(--text-sm-text-md-semibold-line-height)] [font-style:var(--text-sm-text-md-semibold-font-style)]"
                    data-testid="button-affiliate-signup"
                  >
                    Affiliate Sign Up
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Standard Desktop Navigation */
        <div className="hidden lg:block">
          <div className="max-w-[1280px] mx-auto px-8 py-3">
            <div className="flex items-center gap-4 h-20">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-2"
                data-testid="link-home"
              >
                <img
                  src="/opus-logo-icon.svg"
                  alt="Opus VO Logo"
                  className="h-[70px] w-auto"
                  loading="eager"
                  data-testid="img-logo-icon"
                />
                <img
                  src="/opus-logo-text.svg"
                  alt="Opus Virtual Offices"
                  className="h-[60px] w-auto"
                  loading="eager"
                  data-testid="img-logo-text"
                />
              </Link>

              {/* Navigation Links */}
              <div className="flex-1 flex items-center justify-center gap-0.5">
                <Link href="/" data-testid="link-nav-home">
                  <div className="px-1.5 py-1 rounded-lg">
                    <span className="px-0.5 font-semibold text-base text-[#414651] hover:text-[#181d27] transition-colors">
                      Home
                    </span>
                  </div>
                </Link>
                <Link href="/services/" data-testid="link-nav-services">
                  <div className="px-1.5 py-1 rounded-lg">
                    <span className="px-0.5 font-semibold text-base text-[#414651] hover:text-[#181d27] transition-colors">
                      Services
                    </span>
                  </div>
                </Link>
                <Link
                  href="/virtual-office/"
                  prefetch={false}
                  data-testid="link-nav-locations"
                >
                  <div className="px-1.5 py-1 rounded-lg">
                    <span className="px-0.5 font-semibold text-base text-[#414651] hover:text-[#181d27] transition-colors">
                      Virtual Offices
                    </span>
                  </div>
                </Link>
                <Link href="/faq/" data-testid="link-nav-faq">
                  <div className="px-1.5 py-1 rounded-lg">
                    <span className="px-0.5 font-semibold text-base text-[#414651] hover:text-[#181d27] transition-colors">
                      FAQ
                    </span>
                  </div>
                </Link>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-4">
                {/* Phone Number */}
                <div
                  className="px-4 py-2.5 rounded-lg"
                  data-testid="text-phone"
                >
                  <a
                    href="tel:+18888989868"
                    className="font-semibold text-base text-[#535862] hover:text-[#181d27] transition-colors"
                  >
                    1 (888) 898-9868
                  </a>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <a href="/portal/">
                    <Button
                      variant="ghost"
                      className="px-4 py-2.5 rounded-lg font-semibold text-base text-[#535862] hover:bg-transparent hover:text-[#181d27] transition-colors"
                      data-testid="button-login"
                    >
                      Log in
                    </Button>
                  </a>
                  <a href={signupUrl}>
                    <Button
                      className="h-auto gap-1.5 px-[18px] py-3 bg-blue-light400 hover:bg-blue-light700 transition-colors rounded-lg border border-solid border-[#36bff9] hover:border-blue-light700 shadow-shadows-shadow-xs font-text-sm-text-md-semibold font-[number:var(--text-sm-text-md-semibold-font-weight)] text-basewhite text-[length:var(--text-sm-text-md-semibold-font-size)] tracking-[var(--text-sm-text-md-semibold-letter-spacing)] leading-[var(--text-sm-text-md-semibold-line-height)] [font-style:var(--text-sm-text-md-semibold-font-style)]"
                      data-testid="button-signup"
                    >
                      Click to sign up
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Affiliate Pages Mobile Navigation */}
      {isAffiliateProgramPage || isAffiliateSignInPage ? (
        <div className="lg:hidden">
          <div className="flex items-center justify-between px-4 h-[72px]">
            {/* Left: Logo */}
            <Link
              href="/"
              className="flex items-center gap-[3px]"
              data-testid="link-home-mobile"
            >
              <img
                src="/opus-logo-icon.svg"
                alt="Opus VO Logo"
                className="h-[27px] w-auto"
                loading="eager"
                data-testid="img-logo-icon-mobile"
              />
              <img
                src="/opus-logo-text.svg"
                alt="Opus Virtual Offices"
                className="h-[24px] w-auto"
                loading="eager"
                data-testid="img-logo-text-mobile"
              />
            </Link>

            {/* Right: Button (varies by page) */}
            {isAffiliateProgramPage ? (
              <Link href="/affiliate-signin/">
                <Button
                  className="h-auto gap-1.5 px-[14px] py-2.5 bg-blue-light400 hover:bg-blue-light700 transition-colors rounded-lg border border-solid border-[#36bff9] hover:border-blue-light700 shadow-shadows-shadow-xs text-basewhite text-sm font-semibold"
                  data-testid="button-affiliate-signin-mobile"
                >
                  Affiliate Sign In
                </Button>
              </Link>
            ) : (
              <Link href="/affiliate-program/">
                <Button
                  className="h-auto gap-1.5 px-[14px] py-2.5 bg-blue-light400 hover:bg-blue-light700 transition-colors rounded-lg border border-solid border-[#36bff9] hover:border-blue-light700 shadow-shadows-shadow-xs text-basewhite text-sm font-semibold"
                  data-testid="button-affiliate-signup-mobile"
                >
                  Affiliate Sign Up
                </Button>
              </Link>
            )}
          </div>
        </div>
      ) : (
        /* Standard Mobile Navigation */
        <div className="lg:hidden">
          <div className="flex items-center justify-between px-4 h-[72px]">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-[3px]"
              data-testid="link-home-mobile"
            >
              <img
                src="/opus-logo-icon.svg"
                alt="Opus VO Logo"
                className="h-[27px] w-auto"
                loading="eager"
                data-testid="img-logo-icon-mobile"
              />
              <img
                src="/opus-logo-text.svg"
                alt="Opus Virtual Offices"
                className="h-[23px] w-auto"
                loading="eager"
                data-testid="img-logo-text-mobile"
              />
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <a href={signupUrl}>
                <Button
                  className="h-auto gap-1.5 px-3 py-2 bg-blue-light400 hover:bg-blue-light700 transition-colors rounded-lg border border-solid border-[#36bff9] hover:border-blue-light700 shadow-shadows-shadow-xs font-text-sm-text-md-semibold font-[number:var(--text-sm-text-md-semibold-font-weight)] text-basewhite text-[length:var(--text-sm-text-md-semibold-font-size)] tracking-[var(--text-sm-text-md-semibold-letter-spacing)] leading-[var(--text-sm-text-md-semibold-line-height)] [font-style:var(--text-sm-text-md-semibold-font-style)]"
                  data-testid="button-signup-mobile"
                >
                  Tap to sign up
                </Button>
              </a>

              {/* Hamburger Menu */}
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="p-2 rounded-lg"
                    data-testid="button-menu"
                  >
                    <Menu className="h-6 w-6 text-[#344054]" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="top" className="w-full">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Navigate to different pages and access account options
                  </SheetDescription>
                  <div className="flex flex-col gap-6 mt-4">
                    {/* Navigation Links */}
                    <div className="flex flex-col gap-2">
                      <Link
                        href="/"
                        data-testid="link-nav-home-mobile"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="px-4 py-3 rounded-lg">
                          <span className="font-semibold text-lg text-[#414651] hover:text-[#181d27] transition-colors">
                            Home
                          </span>
                        </div>
                      </Link>
                      <a
                        href="/services/"
                        data-testid="link-nav-services-mobile"
                      >
                        <div className="px-4 py-3 rounded-lg">
                          <span className="font-semibold text-lg text-[#414651] hover:text-[#181d27] transition-colors">
                            Services
                          </span>
                        </div>
                      </a>
                      <Link
                        href="/virtual-office/"
                        prefetch={false}
                        data-testid="link-nav-locations-mobile"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="px-4 py-3 rounded-lg">
                          <span className="font-semibold text-lg text-[#414651] hover:text-[#181d27] transition-colors">
                            Virtual Offices
                          </span>
                        </div>
                      </Link>
                      <a href="/faq/" data-testid="link-nav-faq-mobile">
                        <div className="px-4 py-3 rounded-lg">
                          <span className="font-semibold text-lg text-[#414651] hover:text-[#181d27] transition-colors">
                            FAQ
                          </span>
                        </div>
                      </a>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200"></div>

                    {/* Phone Number */}
                    <div className="px-4" data-testid="text-phone-mobile">
                      <a
                        href="tel:+18888989868"
                        className="font-semibold text-base text-[#535862] hover:text-[#181d27] transition-colors"
                      >
                        1 (888) 898-9868
                      </a>
                    </div>

                    {/* Login Button */}
                    <div className="px-4">
                      <a href="/portal/" className="block">
                        <Button
                          variant="outline"
                          className="w-full px-4 py-3 rounded-lg font-semibold text-base text-[#535862] hover:bg-transparent hover:text-[#181d27] transition-colors"
                          data-testid="button-login-mobile"
                        >
                          Log in
                        </Button>
                      </a>
                    </div>

                    {/* Signup Button */}
                    <div className="px-4">
                      <a href={signupUrl} className="block">
                        <Button
                          className="w-full h-auto gap-1.5 px-4 py-3 bg-blue-light400 hover:bg-blue-light700 transition-colors rounded-lg border border-solid border-[#36bff9] hover:border-blue-light700 shadow-shadows-shadow-xs font-text-sm-text-md-semibold font-[number:var(--text-sm-text-md-semibold-font-weight)] text-basewhite text-[length:var(--text-sm-text-md-semibold-font-size)] tracking-[var(--text-sm-text-md-semibold-letter-spacing)] leading-[var(--text-sm-text-md-semibold-line-height)] [font-style:var(--text-sm-text-md-semibold-font-style)]"
                          data-testid="button-signup-mobile-menu"
                        >
                          Tap to sign up
                        </Button>
                      </a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
