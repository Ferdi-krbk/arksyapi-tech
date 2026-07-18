import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { SERVICES } from "@/lib/services";
import { api } from "@/integrations/api";
import heroImg from "@/assets/hero-green-roof.jpg";
import heroLogoImg from "@/assets/arks-hero-logo.png";
import projectIndustrial from "@/assets/project-industrial.jpg";
import projectGreenRoof from "@/assets/project-green-roof.jpg";
import projectMembrane from "@/assets/project-membrane.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

type SliderItem = {
  id: number;
  title: string | null;
  subtitle: string | null;
  button_text: string | null;
  button_url: string | null;
  image_url: string | null;
};

type ProjectRow = {
  id: number;
  title: string;
  slug: string;
  location: string | null;
  completion_date: string | null;
  summary: string | null;
  cover_image_url: string | null;
  category_name: string | null;
};

const REFERENCES = [
  "Aksa Enerji", "Borusan Mannesmann", "Çimsa", "Enerjisa", "Ford Otosan",
  "İGA İstanbul Havalimanı", "Kalyon Holding", "Limak", "MNG Kargo",
  "Tekfen İnşaat", "Türk Telekom", "Zorlu Enerji",
];

function Home() {
  const [sliders, setSliders] = useState<SliderItem[]>([]);
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [settings, setSettings] = useState<Record<string, string | null>>({});
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => { api.sliders().then(res => setSliders((res.data as SliderItem[])??[])).catch(()=>{}); }, []);
  useEffect(() => { api.projects().then(res => setProjects((res.data as ProjectRow[])??[])).catch(()=>{}); }, []);
  useEffect(() => { api.settings().then(res => setSettings(res.data as Record<string,string|null>)).catch(()=>{}); }, []);

  // Her 5 saniyede slider degistir
  useEffect(() => {
    if (sliders.length <= 1) return;
    const t = setInterval(() => setActiveIdx((i) => (i + 1) % sliders.length), 5000);
    return () => clearInterval(t);
  }, [sliders.length]);

  const activeSlider = sliders[activeIdx] ?? null;
  const heroImage = activeSlider?.image_url || heroImg;
  const heroTitle = activeSlider?.title || "Sessiz güç.";
  const heroSub   = activeSlider?.subtitle || (heroTitle === "Sessiz güç." ? "Kalıcı koruma." : "");
  const heroBtn    = activeSlider?.button_text;
  const heroBtnUrl = activeSlider?.button_url;

  return (
    <PageShell>
      {/* HERO — asymmetric 60/40 with vertical index */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="container-editorial">
          <div className="grid grid-cols-12 gap-6 lg:gap-10 items-end">
            <div className="col-span-12 lg:col-span-7 xl:col-span-8">
              <p className="eyebrow text-forest mb-8">— Est. Endüstriyel Yalıtım</p>
              <h1 className="display-lg text-forest-deep">
                Sessiz güç.<br />
                <span className="italic font-light text-forest">Kalıcı</span> koruma.
              </h1>
              <p className="mt-10 max-w-xl text-lg text-muted-foreground leading-relaxed">
                ARKS Yapı Teknolojileri; polyurea, poliüretan ve sürme izolasyon sistemleriyle
                yapılarınıza dikişsiz, monolitik ve ömür boyu dayanan bir zırh giydirir.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-6">
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
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5 xl:col-span-4">
              <div className="hidden lg:block rule-line mb-8" />
              <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
                <div>
                  <dt className="eyebrow text-forest/70">Deneyim</dt>
                  <dd className="display-lg text-forest-deep mt-2">10+</dd>
                  <p className="mt-1 text-xs text-muted-foreground">Yıl saha uygulaması</p>
                </div>
                <div>
                  <dt className="eyebrow text-forest/70">Proje</dt>
                  <dd className="display-lg text-forest-deep mt-2">100+</dd>
                  <p className="mt-1 text-xs text-muted-foreground">Tamamlanan iş</p>
                </div>
                <div>
                  <dt className="eyebrow text-forest/70">Sistem</dt>
                  <dd className="display-lg text-forest-deep mt-2">05</dd>
                  <p className="mt-1 text-xs text-muted-foreground">Uzmanlık alanı</p>
                </div>
                <div>
                  <dt className="eyebrow text-forest/70">Memnuniyet</dt>
                  <dd className="display-lg text-forest-deep mt-2">100+</dd>
                  <p className="mt-1 text-xs text-muted-foreground">Memnun müşteri</p>
                </div>
              </dl>
            </div>
          </div>

          {/* Hero — buyuk ARKS logosu (slider varsa o, yoksa logo) */}
          <div className="mt-20 relative overflow-hidden bg-forest-deep flex items-center justify-center" style={{ minHeight: "70vh" }}>
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
              className="relative z-10 w-[85%] max-w-[800px] h-auto py-16 px-8"
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
          </div>

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

          <div className="border-t border-forest-deep/20">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                to={s.to}
                className="group grid grid-cols-12 gap-6 items-center py-8 lg:py-12 border-b border-forest-deep/20 hover:bg-sage-soft/40 transition-colors -mx-6 px-6 md:-mx-10 md:px-10"
              >
                <div className="col-span-2 md:col-span-1">
                  <span className="eyebrow text-forest">{s.index}</span>
                </div>
                <div className="col-span-10 md:col-span-4">
                  <h3 className="font-display text-3xl md:text-5xl text-forest-deep group-hover:translate-x-2 transition-transform">
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
            <p className="font-display text-3xl md:text-5xl leading-tight font-light">
              Yalıtım, görünmeyen bir sanattır.
              <span className="text-sage"> Zamanla değil, zamana rağmen ölçülür.</span>
              Her uygulamada moleküler hassasiyet, saha disiplini ve mimari
              hürmet aynı anda çalışır.
            </p>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                { t: "Malzeme", d: "Yalnızca uluslararası sertifikalı reçine ve sistemler." },
                { t: "Uygulama", d: "Fabrika seviyesinde ekipman ile eğitimli saha ekipleri." },
                { t: "Garanti", d: "10 yıla varan sistem güvencesi ve düzenli denetim." },
              ].map((x) => (
                <div key={x.t}>
                  <p className="eyebrow text-sage mb-3">{x.t}</p>
                  <p className="text-bone/85 leading-relaxed">{x.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS — API'den dinamik */}
      <section className="py-24 lg:py-40">
        <div className="container-editorial">
          <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
            <div>
              <p className="eyebrow text-forest mb-4">— Seçili Projeler</p>
              <h2 className="display-lg text-forest-deep">Sahada, ölçekte, sessizce.</h2>
            </div>
            <Link to="/projeler" className="text-sm text-forest-deep border-b border-forest-deep pb-1 hover:pb-2 transition-all">
              Tüm projeler →
            </Link>
          </div>

          {projects.length === 0 ? (
            <p className="text-muted-foreground text-center py-16">Henüz proje eklenmedi. <Link to="/projeler" className="underline">Proje sayfasını</Link> ziyaret edin.</p>
          ) : (
            <div className="grid grid-cols-12 gap-6">
              {projects.slice(0, 3).map((p, i) => {
                const cols = i === 0 ? "col-span-12 md:col-span-8" : i === 1 ? "col-span-12 md:col-span-4" : "col-span-12 md:col-span-5";
                const ar  = i === 0 ? "aspect-[16/10]" : i === 1 ? "aspect-[3/4]" : "aspect-[4/3]";
                const imgSrc = p.cover_image_url || (i % 3 === 0 ? projectIndustrial : i % 3 === 1 ? projectGreenRoof : projectMembrane);
                return (
                  <figure key={p.id} className={`${cols} group overflow-hidden`}>
                    <div className="overflow-hidden">
                      <img src={imgSrc} alt={p.title} loading="lazy" width={1400} height={1000}
                        className={`w-full ${ar} object-cover group-hover:scale-105 transition-transform duration-[1200ms]`} />
                    </div>
                    <figcaption className="mt-5 flex justify-between items-baseline gap-4">
                      <div>
                        <p className="eyebrow text-forest">{p.category_name || (p.location ? `Proje / ${p.location}` : "Proje")}</p>
                        <p className="font-display text-2xl text-forest-deep mt-1">{p.title}</p>
                        {p.summary && <p className="text-sm text-muted-foreground mt-2 max-w-md">{p.summary}</p>}
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">{p.completion_date ? new Date(p.completion_date).getFullYear() : ""}</span>
                    </figcaption>
                  </figure>
                );
              })}
              {projects.length > 0 && (
                <div className="col-span-12 md:col-span-7 bg-sage-soft p-10 md:p-14 flex flex-col justify-between">
                  <p className="eyebrow text-forest">— Vaka Çalışması</p>
                  <p className="font-display text-2xl md:text-4xl text-forest-deep leading-tight mt-8 max-w-lg">
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
      <section className="py-20 border-y border-forest-deep/15 bg-sage-soft/30 overflow-hidden">
        <div className="container-editorial mb-10">
          <p className="eyebrow text-forest">— Referanslar</p>
        </div>
        <div className="relative">
          <div className="flex gap-16 marquee whitespace-nowrap">
            {[...REFERENCES, ...REFERENCES].map((r, i) => (
              <span key={i} className="font-display text-2xl md:text-3xl text-forest-deep/70">
                {r}
                <span className="text-sage ml-16">✳</span>
              </span>
            ))}
          </div>
        </div>
      </section>

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
