import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { useReferences } from "@/hooks/queries";

function bestCols(total: number): number {
  if (total <= 4) return total;
  let best = 4;
  let bestRem = total;
  for (let cols = 3; cols <= Math.min(6, total); cols++) {
    const rem = total % cols;
    if (rem === 0) return cols;
    if (rem < bestRem || (rem === bestRem && cols > best)) {
      best = cols;
      bestRem = rem;
    }
  }
  return best;
}

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
  const cols = useMemo(() => bestCols(references.length), [references.length]);

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
            <div
              className="grid gap-2"
              style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
            >
              {references.map((r) => (
                <div
                  key={r.id}
                  className="relative aspect-[3/2] flex items-center justify-center p-6 lg:p-8 text-center hover:bg-sage-soft/40 transition-colors overflow-hidden group border border-forest-deep/15"
                >
                  {r.logo_url ? (
                    <img
                      src={r.logo_url}
                      alt=""
                      className="absolute inset-0 w-full h-full object-contain p-8 opacity-[0.30] group-hover:opacity-[0.45] transition-opacity duration-500 scale-125"
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
