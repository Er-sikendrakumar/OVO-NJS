"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import countriesData from "@/public/countries.json";

type Country = {
  name: string;
  code: string;
  dialCode: string;
};

type FormValues = {
  input_1: string;
  input_7: string;
  input_12: string;
  input_13: string;
  selectedCountry: string;
  input_9: string;
  input_18: string;
  input_10: string;
  "input_11.1": boolean;
  "input_11.2": boolean;
  "input_11.3": boolean;
  "input_20.1": boolean;
};

const initialValues: FormValues = {
  input_1: "",
  input_7: "",
  input_12: "",
  input_13: "",
  selectedCountry: "US",
  input_9: "",
  input_18: "",
  input_10: "",
  "input_11.1": false,
  "input_11.2": false,
  "input_11.3": false,
  "input_20.1": false,
};

const helpOptions = [
  {
    id: "choice_1_11_1",
    name: "input_11.1" as const,
    label: "Setting up a Virtual Office",
    value: "Setting up a Virtual Office",
  },
  {
    id: "choice_1_11_2",
    name: "input_11.2" as const,
    label: "My subscription",
    value: "My subscription",
  },
  {
    id: "choice_1_11_3",
    name: "input_11.3" as const,
    label: "Other",
    value: "Other",
  },
];

export default function ContactUs() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  // EXCEPTION: Loading countries at compile time (not runtime) to avoid HTTP request issues
  const countries = countriesData as Country[];

  const selectedHelpWith = useMemo(
    () =>
      helpOptions
        .filter((option) => values[option.name])
        .map((option) => option.value),
    [values]
  );

  const selectedCountryDialCode = useMemo(() => {
    const country = countries.find((c) => c.code === values.selectedCountry);
    return country?.dialCode || "+1";
  }, [countries, values.selectedCountry]);

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = event.target;
    const { name, value } = target;
    const isCheckbox =
      target instanceof HTMLInputElement && target.type === "checkbox";
    const nextValue = isCheckbox ? target.checked : value;

    setValues((prev) => ({
      ...prev,
      [name]: nextValue,
    }));
  };

  const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const countryCode = event.target.value;

    // Update selected country only - don't modify the phone input
    setValues((prev) => ({
      ...prev,
      selectedCountry: countryCode,
    }));
  };

  const validateForm = () => {
    const validationErrors: Record<string, string> = {};
    const phoneDigits = values.input_13.replace(/\D/g, "");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.input_1.trim()) {
      validationErrors.input_1 = "Full Name is required.";
    }
    if (!values.input_7.trim()) {
      validationErrors.input_7 = "Company Name is required.";
    }
    if (!values.input_13.trim()) {
      validationErrors.input_13 = "Phone Number is required.";
    } else if (phoneDigits.length < 7) {
      validationErrors.input_13 = "Enter a valid phone number.";
    }
    if (!values.input_12.trim()) {
      validationErrors.input_12 = "Email is required.";
    } else if (!emailPattern.test(values.input_12.trim())) {
      validationErrors.input_12 = "Enter a valid email address.";
    }
    if (!values.input_9) {
      validationErrors.input_9 = "Department is required.";
    }
    if (!values.input_10.trim()) {
      validationErrors.input_10 = "Message is required.";
    }
    if (!values["input_20.1"]) {
      validationErrors["input_20.1"] = "You must agree to the Terms of Use.";
    }

    return validationErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    setSubmitError("");

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);

      try {
        // Determine the base URL - use staging URL for localhost, relative URL for staging/production
        const isLocalhost =
          typeof window !== "undefined" &&
          (window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1");
        const baseUrl = isLocalhost
          ? "https://njs.opusvirtualoffices.com"
          : "";

        // Prepare form data for Gravity Forms API
        const formData = {
          input_1: values.input_1, // Full Name
          input_7: values.input_7, // Company Name
          input_12: values.input_12, // Email
          input_13: selectedCountryDialCode + values.input_13, // Phone Number with country code (no spaces)
          input_9: values.input_9, // Department
          input_18: values.input_18, // Location/City
          input_10: values.input_10, // Message
          input_11: selectedHelpWith.join(", "), // Help with (checkboxes as comma-separated)
          "input_20.1": values["input_20.1"] ? "1" : "0", // Privacy policy agreement
        };

        // Submit to WordPress Gravity Forms API - Form ID 1
        const response = await fetch(
          `${baseUrl}/wp-json/opus/v1/forms/submit/1`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        // Check if response is JSON
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response from server");
        }

        const result = await response.json();

        if (result.success) {
          // Extract confirmation message from HTML
          setConfirmationMessage(result.confirmation_message || result.message);
          setValues(initialValues); // Reset form
        } else {
          setSubmitError(
            result.message || "Failed to submit form. Please try again."
          );
        }
      } catch (error) {
        console.error("Form submission error:", error);
        setSubmitError("An error occurred. Please try again later.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-[1280px] px-4 mx-auto py-5 md:py-10 lg:px-8">
      <div className="flex flex-row gap-8 md:gap-12 lg:gap-16 items-center">
        {/* Left image */}
        <div
          className="w-full max-w-[480px] h-[898px] hidden lg:block flex-shrink-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: 'url(/contactus.webp)',
            backgroundPosition: '69% center'
          }}
          role="img"
          aria-label="Customer support representative"
        ></div>

        {/* Right content */}
        <div className="flex flex-col gap-6 max-w-[672px] md:m-auto w-full">
          <div className="flex flex-col gap-4 md:gap-3">
            <h1 className="text-[36px] leading-[44px] tracking-[-0.72px] font-semibold text-[#181D27]">
              Contact us
            </h1>
            <p className="text-[18px] leading-[28px] md:text-[20px] md:leading-[30px] font-normal text-[#535862] max-w-full w-full md:max-w-[448px]">
              Please submit a request below, and one of our team specialists
              will contact you.
            </p>
          </div>

          <form
            method="post"
            encType="multipart/form-data"
            id="gform_1"
            data-formid="1"
            noValidate
            className="space-y-5"
            onSubmit={handleSubmit}
          >
            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                {submitError}
              </div>
            )}
            <div className="gform-body gform_body space-y-4">
              <ul
                id="gform_fields_1"
                className="gform_fields flex flex-col gap-3"
                data-js="gform_fields"
              >
                <li id="field_1_1" className="gfield flex flex-col gap-[6px]">
                  <label
                    className="gfield_label gform-field-label text-sm text-[#414651] font-medium  "
                    htmlFor="input_1_1"
                  >
                    Full Name <span className="text-[#0086C9] ms-[2px]">*</span>
                  </label>
                  <div className="ginput_container ginput_container_text">
                    <input
                      name="input_1"
                      id="input_1_1"
                      type="text"
                      placeholder="Full Name"
                      aria-required="true"
                      aria-invalid={Boolean(errors.input_1)}
                      className="w-full rounded-[8px] shadow-[0_1px_2px_rgba(10,13,18,0.05)] border border-[#D5D7DA] h-10 px-3 py-2 text-base font-normal text-[#717680] placeholder:text-[#717680] placeholder:text-base focus:border-[#36BFFA] focus:ring-2 focus:ring-[#36BFFA]/30 outline-none"
                      value={values.input_1}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.input_1 && (
                    <p className="text-xs text-red-500">{errors.input_1}</p>
                  )}
                </li>

                <li id="field_1_7" className="gfield flex flex-col gap-[6px]">
                  <label
                    className="gfield_label gform-field-label text-sm text-[#414651] font-medium "
                    htmlFor="input_1_7"
                  >
                    Company Name{" "}
                    <span className="text-[#0086C9] ms-[2px]">*</span>
                  </label>
                  <div className="ginput_container ginput_container_text">
                    <input
                      name="input_7"
                      id="input_1_7"
                      type="text"
                      placeholder="Company Name"
                      aria-required="true"
                      aria-invalid={Boolean(errors.input_7)}
                          className="department-select w-full rounded-[8px] shadow-[0_1px_2px_rgba(10,13,18,0.05)] border border-[#D5D7DA] h-10 px-3 py-2 text-base text-[#717680] placeholder:text-[#717680] placeholder:text-base focus:border-[#36BFFA] focus:ring-2 focus:ring-[#36BFFA]/30 outline-none"
                      value={values.input_7}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.input_7 && (
                    <p className="text-xs text-red-500">{errors.input_7}</p>
                  )}
                </li>

                <li className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div
                    id="field_1_12"
                    className="gfield  flex flex-col gap-[6px]"
                  >
                    <label
                      className="gfield_label gform-field-label text-sm text-[#414651] font-medium "
                      htmlFor="input_1_12"
                    >
                      Email <span className="text-[#0086C9] ms-[2px]">*</span>
                    </label>
                    <div className="ginput_container ginput_container_email">
                      <input
                        name="input_12"
                        id="input_1_12"
                        type="email"
                        placeholder="you@company.com"
                        aria-required="true"
                        aria-invalid={Boolean(errors.input_12)}
                        className="w-full rounded-[8px] shadow-[0_1px_2px_rgba(10,13,18,0.05)] border border-[#D5D7DA] h-10 px-3 py-2 text-base text-[#717680] placeholder:text-[#717680] placeholder:text-base focus:border-[#36BFFA] focus:ring-2 focus:ring-[#36BFFA]/30 outline-none"
                        value={values.input_12}
                        onChange={handleInputChange}
                      />
                    </div>
                    {errors.input_12 && (
                      <p className="text-xs text-red-500">{errors.input_12}</p>
                    )}
                  </div>

                  <div
                    id="field_1_13"
                    className="gfield flex flex-col gap-[6px]"
                  >
                    <label
                      className="gfield_label gform-field-label text-sm text-[#414651] font-medium"
                      htmlFor="input_1_13"
                    >
                      Phone number{" "}
                      <span className="text-[#0086C9] ms-[2px]">*</span>
                    </label>

                    <div
                      className="flex items-center w-full h-10
                      rounded-[8px] border border-[#D5D7DA]
                      shadow-[0_1px_2px_rgba(10,13,18,0.05)]
                      overflow-hidden bg-white"
                    >
                      <div className="relative h-full flex items-center border-r border-[#D5D7DA]">
                        <select
                          className="
                      appearance-none
                      h-full pe-7 ps-3 py-2
                      text-[#535862] text-base font-medium bg-white
                      focus:outline-none cursor-pointer
                    "
                          value={values.selectedCountry}
                          onChange={handleCountryChange}
                          name="selectedCountry"
                          title={countries.find(c => c.code === values.selectedCountry)?.name}
                        >
                          {countries.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.code} {country.dialCode}
                            </option>
                          ))}
                        </select>

                        {/* Custom SVG Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="absolute right-2 pointer-events-none"
                        >
                          <path
                            d="M4 6L8 10L12 6"
                            stroke="#A4A7AE"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      <input
                        name="input_13"
                        id="input_1_13"
                        type="tel"
                        placeholder="(555) 000-0000"
                        aria-required="true"
                        aria-invalid={Boolean(errors.input_13)}
                        className="
                    flex-1 h-full ps-3 pe-3 py-2 text-base
                    text-[#414651] placeholder:text-[#94A3B8]
                    focus:outline-none
                  "
                        value={values.input_13}
                        onChange={handleInputChange}
                      />
                    </div>

                    {errors.input_13 && (
                      <p className="text-xs text-red-500">{errors.input_13}</p>
                    )}
                  </div>
                </li>

                <li className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
                  <div id="field_1_9" className=" flex flex-col gap-[6px] ">
                    <label
                      className="gfield_label gform-field-label text-sm text-[#414651] font-medium "
                      htmlFor="input_1_9"
                    >
                      Department{" "}
                      <span className="text-[#0086C9] ms-[2px]">*</span>
                    </label>
                    <div className="ginput_container ginput_container_text">
                      <select
                        name="input_9"
                        id="input_1_9"
                        aria-required="true"
                        aria-invalid={Boolean(errors.input_9)}
                        className="w-full rounded-[8px] shadow-[0_1px_2px_rgba(10,13,18,0.05)] border border-[#D5D7DA] h-10 px-3 py-2 text-base text-[#717680] placeholder:text-[#717680] placeholder:text-base focus:border-[#36BFFA] focus:ring-2 focus:ring-[#36BFFA]/30 outline-none"
                        value={values.input_9}
                        onChange={handleInputChange}
                      >
                        <option value="" className="gf_placeholder">
                          *Department
                        </option>
                        <option value="Sales">Sales</option>
                        <option value="Billing">Billing</option>
                        <option value="Support">Support</option>
                      </select>
                    </div>
                    {errors.input_9 && (
                      <p className="text-xs text-red-500">{errors.input_9}</p>
                    )}
                  </div>

                  <div
                    id="field_1_18"
                    className="gfield  flex flex-col gap-[6px] h-[66px]"
                  >
                    <label
                      className="gfield_label gform-field-label text-sm text-[#414651] font-medium "
                      htmlFor="input_1_18"
                    >
                      Location/City
                    </label>
                    <div className="ginput_container ginput_container_text">
                      <input
                        name="input_18"
                        id="input_1_18"
                        type="text"
                        placeholder="City/Location you are inquiring about"
                        aria-invalid="false"
                        className="w-full rounded-[8px] shadow-[0_1px_2px_rgba(10,13,18,0.05)] border border-[#D5D7DA] h-10 px-3 py-2 text-base text-[#717680] placeholder:text-[#717680] placeholder:text-base focus:border-[#36BFFA] focus:ring-2 focus:ring-[#36BFFA]/30 outline-none"
                        value={values.input_18}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </li>

                <li id="field_1_10" className="gfield  flex flex-col gap-[6px]">
                  <label
                    className="gfield_label gform-field-label text-sm text-[#414651] font-medium "
                    htmlFor="input_1_10"
                  >
                    Message <span className="text-[#0086C9] ms-[2px]">*</span>
                  </label>
                  <div className="ginput_container ginput_container_textarea h-[134px]">
                    <textarea
                      name="input_10"
                      id="input_1_10"
                      placeholder="Leave us a message..."
                      aria-required="true"
                      aria-invalid={Boolean(errors.input_10)}
                      rows={4}
                      className="w-full rounded-[8px] shadow-[0_1px_2px_rgba(10,13,18,0.05)] border border-[#D5D7DA] h-[134px] px-3.5 py-3 text-base text-[#717680] placeholder:text-[#717680] placeholder:text-base focus:border-[#36BFFA] focus:ring-2 focus:ring-[#36BFFA]/30 outline-none resize-none"
                      value={values.input_10}
                      onChange={handleInputChange}
                    />
                  </div>
                  {errors.input_10 && (
                    <p className="text-xs text-red-500">{errors.input_10}</p>
                  )}
                </li>

                <li id="field_1_11" className="flex flex-col gap-[6px]">
                  <label className="text-sm text-[#414651] font-medium">
                    I would like help with:
                  </label>
                  <div className="">
                    <ul className="flex flex-col gap-[6px]" id="input_1_11">
                      {helpOptions.map((option) => (
                        <li key={option.id} className="flex items-center gap-3">
                          <input
                            className="h-5 w-5 appearance-none  border border-[#D5D7DA] rounded-[6px] bg-white checked:border-[#36BFFA] checked:bg-[#36BFFA] checked:bg-[url('/newcheck.svg')] checked:bg-no-repeat checked:bg-center checked:bg-[length:16px] cursor-pointer"
                            name={option.name}
                            type="checkbox"
                            value={option.value}
                            id={option.id}
                            checked={values[option.name]}
                            onChange={handleInputChange}
                          />

                          <label
                            htmlFor={option.id}
                            id={`label_${option.name.replace(".", "_")}`}
                            className="font-base font-medium text-[#535862]"
                          >
                            {option.label}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>

                <li id="field_1_20" className="gfield flex flex-col gap-[6px]">
                  <div className="ginput_container ginput_container_consent pt-[40px] flex items-start gap-3">
                    <input
                      name="input_20.1"
                      id="input_1_20_1"
                      type="checkbox"
                      value="1"
                      aria-required="true"
                      aria-invalid={Boolean(errors["input_20.1"])}
                      className="h-5 w-5 appearance-none  border border-[#D5D7DA] rounded-[6px] bg-white checked:border-[#36BFFA] checked:bg-[#36BFFA] checked:bg-[url('/newcheck.svg')] checked:bg-no-repeat checked:bg-center checked:bg-[length:16px] cursor-pointer"
                      checked={values["input_20.1"]}
                      onChange={handleInputChange}
                    />
                    <label
                      className="text-[16px] leading-6  font-bold text-[#535862]"
                      htmlFor="input_1_20_1"
                    >
                      I agree to the{" "}
                      <a
                        href="/privacy-policy/"
                        target="_blank"
                        className="text-[#0BA5EC] text-base font-bold"
                      >
                        privacy policy
                      </a>
                      .
                    </label>
                    <input
                      type="hidden"
                      name="input_20.2"
                      value='I agree to the <a href="/opus-virtual-offices-terms-of-use/" target="_blank">Terms of Use.</a>'
                      className="gform_hidden"
                    />
                    <input
                      type="hidden"
                      name="input_20.3"
                      value="2"
                      className="gform_hidden"
                    />
                  </div>
                  {errors["input_20.1"] && (
                    <p className="text-xs text-red-500">
                      {errors["input_20.1"]}
                    </p>
                  )}
                </li>
              </ul>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                id="gform_submit_button_1"
                disabled={isSubmitting}
                className="w-full rounded-md bg-[#36BFFA] h-12 py-3 px-[18px] text-base text-white font-semibold hover:bg-[#026aa2] disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer transition-colors flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send message"
                )}
              </button>
            </div>

            {confirmationMessage && (
              <div
                className="gform_confirmation_wrapper mt-4"
                dangerouslySetInnerHTML={{ __html: confirmationMessage }}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
