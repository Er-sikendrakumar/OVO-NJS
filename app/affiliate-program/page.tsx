"use client";

import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

interface FormDataType {
  input_1: string;  // Email
  input_8: string;  // First Name
  input_9: string;  // Last Name
  input_6: string;  // Phone Number
  input_7: string;  // Company Website/Social Profile
}

interface FormErrors {
  input_1?: string;
  input_8?: string;
  input_9?: string;
  input_6?: string;
}

type SubmitStatus = 'idle' | 'success' | 'error';

export default function AffiliateLandingPage() {
  const initialFormState: FormDataType = {
    input_1: "",  // Email
    input_8: "",  // First Name
    input_9: "",  // Last Name
    input_6: "",  // Phone Number
    input_7: "",  // Company Website/Social Profile
  };
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormDataType>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    const newErrors: FormErrors = {};
    if (!formData.input_1) newErrors.input_1 = "Email is required";
    if (!formData.input_8) newErrors.input_8 = "First name is required";
    if (!formData.input_9) newErrors.input_9 = "Last name is required";
    if (!formData.input_6) {
      newErrors.input_6 = "Phone number is required";
    } else {
      const digits = formData.input_6.replace(/\D/g, '');
      if (digits.length < 10) {
        newErrors.input_6 = "Phone number must be at least 10 digits";
      }
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    setLoading(true);
    setSubmitStatus('idle');

    // Open window immediately (during user click event) to avoid popup blockers
    const pdfWindow = window.open('', '_blank');

    // Write a loading message to the blank window
    if (pdfWindow) {
      pdfWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Loading Your Guide...</title>
            <style>
              body {
                margin: 0;
                padding: 0;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
                background: linear-gradient(135deg, #36BFFA 0%, #026aa2 100%);
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                color: white;
              }
              .loader-container {
                text-align: center;
              }
              .spinner {
                border: 4px solid rgba(255, 255, 255, 0.3);
                border-top: 4px solid white;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
              }
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              h1 {
                font-size: 24px;
                font-weight: 600;
                margin: 0 0 10px 0;
              }
              p {
                font-size: 16px;
                opacity: 0.9;
                margin: 0;
              }
            </style>
          </head>
          <body>
            <div class="loader-container">
              <div class="spinner"></div>
              <h1>Preparing Your Affiliate Guide...</h1>
              <p>Your download will begin shortly</p>
            </div>
          </body>
        </html>
      `);
    }

    try {
      // Determine the base URL - use staging URL for localhost, relative URL for staging/production
      const isLocalhost = typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      const baseUrl = isLocalhost ? 'https://njs.opusvirtualoffices.com' : '';

      // Submit to WordPress Gravity Forms endpoint
      const response = await fetch(`${baseUrl}/wp-json/opus/v1/forms/submit/37`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Set success status
        setSubmitStatus('success');

        // Reset form
        setFormData(initialFormState);
        setErrors({});

        // Redirect the already-opened window to the PDF
        if (pdfWindow) {
          pdfWindow.location.href = `${baseUrl}/newsite/wp-content/themes/ThemeDec23/assets/pdf/Opus-Affiliate-Program.pdf`;
        }
      } else {
        // Handle error - close the opened window
        if (pdfWindow) {
          pdfWindow.close();
        }
        setSubmitStatus('error');
        setErrors({ input_1: data.message || 'Failed to submit form. Please try again.' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Close the opened window on error
      if (pdfWindow) {
        pdfWindow.close();
      }
      setSubmitStatus('error');
      setErrors({ input_1: 'Failed to submit form. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="w-full pt-[72px] lg:pt-[104px]">
      <section className="w-full flex justify-center flex-col overflow-hidden items-stretch relative pb-5 md:pb-10">
        <div className="w-full max-w-[1280px] m-auto py-[20px] md:py-[40px] flex">
          {/* LEFT SECTION */}
          <div className="flex flex-col items-start gap-4 lg:gap-6 max-w-full md:max-w-[700px] w-full md:w-[50%] xl:w-[100%] px-4 md:pl-8 md:pe-2">
            <h1 className="text-[#3E465A] font-inter text-[24px] leading-[32px] tracking-normal lg:text-[48px] lg:leading-[60px] lg:tracking-[-0.96px] font-semibold ">
              Earn Thousands of Dollars Through Opus VO's Affiliate Program
            </h1>
            <p className="text-[#475467] font-inter text-[14px] leading-[20px] md:text-[16px] md:leading-[24px] lg:text-[18px] lg:leading-[28px] font-medium md:font-normal ">
              Enjoy industry-leading commissions, extended tracking, and a
              trusted brand that converts.
            </p>
            <div>
              <p className="text-[#475467] font-inter text-[14px] leading-[20px] md:text-[16px] md:leading-[24px] lg:text-[18px] lg:leading-[28px] font-semibold md:font-bold mb-3">
                Download the Affiliate Quick Start Guide Now to See:
              </p>

              <ul className="text-[#475467] font-inter text-[14px] leading-[20px] md:text-[16px] md:leading-[24px] lg:text-[18px] lg:leading-[28px] font-normal md:font-medium list-disc pl-5 flex flex-col">
                <li>Step-by-step instructions on how to sign up</li>
                <li>Highlights of the Opus VO affiliate program</li>
                <li>
                  Your affiliate toolkit, including tips + marketing resources
                </li>
                <li>
                  Contact information for Opus VO's affiliate marketing manager
                </li>
              </ul>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-[12px] w-full"
            >
              <div className="flex flex-col gap-[6px] w-full max-w-full md:max-w-[551px]">
                <label className="text-[#344054] font-inter text-[14px] font-medium leading-[20px] flex items-center gap-[8px]">
                  Email <span className="text-[#D92D20]">*</span>
                </label>

                <div className="flex items-center gap-[8px] px-[12px] py-[8px] rounded-[8px] bg-white shadow-[0_1px_3px_rgba(16,24,40,0.10),0_1px_2px_rgba(16,24,40,0.06)] max-w-full w-full md:max-w-[551px]">
                  <input
                    name="input_1"
                    id="input_37_1"
                    type="email"
                    value={formData.input_1}
                    onChange={handleChange}
                    placeholder="Type your email"
                    className="w-full outline-none text-[#667085] text-[16px] leading-[24px]  placeholder:text-[#667085] placeholder:text-[16px] placeholder:leading-[24px]"
                  />
                </div>
                {errors.input_1 ? (
                  <span className="text-[#D92D20] text-sm">
                    {errors.input_1}
                  </span>
                ) : null}
              </div>

              <div className="flex gap-[20px] w-full flex-col md:flex-row max-w-full md:max-w-[551px]">
                <div className="flex flex-col gap-[6px] w-full md:w-[265.5px]">
                  <label className="text-[#344054] font-inter text-[14px] font-medium leading-[20px] flex items-center gap-[8px]">
                    First Name <span className="text-[#D92D20]">*</span>
                  </label>

                  <div className="flex items-center gap-[8px] px-[12px] py-[8px] rounded-[8px] bg-white shadow-[0_1px_3px_rgba(16,24,40,0.10),0_1px_2px_rgba(16,24,40,0.06)]">
                    <input
                      name="input_8"
                      id="input_37_8"
                      type="text"
                      value={formData.input_8}
                      onChange={handleChange}
                      placeholder="Type your first name"
                      className="w-full outline-none text-[#667085] text-[16px] leading-[24px]  placeholder:text-[#667085] placeholder:text-[16px] placeholder:leading-[24px]"
                    />
                  </div>
                  {errors.input_8 ? (
                    <span className="text-[#D92D20] text-sm">
                      {errors.input_8}
                    </span>
                  ) : null}
                </div>

                <div className="flex flex-col gap-[6px] w-full md:w-[265.5px]">
                  <label className="text-[#344054] font-inter text-[14px] font-medium leading-[20px] flex items-center gap-[8px]">
                    Last Name <span className="text-[#D92D20]">*</span>
                  </label>

                  <div className="flex items-center gap-[8px] px-[12px] py-[8px] rounded-[8px] bg-white shadow-[0_1px_3px_rgba(16,24,40,0.10),0_1px_2px_rgba(16,24,40,0.06)]">
                    <input
                      name="input_9"
                      id="input_37_9"
                      type="text"
                      value={formData.input_9}
                      onChange={handleChange}
                      placeholder="Type your last name"
                      className="w-full outline-none text-[#667085] text-[16px] leading-[24px]  placeholder:text-[#667085] placeholder:text-[16px] placeholder:leading-[24px]"
                    />
                  </div>
                  {errors.input_9 ? (
                    <span className="text-[#D92D20] text-sm">
                      {errors.input_9}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col gap-[6px] w-full max-w-full md:max-w-[551px]">
                <label className="text-[#344054] font-inter text-[14px] font-medium leading-[20px] flex items-center gap-[8px]">
                  Phone Number <span className="text-[#D92D20]">*</span>
                </label>

                <div className="flex items-center gap-[8px] px-[12px] py-[8px] rounded-[8px] bg-white shadow-[0_1px_3px_rgba(16,24,40,0.10),0_1px_2px_rgba(16,24,40,0.06)] max-w-full w-full md:max-w-[551px]">
                  <input
                    name="input_6"
                    id="input_37_6"
                    type="text"
                    value={formData.input_6}
                    onChange={handleChange}
                    placeholder="Type your phone number"
                    className="w-full outline-none text-[#667085] text-[16px] leading-[24px]  placeholder:text-[#667085] placeholder:text-[16px] placeholder:leading-[24px]"
                  />
                </div>
                {errors.input_6 ? (
                  <span className="text-[#D92D20] text-sm">
                    {errors.input_6}
                  </span>
                ) : null}
              </div>

              <div className="flex flex-col gap-[6px] w-full max-w-full md:max-w-[551px]">
                <label className="text-[#344054] font-inter text-[14px] font-medium leading-[20px]">
                  Company Website/Social Profile
                </label>

                <div className="flex items-center gap-[8px] px-[12px] py-[8px] rounded-[8px] bg-white shadow-[0_1px_3px_rgba(16,24,40,0.10),0_1px_2px_rgba(16,24,40,0.06)] max-w-full w-full md:max-w-[551px]">
                  <input
                    name="input_7"
                    id="input_37_7"
                    type="text"
                    value={formData.input_7}
                    onChange={handleChange}
                    placeholder="Type your website or social profile"
                    className="w-full outline-none text-[#667085] text-[16px] leading-[24px] placeholder:text-[#667085] placeholder:text-[16px] placeholder:leading-[24px]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    id="gform_submit_button_37"
                    className="flex justify-center items-center mt-1 md:mt-3 px-[14px] md:px-[16px] py-[10px] gap-[6px] w-full md:w-[163px] rounded-[8px] bg-[#36BFFA] text-white text-[14px] leading-[20px] md:text-[16px] font-semibold md:leading-[24px] hover:bg-[#026aa2] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    style={loading ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                  >
                    Download Guide
                  </button>
                  {loading && (
                    <span className="inline-block w-4 h-4 border-2 border-[#f3f3f3] border-t-[#333] rounded-full animate-spin"></span>
                  )}
                </div>
                {submitStatus === 'success' && (
                  <p className="text-green-600 text-sm font-medium">
                    Thank you! Your guide is opening in a new tab.
                  </p>
                )}
              </div>
            </form>
          </div>
          {/* RIGHT SECTION */}
          <div className="flex items-center relative">
            <img
              src="/affiliate-program-opus-landing.webp"
              alt="Affiliate Program"
              className="h-auto  hidden md:block xl:absolute 2xl:absolute right-auto left-0 max-w-none"
            />
          </div>
        </div>
        <div className="pt-[28px] pb-5 md:pb-[40px] px-4 md:px-8 md:pt-0">
          <p className="text-[#3E465A] text-center font-inter text-[20px] font-medium leading-[30px]">
            Join
            <span className="text-[#0BA5EC] font-inter text-[20px] font-medium leading-[30px]">
              {" "}
              1,000+
            </span>{" "}
            affiliates already earning with Opus VO - with millions in
            commissions paid out.
          </p>
        </div>
      </section>
      <Footer />
    </main>
    </>
  );
}
