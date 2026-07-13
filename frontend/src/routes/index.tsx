import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { PageShell } from "@/components/site/PageShell";
import { Testimonials } from "@/components/site/Testimonials";
import { useSliders, useReferences, slidersQueryOptions, projectsQueryOptions } from "@/hooks/queries";
import heroImg from "@/assets/hero-green-roof.jpg";
import heroLogoImg from "@/assets/arks-hero-white.png";
import heroLogoDark from "@/assets/arks-hero-dark.png";

const SPRAY_WORDS = ["Polyurea", "Poliüretan", "Sürme İzolasyon", "Zemin Kaplama", "Yeşil Çatı"];

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

  useEffect(() => {
    if (sliders.length <= 1) return;
    const t = setInterval(() => setActiveIdx((i) => (i + 1) % sliders.length), 5000);
    return () => clearInterval(t);
  }, [sliders.length]);

  const activeSlider = sliders[activeIdx] ?? null;
  const heroImage = activeSlider?.image_url || heroImg;
  const heroBtn = activeSlider?.button_text;
  const heroBtnUrl = activeSlider?.button_url;

  return (
    <PageShell>
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container-editorial">
          <div className="grid grid-cols-12 gap-6 lg:gap-10 items-end">
            <div className="col-span-12 lg:col-span-7 xl:col-span-8">
              <motion.p
                className="eyebrow text-forest mb-8"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >— Est. Endüstriyel Yalıtım</motion.p>
              <motion.div
                className="mt-10 flex flex-wrap items-center gap-6"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
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

          {/* Hero panel — ARKS logosu */}
          <motion.div
            className="mt-20 relative overflow-hidden hero-panel flex items-center justify-center"
            style={{ minHeight: "38vh" }}
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {activeSlider?.image_url ? (
              <img src={heroImage} alt={activeSlider?.title || "ARKS"} width={1600} height={1200}
                className="w-full h-full absolute inset-0 object-cover transition-all duration-1000 opacity-40" />
            ) : null}
            <img src={heroLogoImg} alt="ARKS Yapı Teknolojileri"
              className="relative z-10 w-[60%] max-w-[300px] h-auto py-5 px-3 dark:hidden" width={800} height={202} />
            <img src={heroLogoDark} alt="ARKS Yapı Teknolojileri"
              className="relative z-10 w-[60%] max-w-[300px] h-auto py-5 px-3 hidden dark:block" width={800} height={202} />
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

          {/* SPRAY GUN — kocaman tabanca + hizmet isimleri püskürtme */}
          <div className="mt-16 mb-4">
            <motion.div
              className="flex items-start gap-6 md:gap-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
            >
              {/* BÜYÜK Spray Gun SVG */}
              <motion.div
                className="shrink-0"
                variants={{
                  hidden: { opacity: 0, x: -60, rotate: -20, scale: 0.5 },
                  visible: { opacity: 1, x: 0, rotate: 0, scale: 1,
                    transition: { type: "spring", stiffness: 180, damping: 12, mass: 0.8 } },
                }}
              >
                {/* Spray particles animasyonu */}
                <motion.div
                  className="relative"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[...Array(5)].map((_, j) => (
                    <motion.div
                      key={j}
                      className="absolute top-1/2 right-0 w-2 h-2 rounded-full bg-forest/40"
                      variants={{
                        hidden: { opacity: 0, x: 0, y: 0 },
                        visible: {
                          opacity: [0, 1, 0],
                          x: [0, 30 + j * 25],
                          y: [0, (j - 2) * 12],
                          scale: [0, 2, 0],
                          transition: {
                            duration: 0.6,
                            delay: 0.6 + j * 0.12,
                            repeat: Infinity,
                            repeatDelay: 1.5,
                          },
                        },
                      }}
                    />
                  ))}
                </motion.div>
                <svg viewBox="0 0 120 80" className="w-24 h-auto md:w-32 fill-forest-deep">
                  <rect x="12" y="18" width="78" height="24" rx="4" />
                  <rect x="30" y="42" width="6" height="26" rx="2" />
                  <rect x="22" y="58" width="22" height="4" rx="2" />
                  <polygon points="86,22 108,28 108,32 86,38" />
                  <circle cx="110" cy="30" r="5" />
                  <rect x="44" y="0" width="20" height="18" rx="3" />
                  <rect x="47" y="3" width="14" height="12" rx="2" opacity="0.5" />
                  <path d="M10 24 L2 24 Q0 24 0 22 L0 14" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </motion.div>

              {/* Püskürtülen hizmet isimleri */}
              <motion.div
                className="flex flex-wrap gap-x-4 gap-y-2 pt-2"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
                }}
              >
                {SPRAY_WORDS.map((word, i) => (
                  <motion.span
                    key={word}
                    className="inline-flex items-center"
                    variants={{
                      hidden: { opacity: 0, scale: 0, x: -80, filter: "blur(10px)" },
                      visible: {
                        opacity: 1, scale: 1, x: 0, filter: "blur(0px)",
                        transition: { type: "spring", stiffness: 400, damping: 14, mass: 0.35 },
                      },
                    }}
                  >
                    <span className="font-display text-4xl md:text-7xl font-light text-forest-deep/80">
                      {word}
                    </span>
                    {i < SPRAY_WORDS.length - 1 && (
                      <span className="text-forest/20 mx-3 md:mx-5 text-3xl md:text-5xl relative -top-1">·</span>
                    )}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>
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
                  <span key={`${r.id}-${i}`}
                    className="inline-flex items-center gap-5 font-display text-lg md:text-xl text-forest-deep/50 hover:text-forest-deep transition-colors duration-300">
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
    </PageShell>
  );
}
