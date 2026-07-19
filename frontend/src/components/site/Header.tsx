import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { api } from "@/integrations/api";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import logoEmblem from "@/assets/arks-emblem.png";
import logoEmblemLight from "@/assets/arks-emblem-light.png";

const SERVICES_NAV = [
  { to: "/polyurea", label: "Polyurea" },
  { to: "/poliuretan", label: "Poliüretan" },
  { to: "/surme-izolasyon", label: "Sürme İzolasyon" },
  { to: "/zemin-kaplama", label: "Zemin Kaplama" },
  { to: "/yesil-cati-zeminleri", label: "Yeşil Çatı Zeminleri" },
] as const;

const NAV = [
  { to: "/", label: "Anasayfa" },
  { to: "/projeler", label: "Projeler" },
  { to: "/galeri", label: "Galeri" },
  { to: "/haberler", label: "Haberler" },
  { to: "/referanslar", label: "Referanslar" },
] as const;

/** Mobil menu icin tam liste */
const MOBILE_NAV = [
  { to: "/", label: "Anasayfa" },
  ...SERVICES_NAV,
  { to: "/projeler", label: "Projeler" },
  { to: "/galeri", label: "Galeri" },
  { to: "/haberler", label: "Haberler" },
  { to: "/referanslar", label: "Referanslar" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [settings, setSettings] = useState<Record<string, string | null>>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    api.settings().then((res) => setSettings(res.data as Record<string, string | null>)).catch(() => {});
  }, []);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bone/85 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="container-editorial flex items-center justify-between h-24">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logoEmblem} alt="ARKS" className="h-10 w-auto dark:hidden" />
          <img src={logoEmblemLight} alt="ARKS" className="h-10 w-auto hidden dark:block" />
          <span className="font-display text-2xl font-medium tracking-tight text-forest-deep">ARKS</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          <Link
            to="/"
            className="text-[14px] font-medium text-forest-deep/75 hover:text-forest-deep transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-forest-deep hover:after:w-full after:transition-all after:duration-300"
            activeProps={{ className: "text-forest-deep after:w-full" }}
          >
            Anasayfa
          </Link>

          {/* Hizmetler acilir menu */}
          <div className="relative group">
            <button className="text-[14px] font-medium text-forest-deep/75 group-hover:text-forest-deep transition-colors inline-flex items-center gap-1.5">
              Hizmetler
              <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
              <div className="bg-bone border border-border shadow-xl min-w-[250px] py-2">
                {SERVICES_NAV.map((s) => (
                  <Link
                    key={s.to}
                    to={s.to}
                    className="group/item flex items-center justify-between gap-3 px-5 py-2.5 text-sm text-forest-deep/80 hover:bg-sage-soft/60 hover:text-forest-deep transition-colors"
                    activeProps={{ className: "text-forest-deep bg-sage-soft/40" }}
                  >
                    <span className="inline-block origin-left transition-transform duration-200 group-hover/item:scale-110 group-hover/item:translate-x-1">
                      {s.label}
                    </span>
                    <span className="opacity-0 -translate-x-1 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-x-0 text-forest" aria-hidden>→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {NAV.filter((n) => n.to !== "/").map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[14px] font-medium text-forest-deep/75 hover:text-forest-deep transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-forest-deep hover:after:w-full after:transition-all after:duration-300"
              activeProps={{ className: "text-forest-deep after:w-full" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/iletisim"
            className="hidden md:inline-flex items-center gap-2 border border-forest-deep text-forest-deep px-5 py-2.5 text-[14px] font-medium hover:bg-forest-deep hover:text-bone transition-colors"
          >
            İletişim
            <span aria-hidden>→</span>
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden p-2 -mr-2 text-forest-deep"
            aria-label="Menüyü aç"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>

    <AnimatePresence>
    {open && (
      <motion.div
        className="fixed inset-0 z-[100] bg-forest-deep text-bone flex flex-col overflow-y-auto"
        initial={{ opacity: 0, clipPath: "circle(0% at 92% 6%)" }}
        animate={{ opacity: 1, clipPath: "circle(150% at 92% 6%)" }}
        exit={{ opacity: 0, clipPath: "circle(0% at 92% 6%)" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-editorial flex items-center justify-between h-20 shrink-0">
          <span className="flex items-center gap-2.5">
            <img src={logoEmblemLight} alt="ARKS" className="h-8 w-auto" />
            <span className="font-display text-2xl text-bone">ARKS</span>
          </span>
          <button onClick={() => setOpen(false)} aria-label="Kapat" className="p-2 -mr-2">
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="container-editorial flex-1 flex flex-col justify-center gap-1 py-6">
          {[...MOBILE_NAV, { to: "/iletisim", label: "İletişim" } as const].map((n, i) => (
            <motion.div
              key={n.to}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={n.to}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-5 py-2.5 border-b border-bone/10"
              >
                <span className="eyebrow text-sage w-7 text-sm">0{i + 1}</span>
                <span className="font-display text-2xl md:text-3xl group-hover:translate-x-2 transition-transform">
                  {n.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </nav>
      </motion.div>
    )}
    </AnimatePresence>
    </>
  );
}
