import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell } from "./PageShell";
import { Reveal } from "./Reveal";
import { SERVICES, getService } from "@/lib/services";
import { useServices } from "@/hooks/queries";

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
  const { data: services = [] } = useServices();

  const dbService = services.find((s) => s.slug === slug) ?? null;

  const title   = dbService?.title || staticEntry?.title || slug;
  const tagline = dbService?.short_description || staticEntry?.tagline || "";
  const intro   = dbService?.short_description || staticEntry?.intro || "";
  const detail  = dbService?.content || staticEntry?.detail || "";
  const features = staticEntry?.features || [];
  const image   = dbService?.image_url || staticEntry?.image || "";
  const imgPos  = staticEntry?.imagePosition || "center";
  const index   = staticEntry?.index || "";

  const others = SERVICES.filter((s) => s.slug !== slug);

  return (
    <PageShell>
      <section className="pt-32 lg:pt-40 pb-16">
        <div className="container-editorial">
          <div className="grid grid-cols-12 gap-6 items-end mb-16">
            <motion.div className="col-span-2 md:col-span-1"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="eyebrow text-forest">{index}</p>
            </motion.div>
            <div className="col-span-10 md:col-span-11">
              <motion.p className="eyebrow text-forest mb-6"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              >— Hizmet</motion.p>
              <motion.h1 className="display-lg text-forest-deep"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              >{title}</motion.h1>
              <motion.p className="mt-8 font-display text-2xl md:text-3xl text-forest max-w-2xl font-light italic"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                {tagline}
              </motion.p>
            </div>
          </div>

          {image && (
            <motion.img
              src={image}
              alt={title}
              className="w-full aspect-[16/9] max-h-[70vh] object-cover"
              style={{ objectPosition: imgPos }}
              width={1600}
              height={900}
              initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
        </div>
      </section>

      <section className="py-20">
        <div className="container-editorial grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-5">
            <Reveal>
            <p className="eyebrow text-forest mb-6">— Sistem</p>
            <p className="text-forest-deep font-display text-2xl leading-snug">
              {intro}
            </p>
            </Reveal>

            {/* Ozellikler — madde madde, estetik liste */}
            {features.length > 0 && (
              <ul className="mt-10 space-y-3">
                {features.map((f, i) => (
                  <motion.li key={f} className="flex items-start gap-4 border-b border-forest-deep/10 pb-3"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="eyebrow text-forest/60 text-sm pt-1 tabular-nums">0{i + 1}</span>
                    <span className="text-forest-deep leading-snug">{f}</span>
                  </motion.li>
                ))}
              </ul>
            )}
          </div>
          <Reveal className="col-span-12 md:col-span-6 md:col-start-7" delay={0.1}>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {detail}
            </p>
            <Link
              to="/iletisim"
              className="inline-flex items-center gap-3 mt-10 bg-forest-deep text-bone px-7 py-4 text-sm font-medium hover:bg-forest transition-colors"
            >
              Bu sistem için teklif al <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="py-24 border-t border-forest-deep/15">
        <div className="container-editorial">
          <Reveal>
            <p className="eyebrow text-forest mb-10">— Diğer Sistemler</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {others.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.08}>
              <Link
                to={s.to}
                className="group block border-t border-forest-deep/20 pt-6 hover:border-forest-deep transition-colors"
              >
                <p className="eyebrow text-forest">{s.index}</p>
                <p className="font-display text-2xl text-forest-deep mt-4 group-hover:translate-x-1 transition-transform">
                  {s.title}
                </p>
                <p className="text-sm text-muted-foreground mt-3">{s.tagline}</p>
              </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
