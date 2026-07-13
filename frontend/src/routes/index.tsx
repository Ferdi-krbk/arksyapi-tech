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

const ease: [number, number, number, number] = [0.33, 1, 0.68, 1];

function Home() {
  const { data: sliders = [] } = useSliders();
  const { data: references = [] } = useReferences();
  const [activeIdx, setActiveIdx] = useState(0);
  const [intro, setIntro] = useState(false);

  useEffect(() => { setIntro(true); }, []);
  useEffect(() => {
    if (!intro || sliders.length <= 1) return;
    const t = setInterval(() => setActiveIdx((i) => (i + 1) % sliders.length), 5000);
    return () => clearInterval(t);
  }, [sliders.length, intro]);

  const activeSlider = sliders[activeIdx] ?? null;
  const heroImage = activeSlider?.image_url || heroImg;

  return (
    <PageShell>
      <div className="overflow-hidden">
        {/* Dot grid bg */}
        <div
          className="fixed inset-0 pointer-events-none -z-10 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, oklch(0.3 0.04 155) 0.5px, transparent 0.5px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* ─── HERO ─── */}
        <section className="relative min-h-screen flex flex-col justify-center">
          <div className="container-editorial py-24 lg:py-0">
            <div className="max-w-4xl">
              <motion.p
                className="eyebrow text-forest mb-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >— Est. Endüstriyel Yalıtım</motion.p>

              {/* Spray nozzle + headline */}
              <div className="flex items-start gap-6 md:gap-8">
                {/* Spray nozzle — realistic, small */}
                <motion.div className="relative shrink-0 mt-1.5"
                  initial={{ opacity: 0, x: -20, rotate: -5 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 0.3, ease }}>
                  {/* Spray particles */}
                  {intro && [...Array(18)].map((_, j) => (
                    <span key={j}
                      className="absolute w-1.5 h-1.5 rounded-full bg-forest-deep/50"
                      style={{
                        right: 0,
                        top: "48%",
                        animation: `sprayShot${j} ${0.35 + Math.random() * 0.45}s ease-out ${0.6 + j * 0.12}s both`,
                        zIndex: 5,
                      }} />
                  ))}
                  {/* Minimal nozzle */}
                  <svg viewBox="0 0 28 36" className="w-10 h-auto fill-forest-deep">
                    <rect x="2" y="8" width="24" height="14" rx="3" />
                    <polygon points="26,12 34,15 26,18" />
                    <circle cx="35" cy="15" r="2" />
                    <path d="M0 12 L-6 12 Q-8 12 -8 10 L-8 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </motion.div>

                {/* Text reveals — left-to-right wipe */}
                <div>
                  <motion.div className="overflow-hidden pb-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.01, delay: 0.6 }}>
                    <motion.h1
                      className="font-display text-3xl md:text-5xl font-medium text-forest-deep leading-[1.05] tracking-[-0.01em]"
                      initial={{ clipPath: "inset(0 100% 0 0)" }}
                      animate={{ clipPath: "inset(0 0% 0 0)" }}
                      transition={{ duration: 0.9, ease }}
                    >
                      Polyurea ve
                    </motion.h1>
                  </motion.div>

                  <motion.div className="overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.01, delay: 1.1 }}>
                    <motion.h1
                      className="font-display text-3xl md:text-5xl italic font-light text-forest leading-[1.05] tracking-[-0.01em]"
                      initial={{ clipPath: "inset(0 100% 0 0)" }}
                      animate={{ clipPath: "inset(0 0% 0 0)" }}
                      transition={{ duration: 0.9, ease }}
                    >
                      poliüretan çözümleri
                    </motion.h1>
                  </motion.div>
                </div>
              </div>

              {/* Buttons */}
              <motion.div className="mt-14 flex flex-wrap items-center gap-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8, ease }}>
                <Link to="/projeler" className="group inline-flex items-center gap-3 bg-forest-deep text-bone px-8 py-4 text-sm font-medium hover:bg-forest transition-colors duration-300">
                  Tamamlanan Projeler <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
                </Link>
                <Link to="/iletisim" className="text-sm text-forest-deep underline underline-offset-8 decoration-1 hover:decoration-2 transition-all">
                  Teklif alın
                </Link>
              </motion.div>
            </div>
          </div>

          {/* CSS keyframes for spray particles — random positions per particle */}
          <style>{Array.from({ length: 18 }, (_, j) => `
            @keyframes sprayShot${j} {
              0%   { transform: translate(0, 0) scale(0.3); opacity: 0.9; }
              100% { transform: translate(${20 + j * 12}px, ${(j - 9) * 8}px) scale(2); opacity: 0; }
            }
          `).join("")}</style>
        </section>

        {/* ─── HERO PANEL ─── */}
        <motion.div className="container-editorial"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0, ease }}>
          <div className="relative overflow-hidden hero-panel flex items-center justify-center"
            style={{ minHeight: "34vh" }}>
            {activeSlider?.image_url ? (
              <img src={heroImage} alt={activeSlider?.title || "ARKS"} width={1600} height={1200}
                className="w-full h-full absolute inset-0 object-cover transition-all duration-1000 opacity-40" />
            ) : null}
            <img src={heroLogoImg} alt="ARKS Yapı Teknolojileri"
              className="relative z-10 w-[50%] max-w-[260px] h-auto py-5 px-3 dark:hidden" width={800} height={202} />
            <img src={heroLogoDark} alt="ARKS Yapı Teknolojileri"
              className="relative z-10 w-[50%] max-w-[260px] h-auto py-5 px-3 hidden dark:block" width={800} height={202} />
            {sliders.length > 1 && (
              <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 flex gap-2 z-20">
                {sliders.map((_, i) => (
                  <button key={i} onClick={() => setActiveIdx(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === activeIdx ? "bg-bone scale-125" : "bg-bone/30 hover:bg-bone/60"}`}
                    aria-label={`Slider ${i + 1}`} />
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* ─── REFERENCES ─── */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4, ease }}>
          <section className="py-24 mt-20 border-y border-forest-deep/10 bg-sage-soft/20 overflow-hidden">
            <div className="container-editorial mb-12"><p className="eyebrow text-forest">— Referanslar</p></div>
            <div className="relative group">
              <div className="flex gap-20 marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
                {references.length > 0 ? (
                  [...references, ...references].map((r, i) => (
                    <span key={`${r.id}-${i}`} className="inline-flex items-center gap-5 font-display text-lg md:text-xl text-forest-deep/45 hover:text-forest-deep transition-colors duration-500">
                      {r.logo_url && <img src={r.logo_url} alt="" className="h-12 w-auto max-w-[100px] object-contain opacity-35" loading="lazy" />}
                      {r.name}
                    </span>
                  ))
                ) : <span className="font-display text-2xl text-forest-deep/40">Henüz referans eklenmedi.</span>}
              </div>
            </div>
          </section>
        </motion.div>

        {/* ─── TESTIMONIALS + CTA ─── */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8, ease }}>
          <Testimonials />
          <section className="py-24 lg:py-40">
            <div className="container-editorial">
              <div className="grid grid-cols-12 gap-6 items-center">
                <div className="col-span-12 md:col-span-7">
                  <p className="eyebrow text-forest mb-6">— İletişim</p>
                  <h2 className="display-lg text-forest-deep">Bir sonraki yapı<br /> birlikte ayakta kalsın.</h2>
                </div>
                <div className="col-span-12 md:col-span-5 md:pl-10">
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Projelerinizin ölçeği ne olursa olsun; keşif, tasarım ve uygulama aşamalarında yanınızdayız. İlk görüşme ve keşif ücretsizdir.
                  </p>
                  <Link to="/iletisim" className="inline-flex items-center gap-3 bg-forest-deep text-bone px-8 py-4 text-sm font-medium hover:bg-forest transition-colors duration-300">
                    Bize ulaşın <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </PageShell>
  );
}
