import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import type { NewsItem } from "@/hooks/queries";
import { api } from "@/integrations/api";

type NewsDetail = NewsItem & { content?: string; thumbnail_url?: string; published_at?: string };

export const Route = createFileRoute("/haberler/$slug")({
  loader: async ({ params }) => {
    const res = await api.news(`slug=${params.slug}`);
    return (res.data as NewsDetail) ?? null;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title || "Haber"} — ARKS Yapı Teknolojileri` },
      { name: "description", content: loaderData?.summary || "Haber detayı" },
    ],
  }),
  component: NewsDetail,
});

function NewsDetail() {
  const item = Route.useLoaderData() as NewsDetail | null;
  if (!item) return <PageShell><section className="pt-40 pb-20"><div className="container-editorial"><p>Haber bulunamadı.</p></div></section></PageShell>;

  return (
    <PageShell>
      <section className="pt-32 lg:pt-40 pb-16">
        <div className="container-editorial">
          <p className="eyebrow text-forest mb-6">— Haber</p>
          <h1 className="display-lg text-forest-deep max-w-4xl">{item.title}</h1>
          <p className="text-xs text-muted-foreground mt-4">{item.published_at?.split(" ")[0]}</p>
        </div>
      </section>
      {item.thumbnail_url && (
        <section className="pb-16">
          <div className="container-editorial">
            <img src={item.thumbnail_url} alt={item.title} className="w-full aspect-[16/9] max-h-[65vh] object-cover" />
          </div>
        </section>
      )}
      <section className="pb-24">
        <div className="container-editorial max-w-3xl">
          <div className="text-lg text-muted-foreground leading-relaxed space-y-4 prose-editorial" dangerouslySetInnerHTML={{ __html: item.content || "" }} />
        </div>
      </section>
    </PageShell>
  );
}
