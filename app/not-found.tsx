import Link from "next/link";
import Image from "next/image";
import { Footer } from "./components/Footer";

export default function NotFound() {
    return (
        <section className=" pt-[72px] lg:pt-[104px]">
            <div className=" md:bg-white flex items-center justify-center  ">
                <div className="w-full max-w-[1440px] bg-white md:bg-transparent overflow-hidden">
                    <div className="flex justify-between flex-col md:flex-row lg:flex-row gap-16 items-center lg:gap-0 md:gap-0 px-4 md:px-4 lg:px-0 ">
                        <div className="px-0 lg:px-8 py-[20px] pb-[0px]  md:py-[48px] lg:py-[96px] md:px-4 md:pl-4 lg:pl-8 max-w-[720px]  w-full">
                            <h1
                                className="text-[36px] lg:text-[60px] leading-[44px] lg:leading-[72px] md:text-[60px] md:leading-[72px] font-semibold text-[#181D27] tracking-[-0.72px] md:tracking-[-1.2px] mb-4 md:mb-6 lg:mb-6"
                                style={{ fontFamily: "var(--inter-font)" }}
                            >
                                Page not found
                            </h1>
                            <p className="text-[#535862] text-[18px] leading-[28px] md:text-[20px] lg:text-[20px] md:leading-[30px] lg:leading-[30px] font-normal mb-8 md:mb-10 lg:mb-12 max-w-[480px]">
                                Sorry, the page you are looking for doesn't exist or has been moved. 
                            </p>
                            <Link
                                href="/"
                                className="h-[44px] md:h-[44px] inline-flex text-[16px] lg:text-[16px] items-center justify-center leading-[24px] lg:leading-[24px] rounded-md bg-[#36BFFA] px-4 py-[10px] lg:px-[18px] lg:py-3 w-full lg:w-auto font-semibold text-white "
                            >
                                Take me home
                            </Link>
                        </div>

                        <div className="relative w-full h-[260px] max-w-[720px] lg:h-[960px] md:h-[800px] py-5 pt-0 px-0 md:py-6 md:pe-2 lg:py-6 lg:pe-6">
                            <div className="relative w-full h-full">
                                <Image
                                    src="/404-hero-img.webp"
                                    alt="Tall office buildings"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    );
}