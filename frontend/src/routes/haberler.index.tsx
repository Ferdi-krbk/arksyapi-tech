import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { NewsCardSkeleton } from "@/components/site/Skeleton";
import { useNews } from "@/hooks/queries";
import { api } from "@/integrations/api";

export const Route = createFileRoute("/haberler/")({
  loader: ({ context }) => {
    context.queryClient.prefetchQuery({ queryKey: ["news"], queryFn: () => api.news("limit=20").then((r) => (r.data as Record<string, unknown>[]) ?? []) });
  },
  head: () => ({
    meta: [
      { title: "Haberler — ARKS Yapı Teknolojileri" },
      { name: "description", content: "ARKS'tan sektör haberleri ve güncellemeler." },
      { property: "og:title", content: "Haberler — ARKS Yapı Teknolojileri" },
      { property: "og:description", content: "Endüstriyel yalıtım ve kaplama sektöründen güncel haberler." },
    ],
  }),
  component: NewsList,
});

function NewsList() {
  const { data: items = [], isLoading } = useNews();

  return (
    <PageShell>
      <section className="pt-32 lg:pt-40 pb-16">
        <div className="container-editorial">
          <Reveal>
          <p className="eyebrow text-forest mb-6">— Haberler</p>
          <h1 className="display-lg text-forest-deep max-w-4xl">Sektörden <span className="italic font-light">haberler.</span></h1>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="container-editorial">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <NewsCardSkeleton key={i} />
              ))}
            </div>
          ) : items.length === 0 ? (
            <p className="text-muted-foreground">Henüz haber eklenmedi.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((n, i) => (
                <Reveal key={n.id} delay={(i % 3) * 0.08}>
                <Link
                  to="/haberler/$slug"
                  params={{ slug: n.slug }}
                  className="group block border-t border-forest-deep/20 pt-6 hover:border-forest-deep transition-colors"
                >
                  {n.thumbnail_url && (
                    <img src={n.thumbnail_url} alt={n.title} className="w-full aspect-[16/10] object-cover mb-5" loading="lazy" width={800} height={500} />
                  )}
                  {n.category_name && <p className="eyebrow text-forest mb-2">{n.category_name}</p>}
                  <h3 className="font-display text-2xl text-forest-deep group-hover:translate-x-1 transition-transform">{n.title}</h3>
                  {n.summary && <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{n.summary}</p>}
                  <p className="text-xs text-muted-foreground mt-4">{n.published_at?.split(" ")[0]}</p>
                </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
