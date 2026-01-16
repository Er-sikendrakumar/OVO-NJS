'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NoSurprisePopup.module.css';

const SESSION_KEY = 'nosurprisePopupSeen';

export function NoSurprisePopup() {
  const [isVisible, setIsVisible] = useState(false);
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

    // Show popup after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);

      // Mark as shown in session storage
      try {
        window.sessionStorage.setItem(SESSION_KEY, '1');
      } catch (error) {
        console.warn('Could not set sessionStorage:', error);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    // Add/remove body class to prevent scrolling when popup is open
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
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.popup} aria-hidden={!isVisible}>
      <div className={styles.container}>
        <div className={styles.backdrop} onClick={handleClose} />
        <div className={styles.popupContainer} role="dialog" aria-modal="true" aria-labelledby="nosurprise-popup-heading">
          <button
            className={styles.closeButton}
            type="button"
            aria-label="Close promotion"
            onClick={handleClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
          <div className={styles.popupCard}>
            <div className={styles.imageSection}>
              <div className={styles.imageWrapper} aria-hidden="true">
                <img src="/nosurprise-popup.gif" alt="Opus Virtual Offices NOSURPRISE promotion" />
              </div>
            </div>
            <div className={styles.contentSection}>
              <div className={styles.contentInner}>
                <div className={styles.description} id="nosurprise-popup-heading">
                  <p>
                    Our competitors charge separately for business address and limited phone answering so you end up paying over{' '}
                    <span className={styles.priceHighlight}>$200+</span> per month.{' '}
                    <br aria-hidden="true" />
                    With Opus VO, only <span className={styles.priceBold}>$99/mo</span>. for a COMPLETE virtual office solution including a professional business address, unlimited call answering and more.
                  </p>
                </div>
                <div className={styles.tagline}>
                  <p>No Gimmicks! No Limits! No Misleading Pricing!</p>
                </div>
                <div className={styles.buttonWrapper}>
                  <Link
                    href="/signup/?btn=101&pcode=NOSURPRISES"
                    className={styles.promoButton}
                    onClick={handleClose}
                    prefetch={false}
                  >
                    <span className={styles.promoButtonInner}>
                      <span className={styles.promoButtonContent}>
                        <span className={styles.textPadding}>
                          <span className={styles.promoText}>
                            <span>USE PROMO CODE "<span className={styles.promoHighlight}>NOSURPRISE</span>" AT CHECKOUT</span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
