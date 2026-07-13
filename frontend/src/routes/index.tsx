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

const sprayItem = {
  hidden: { opacity: 0, scale: 0.3, x: -120, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1, scale: 1, x: 0, filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 280, damping: 18, mass: 0.5, delay: 0.6 + i * 0.18 },
  }),
};

function Home() {
  const { data: sliders = [] } = useSliders();
  const { data: references = [] } = useReferences();
  const [activeIdx, setActiveIdx] = useState(0);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIntroDone(true), 3500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!introDone || sliders.length <= 1) return;
    const t = setInterval(() => setActiveIdx((i) => (i + 1) % sliders.length), 5000);
    return () => clearInterval(t);
  }, [sliders.length, introDone]);

  const activeSlider = sliders[activeIdx] ?? null;
  const heroImage = activeSlider?.image_url || heroImg;

  return (
    <PageShell>
      {/* FULL-PAGE SPRAY INTRO — tüm sayfa tabancayla püskürtülerek geliyor */}
      <motion.div
        className="min-h-screen"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 1 } } }}
      >
        {/* SPRAY GUN — büyük tabanca, intro sonrası küçülüp sola geçer */}
        <motion.div
          className="fixed z-[60] pointer-events-none"
          style={{ left: "50%", top: "45%", x: "-50%", y: "-50%" }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: introDone ? 0 : 1,
            scale: introDone ? 0.3 : 1,
            left: introDone ? "6%" : "50%",
            top: introDone ? "42%" : "45%",
          }}
          transition={{ duration: 0.6, delay: introDone ? 2.5 : 0, ease: "easeInOut" }}
        >
          {/* Püskürtme partikülleri */}
          {!introDone && [...Array(12)].map((_, j) => (
            <motion.div
              key={j}
              className="absolute rounded-full bg-forest/50"
              style={{
                width: 4 + Math.random() * 8,
                height: 4 + Math.random() * 8,
                right: -20,
                top: "50%",
              }}
              animate={{
                x: [0, 40 + Math.random() * 200],
                y: [0, (Math.random() - 0.5) * 120],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 0.5 + Math.random() * 0.4,
                delay: j * 0.15,
                repeat: Infinity,
                repeatDelay: 0.8,
              }}
            />
          ))}
          <svg viewBox="0 0 140 90" className="w-36 h-auto md:w-48 fill-forest-deep drop-shadow-2xl">
            <rect x="14" y="20" width="90" height="28" rx="5" />
            <rect x="34" y="48" width="7" height="30" rx="2" />
            <rect x="24" y="66" width="26" height="5" rx="2" />
            <polygon points="100,26 126,32 126,36 100,42" />
            <circle cx="130" cy="34" r="6" />
            <rect x="50" y="0" width="24" height="20" rx="4" />
            <rect x="54" y="3" width="16" height="14" rx="2" opacity="0.45" />
            <path d="M12 28 L2 28 Q0 28 0 26 L0 16" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </motion.div>

        {/* SAYFA İÇERİĞİ — tabanca ile püskürtülerek geliyor */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container-editorial">
          <div className="grid grid-cols-12 gap-6 lg:gap-10 items-end">
            <div className="col-span-12 lg:col-span-8">
              <motion.p
                className="eyebrow text-forest mb-8"
                custom={0} variants={sprayItem} initial="hidden" animate="visible"
              >— Est. Endüstriyel Yalıtım</motion.p>

              <motion.h1
                className="display-lg text-forest-deep max-w-3xl"
                custom={1} variants={sprayItem} initial="hidden" animate="visible"
              >
                Polyurea ve poliüretan<br />
                <span className="italic font-light text-forest">çözümleri</span>
              </motion.h1>

              <motion.div
                className="mt-10 flex flex-wrap items-center gap-6"
                custom={2} variants={sprayItem} initial="hidden" animate="visible"
              >
                <Link to="/projeler" className="group inline-flex items-center gap-3 bg-forest-deep text-bone px-7 py-4 text-sm font-medium hover:bg-forest transition-colors">
                  Tamamlanan Projeler <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                </Link>
                <Link to="/iletisim" className="text-sm text-forest-deep underline underline-offset-8 decoration-1 hover:decoration-2">
                  Teklif alın
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Hero panel — ARKS logosu (boşlukla ayrılmış) */}
          <motion.div
            className="mt-24 relative overflow-hidden hero-panel flex items-center justify-center"
            style={{ minHeight: "36vh" }}
            custom={3} variants={sprayItem} initial="hidden" animate="visible"
          >
            {activeSlider?.image_url ? (
              <img src={heroImage} alt={activeSlider?.title || "ARKS"} width={1600} height={1200}
                className="w-full h-full absolute inset-0 object-cover transition-all duration-1000 opacity-40" />
            ) : null}
            <img src={heroLogoImg} alt="ARKS Yapı Teknolojileri"
              className="relative z-10 w-[50%] max-w-[260px] h-auto py-5 px-3 dark:hidden" width={800} height={202} />
            <img src={heroLogoDark} alt="ARKS Yapı Teknolojileri"
              className="relative z-10 w-[50%] max-w-[260px] h-auto py-5 px-3 hidden dark:block" width={800} height={202} />
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
        </div>
      </section>
        </motion.div>

        {/* REFERENCES — marquee (gecikmeli) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
        >
      <section className="py-24 border-y border-forest-deep/15 bg-sage-soft/30 overflow-hidden">
        <div className="container-editorial mb-12">
          <p className="eyebrow text-forest">— Referanslar</p>
        </div>
        <div className="relative group">
          <div className="flex gap-20 marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
            {references.length > 0
              ? [...references, ...references].map((r, i) => (
                  <span key={`${r.id}-${i}`}
                    className="inline-flex items-center gap-5 font-display text-lg md:text-xl text-forest-deep/50 hover:text-forest-deep transition-colors duration-300">
                    {r.logo_url && (
                      <img src={r.logo_url} alt="" className="h-12 w-auto max-w-[100px] object-contain opacity-40" loading="lazy" />
                    )}
                    {r.name}
                  </span>
                ))
              : <span className="font-display text-2xl text-forest-deep/40">Henüz referans eklenmedi.</span>}
          </div>
        </div>
      </section>
        </motion.div>

        {/* Testimonials + CTA gecikmeli */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.6, ease: [0.22, 1, 0.36, 1] }}
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
                    className="inline-flex items-center gap-3 bg-forest-deep text-bone px-8 py-4 text-sm font-medium hover:bg-forest transition-colors">
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
