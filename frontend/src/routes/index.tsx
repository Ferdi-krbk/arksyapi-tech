import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { PageShell } from "@/components/site/PageShell";
import { Testimonials } from "@/components/site/Testimonials";
import { useSliders, useReferences, slidersQueryOptions, projectsQueryOptions } from "@/hooks/queries";
import heroImg from "@/assets/hero-green-roof.jpg";
import heroLogoImg from "@/assets/arks-hero-white.png";
import heroLogoDark from "@/assets/arks-hero-dark.png";

export const Route = createFileRoute("/")({
  loader: ({ context }) => {
    const { queryClient } = context;
    queryClient.prefetchQuery(slidersQueryOptions());
    queryClient.prefetchQuery(projectsQueryOptions());
  },
  component: Home,
});

function Home() {
  const { data: sliders = [] } = useSliders();
  const { data: references = [] } = useReferences();
  const [activeIdx, setActiveIdx] = useState(0);

  // Her 5 saniyede slider degistir
  useEffect(() => {
    if (sliders.length <= 1) return;
    const t = setInterval(() => setActiveIdx((i) => (i + 1) % sliders.length), 5000);
    return () => clearInterval(t);
  }, [sliders.length]);

  const activeSlider = sliders[activeIdx] ?? null;
  const heroImage = activeSlider?.image_url || heroImg;
  const heroSub = activeSlider?.subtitle || "Kalıcı koruma.";

  return (
    <PageShell>
      {/* HERO — asymmetric 60/40 with vertical index */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="container-editorial">
          <div className="grid grid-cols-12 gap-6 lg:gap-10 items-end">
            <div className="col-span-12 lg:col-span-7 xl:col-span-8">
              <motion.p
                className="eyebrow text-forest mb-8"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >— Est. Endüstriyel Yalıtım</motion.p>
              <motion.h1
                className="display-lg text-forest-deep"
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="italic font-medium text-forest">{heroSub}</span>
              </motion.h1>
              <motion.div
                className="mt-10 flex flex-wrap items-center gap-6"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to="/projeler"
                  className="group inline-flex items-center gap-3 bg-forest-deep text-bone px-7 py-4 text-sm font-medium hover:bg-forest transition-colors"
                >
                  Tamamlanan Projeler
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                </Link>
                <Link to="/iletisim" className="text-sm text-forest-deep underline underline-offset-8 decoration-1 hover:decoration-2">
                  Teklif alın
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Hero — buyuk ARKS logosu (acik temada koyu yesil panel + beyaz logo,
              koyu temada acik panel + koyu logo) */}
          <motion.div
            className="mt-20 relative overflow-hidden hero-panel flex items-center justify-center"
            style={{ minHeight: "38vh" }}
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeSlider?.image_url ? (
              <img
                src={heroImage}
                alt={activeSlider?.title || "ARKS"}
                width={1600}
                height={1200}
                className="w-full h-full absolute inset-0 object-cover transition-all duration-1000 opacity-40"
              />
            ) : null}
            <img
              src={heroLogoImg}
              alt="ARKS Yapı Teknolojileri"
              className="relative z-10 w-[60%] max-w-[300px] h-auto py-5 px-3 dark:hidden"
              width={800}
              height={202}
            />
            <img
              src={heroLogoDark}
              alt="ARKS Yapı Teknolojileri"
              className="relative z-10 w-[60%] max-w-[300px] h-auto py-5 px-3 hidden dark:block"
              width={800}
              height={202}
            />
            {sliders.length > 1 && (
              <div className="absolute top-6 right-6 md:top-10 md:right-10 flex gap-2 z-20">
                {sliders.map((_, i) => (
                  <button key={i} onClick={() => setActiveIdx(i)}
                    className={`w-3 h-3 rounded-full transition-colors ${i === activeIdx ? "bg-bone" : "bg-bone/40"}`}
                    aria-label={`Slider ${i + 1}`} />
                ))}
              </div>
            )}
          </motion.div>

          {/* SPRAY GUN — slider alt yazisi puskurtme */}
          {heroSub && (
          <div className="mt-14 mb-6">
            <motion.div
              className="flex flex-wrap justify-center gap-x-2 gap-y-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            >
              {heroSub.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  variants={{
                    hidden: { opacity: 0, scale: 0, x: -60, filter: "blur(8px)" },
                    visible: {
                      opacity: 1, scale: 1, x: 0, filter: "blur(0px)",
                      transition: { type: "spring", stiffness: 350, damping: 16, mass: 0.5 },
                    },
                  }}
                >
                  <span className="font-display text-4xl md:text-6xl font-light text-forest-deep/80">
                    {word}
                  </span>
                </motion.span>
              ))}
            </motion.div>
          </div>
          )}
        </div>
      </section>

      {/* REFERENCES — marquee */}
      <section className="py-24 border-y border-forest-deep/15 bg-sage-soft/30 overflow-hidden">
        <div className="container-editorial mb-12">
          <p className="eyebrow text-forest">— Referanslar</p>
        </div>
        <div className="relative group">
          <div className="flex gap-20 marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
            {references.length > 0
              ? [...references, ...references].map((r, i) => (
                  <span
                    key={`${r.id}-${i}`}
                    className="inline-flex items-center gap-5 font-display text-lg md:text-xl text-forest-deep/50 hover:text-forest-deep transition-colors duration-300"
                  >
                    {r.logo_url && (
                      <img src={r.logo_url} alt="" className="h-12 w-auto max-w-[100px] object-contain opacity-40 group-hover:opacity-70 transition-opacity" loading="lazy" />
                    )}
                    {r.name}
                  </span>
                ))
              : <span className="font-display text-2xl text-forest-deep/40">Henüz referans eklenmedi.</span>}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — otomatik kayan referanslar */}
      <Testimonials />

      {/* CONTACT CTA */}
      <section className="py-24 lg:py-40">
        <div className="container-editorial">
          <div className="grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 md:col-span-7">
              <p className="eyebrow text-forest mb-6">— İletişim</p>
              <h2 className="display-lg text-forest-deep">
                Bir sonraki yapı<br /> birlikte ayakta kalsın.
              </h2>
            </div>
            <div className="col-span-12 md:col-span-5 md:pl-10">
              <p className="text-muted-foreground leading-relaxed mb-8">
                Projelerinizin ölçeği ne olursa olsun; keşif, tasarım ve uygulama
                aşamalarında yanınızdayız. İlk görüşme ve keşif ücretsizdir.
              </p>
              <Link
                to="/iletisim"
                className="inline-flex items-center gap-3 bg-forest-deep text-bone px-8 py-4 text-sm font-medium hover:bg-forest transition-colors"
              >
                Bize ulaşın <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
