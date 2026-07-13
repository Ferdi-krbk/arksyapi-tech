import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { PageShell } from "@/components/site/PageShell";
import { Testimonials } from "@/components/site/Testimonials";
import { useSliders, useReferences, slidersQueryOptions, projectsQueryOptions } from "@/hooks/queries";
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

const ease: [number, number, number, number] = [0.33, 1, 0.68, 1];

function Home() {
  const { data: sliders = [] } = useSliders();
  const { data: references = [] } = useReferences();
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (sliders.length <= 1) return;
    const t = setInterval(() => setActiveIdx((i) => (i + 1) % sliders.length), 5000);
    return () => clearInterval(t);
  }, [sliders.length]);

  return (
    <PageShell>
      {/* ─── VIDEO HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        {/* Background video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/video/hero-spray.mp4"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/video/hero-spray.mp4" type="video/mp4" />
          </video>
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/95 via-forest-deep/70 to-forest-deep/40" />
          {/* Dot texture */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 0.5px, transparent 0.5px)",
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        {/* Hero content */}
        <div className="container-editorial relative z-10 pb-24 lg:pb-32">
          <div className="max-w-5xl">
            <motion.p
              className="eyebrow text-sage mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              — Est. Endüstriyel Yalıtım
            </motion.p>

            <motion.h1
              className="font-display text-3xl md:text-6xl font-medium text-bone leading-[1.05] tracking-[-0.02em]"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1, delay: 0.3, ease }}
            >
              Polyurea ve poliüretan
            </motion.h1>

            <motion.p
              className="font-display text-3xl md:text-6xl italic font-light text-sage mt-1 leading-[1.05] tracking-[-0.02em]"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1, delay: 0.7, ease }}
            >
              çözümleri
            </motion.p>

            <motion.div
              className="mt-12 flex flex-wrap items-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.4, ease }}
            >
              <Link
                to="/projeler"
                className="group inline-flex items-center gap-3 bg-bone text-forest-deep px-8 py-4 text-sm font-medium hover:bg-sage-soft transition-colors duration-300"
              >
                Tamamlanan Projeler
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
              </Link>
              <Link
                to="/iletisim"
                className="text-sm text-bone/80 underline underline-offset-8 decoration-1 hover:text-bone transition-all"
              >
                Teklif alın
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Slider dots */}
        {sliders.length > 1 && (
          <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex gap-2 z-20">
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
      </section>

      {/* ─── HERO PANEL — ARKS logosu ─── */}
      <motion.div
        className="container-editorial"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease }}
      >
        <div
          className="relative overflow-hidden hero-panel flex items-center justify-center"
          style={{ minHeight: "30vh" }}
        >
          <img
            src={heroLogoImg}
            alt="ARKS Yapı Teknolojileri"
            className="relative z-10 w-[45%] max-w-[220px] h-auto py-4 px-3 dark:hidden"
            width={800} height={202}
          />
          <img
            src={heroLogoDark}
            alt="ARKS Yapı Teknolojileri"
            className="relative z-10 w-[45%] max-w-[220px] h-auto py-4 px-3 hidden dark:block"
            width={800} height={202}
          />
        </div>
      </motion.div>

      {/* ─── REFERENCES ─── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
      >
        <section className="py-24 mt-16 border-y border-forest-deep/10 bg-sage-soft/20 overflow-hidden">
          <div className="container-editorial mb-12">
            <p className="eyebrow text-forest">— Referanslar</p>
          </div>
          <div className="relative group">
            <div className="flex gap-20 marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
              {references.length > 0 ? (
                [...references, ...references].map((r, i) => (
                  <span key={`${r.id}-${i}`}
                    className="inline-flex items-center gap-5 font-display text-lg md:text-xl text-forest-deep/45 hover:text-forest-deep transition-colors duration-500">
                    {r.logo_url && (
                      <img src={r.logo_url} alt="" className="h-12 w-auto max-w-[100px] object-contain opacity-35" loading="lazy" />
                    )}
                    {r.name}
                  </span>
                ))
              ) : (
                <span className="font-display text-2xl text-forest-deep/40">Henüz referans eklenmedi.</span>
              )}
            </div>
          </div>
        </section>
      </motion.div>

      {/* ─── TESTIMONIALS + CTA ─── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2, ease }}
      >
        <Testimonials />
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
                <Link to="/iletisim"
                  className="inline-flex items-center gap-3 bg-forest-deep text-bone px-8 py-4 text-sm font-medium hover:bg-forest transition-colors duration-300">
                  Bize ulaşın <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </PageShell>
  );
}
