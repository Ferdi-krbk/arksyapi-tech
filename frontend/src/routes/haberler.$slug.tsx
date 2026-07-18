import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { api, type Row } from "@/integrations/api";

export const Route = createFileRoute("/haberler/$slug")({
  loader: async ({ params }) => {
    const res = await api.news(`slug=${params.slug}`);
    return (res.data as Row) ?? null;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${(loaderData as Row)?.title || "Haber"} — ARKS Yapı Teknolojileri` },
      { name: "description", content: (loaderData as Row)?.summary as string || "Haber detayı" },
    ],
  }),
  component: NewsDetail,
});

function NewsDetail() {
  const item = Route.useLoaderData() as Row | null;
  if (!item) return <PageShell><section className="pt-40 pb-20"><div className="container-editorial"><p>Haber bulunamadı.</p></div></section></PageShell>;

  return (
    <PageShell>
      <section className="pt-32 lg:pt-40 pb-16">
        <div className="container-editorial">
          <p className="eyebrow text-forest mb-6">— Haber</p>
          <h1 className="display-lg text-forest-deep max-w-4xl">{item.title as string}</h1>
          <p className="text-xs text-muted-foreground mt-4">{(item.published_at as string)?.split(" ")[0]}</p>
        </div>
      </section>
      {item.thumbnail_url && (
        <section className="pb-16">
          <div className="container-editorial">
            <img src={item.thumbnail_url as string} alt={item.title as string} className="w-full max-h-[60vh] object-cover" />
          </div>
        </section>
      )}
      <section className="pb-24">
        <div className="container-editorial max-w-3xl">
          <div className="text-lg text-muted-foreground leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: (item.content as string) || "" }} />
        </div>
      </section>
    </PageShell>
  );
}
