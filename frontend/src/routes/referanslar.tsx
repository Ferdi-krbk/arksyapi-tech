import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { useReferences } from "@/hooks/queries";

export const Route = createFileRoute("/referanslar")({
  head: () => ({
    meta: [
      { title: "Referanslar — ARKS Yapı Teknolojileri" },
      { name: "description", content: "ARKS Yapı Teknolojileri ile çalışan kurumsal referanslar." },
      { property: "og:title", content: "Referanslar — ARKS Yapı Teknolojileri" },
      { property: "og:description", content: "Türkiye'nin önde gelen sanayi ve inşaat firmalarının tercihi." },
    ],
  }),
  component: References,
});

function References() {
  const { data: references = [] } = useReferences();

  return (
    <PageShell>
      <section className="pt-32 lg:pt-40 pb-16">
        <div className="container-editorial">
          <Reveal>
          <p className="eyebrow text-forest mb-6">— Referanslar</p>
          <h1 className="display-lg text-forest-deep max-w-4xl">
            Güvenin<br /> <span className="italic font-light">kısa listesi.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
            Türkiye'nin önde gelen sanayi, enerji ve inşaat firmaları
            uzun soluklu projelerinde ARKS Yapı Teknolojileri ile çalışıyor.
          </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="container-editorial">
          {references.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">Henüz referans eklenmedi.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-forest-deep/20">
              {references.map((r) => (
                <div
                  key={r.id}
                  className="relative aspect-[3/2] border-r border-b border-forest-deep/20 flex items-center justify-center p-8 text-center hover:bg-sage-soft/40 transition-colors overflow-hidden group"
                >
                  {r.logo_url ? (
                    <img
                      src={r.logo_url}
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain p-8 opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-500 scale-125"
                      loading="lazy"
                    />
                  ) : null}
                  <span className="relative font-display text-xl md:text-2xl text-forest-deep font-medium">
                    {r.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
