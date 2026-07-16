type ErrorReportOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

/**
 * Basit hata raporlayici. Su an konsola yazar.
 * Ileride Sentry vb. bir servise baglanmak istersen burayi genisletebilirsin.
 */
export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  console.error("[app-error]", error, {
    route: window.location.pathname,
    ...context,
  });
}
