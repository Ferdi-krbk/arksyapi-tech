import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback } from "react";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { Lightbox } from "@/components/site/Lightbox";
import { GalleryGridSkeleton } from "@/components/site/Skeleton";
import { useGallery } from "@/hooks/queries";

export const Route = createFileRoute("/galeri")({
  head: () => ({
    meta: [
      { title: "Galeri — ARKS Yapı Teknolojileri" },
      { name: "description", content: "ARKS projelerinden görüntüler." },
      { property: "og:title", content: "Galeri — ARKS Yapı Teknolojileri" },
      { property: "og:description", content: "Polyurea, poliüretan ve sürme izolasyon uygulamalarımızdan kareler." },
    ],
  }),
  component: Gallery,
});

type GalleryItem = { id: number; title: string | null; image_url: string; category: string | null };

function Gallery() {
  const { data: items = [], isLoading } = useGallery();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : items.length - 1)), [items.length]);
  const next = useCallback(() => setLightboxIndex((i) => (i !== null && i < items.length - 1 ? i + 1 : 0)), [items.length]);

  return (
    <PageShell>
      <section className="pt-32 lg:pt-40 pb-16">
        <div className="container-editorial">
          <Reveal>
          <p className="eyebrow text-forest mb-6">— Galeri</p>
          <h1 className="display-lg text-forest-deep max-w-4xl">Sahadan <span className="italic font-light">kareler.</span></h1>
          </Reveal>
        </div>
      </section>
      <section className="pb-24">
        <div className="container-editorial">
          {isLoading ? <GalleryGridSkeleton />
          : items.length === 0 ? <p className="text-muted-foreground">Henüz görsel eklenmedi.</p>
          : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {items.map((g, i) => (
                <button
                  key={g.id}
                  onClick={() => openLightbox(i)}
                  className="break-inside-avoid overflow-hidden group cursor-zoom-in w-full text-left"
                >
                  <img src={g.image_url} alt={g.title || "Galeri"} loading="lazy" className="w-full h-auto group-hover:scale-105 transition-transform duration-700" />
                  {g.title && <p className="text-xs text-muted-foreground mt-2">{g.title}</p>}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={items.map((g) => ({ id: g.id, image_url: g.image_url, title: g.title }))}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prev}
          onNext={next}
        />
      )}
    </PageShell>
  );
}
