import type { ReactNode } from "react";
import Image from "next/image";

const IMAGE_BASE = "https://www.opusvirtualoffices.com";

type MeetingRoomHeroData = {
  did_you_know_badge: string;
  title: { desktop: string; mobile?: string };
  description: { desktop: string; mobile?: string };
  subtitle: string;
  cta: { text: string; url: string; disclaimer: string };
  highlight_text: string;
  banner_images?: string[];
};

type MeetingRoomProps = {
  hero: MeetingRoomHeroData;
};

const resolveImage = (path: string) =>
  path.startsWith("http") ? path : `${IMAGE_BASE}${path}`;

export function MeetingRoom({ hero }: MeetingRoomProps) {
  const heroImages =
    hero?.banner_images?.length && hero?.banner_images[0]
      ? hero.banner_images
      : [];

  const primaryPanelImage: string = resolveImage(heroImages[0]);
  const secondaryImage: string = resolveImage(heroImages[2] ?? heroImages[0]);
  const tertiaryImage: string = resolveImage(heroImages[3] ?? heroImages[0]);
  const quaternaryImage: string = resolveImage(heroImages[1] ?? heroImages[0]);

  return (
    <section className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-4 md:px-8 pt-5 pb-5 md:py-10 lg:flex-row lg:items-center lg:gap-16">
      <div className="flex-1 flex flex-col gap-3 text-[#111827] lg:max-w-[576px] md:pb-[21px]">
        <div className="inline-flex items-center w-[124px] gap-2 h-7 rounded-full bg-[#F9FAFB] border border-[#F9FAFB] px-3 py-1 text-sm font-medium text-[#344054]">
          {hero.did_you_know_badge}
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="text-[36px] leading-[44px] tracking-[-0.72px] font-semibold md:font-bold text-[#3E465A] md:text-[48px] md:leading-[60px] md:tracking-[-0.96px]">
            {hero.title.desktop}
          </h1>

          <div className="flex flex-col gap-[18px] md:gap-5">
            <p className="text-[18px] leading-[28px] text-[#475467] md:text-[20px] md:leading-[30px]">
              {hero.description.desktop}
            </p>
            <p className="text-[18px] leading-[28px] text-[#475467] md:text-[20px] md:leading-[30px]">
              {hero.subtitle}
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 w-full">
            <a
              className="inline-flex w-full items-center justify-center gap-[10px] rounded-[8px] border border-[#3E4784] bg-[#3E465A] px-[18px] md:px-[22px] py-3 md:py-4 text-[16px] font-semibold leading-[24px] md:text-[24px] md:font-bold md:leading-[32px] text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition-colors hover:bg-[#2f3446] lg:leading-[30px] lg:text-[20px] xl:text-[24px]  xl:leading-[32px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111827] h-12 md:h-[64px]"
              href={hero.cta.url}
              target="_blank"
              rel="noreferrer"
            >
              <span className="flex items-center justify-center rounded-full bg-white/10">
                <svg
                  aria-hidden
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="20"
                  viewBox="0 0 22 20"
                  fill="none"
                >
                  <path
                    d="M6.5 9H3.6C3.03995 9 2.75992 9 2.54601 9.10899C2.35785 9.20487 2.20487 9.35785 2.10899 9.54601C2 9.75992 2 10.0399 2 10.6V19M15.5 9H18.4C18.9601 9 19.2401 9 19.454 9.10899C19.6422 9.20487 19.7951 9.35785 19.891 9.54601C20 9.75992 20 10.0399 20 10.6V19M15.5 19V4.2C15.5 3.0799 15.5 2.51984 15.282 2.09202C15.0903 1.71569 14.7843 1.40973 14.408 1.21799C13.9802 1 13.4201 1 12.3 1H9.7C8.57989 1 8.01984 1 7.59202 1.21799C7.21569 1.40973 6.90973 1.71569 6.71799 2.09202C6.5 2.51984 6.5 3.0799 6.5 4.2V19M21 19H1M10 5H12M10 9H12M10 13H12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>{hero.cta.text}</span>
            </a>
            <p className="text-[14px] leading-[20px] md:text-[20px] md:leading-[30px] font-normal text-[#3E465A] text-center">
              {hero.cta.disclaimer}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center gap-3 lg:max-w-[576px] w-full m-auto">
        <div className="grid w-full justify-start md:justify-center lg:justify-start grid-cols-1 gap-3 md:grid-cols-[360px_193px] lg:grid-cols-[260px_193px] xl:grid-cols-[360px_193px] md:grid-rows-[360px_193px] md:gap-3">
          <div className="relative overflow-hidden h-[168px] w-full  md:h-[360px] md:w-[360px] lg:w-[260px] xl:w-[360px] aspect-square">
            <Image
              src={primaryPanelImage}
              alt="Access Opus VO meeting rooms"
              fill
              className="object-cover rounded-[12px]"
              sizes="(min-width: 768px) 360px, 100vw"
            />
            <div className="absolute rounded-[12px] inset-0 bg-[radial-gradient(circle_at_30%_20%,_#ffffff1f,_transparent_45%),_linear-gradient(135deg,_#079455,_#079455d6)]" />
            <div className="absolute inset-0 flex items-center justify-center p-5 md:py-10 md:px-8 text-center text-white">
              <p className="text-[24px] leading-[32px] md:text-[30px] md:leading-[38px] font-semibold text-white text-center md:text-left">
                {hero.highlight_text}
              </p>
            </div>
          </div>
          <div className="relative w-full overflow-hidden aspect-[193/360] h-[360px] md:w-[193px]">
            <Image
              src={quaternaryImage}
              alt="Team in a meeting room"
              fill
              className="object-cover rounded-[12px]"
              sizes="(min-width: 768px) 193px, 100vw"
            />
          </div>
          <div className="relative w-full overflow-hidden aspect-[360/193] md:h-[193px] md:w-[360px] hidden md:block">
            <Image
              src={secondaryImage}
              alt="Client smiling in office"
              fill
              className="object-cover rounded-[12px]"
              sizes="(min-width: 768px) 360px, 100vw"
            />
          </div>
          <div className="relative w-full overflow-hidden aspect-square md:h-[193px] md:w-[193px]  hidden md:block">
            <Image
              src={tertiaryImage}
              alt="Business meeting"
              fill
              className="object-cover rounded-[12px]"
              sizes="(min-width: 768px) 193px, 100vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
