/**
 * api.ts
 * Kendi PHP backend API'mize fetch() ile baglanir.
 * Dogrudan /api/* uclarina istek atar.
 */

const API_BASE = typeof window !== "undefined"
  ? window.location.origin.replace(":5173", ":8000") + "/api"
  : "http://localhost:8000/api";

export type ApiResponse<T = unknown> = {
  data: T;
  count?: number;
  success?: boolean;
  message?: string;
};

async function request<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const url = `${API_BASE}/${endpoint}`;
  const res = await fetch(url, options);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error || `HTTP ${res.status}`);
  }
  return res.json() as Promise<ApiResponse<T>>;
}

export type Row = Record<string, unknown>;

export const api = {
  /** GET /api/news.php  (?slug= veya ?limit=) */
  news(params?: string) {
    return request<Row[] | Row>(`news.php${params ? `?${params}` : ""}`);
  },

  /** GET /api/projects.php  (?slug=) */
  projects(params?: string) {
    return request<Row[] | Row>(`projects.php${params ? `?${params}` : ""}`);
  },

  /** GET /api/services.php */
  services() {
    return request<Row[]>("services.php");
  },

  /** GET /api/gallery.php */
  gallery() {
    return request<Row[]>("gallery.php");
  },

  /** GET /api/sliders.php */
  sliders() {
    return request<Row[]>("sliders.php");
  },

  /** GET /api/pages.php  (?slug=) */
  pages(params?: string) {
    return request<Row[] | Row>(`pages.php${params ? `?${params}` : ""}`);
  },

  /** GET /api/settings.php */
  settings() {
    return request<Record<string, string | null>>("settings.php");
  },

  /** POST /api/contact.php */
  contact(payload: Record<string, string | null>) {
    return request<{ success: boolean; message: string }>("contact.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  },
} as const;
