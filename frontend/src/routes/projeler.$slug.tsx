import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { api, type Row } from "@/integrations/api";

export const Route = createFileRoute("/projeler/$slug")({
  loader: async ({ params }) => {
    const res = await api.projects(`slug=${params.slug}`);
    return (res.data as Row) ?? null;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${(loaderData as Row)?.title || "Proje"} — ARKS Yapı Teknolojileri` },
      { name: "description", content: (loaderData as Row)?.summary as string || "Proje detayı" },
    ],
  }),
  component: ProjectDetail,
});

type ProjectImage = { id: number; image_url: string; caption: string | null };

function ProjectDetail() {
  const p = Route.useLoaderData() as (Row & { images?: ProjectImage[] }) | null;

  if (!p) {
    return (
      <PageShell>
        <section className="pt-40 pb-24">
          <div className="container-editorial text-center">
            <p className="eyebrow text-forest mb-4">— Proje</p>
            <h1 className="display-lg text-forest-deep">Proje bulunamadı.</h1>
            <Link to="/projeler" className="inline-block mt-8 text-sm text-forest-deep border-b border-forest-deep pb-1">Tüm projeler →</Link>
          </div>
        </section>
      </PageShell>
    );
  }

  const images = (p.images as ProjectImage[]) ?? [];
  const meta: { label: string; value: string }[] = [];
  if (p.client_name) meta.push({ label: "Müşteri", value: p.client_name as string });
  if (p.location) meta.push({ label: "Konum", value: p.location as string });
  if (p.completion_date) meta.push({ label: "Tamamlanma", value: new Date(p.completion_date as string).toLocaleDateString("tr-TR") });
  if (p.category_name) meta.push({ label: "Kategori", value: p.category_name as string });

  return (
    <PageShell>
      {/* Baslik */}
      <section className="pt-32 lg:pt-40 pb-12">
        <div className="container-editorial">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <Link to="/projeler" className="eyebrow text-forest hover:text-forest-deep transition-colors">← Projeler</Link>
            <h1 className="display-lg text-forest-deep max-w-4xl mt-6">{p.title as string}</h1>
            {p.summary && <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">{p.summary as string}</p>}
          </motion.div>
        </div>
      </section>

      {/* Kapak gorseli */}
      {p.cover_image_url && (
        <section className="pb-12">
          <div className="container-editorial">
            <motion.img
              src={p.cover_image_url as string}
              alt={p.title as string}
              className="w-full h-[62vh] object-cover"
              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </section>
      )}

      {/* Detaylar + icerik */}
      <section className="pb-20">
        <div className="container-editorial grid grid-cols-12 gap-10">
          {/* Sol: kunye */}
          {meta.length > 0 && (
            <Reveal className="col-span-12 md:col-span-4">
              <div className="border-t border-forest-deep/20 pt-6 space-y-6">
                {meta.map((m) => (
                  <div key={m.label}>
                    <p className="eyebrow text-forest/60 mb-1">{m.label}</p>
                    <p className="font-display text-lg text-forest-deep">{m.value}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {/* Sag: ne yapildi (icerik) */}
          <Reveal className={meta.length > 0 ? "col-span-12 md:col-span-7 md:col-start-6" : "col-span-12 md:col-span-8"} delay={0.1}>
            <p className="eyebrow text-forest mb-6">— Projede Neler Yapıldı</p>
            <div className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
              {(p.content as string) || (p.summary as string) || ""}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Proje fotograflari (galeri) */}
      {images.length > 0 && (
        <section className="pb-24">
          <div className="container-editorial">
            <Reveal>
              <p className="eyebrow text-forest mb-8">— Proje Görselleri</p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((img, i) => (
                <motion.figure key={img.id} className="group overflow-hidden"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img src={img.image_url} alt={img.caption || (p.title as string)} loading="lazy"
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-[1200ms]" />
                  {img.caption && <figcaption className="text-sm text-muted-foreground mt-2">{img.caption}</figcaption>}
                </motion.figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Alt CTA */}
      <section className="pb-24">
        <div className="container-editorial">
          <Link to="/iletisim" className="inline-flex items-center gap-3 bg-forest-deep text-bone px-7 py-4 text-sm font-medium hover:bg-forest transition-colors">
            Benzer bir proje için teklif alın <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
