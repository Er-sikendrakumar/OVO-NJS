"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type Location = {
  id: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  price: string;
  badge?: string;
  image?: string;
};

type SpecialLocation = {
  address?: string;
  cityname?: string;
  locid?: number;
  image?: string;
};

const splitAddress = (address: string) => {
  const parts = address.split(",").map((part) => part.trim());
  if (parts.length >= 3) {
    return {
      addressLine1: parts.slice(0, -2).join(", "),
      addressLine2: parts.slice(-2).join(", "),
    };
  }
  return { addressLine1: address, addressLine2: "" };
};

const DEFAULT_IMAGE_ORIGIN = "https://www.opusvirtualoffices.com";

const normalizeUrl = (url?: string) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) return `${DEFAULT_IMAGE_ORIGIN}${url}`;
  return `${DEFAULT_IMAGE_ORIGIN}/${url}`;
};

export default function MobileLocationSlider({
  locations = [],
}: {
  locations?: SpecialLocation[];
}) {
   const router = useRouter();
  const normalizedLocations: Location[] = useMemo(
    () =>
      locations.map((location, index) => {
        const { addressLine1, addressLine2 } = splitAddress(
          location.address ?? ""
        );

        return {
          id: String(location.locid ?? index),
          city: location.cityname ?? "Location",
          addressLine1,
          addressLine2,
          price: "$99 per Month",
          badge: "Best Price Guaranteed",
          image: normalizeUrl(location.image),
        };
      }),
    [locations]
  );

  const [index, setIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDotActive, setIsDotActive] = useState(false);
  const touchStartXRef = useRef(0);
  const draggingRef = useRef(false);
  const dotTouchStartXRef = useRef(0);
  const dotDraggingRef = useRef(false);
  const dotLongPressTimerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = normalizedLocations.length;
  const EDGE_PADDING = 16;
  const CARD_SIZE = 283;
  const CARD_GAP = 8;
  const CARD_WIDTH = CARD_SIZE + CARD_GAP;
  const CARD_HALF = CARD_SIZE / 2;
  const DOT_SWIPE_THRESHOLD = 20;

  if (total === 0) return null;

  useEffect(() => {
    const updateWidth = () => {
      setContainerWidth(containerRef.current?.clientWidth ?? 0);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const innerWidth = Math.max(containerWidth - EDGE_PADDING * 2, 0);
  const centerOffset = Math.max(innerWidth / 2 - CARD_HALF, 0);
  const endOffset = Math.max(innerWidth - CARD_SIZE, 0);
  const baseTranslate = (() => {
    if (index === 0) return 0;
    if (index === total - 1) return index * CARD_WIDTH - endOffset;
    return index * CARD_WIDTH - centerOffset;
  })();

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    draggingRef.current = true;
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!draggingRef.current) return;
    e.preventDefault();
    const currentX = e.touches[0].clientX;
    setDragOffset(currentX - touchStartXRef.current);
  };

  const handleTouchEnd = () => {
    const threshold = CARD_WIDTH / 4;
    if (dragOffset < -threshold && index < total - 1) {
      setIndex((prev) => prev + 1);
    } else if (dragOffset > threshold && index > 0) {
      setIndex((prev) => prev - 1);
    }

    setDragOffset(0);
    setIsDragging(false);
    draggingRef.current = false;
  };

  const handleDotTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    dotTouchStartXRef.current = e.touches[0].clientX;
    dotDraggingRef.current = true;
    if (dotLongPressTimerRef.current) {
      window.clearTimeout(dotLongPressTimerRef.current);
    }
    dotLongPressTimerRef.current = window.setTimeout(() => {
      setIsDotActive(true);
    }, 250);
  };

  const handleDotTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!dotDraggingRef.current || !isDotActive) return;
    e.preventDefault();
    const currentX = e.touches[0].clientX;
    const delta = currentX - dotTouchStartXRef.current;

    if (delta <= -DOT_SWIPE_THRESHOLD && index < total - 1) {
      setIndex((prev) => prev + 1);
      dotTouchStartXRef.current = currentX;
    } else if (delta >= DOT_SWIPE_THRESHOLD && index > 0) {
      setIndex((prev) => prev - 1);
      dotTouchStartXRef.current = currentX;
    }
  };

  const handleDotTouchEnd = () => {
    dotDraggingRef.current = false;
    if (dotLongPressTimerRef.current) {
      window.clearTimeout(dotLongPressTimerRef.current);
      dotLongPressTimerRef.current = null;
    }
    setIsDotActive(false);
  };

  return (
    <section className="lg:hidden w-full pt-5 overflow-hidden">
      <div
        ref={containerRef}
        className="w-full px-4"
        style={{ touchAction: "pan-y" }}
      >
        <div
          className={`flex gap-2 ${
            isDragging
              ? "cursor-grabbing"
              : "cursor-grab transition-transform duration-500 ease-out"
          }`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          style={{
            transform: `translateX(-${baseTranslate - dragOffset}px)`,
          }}
        >
          {normalizedLocations.map((location, trackIndex) => {
            const isActive = trackIndex === index;

            return (
              <div
                key={`${location.id}-${trackIndex}`}
                className={`w-[283px] shrink-0 rounded-[12px] bg-white transition ${
                  isActive ? "opacity-100" : "opacity-40"
                }`}
              >
                <div className="relative h-[191px]">
                  {location.image && (
                    <img
                      src={location.image}
                      alt={location.city}
                      className="h-full w-full object-cover rounded-t-[12px]"
                    />
                  )}
                  {location.badge && (
                    <div className="absolute left-[-6px] top-[-6px]">
                      <img
                        src="/bestprice.svg"
                        alt="Badge"
                        className="max-w-[163px]"
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 px-4 pt-3 pb-5 border border-[#EAECF0] border-t-0 rounded-b-[12px]">
                  <div className="order-2">
                    <h3 className="text-[16px] font-bold text-[#475467]">
                      {location.city}
                    </h3>
                    <p className="mt-1 text-[14px] text-[#475467]">
                      {location.addressLine1} {location.addressLine2}
                    </p>
                  </div>

                  <div className="text-center order-1">
                    <p className="font-bold text-[#17B26A] text-[12px]">
                      {location.price}
                    </p>
                    <p className="uppercase text-[12px] font-bold">
                      All-inclusive{" "}
                      <span className="text-[#475467]">| No hidden fees</span>
                    </p>
                  </div>

                  <div
                    className={`mt-1 flex justify-center gap-3 order-3 rounded-full px-3 py-1  m-auto ${
                      isDotActive ? "bg-[#47546750] " : "bg-transparent"
                    }`}
                    onTouchStart={handleDotTouchStart}
                    onTouchMove={handleDotTouchMove}
                    onTouchEnd={handleDotTouchEnd}
                    onTouchCancel={handleDotTouchEnd}
                  >
                    {normalizedLocations.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-[8px] w-[8px] rounded-full ${
                          i === index ? "bg-[#0086C9]" : "bg-[#E9EAEB]"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                  onClick={() =>
                      router.push(`/signup/?btn=6&locid=${location.id}`)
                    } 
                  className="mt-1 h-[36px] text-[14px] w-full rounded-lg order-4 bg-[#36BFFA] text-white font-semibold hover:bg-[#159fdc]">
                    Choose this Location
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
