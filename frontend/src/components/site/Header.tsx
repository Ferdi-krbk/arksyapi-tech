import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { api } from "@/integrations/api";
import logoEmblem from "@/assets/arks-emblem.png";
import logoEmblemLight from "@/assets/arks-emblem-light.png";

const NAV = [
  { to: "/", label: "Anasayfa" },
  { to: "/polyurea", label: "Polyurea" },
  { to: "/poliuretan", label: "Poliüretan" },
  { to: "/surme-izolasyon", label: "Sürme İzolasyon" },
  { to: "/zemin-kaplama", label: "Zemin Kaplama" },
  { to: "/yesil-cati-zeminleri", label: "Yeşil Çatı" },
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bone/85 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="container-editorial flex items-center justify-between h-24">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logoEmblem} alt="ARKS" className="h-10 w-auto" />
          <span className="font-display text-2xl font-medium tracking-tight text-forest-deep">ARKS</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((n) => (
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

        <div className="flex items-center gap-4">
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

      {open && (
        <div className="fixed inset-0 bg-forest-deep text-bone z-50 flex flex-col">
          <div className="container-editorial flex items-center justify-between h-20">
            <span className="flex items-center gap-2.5">
              <img src={logoEmblemLight} alt="ARKS" className="h-8 w-auto" />
              <span className="font-display text-2xl text-bone">ARKS</span>
            </span>
            <button onClick={() => setOpen(false)} aria-label="Kapat">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="container-editorial flex-1 flex flex-col justify-center gap-2">
            {[...NAV, { to: "/iletisim", label: "İletişim" } as const].map((n, i) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-6 py-3 border-b border-bone/10"
              >
                <span className="eyebrow text-sage w-8">0{i + 1}</span>
                <span className="font-display text-3xl md:text-5xl group-hover:translate-x-2 transition-transform">
                  {n.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
