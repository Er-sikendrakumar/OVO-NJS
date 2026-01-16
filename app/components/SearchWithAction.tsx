"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ActionSearchBar,
  type LocationItem,
} from "@/app/components/ActionSearchBar";
import { Button } from "@/app/components/ui/button";
import { useLoading } from "@/app/components/GlobalLoadingOverlay";
import { extractZipcode } from "@/app/lib/api/locations";

interface BrowseLink {
  href: string;
  label: string;
  isNextJs?: boolean;
}

interface SearchWithActionProps {
  className?: string;
  placeholder?: string;
  onSelect?: (location: LocationItem) => void;
  buttonLabel?: string;
  browseLink?: BrowseLink;
  searchContainerClassName?: string;
  zipRedirectBase?: string;
}

export function SearchWithAction({
  className = "",
  placeholder = "Search for Zip, State, or City",
  onSelect,
  buttonLabel = "Get Started",
  browseLink,
  searchContainerClassName = "sm:max-w-[400px]",
  zipRedirectBase,
}: SearchWithActionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { showLoading } = useLoading();

  const handleGetStartedClick = () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    showLoading();

    // If search term is empty, go to /virtual-office/
    // If search term has value, go to /location-search/{search-term}/20/
    if (searchTerm.trim()) {
      const zipFromSearch = extractZipcode(searchTerm);
      if (zipRedirectBase && zipFromSearch) {
        router.push(`${zipRedirectBase}/${encodeURIComponent(zipFromSearch)}`);
        return;
      }
      router.push(`/location-search/${encodeURIComponent(searchTerm)}/20`);
    } else {
      router.push("/virtual-office/");
    }
  };

  return (
    <div
      className={`flex w-full max-w-[800px] flex-col items-start gap-3 !mt-3 ${className}`}
    >
      <div className="flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div
          className={`flex w-full h-[48px] flex-1 flex-col items-start gap-1.5 ${searchContainerClassName}`}
        >
          <ActionSearchBar
            placeholder={placeholder}
            onSelect={onSelect}
            onSearchChange={setSearchTerm}
            zipRedirectBase={zipRedirectBase}
          />
        </div>

        <Button
          onClick={handleGetStartedClick}
          disabled={isSubmitting}
          className="hidden h-[48px] w-full gap-1.5 rounded-lg border border-solid border-[#36bff9] bg-blue-light400 px-[18px] py-3 text-basewhite shadow-shadows-shadow-xs transition-colors hover:border-blue-light700 hover:bg-blue-light700 font-text-sm-text-md-semibold font-[number:var(--text-sm-text-md-semibold-font-weight)] text-[length:var(--text-sm-text-md-semibold-font-size)] tracking-[var(--text-sm-text-md-semibold-letter-spacing)] leading-[var(--text-sm-text-md-semibold-line-height)] [font-style:var(--text-sm-text-md-semibold-font-style)] sm:flex sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="button-get-started"
        >
          {buttonLabel}
        </Button>
      </div>

      {browseLink &&
        (browseLink.isNextJs ? (
          <Link href={browseLink.href}>
            <p className="cursor-pointer text-sm font-bold text-gray-600 transition-colors hover:text-[#181d27]">
              {browseLink.label}
            </p>
          </Link>
        ) : (
          <a href={browseLink.href}>
            <p className="cursor-pointer text-sm font-bold text-gray-600 transition-colors hover:text-[#181d27]">
              {browseLink.label}
            </p>
          </a>
        ))}
    </div>
  );
}
