
import { Footer } from "../components/Footer";
import fs from "fs";
import path from "path";
import BundleAndSave from "../components/BundleAndSave";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Phone Opus Cost Comparison - Opus Virtual Offices",
  description:
    "Compare flexible phone bundle plans with live call answering, call forwarding, and business phone features.",
};

export default function Page() {
  const phonebundlesdata = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "newsite/json/bundles_ba.json"),
      "utf-8"
    )
  );
  return (
    <main className="bg-[#fff]  pt-[72px] lg:pt-[104px]">
      <div className="pb-10 pt-5 md:pt-10 md:pb-[80px] w-full">
        <BundleAndSave phonebundlesdata={phonebundlesdata} mode="phone" />
      </div>
      <Footer />
    </main>
  );
}