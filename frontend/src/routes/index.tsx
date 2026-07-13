import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { Testimonials } from "@/components/site/Testimonials";
import { ProjectCardSkeleton } from "@/components/site/Skeleton";
import { SERVICES } from "@/lib/services";
import { useSliders, useProjects, useSettings, useReferences, settingsQueryOptions, slidersQueryOptions, projectsQueryOptions } from "@/hooks/queries";
import heroImg from "@/assets/hero-green-roof.jpg";
import heroLogoImg from "@/assets/arks-hero-white.png";
import heroLogoDark from "@/assets/arks-hero-dark.png";
import projectIndustrial from "@/assets/project-industrial.jpg";
import projectGreenRoof from "@/assets/project-green-roof.jpg";
import projectMembrane from "@/assets/project-membrane.jpg";

export const Route = createFileRoute("/")({
  loader: ({ context }) => {
    const { queryClient } = context;
    queryClient.prefetchQuery(settingsQueryOptions());
    queryClient.prefetchQuery(slidersQueryOptions());
    queryClient.prefetchQuery(projectsQueryOptions());
  },
  component: Home,
});

function Home() {
  const { data: sliders = [] } = useSliders();
  const { data: projects = [], isLoading: projectsLoading } = useProjects();
  const { data: settings = {} } = useSettings();
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
  const heroBtn = activeSlider?.button_text;
  const heroBtnUrl = activeSlider?.button_url;

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
              <motion.p
                className="mt-8 max-w-xl text-base text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              >
                ARKS Yapı Teknolojileri; polyurea, poliüretan ve sürme izolasyon sistemleriyle
                yapılarınıza dikişsiz, monolitik ve ömür boyu dayanan bir zırh giydirir.
              </motion.p>
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
            style={{ minHeight: "55vh" }}
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
              className="relative z-10 w-[75%] max-w-[550px] h-auto py-10 px-6 dark:hidden"
              width={800}
              height={202}
            />
            <img
              src={heroLogoDark}
              alt="ARKS Yapı Teknolojileri"
              className="relative z-10 w-[75%] max-w-[550px] h-auto py-10 px-6 hidden dark:block"
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

          {/* Sirket tanitimi — hero'nun altinda */}
          <div className="mt-10 max-w-3xl">
            <p className="eyebrow text-forest mb-3">{settings.about_title || "Endüstriyel Yalıtım"}</p>
            <p className="text-forest-deep font-display text-xl md:text-2xl leading-snug">
              {settings.about_text || "Endüstriyel yalıtım ve kaplama sistemlerinde uzman; polyurea, poliüretan, sürme izolasyon, zemin kaplama ve yeşil çatı çözümleriyle yapılarınıza kalıcı koruma sağlıyoruz."}
            </p>
            {heroBtn && heroBtnUrl && (
              <a href={heroBtnUrl} className="inline-flex items-center gap-2 mt-4 text-sm text-forest-deep border-b border-forest-deep pb-1 hover:gap-3 transition-all">
                {heroBtn} <span aria-hidden>→</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* SERVICES — vertical numbered index */}
      <section className="py-24 lg:py-40 bg-bone">
        <div className="container-editorial">
          <Reveal>
            <div className="grid grid-cols-12 gap-6 mb-16">
              <div className="col-span-12 md:col-span-4">
                <p className="eyebrow text-forest">— Hizmet Alanlarımız</p>
              </div>
              <div className="col-span-12 md:col-span-8">
                <h2 className="display-lg text-forest-deep max-w-2xl">
                  Beş sistem. Tek bir <span className="italic font-light">disiplin.</span>
                </h2>
              </div>
            </div>
          </Reveal>

          <div className="border-t border-forest-deep/20">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.06}>
              <Link
                to={s.to}
                className="group grid grid-cols-12 gap-6 items-center py-8 lg:py-12 border-b border-forest-deep/20 hover:bg-sage-soft/40 transition-colors -mx-6 px-6 md:-mx-10 md:px-10"
              >
                <div className="col-span-2 md:col-span-1">
                  <span className="eyebrow text-forest">{s.index}</span>
                </div>
                <div className="col-span-10 md:col-span-4">
                  <h3 className="font-display text-2xl md:text-3xl text-forest-deep group-hover:translate-x-2 transition-transform">
                    {s.title}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <p className="text-muted-foreground max-w-md leading-relaxed">
                    {s.tagline}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-2 flex md:justify-end">
                  <span
                    className="inline-flex items-center gap-2 text-sm text-forest-deep border-b border-forest-deep pb-1 group-hover:gap-4 transition-all"
                    aria-hidden
                  >
                    İncele →
                  </span>
                </div>
              </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="py-24 lg:py-40 bg-forest-deep text-bone">
        <div className="container-editorial grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3">
            <p className="eyebrow text-sage">— Manifesto</p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <Reveal>
            <p className="font-display text-2xl md:text-3xl leading-tight font-light">
              Yalıtım, görünmeyen bir sanattır.
              <span className="text-sage"> Zamanla değil, zamana rağmen ölçülür.</span>
              Her uygulamada moleküler hassasiyet, saha disiplini ve mimari
              hürmet aynı anda çalışır.
            </p>
            </Reveal>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { t: "Malzeme", d: "Yalnızca uluslararası sertifikalı reçine ve sistemler." },
                { t: "Uygulama", d: "Fabrika seviyesinde ekipman ile eğitimli saha ekipleri." },
                { t: "Garanti", d: "10 yıla varan sistem güvencesi ve düzenli denetim." },
              ].map((x, i) => (
                <Reveal key={x.t} delay={i * 0.1}>
                  <p className="eyebrow text-sage mb-3">{x.t}</p>
                  <p className="text-bone/85 leading-relaxed">{x.d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS — API'den dinamik */}
      <section className="py-24 lg:py-40">
        <div className="container-editorial">
          <Reveal>
            <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
              <div>
                <p className="eyebrow text-forest mb-4">— Seçili Projeler</p>
                <h2 className="display-lg text-forest-deep">Sahada, ölçekte, sessizce.</h2>
              </div>
              <Link to="/projeler" className="text-sm text-forest-deep border-b border-forest-deep pb-1 hover:pb-2 transition-all">
                Tüm projeler →
              </Link>
            </div>
          </Reveal>

          {projectsLoading ? (
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-8"><ProjectCardSkeleton /></div>
              <div className="col-span-12 md:col-span-4"><ProjectCardSkeleton /></div>
              <div className="col-span-12 md:col-span-5"><ProjectCardSkeleton /></div>
            </div>
          ) : projects.length === 0 ? (
            <p className="text-muted-foreground text-center py-16">Henüz proje eklenmedi. <Link to="/projeler" className="underline">Proje sayfasını</Link> ziyaret edin.</p>
          ) : (
            <div className="grid grid-cols-12 gap-6">
              {projects.slice(0, 3).map((p, i) => {
                const cols = i === 0 ? "col-span-12 md:col-span-8" : i === 1 ? "col-span-12 md:col-span-4" : "col-span-12 md:col-span-5";
                const imgSrc = p.cover_image_url || (i % 3 === 0 ? projectIndustrial : i % 3 === 1 ? projectGreenRoof : projectMembrane);
                return (
                  <Link
                    key={p.id}
                    to="/projeler/$slug"
                    params={{ slug: p.slug }}
                    className={`${cols} group overflow-hidden block`}
                  >
                  <motion.figure className="overflow-hidden"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="overflow-hidden">
                      <img src={imgSrc} alt={p.title} loading="lazy" width={1200} height={900}
                        className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-[1200ms]" />
                    </div>
                    <figcaption className="mt-5 flex justify-between items-baseline gap-4">
                      <div>
                        <p className="eyebrow text-forest">{p.category_name || (p.location ? `Proje / ${p.location}` : "Proje")}</p>
                        <p className="font-display text-2xl text-forest-deep mt-1">{p.title}</p>
                        {p.summary && <p className="text-sm text-muted-foreground mt-2 max-w-md">{p.summary}</p>}
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">{p.completion_date ? new Date(p.completion_date).getFullYear() : ""}</span>
                    </figcaption>
                  </motion.figure>
                  </Link>
                );
              })}
              {projects.length > 0 && (
                <div className="col-span-12 md:col-span-7 bg-sage-soft p-10 md:p-14 flex flex-col justify-between">
                  <p className="eyebrow text-forest">— Vaka Çalışması</p>
                  <p className="font-display text-xl md:text-2xl text-forest-deep leading-tight mt-6 max-w-lg">
                    {projects.length}+ tamamlanan proje, her biri mühendislik hassasiyetiyle uygulandı.
                  </p>
                  <Link to="/projeler" className="mt-10 text-sm text-forest-deep border-b border-forest-deep pb-1 self-start hover:pb-2 transition-all">
                    Vakaları incele →
                  </Link>
                </div>
              )}
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
