import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Meeting Room Promo - Opus Virtual Offices",
  description:
    "Enjoy 5 hours of complimentary meeting room time at premier business locations nationwide, with professional amenities including Wi-Fi, coffee, and conference facilities.",
};

export default function MeetingRoomPromoLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}