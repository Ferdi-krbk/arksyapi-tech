import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";

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

const REFERENCES = [
  "Aksa Enerji", "Borusan Mannesmann", "Çimsa Çimento", "Enerjisa",
  "Ford Otosan", "İGA İstanbul Havalimanı", "Kalyon Holding", "Limak İnşaat",
  "MNG Kargo", "Tekfen İnşaat", "Türk Telekom", "Zorlu Enerji",
  "Anadolu Efes", "Arçelik", "Coca-Cola İçecek", "Doğuş İnşaat",
  "ENKA İnşaat", "Eczacıbaşı", "Şişecam", "TAV Havalimanları",
];

function References() {
  return (
    <PageShell>
      <section className="pt-32 lg:pt-40 pb-16">
        <div className="container-editorial">
          <p className="eyebrow text-forest mb-6">— Referanslar</p>
          <h1 className="display-lg text-forest-deep max-w-4xl">
            Güvenin<br /> <span className="italic font-light">kısa listesi.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
            Türkiye'nin önde gelen sanayi, enerji ve inşaat firmaları
            uzun soluklu projelerinde ARKS Yapı Teknolojileri ile çalışıyor.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-editorial">
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-forest-deep/20">
            {REFERENCES.map((r) => (
              <div
                key={r}
                className="aspect-[3/2] border-r border-b border-forest-deep/20 flex items-center justify-center p-6 text-center hover:bg-sage-soft/40 transition-colors"
              >
                <span className="font-display text-xl text-forest-deep">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
