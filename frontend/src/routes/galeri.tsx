import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { api } from "@/integrations/api";

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
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.gallery().then((res) => {
      setItems((res.data as GalleryItem[]) ?? []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

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
          {loading ? <p className="text-muted-foreground">Yükleniyor…</p>
          : items.length === 0 ? <p className="text-muted-foreground">Henüz görsel eklenmedi.</p>
          : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {items.map((g) => (
                <div key={g.id} className="break-inside-avoid overflow-hidden group">
                  <img src={g.image_url} alt={g.title || "Galeri"} loading="lazy" className="w-full h-auto group-hover:scale-105 transition-transform duration-700" />
                  {g.title && <p className="text-xs text-muted-foreground mt-2">{g.title}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
