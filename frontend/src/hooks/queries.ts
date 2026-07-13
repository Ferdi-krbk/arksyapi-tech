import { useQuery, useMutation, queryOptions } from "@tanstack/react-query";
import { api } from "@/integrations/api";

export type SliderItem = {
  id: number;
  title: string | null;
  subtitle: string | null;
  button_text: string | null;
  button_url: string | null;
  image_url: string | null;
};

export type ProjectItem = {
  id: number;
  title: string;
  slug: string;
  location: string | null;
  completion_date: string | null;
  summary: string | null;
  cover_image: string | null;
  cover_image_url: string | null;
  category_name: string | null;
  client_name?: string | null;
  content?: string | null;
};

export type NewsItem = {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  thumbnail_url: string | null;
  published_at: string;
  category_name: string | null;
};

export type ServiceItem = {
  id: number;
  title: string;
  slug: string;
  short_description: string | null;
  content: string | null;
  image: string | null;
  image_url: string | null;
};

export type GalleryItem = {
  id: number;
  title: string | null;
  image_url: string;
  category: string | null;
};

export type ReferenceItem = {
  id: number;
  name: string;
  description: string | null;
  sort_order: number;
  is_active: number;
};

export type TestimonialItem = {
  id: number;
  name: string;
  role: string | null;
  content: string;
  rating: number;
};

export function useSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: () => api.settings().then((r) => r.data as Record<string, string | null>),
    staleTime: 10 * 60 * 1000,
  });
}

export function useSliders() {
  return useQuery({
    queryKey: ["sliders"],
    queryFn: () => api.sliders().then((r) => (r.data ?? []) as SliderItem[]),
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => api.projects().then((r) => (r.data as ProjectItem[]) ?? []),
  });
}

export function useNews() {
  return useQuery({
    queryKey: ["news"],
    queryFn: () => api.news("limit=20").then((r) => (r.data as NewsItem[]) ?? []),
  });
}

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: () => api.services().then((r) => (r.data as ServiceItem[]) ?? []),
    staleTime: 10 * 60 * 1000,
  });
}

export function useGallery() {
  return useQuery({
    queryKey: ["gallery"],
    queryFn: () => api.gallery().then((r) => (r.data as GalleryItem[]) ?? []),
  });
}

export function useTestimonials() {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: () => api.testimonials().then((r) => (r.data as TestimonialItem[]) ?? []),
  });
}

export function useReferences() {
  return useQuery({
    queryKey: ["references"],
    queryFn: () => api.references().then((r) => (r.data as ReferenceItem[]) ?? []),
  });
}

export function usePage(slug: string) {
  return useQuery({
    queryKey: ["pages", slug],
    queryFn: () => api.pages(`slug=${slug}`).then((r) => r.data as Record<string, string>),
  });
}

export function useContactForm() {
  return useMutation({
    mutationFn: (payload: Record<string, string | null>) => api.contact(payload),
  });
}

// Query options for SSR prefetch in route loaders
export const settingsQueryOptions = () =>
  queryOptions({
    queryKey: ["settings"],
    queryFn: () => api.settings().then((r) => r.data as Record<string, string | null>),
    staleTime: 10 * 60 * 1000,
  });

export const slidersQueryOptions = () =>
  queryOptions({
    queryKey: ["sliders"],
    queryFn: () => api.sliders().then((r) => (r.data ?? []) as SliderItem[]),
  });

export const projectsQueryOptions = () =>
  queryOptions({
    queryKey: ["projects"],
    queryFn: () => api.projects().then((r) => (r.data as ProjectItem[]) ?? []),
  });

export const testimonialsQueryOptions = () =>
  queryOptions({
    queryKey: ["testimonials"],
    queryFn: () => api.testimonials().then((r) => (r.data as TestimonialItem[]) ?? []),
  });
