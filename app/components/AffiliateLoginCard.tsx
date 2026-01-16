'use client';

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

export function AffiliateLoginCard() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
  };

  return (
    <div className="flex max-w-full w-full lg:w-[465px] px-8 flex-col justify-center items-center gap-8 shrink-0 md:m-auto">
      <div className="flex w-full max-w-full md:max-w-[401px] h-full max-h-[428px] px-6 md:px-8 py-[20px] md:py-[60px] flex-col items-center gap-[16px] md:gap-[20px] rounded-[7px] bg-white shadow-[32px_32px_64px_rgba(52,64,84,0.08)]">
        <h2 className="self-stretch text-[#3E465A] text-center font-semibold text-[24px] leading-[32px] md:text-[30px] md:leading-[38px]">
          Log in to your account
        </h2>

        <form
          className="w-full flex flex-col gap-6"
          action="https://opus.postaffiliatepro.com/affiliates/login.php"
          method="post"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col items-start gap-[6px]">
              <Label
                htmlFor="affiliate-email"
                className="text-[#344054] text-[14px] font-medium leading-[20px]"
              >
                Email
              </Label>

              <Input
                id="affiliate-email"
                name="username"
                type="email"
                placeholder="Enter your email"
                required
                className="h-[44px] flex px-3.5 py-2.5 items-center gap-2 !text-[16px] !leading-[24px] self-stretch rounded-lg border border-[#D0D5DD] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] text-[#667085] !placeholder:text-[16px] !placeholder:leading-[24px] placeholder:text-[#667085] focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-0"
              />
            </div>

            <div className="flex flex-col items-start gap-[6px]">
              <Label
                htmlFor="affiliate-password"
                className="text-[#344054] text-[14px] font-medium leading-[20px]"
              >
                Password
              </Label>
              <Input
                id="affiliate-password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="h-[44px] flex px-3.5 py-2.5 items-center gap-2 !text-[16px] !leading-[24px] self-stretch rounded-lg border border-[#D0D5DD] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] text-[#667085] !placeholder:text-[16px] !placeholder:leading-[24px] placeholder:text-[#667085] focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-0"
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <a
              href="https://opus.postaffiliatepro.com/affiliates/login.php#reqpasswd"
              className="text-[#0BA5EC] text-[14px] font-semibold leading-[20px] hover:text-sky-600"
            >
              Forgot password
            </a>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex px-3 py-2 justify-center items-center gap-1 self-stretch rounded-md bg-[#36BFFA] hover:bg-[#026aa2] text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Please wait...' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  );
}
