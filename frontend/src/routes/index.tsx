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

  useEffect(() => {
    if (sliders.length <= 1) return;
    const t = setInterval(() => setActiveIdx((i) => (i + 1) % sliders.length), 5000);
    return () => clearInterval(t);
  }, [sliders.length]);

  const activeSlider = sliders[activeIdx] ?? null;
  const heroImage = activeSlider?.image_url || heroImg;
  const heroSub = activeSlider?.subtitle || "Kalıcı koruma.";
  const words = heroSub.split(" ");

  return (
    <PageShell>
      {/* HERO PANEL — sadece slayt + ARKS logosu */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container-editorial">
          <motion.div
            className="relative overflow-hidden hero-panel flex items-center justify-center"
            style={{ minHeight: "38vh" }}
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
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

          {/* SPRAY GUN — tabanca + püskürtme */}
          <div className="mt-14">
            <motion.div
              className="flex items-start gap-4 md:gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{ visible: { transition: { staggerChildren: 0.25 } } }}
            >
              {/* Spray Gun SVG */}
              <motion.div
                className="shrink-0 mt-1"
                variants={{
                  hidden: { opacity: 0, x: -30, rotate: -15 },
                  visible: { opacity: 1, x: 0, rotate: 0,
                    transition: { type: "spring", stiffness: 200, damping: 14 } },
                }}
              >
                <svg viewBox="0 0 80 52" className="w-16 h-auto md:w-20 fill-forest-deep">
                  {/* tabanca gövdesi */}
                  <rect x="8" y="12" width="52" height="16" rx="3" />
                  {/* tetik */}
                  <rect x="20" y="28" width="4" height="18" rx="1" />
                  <rect x="14" y="38" width="16" height="3" rx="1" />
                  {/* meme / nozzle */}
                  <polygon points="56,14 72,18 72,22 56,26" />
                  <circle cx="74" cy="20" r="3" />
                  {/* üst hazne */}
                  <rect x="30" y="0" width="14" height="12" rx="2" />
                  <rect x="32" y="2" width="10" height="8" rx="1" opacity="0.6" />
                  {/* hortum */}
                  <path d="M6 16 L0 16 Q-2 16 -2 14 L-2 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </motion.div>

              {/* Püskürtülen yazı */}
              <motion.div
                className="flex flex-wrap gap-x-3 gap-y-1.5 pt-1"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
                }}
              >
                {words.map((word, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, scale: 0, x: -40, filter: "blur(6px)" },
                      visible: {
                        opacity: 1, scale: 1, x: 0, filter: "blur(0px)",
                        transition: { type: "spring", stiffness: 380, damping: 15, mass: 0.4 },
                      },
                    }}
                  >
                    <span className="font-display text-3xl md:text-5xl font-light text-forest-deep/80">
                      {word}
                    </span>
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
