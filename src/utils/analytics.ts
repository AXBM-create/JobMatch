/**
 * Google Analytics (gtag.js) Integration Utility
 * Supports Google Analytics 4 (GA4), Google Ads conversion tags, and custom events.
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Measurement ID from environment or fallback
export const GA_MEASUREMENT_ID = (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_GA_MEASUREMENT_ID) || "G-BMNVDSLKPM";

/**
 * Track a page view in Google Analytics
 */
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "page_view", {
      page_location: window.location.href,
      page_path: url,
      page_title: title || document.title,
    });
  }
};

/**
 * Track custom conversion or user engagement event
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, eventParams);
  } else {
    // Debug log in dev mode if gtag is not yet loaded
    if (typeof import.meta !== "undefined" && (import.meta as any).env?.DEV) {
      console.log(`[Google Analytics Event]: ${eventName}`, eventParams);
    }
  }
};
