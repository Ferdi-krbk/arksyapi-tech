import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { ProjectCardSkeleton } from "@/components/site/Skeleton";
import { useProjects, projectsQueryOptions, type ProjectItem } from "@/hooks/queries";
import fallbackIndustrial from "@/assets/project-industrial.jpg";
import fallbackGreenRoof from "@/assets/project-green-roof.jpg";
import fallbackMembrane from "@/assets/project-membrane.jpg";

export const Route = createFileRoute("/projeler/")({
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(projectsQueryOptions());
  },
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

const FALLBACKS = [fallbackIndustrial, fallbackGreenRoof, fallbackMembrane];

function resolveImg(row: ProjectItem, i: number): string {
  if (row.cover_image_url) return row.cover_image_url;
  return FALLBACKS[i % FALLBACKS.length];
}

function Projects() {
  const { data: projects = [], isLoading } = useProjects();

  return (
    <PageShell>
      <section className="pt-32 lg:pt-40 pb-16">
        <div className="container-editorial">
          <Reveal>
          <p className="eyebrow text-forest mb-6">— Tamamlanan Projeler</p>
          <h1 className="display-lg text-forest-deep max-w-4xl">
            Ölçekte, <span className="italic font-light">sessizce.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
            Endüstriyel, kamu ve premium konut projelerinde ölçekten ödün vermeden
            uygulanan çözümlerimizden bir seçki.
          </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="container-editorial">
          {isLoading ? (
            <div className="grid grid-cols-12 gap-6 gap-y-16">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className={
                    i % 5 === 0 ? "col-span-12 md:col-span-8"
                    : i % 5 === 1 ? "col-span-12 md:col-span-4"
                    : i % 5 === 2 ? "col-span-12 md:col-span-5"
                    : i % 5 === 3 ? "col-span-12 md:col-span-7"
                    : "col-span-12 md:col-span-6"
                  }
                >
                  <ProjectCardSkeleton />
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <p className="text-muted-foreground">Henüz proje eklenmedi.</p>
          ) : (
            <div className="grid grid-cols-12 gap-6 gap-y-16">
              {projects.map((p, i) => (
                <Link
                  key={p.id}
                  to="/projeler/$slug"
                  params={{ slug: p.slug }}
                  className={`group overflow-hidden block ${
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
                      width={1200}
                      height={900}
                      className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
                    />
                  </div>
                  <figcaption className="mt-5 flex justify-between items-baseline gap-4">
                    <div>
                      <p className="eyebrow text-forest">
                        {p.category_name ?? "Proje"}
                        {p.location ? ` / ${p.location}` : ""}
                      </p>
                      <p className="font-display text-2xl text-forest-deep mt-1 group-hover:translate-x-1 transition-transform">{p.title}</p>
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
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
