import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "./PageShell";
import { SERVICES, type Service, getService } from "@/lib/services";
import { api } from "@/integrations/api";

type ServiceFromApi = {
  id: number;
  title: string;
  slug: string;
  short_description: string | null;
  content: string | null;
  image: string | null;
  image_url: string | null;
};

export function ServicePage({ slug }: { slug: string }) {
  const staticEntry = getService(slug);
  const [dbService, setDbService] = useState<ServiceFromApi | null>(null);

  useEffect(() => {
    api.services().then((res) => {
      const list = res.data as ServiceFromApi[];
      const found = list.find((s) => s.slug === slug) ?? null;
      setDbService(found);
    }).catch(() => {});
  }, [slug]);

  // DB'de varsa oradan, yoksa statik veriden al
  const title   = dbService?.title || staticEntry?.title || slug;
  const tagline = dbService?.short_description || staticEntry?.tagline || "";
  const intro   = dbService?.short_description || staticEntry?.intro || "";
  const detail  = dbService?.content || staticEntry?.detail || "";
  const features = staticEntry?.features || [];
  const image   = dbService?.image_url || staticEntry?.image || "";
  const index   = staticEntry?.index || "";

  const others = SERVICES.filter((s) => s.slug !== slug);

  return (
    <PageShell>
      <section className="pt-32 lg:pt-40 pb-16">
        <div className="container-editorial">
          <div className="grid grid-cols-12 gap-6 items-end mb-16">
            <div className="col-span-2 md:col-span-1">
              <p className="eyebrow text-forest">{index}</p>
            </div>
            <div className="col-span-10 md:col-span-11">
              <p className="eyebrow text-forest mb-6">— Hizmet</p>
              <h1 className="display-lg text-forest-deep">{title}</h1>
              <p className="mt-8 font-display text-2xl md:text-3xl text-forest max-w-2xl font-light italic">
                {tagline}
              </p>
            </div>
          </div>

          {image && (
            <img
              src={image}
              alt={title}
              className="w-full h-[60vh] object-cover"
              width={1400}
              height={900}
            />
          )}
        </div>
      </section>

      <section className="py-20">
        <div className="container-editorial grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-5">
            <p className="eyebrow text-forest mb-6">— Sistem</p>
            <p className="text-forest-deep font-display text-2xl leading-snug">
              {intro}
            </p>

            {/* Ozellikler — Sistem basliginin altindaki bosluga */}
            {features.length > 0 && (
              <div className="mt-10 grid grid-cols-2 gap-px bg-forest-deep/15 border border-forest-deep/15">
                {features.map((f, i) => (
                  <div key={f} className="bg-bone p-5 flex flex-col gap-3 min-h-[130px]">
                    <span className="eyebrow text-forest">0{i + 1}</span>
                    <span className="text-forest-deep font-display text-base leading-snug">{f}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {detail}
            </p>
            <Link
              to="/iletisim"
              className="inline-flex items-center gap-3 mt-10 bg-forest-deep text-bone px-7 py-4 text-sm font-medium hover:bg-forest transition-colors"
            >
              Bu sistem için teklif al <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-forest-deep/15">
        <div className="container-editorial">
          <p className="eyebrow text-forest mb-10">— Diğer Sistemler</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {others.map((s) => (
              <Link
                key={s.slug}
                to={s.to}
                className="group block border-t border-forest-deep/20 pt-6 hover:border-forest-deep transition-colors"
              >
                <p className="eyebrow text-forest">{s.index}</p>
                <p className="font-display text-2xl text-forest-deep mt-4 group-hover:translate-x-1 transition-transform">
                  {s.title}
                </p>
                <p className="text-sm text-muted-foreground mt-3">{s.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
