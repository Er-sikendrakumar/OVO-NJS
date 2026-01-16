import Image from "next/image";
import type { ReactNode } from "react";

type GoogleRatingProps = {
  score: string;
  label: string;
  icon?: ReactNode;
  showStars?: boolean;
};

export function GoogleRating({
  score,
  label,
  icon,
  showStars = true,
}: GoogleRatingProps) {
  const shouldShowText = Boolean(score || label);
  return (
    <div className="flex items-center md:gap-3">
      {icon ?? (
        <div
          className="
      flex items-center justify-center
      w-[39.978px] h-[39.978px]
      md:w-[79px] md:h-[79px] mr-[2px]
    "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 80 77"
            fill="none"
            aria-hidden
            className="w-full h-full"
          >
            <path
              d="M74.9617 37.5564C74.9617 34.6803 74.7236 32.5815 74.2082 30.4049H40.6951V43.3864H60.3665C59.9701 46.6125 57.8284 51.4709 53.0691 54.7356L53.0024 55.1702L63.5986 63.2148L64.3327 63.2866C71.0748 57.1844 74.9617 48.206 74.9617 37.5564Z"
              fill="#4285F4"
            />
            <path
              d="M40.6929 71.76C50.3302 71.76 58.4208 68.6505 64.3304 63.2869L53.0668 54.7358C50.0527 56.7958 46.0073 58.2339 40.6929 58.2339C31.2538 58.2339 23.2425 52.1319 20.3867 43.6976L19.9681 43.7325L8.95006 52.089L8.80597 52.4816C14.6756 63.9086 26.7324 71.76 40.6929 71.76Z"
              fill="#34A853"
            />
            <path
              d="M20.3888 43.6978C19.6353 41.5213 19.1992 39.1891 19.1992 36.7794C19.1992 34.3695 19.6353 32.0376 20.3492 29.8611L20.3292 29.3975L9.17305 20.9068L8.80804 21.0769C6.38886 25.8188 5.00073 31.1437 5.00073 36.7794C5.00073 42.4152 6.38886 47.7398 8.80804 52.4817L20.3888 43.6978Z"
              fill="#FBBC05"
            />
            <path
              d="M40.6931 15.3248C47.3956 15.3248 51.9168 18.1621 54.4949 20.5331L64.5686 10.894C58.3817 5.25827 50.3305 1.79907 40.6931 1.79907C26.7325 1.79907 14.6757 9.65019 8.80597 21.0771L20.3471 29.8612C23.2426 21.427 31.254 15.3248 40.6931 15.3248Z"
              fill="#EB4335"
            />
          </svg>
        </div>
      )}

      <div className="flex flex-col items-start">
        {showStars ? (
          <div className="flex items-center gap-[7px] md:gap-[13.4px] text-[#FDB022]">
            {Array.from({ length: 5 }).map((_, index) =>
              index === 4 ? (
                <svg
                  key={`star-last-${index}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 28 36"
                  fill="none"
                  aria-hidden
                  className="w-[18.051px] h-[18.051px] md:w-[36px] md:h-[36px]"
                >
                  <g clipPath="url(#clip0_2850_874)">
                    <path
                      d="M17.2172 2.44544C17.5255 1.7042 18.5756 1.7042 18.8839 2.44544L22.6133 11.412C22.7432 11.7245 23.0371 11.938 23.3745 11.9651L33.0546 12.7411C33.8549 12.8053 34.1793 13.8039 33.5696 14.3262L26.1944 20.6439C25.9374 20.864 25.8251 21.2095 25.9036 21.5387L28.1569 30.9849C28.3432 31.7658 27.4937 32.383 26.8086 31.9645L18.521 26.9025C18.2322 26.7261 17.8689 26.7261 17.5801 26.9025L9.29253 31.9645C8.60742 32.383 7.75791 31.7658 7.94418 30.9849L10.1974 21.5387C10.276 21.2095 10.1637 20.864 9.90669 20.6439L2.53143 14.3262C1.92174 13.8039 2.24622 12.8053 3.04645 12.7411L12.7266 11.9651C13.064 11.938 13.3578 11.7245 13.4878 11.412L17.2172 2.44544Z"
                      fill="#FEC84B"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2850_874">
                      <rect
                        width={27.0758}
                        height={36.1011}
                        fill="white"
                        transform="translate(0 -0.460632)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              ) : (
                <svg
                  key={`star-${index}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 37 36"
                  fill="none"
                  aria-hidden
                  className="w-[18.051px] h-[18.051px] md:w-[36px] md:h-[36px]"
                >
                  <g clipPath="url(#clip0_2850_768)">
                    <path
                      d="M17.2172 2.44544C17.5255 1.7042 18.5756 1.7042 18.8839 2.44544L22.6133 11.412C22.7432 11.7245 23.0371 11.938 23.3745 11.9651L33.0546 12.7411C33.8549 12.8053 34.1793 13.8039 33.5696 14.3262L26.1944 20.6439C25.9374 20.864 25.8251 21.2095 25.9036 21.5387L28.1569 30.9849C28.3432 31.7658 27.4937 32.383 26.8086 31.9645L18.521 26.9025C18.2322 26.7261 17.8689 26.7261 17.5801 26.9025L9.29253 31.9645C8.60742 32.383 7.75791 31.7658 7.94418 30.9849L10.1974 21.5387C10.276 21.2095 10.1637 20.864 9.90669 20.6439L2.53143 14.3262C1.92174 13.8039 2.24622 12.8053 3.04645 12.7411L12.7266 11.9651C13.064 11.938 13.3578 11.7245 13.4878 11.412L17.2172 2.44544Z"
                      fill="#FEC84B"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2850_768">
                      <rect
                        width={36.1011}
                        height={36.1011}
                        fill="white"
                        transform="translate(0 -0.460632)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              )
            )}
          </div>
        ) : null}
        {shouldShowText ? (
          <p className="font-inter text-[9.595px] leading-[14.392px] md:text-[19px] md:leading-[29px] text-[#667085] ">
            <span className="text-base md:text-[32px] md:leading-[48px] font-medium text-[#667085] pe-1">
              {score}
            </span>{" "}
            {label}
          </p>
        ) : null}
      </div>
    </div>
  );
}
