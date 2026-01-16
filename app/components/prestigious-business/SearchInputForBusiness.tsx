import Link from "next/link";
import Image from "next/image";
const GoogleMapIcon = '/assets/google-maps-icon.svg';

export function SearchInputForBusiness() {
  return (
    <div className="flex flex-col gap-[12px] w-full">
      <div className="flex w-full flex-col items-start gap-[12px] lg:gap-[16px] sm:flex-row sm:items-center sm:gap-4">
        <div className="flex w-full flex-1 flex-col items-start gap-1.5">
          <div className="relative w-full">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none">
              <Image
                src={GoogleMapIcon}
                alt={"Location"}
                height={20}
                width={20}
                className="w-5 h-5"
                />
            </div>
            <input
              type="text"
              placeholder="Search for Zip, State, or City"
              className="w-full text-[16px] h-[48px] pl-[42px] pr-[14px] py-[12px] rounded-[8px] border border-[#D0D5DD] bg-white text-[#475467] placeholder:text-[#667085] focus:outline-none focus:border-[#36BFFA] focus:border-transparent shadow-[0px_1px_2px_0px_#1018280D]"
            />
          </div>
        </div>
        <button
          className="h-[48px] w-full sm:w-auto min-w-[129px] px-[20px] py-[12px] rounded-[8px] border border-solid border-[#36BFFA] bg-[#36BFFA] text-white shadow-none transition-colors hover:border-[#026aa2] hover:bg-[#026aa2] font-[600] text-[16px] hidden lg:flex sm:items-center sm:justify-center whitespace-nowrap "
        >
          Get started
        </button>
      </div>
      <div className="w-full flex">
        <Link className="inline-flex" href="#" prefetch={false}>
        <p className="cursor-pointer text-[14px] font-[700] text-[#475467] leading-[20px]  hover:text-[#475467]">
          Browse Our Top Locations
        </p>
      </Link>
      </div>
    </div>
  );
}

