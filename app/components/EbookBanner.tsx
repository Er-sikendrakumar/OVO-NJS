'use client';
import { useState } from "react";
import { MailIcon } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { motion } from "framer-motion";
import { useLoading } from "@/app/components/GlobalLoadingOverlay";

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const bgCtaPromoImg = "/bg-cta-promo_1761591480531.webp";
const man_holding_tablet = "/man-holding-tablet.webp";

export function EbookBanner() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { showLoading, hideLoading } = useLoading();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    showLoading();

    try {
      // Determine the base URL - use staging URL for localhost, relative URL for staging/production
      const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      const baseUrl = isLocalhost ? 'https://njs.opusvirtualoffices.com' : '';

      const response = await fetch(`${baseUrl}/wp-json/opus/v1/forms/submit/29`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input_1: email
        }),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response from server');
      }

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setEmail('');
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.message || 'Failed to submit form. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Failed to submit form. Please try again.');
      console.error('Error submitting ebook form:', error);
    } finally {
      setIsSubmitting(false);
      hideLoading();
    }
  };

  return (
    <section className="flex flex-col w-full items-center justify-center gap-8 sm:gap-12 md:gap-16 px-0 py-0 sm:py-0 md:py-0 bg-basewhite">
      <motion.div
        className="items-center justify-center flex max-w-screen-xl w-full px-4 sm:px-6 md:px-8 py-0"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <div className="flex flex-col lg:flex-row items-start py-[40px] justify-between gap-6 sm:gap-8 p-6 sm:p-8 md:px-10 lg:px-16 md:py-5 flex-1 rounded-2xl overflow-hidden shadow-shadows-shadow-md bg-cover bg-center relative" style={{ backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(to bottom, rgba(255, 255, 255, 0.67), rgba(255, 255, 255, 0.67)), url(${bgCtaPromoImg})` }}>
          <div className="flex flex-col items-start justify-center gap-4 sm:gap-5 flex-1 w-full lg:w-auto max-w-[730px]">
            <div className="flex flex-col gap-4 sm:gap-5 w-full">
              <Badge
                variant="secondary"
                className="text-[#0085c9] font-text-sm-text-md-semibold font-[number:var(--text-sm-text-md-semibold-font-weight)] text-[length:var(--text-sm-text-md-semibold-font-size)] tracking-[var(--text-sm-text-md-semibold-letter-spacing)] leading-[var(--text-sm-text-md-semibold-line-height)] [font-style:var(--text-sm-text-md-semibold-font-style)] bg-transparent border-0 p-0 h-auto w-fit"
              >
                Get your Free Ebook
              </Badge>

              <div className="font-semibold text-[#3d455a] text-2xl sm:text-3xl md:text-4xl tracking-[-0.72px] leading-tight">
                6-Steps for Starting a Business
              </div>

              <p className="font-normal text-gray-900 text-[20px] sm:text-[20px] md:text-xl tracking-[0] leading-[30px]">
                Your Complete Guide to Building a Successful Business<br></br>
                Foundation with Confidence
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-[600px] w-full items-start gap-3 sm:gap-4">
              <div className="flex flex-col items-start gap-1.5 flex-1 w-full">
                <div className="flex flex-col items-start gap-1.5 w-full">
                  <div className="flex items-center gap-2 px-3.5 py-3 w-full bg-[#ffffff] rounded-lg h-[48px] border border-solid shadow-[0px_1px_2px_#0a0c120d]">
                    <MailIcon className="w-5 h-5 text-gray-500" />
                    <Input
                      type="email"
                      name="input_1"
                      id="input_29_1"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="flex-1 border-0 shadow-none p-0 h-auto font-normal text-[#717680] text-base tracking-[0] leading-normal focus-visible:ring-0 focus-visible:ring-offset-0"
                      data-testid="input-email-ebook"
                    />
                  </div>
                </div>

                {submitStatus === 'success' && (
                  <p className="font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-green-600 text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
                    Success! Check your email for the ebook.
                  </p>
                )}

                {submitStatus === 'error' && (
                  <p className="font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-red-600 text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
                    {errorMessage}
                  </p>
                )}

                {submitStatus === 'idle' && (
                  <p className="font-text-sm-regular font-[number:var(--text-sm-regular-font-weight)] text-gray-600 text-[length:var(--text-sm-regular-font-size)] tracking-[var(--text-sm-regular-letter-spacing)] leading-[var(--text-sm-regular-line-height)] [font-style:var(--text-sm-regular-font-style)]">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-[48px] inline-flex items-center justify-center gap-1.5 px-[18px] py-3 w-full sm:w-auto bg-blue-light400 hover:bg-blue-light700 transition-colors rounded-lg border border-solid border-[#36bff9] hover:border-blue-light700 shadow-shadows-shadow-xs font-text-sm-text-md-semibold font-[number:var(--text-sm-text-md-semibold-font-weight)] text-basewhite text-[length:var(--text-sm-text-md-semibold-font-size)] tracking-[var(--text-sm-text-md-semibold-letter-spacing)] leading-[var(--text-sm-text-md-semibold-line-height)] [font-style:var(--text-sm-text-md-semibold-font-style)] disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="button-get-ebook"
              >
                {isSubmitting ? 'Submitting...' : 'Get your Ebook'}
              </Button>
            </form>
          </div>

          <div className="hidden lg:flex flex-1 relative overflow-hidden -mb-5 -mr-16 items-center justify-center">
            <img
              className="w-[304px] h-full object-cover object-center"
              alt="Asian man portrait"
              src={man_holding_tablet}
              width="304"
              height="324"
              loading="lazy"
              style={{ display: 'block', minHeight: '324px' }} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
