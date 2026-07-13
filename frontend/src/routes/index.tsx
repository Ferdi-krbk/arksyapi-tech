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

/* ── Premium animation helpers ── */
const ease: [number, number, number, number] = [0.33, 1, 0.68, 1];

const revealFromLeft = {
  hidden: { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
  visible: (i: number) => ({
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    transition: { duration: 0.9, delay: 0.3 + i * 0.18, ease },
  }),
};

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease } },
});

function Home() {
  const { data: sliders = [] } = useSliders();
  const { data: references = [] } = useReferences();
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (sliders.length <= 1) return;
    const t = setInterval(() => setActiveIdx((i) => (i + 1) % sliders.length), 5000);
    return () => clearInterval(t);
  }, [sliders.length]);

  const activeSlider = sliders[activeIdx] ?? null;
  const heroImage = activeSlider?.image_url || heroImg;

  return (
    <PageShell>
      <motion.div initial="hidden" animate="visible" className="overflow-hidden">
        {/* ─── HERO ─── */}
        <section className="relative min-h-screen flex flex-col justify-center">
          <div className="container-editorial py-24 lg:py-0">
            <div className="max-w-5xl">
              {/* Eyebrow */}
              <motion.p
                className="eyebrow text-forest mb-10"
                variants={fadeUp(0)}
                initial="hidden"
                animate="visible"
              >
                — Est. Endüstriyel Yalıtım
              </motion.p>

              {/* Main headline — spray-reveal clip-path */}
              <motion.h1
                className="display-xl text-forest-deep leading-none"
                variants={revealFromLeft}
                custom={0}
                initial="hidden"
                animate="visible"
              >
                Polyurea ve
              </motion.h1>

              <motion.p
                className="display-xl text-forest leading-none mt-1"
                variants={revealFromLeft}
                custom={1}
                initial="hidden"
                animate="visible"
                style={{ fontStyle: "italic", fontWeight: 300 }}
              >
                poliüretan çözümleri
              </motion.p>

              {/* Buttons */}
              <motion.div
                className="mt-14 flex flex-wrap items-center gap-6"
                variants={fadeUp(1.2)}
                initial="hidden"
                animate="visible"
              >
                <Link
                  to="/projeler"
                  className="group inline-flex items-center gap-3 bg-forest-deep text-bone px-8 py-4 text-sm font-medium hover:bg-forest transition-colors duration-300"
                >
                  Tamamlanan Projeler
                  <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </Link>
                <Link
                  to="/iletisim"
                  className="text-sm text-forest-deep underline underline-offset-8 decoration-1 hover:decoration-2 transition-all"
                >
                  Teklif alın
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Background spray texture — subtle dot grid */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <div
              className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, currentColor 0.5px, transparent 0.5px)",
                backgroundSize: "28px 28px",
                color: "var(--forest-deep)",
              }}
            />
          </div>
        </section>

        {/* ─── HERO PANEL — ARKS logosu ─── */}
        <motion.div
          className="container-editorial"
          variants={fadeUp(1.6)}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="relative overflow-hidden hero-panel flex items-center justify-center"
            style={{ minHeight: "34vh" }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.6, ease }}
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
              className="relative z-10 w-[50%] max-w-[260px] h-auto py-5 px-3 dark:hidden"
              width={800}
              height={202}
            />
            <img
              src={heroLogoDark}
              alt="ARKS Yapı Teknolojileri"
              className="relative z-10 w-[50%] max-w-[260px] h-auto py-5 px-3 hidden dark:block"
              width={800}
              height={202}
            />
            {sliders.length > 1 && (
              <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex gap-2 z-20">
                {sliders.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === activeIdx ? "bg-bone scale-125" : "bg-bone/30 hover:bg-bone/60"
                    }`}
                    aria-label={`Slider ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* ─── REFERENCES ─── */}
        <motion.div
          variants={fadeUp(2.2)}
          initial="hidden"
          animate="visible"
        >
          <section className="py-24 mt-20 border-y border-forest-deep/10 bg-sage-soft/20 overflow-hidden">
            <div className="container-editorial mb-12">
              <p className="eyebrow text-forest">— Referanslar</p>
            </div>
            <div className="relative group">
              <div className="flex gap-20 marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
                {references.length > 0 ? (
                  [...references, ...references].map((r, i) => (
                    <span
                      key={`${r.id}-${i}`}
                      className="inline-flex items-center gap-5 font-display text-lg md:text-xl text-forest-deep/45 hover:text-forest-deep transition-colors duration-500"
                    >
                      {r.logo_url && (
                        <img
                          src={r.logo_url}
                          alt=""
                          className="h-12 w-auto max-w-[100px] object-contain opacity-35"
                          loading="lazy"
                        />
                      )}
                      {r.name}
                    </span>
                  ))
                ) : (
                  <span className="font-display text-2xl text-forest-deep/40">
                    Henüz referans eklenmedi.
                  </span>
                )}
              </div>
            </div>
          </section>
        </motion.div>

        {/* ─── TESTIMONIALS + CTA ─── */}
        <motion.div
          variants={fadeUp(2.6)}
          initial="hidden"
          animate="visible"
        >
          <Testimonials />

          <section className="py-24 lg:py-40">
            <div className="container-editorial">
              <div className="grid grid-cols-12 gap-6 items-center">
                <div className="col-span-12 md:col-span-7">
                  <p className="eyebrow text-forest mb-6">— İletişim</p>
                  <h2 className="display-lg text-forest-deep">
                    Bir sonraki yapı
                    <br /> birlikte ayakta kalsın.
                  </h2>
                </div>
                <div className="col-span-12 md:col-span-5 md:pl-10">
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Projelerinizin ölçeği ne olursa olsun; keşif, tasarım ve
                    uygulama aşamalarında yanınızdayız. İlk görüşme ve keşif
                    ücretsizdir.
                  </p>
                  <Link
                    to="/iletisim"
                    className="inline-flex items-center gap-3 bg-forest-deep text-bone px-8 py-4 text-sm font-medium hover:bg-forest transition-colors duration-300"
                  >
                    Bize ulaşın <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      </motion.div>
    </PageShell>
  );
}
