import Image from "next/image";
import type { ReactNode } from "react";

type GoogleRatingProps = {
  score: string;
  label: string;
  icon?: ReactNode;
};

export function GoogleRating({ score, label, icon }: GoogleRatingProps) {
  return (
    <div className="flex items-center md:gap-[7px]">
      {icon ?? (
        <div
          className="
    flex items-center
    w-[37px] h-[41.533px]
    md:w-[59.063px] md:h-[66.15px]
  "
        >
          <Image
            src="/figmaAssets/google.svg"
            alt="google icon"
            width={59.063}
            height={59.063}
            className="w-[37px] h-[41.533px] md:w-[59.063px] md:h-[66.15px]"
          />
        </div>
      )}
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-[6.7px] md:gap-[10.667px] text-[#FDB022]">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg
              key={`star-${index}`}
              className="w-[17px] h-[17px] md:w-[26px] md:h-[26px]"
              viewBox="0 0 27 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <g clipPath="url(#clip0_2811_1315)">
                <path
                  d="M12.7182 1.8065C12.946 1.25895 13.7216 1.25895 13.9494 1.8065L16.7043 8.43004C16.8003 8.66087 17.0174 8.81859 17.2666 8.83857L24.4172 9.41183C25.0083 9.45922 25.248 10.1969 24.7977 10.5827L19.3496 15.2496C19.1597 15.4122 19.0768 15.6674 19.1348 15.9106L20.7993 22.8884C20.9369 23.4652 20.3094 23.9212 19.8033 23.612L13.6813 19.8728C13.468 19.7425 13.1996 19.7425 12.9863 19.8728L6.86432 23.612C6.35824 23.9212 5.73071 23.4652 5.86831 22.8884L7.53278 15.9106C7.59079 15.6674 7.50787 15.4122 7.31801 15.2496L1.86995 10.5827C1.41958 10.1969 1.65927 9.45922 2.25039 9.41183L9.40106 8.83857C9.65026 8.81859 9.86734 8.66087 9.96335 8.43004L12.7182 1.8065Z"
                  fill="#FEC84B"
                />
              </g>
              <defs>
                <clipPath id="clip0_2811_1315">
                  <rect
                    width="26.6676"
                    height="26.6676"
                    fill="white"
                    transform="translate(0 -0.340195)"
                  />
                </clipPath>
              </defs>
            </svg>
          ))}
        </div>
        <p className="font-inter text-[#667085]">
          <span className="font-inter text-[14.833px] leading-[22.25px] md:text-[23.625px] md:leading-[35.438px] font-medium text-[#667085] md:pl-[7px]">
            {score}
          </span>{" "}
          <span className="font-inter text-[8.9px] leading-[13.35px] md:text-[14.175px] md:leading-[21.263px] font-normal text-[#667085]">
            {label}
          </span>
        </p>
      </div>
    </div>
  );
}
