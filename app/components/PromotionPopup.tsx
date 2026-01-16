'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './PromotionPopup.module.css';
import { useLoading } from '@/app/components/GlobalLoadingOverlay';

const SESSION_KEY = 'popupLastShown';

type Step = 1 | 2 | 3;

const PROMO_CODE = 'promo14';

export function PromotionPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { showLoading, hideLoading } = useLoading();
  const pathname = usePathname();

  useEffect(() => {
    // Don't show popup on video pages or plumber page
    if (pathname.startsWith('/videos/') || pathname === '/virtual-office-for-plumbers' || pathname === '/virtual-office-for-plumbers/') {
      return;
    }

    // Check if popup was already shown in this session
    try {
      const wasShown = window.sessionStorage.getItem(SESSION_KEY);
      if (wasShown) {
        return; // Don't show popup if already shown this session
      }
    } catch (error) {
      console.warn('SessionStorage not available:', error);
    }

    // Show popup after 2 minutes (120000ms)
    const timer = setTimeout(() => {
      setIsVisible(true);

      // Mark as shown in session storage with current datetime
      try {
        window.sessionStorage.setItem(SESSION_KEY, new Date().toString());
      } catch (error) {
        console.warn('Could not set sessionStorage:', error);
      }
    }, 120000); // 2 minutes

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    // Add/remove body scroll lock when popup is open
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  useEffect(() => {
    // Handle ESC key to close popup
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    setCurrentStep(1);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleMoveToStep2 = () => {
    setCurrentStep(2);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    showLoading();

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    try {
      // Determine the base URL - use staging URL for localhost, relative URL for staging/production
      const isLocalhost = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      const baseUrl = isLocalhost ? 'https://njs.opusvirtualoffices.com' : '';

      // Form 27 - Promo Popup
      const response = await fetch(`${baseUrl}/wp-json/opus/v1/forms/submit/27`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'input_3.3': name,
          'input_4': email,
          'input_5': phone || ''
        }),
      });

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response from server');
      }

      const result = await response.json();

      if (result.success) {
        setCurrentStep(3);
        // Reset form
        (event.target as HTMLFormElement).reset();
      } else {
        setErrorMessage(result.message || 'Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
      hideLoading();
    }
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.modal} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <button
          className={styles.close}
          onClick={handleClose}
          aria-label="Close promotion"
          type="button"
        >
          ×
        </button>

        {/* Step 1: Promo */}
        {currentStep === 1 && (
        <div className={styles.step1}>
          <div className={styles.head}>We are currently running special promotions!</div>
          <ul>
            <li>
              <div className={styles.promosaItemsContainer}>
                <div className={styles.promosaBox}>
                  <img
                    className={styles.promosaImg}
                    src="/live-receptionist.jpg"
                    alt="Live receptionist"
                    loading="lazy"
                  />
                  <p className={styles.promosaText}>
                    LIVE<br />RECEPTIONIST
                  </p>
                </div>
                <div className={styles.promosaBox}>
                  <img
                    className={styles.promosaImg}
                    src="/mailing-address.jpg"
                    alt="Corporate Mailing Address"
                    loading="lazy"
                  />
                  <p className={styles.promosaText}>
                    CORPORATE<br />MAILING ADDRESS
                  </p>
                </div>
                <div className={styles.promosaBox}>
                  <img
                    className={styles.promosaImg}
                    src="/phone.jpg"
                    alt="Local Business Phone"
                    loading="lazy"
                  />
                  <p className={styles.promosaText}>
                    LOCAL<br />BUSINESS PHONE
                  </p>
                </div>
                <p className={styles.promosaMoreText}>AND MORE FOR ONLY $99/MONTH!</p>
              </div>
            </li>
          </ul>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary} ${styles.actionButton}`}
            onClick={handleMoveToStep2}
          >
            Click here to find out more
          </button>
        </div>
        )}

        {/* Step 2: Form */}
        {currentStep === 2 && (
        <div className={styles.step2}>
          <div className={styles.formContainer}>
            {errorMessage && (
              <div className={styles.errorMessage}>{errorMessage}</div>
            )}
            <p>Instant $100 Special Promo Code!</p>
            <p>
              Enter your information below to get an <b>INSTANT</b> special promotion code that will waive $100
              setup fee upon signup!
            </p>
            <form onSubmit={handleFormSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">
                  Name<span>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">
                  Email<span>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  disabled={isSubmitting}
                />
              </div>
              <div className={`${styles.formGroup} ${styles.formGroupCenter}`}>
                {!isSubmitting ? (
                  <button
                    type="submit"
                    className={`${styles.btn} ${styles.btnPrimary}`}
                  >
                    Submit
                  </button>
                ) : (
                  <div className={styles.loadingRing}>Loading...</div>
                )}
              </div>
            </form>
          </div>
        </div>
        )}

        {/* Step 3: Thank You */}
        {currentStep === 3 && (
        <div className={styles.step3}>
          <div className={styles.head}>Your special promotion code is:</div>
          <p style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
            <b style={{ fontSize: '26px', color: '#333' }}>{PROMO_CODE}</b>
            <br /><br />
            <span style={{ color: '#666' }}>Enter this code at checkout to waive $100 setup fee.</span>
          </p>
          <a
            id="gosignup"
            href={`/signup/?btn=88&acode=${PROMO_CODE}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              margin: '0 auto',
              padding: '20px',
              display: 'block',
              background: 'rgb(23, 182, 42)',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              marginTop: '20px',
              textAlign: 'center',
              fontSize: '20px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: '"Helvetica Neue","Helvetica",Helvetica,Arial,sans-serif',
              width: '307px',
              textDecoration: 'none'
            }}
          >
            Click here to <b>Sign up</b>
          </a>
        </div>
        )}
      </div>
    </div>
  );
}
