/**
 * Skylight Production Monitoring Layer
 * Integration stub for Sentry.io
 */

import * as Sentry from "@sentry/nextjs";

export function initSentry() {
  if (process.env.NODE_ENV !== "production") return;

  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    
    // Performance Monitoring
    tracesSampleRate: 0.2, // Capture 20% of transactions for performance
    
    // Error Filtering
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'Non-Error promise rejection captured'
    ],

    // Deployment Context
    environment: process.env.NODE_ENV,
    release: "skylight-hotel@1.0.0",
  });
}

/**
 * Capture custom operational events (e.g. Booking Failures)
 */
export function captureOpEvent(message: string, level: Sentry.SeverityLevel = "info") {
  Sentry.captureMessage(message, level);
}
