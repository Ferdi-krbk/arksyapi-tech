import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { api } from "@/integrations/api";
import fallbackIndustrial from "@/assets/project-industrial.jpg";
import fallbackGreenRoof from "@/assets/project-green-roof.jpg";
import fallbackMembrane from "@/assets/project-membrane.jpg";

export const Route = createFileRoute("/projeler")({
  head: () => ({
    meta: [
      { title: "Tamamlanan Projeler — ARKS Yapı Teknolojileri" },
      { name: "description", content: "ARKS tarafından tamamlanan endüstriyel yalıtım ve kaplama projeleri." },
      { property: "og:title", content: "Tamamlanan Projeler — ARKS Yapı Teknolojileri" },
      { property: "og:description", content: "Sahada, ölçekte, sessizce tamamlanan projeler." },
    ],
  }),
  component: Projects,
});

type ProjectRow = {
  id: number;
  title: string;
  slug: string;
  location: string | null;
  completion_date: string | null;
  summary: string | null;
  cover_image: string | null;
  cover_image_url: string | null;
  category_name: string | null;
};

const FALLBACKS = [fallbackIndustrial, fallbackGreenRoof, fallbackMembrane];

function resolveImg(row: ProjectRow, i: number): string {
  if (row.cover_image_url) return row.cover_image_url;
  return FALLBACKS[i % FALLBACKS.length];
}

function Projects() {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.projects()
      .then((res) => {
        setProjects((res.data as unknown as ProjectRow[]) ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <PageShell>
      <section className="pt-32 lg:pt-40 pb-16">
        <div className="container-editorial">
          <p className="eyebrow text-forest mb-6">— Tamamlanan Projeler</p>
          <h1 className="display-lg text-forest-deep max-w-4xl">
            Ölçekte, <span className="italic font-light">sessizce.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
            Endüstriyel, kamu ve premium konut projelerinde ölçekten ödün vermeden
            uygulanan çözümlerimizden bir seçki.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-editorial">
          {loading ? (
            <p className="text-muted-foreground">Yükleniyor…</p>
          ) : projects.length === 0 ? (
            <p className="text-muted-foreground">Henüz proje eklenmedi.</p>
          ) : (
            <div className="grid grid-cols-12 gap-6 gap-y-16">
              {projects.map((p, i) => (
                <figure
                  key={p.id}
                  className={`group overflow-hidden ${
                    i % 5 === 0 ? "col-span-12 md:col-span-8"
                    : i % 5 === 1 ? "col-span-12 md:col-span-4"
                    : i % 5 === 2 ? "col-span-12 md:col-span-5"
                    : i % 5 === 3 ? "col-span-12 md:col-span-7"
                    : "col-span-12 md:col-span-6"
                  }`}
                >
                  <div className="overflow-hidden">
                    <img
                      src={resolveImg(p, i)}
                      alt={p.title}
                      loading="lazy"
                      width={1400}
                      height={1000}
                      className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
                    />
                  </div>
                  <figcaption className="mt-5 flex justify-between items-baseline gap-4">
                    <div>
                      <p className="eyebrow text-forest">
                        {p.category_name ?? "Proje"}
                        {p.location ? ` / ${p.location}` : ""}
                      </p>
                      <p className="font-display text-2xl text-forest-deep mt-1">{p.title}</p>
                      {p.summary && (
                        <p className="text-sm text-muted-foreground mt-2 max-w-md">{p.summary}</p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-muted-foreground">
                        {p.completion_date ? new Date(p.completion_date).getFullYear() : ""}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
