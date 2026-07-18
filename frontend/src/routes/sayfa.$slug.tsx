import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { api } from "@/integrations/api";

export const Route = createFileRoute("/sayfa/$slug")({
  loader: async ({ params }) => {
    const res = await api.pages(`slug=${params.slug}`);
    return res.data;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${(loaderData as Record<string,string>)?.seo_title || (loaderData as Record<string,string>)?.title || "Sayfa"} — ARKS Yapı Teknolojileri` },
      { name: "description", content: (loaderData as Record<string,string>)?.seo_description || "" },
    ],
  }),
  component: PageView,
});

function PageView() {
  const data = Route.useLoaderData() as Record<string, string> | null;
  if (!data) return <PageShell><section className="pt-40 pb-20"><div className="container-editorial"><p>Sayfa bulunamadı.</p></div></section></PageShell>;

  return (
    <PageShell>
      <section className="pt-32 lg:pt-40 pb-16">
        <div className="container-editorial">
          <h1 className="display-lg text-forest-deep">{data.title}</h1>
        </div>
      </section>
      <section className="pb-24">
        <div className="container-editorial max-w-3xl text-lg text-muted-foreground leading-relaxed space-y-4">
          {data.content && <div dangerouslySetInnerHTML={{ __html: data.content }} />}
        </div>
      </section>
    </PageShell>
  );
}
