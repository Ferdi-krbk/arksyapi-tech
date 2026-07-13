import { Link } from "@tanstack/react-router";
import { useSettings } from "@/hooks/queries";

const SERVICES_LINKS = [
  { to: "/polyurea", label: "Polyurea" },
  { to: "/poliuretan", label: "Poliüretan" },
  { to: "/surme-izolasyon", label: "Sürme İzolasyon" },
  { to: "/zemin-kaplama", label: "Zemin Kaplama" },
  { to: "/yesil-cati-zeminleri", label: "Yeşil Çatı Zeminleri" },
] as const;

const QUICK_LINKS = [
  { to: "/projeler", label: "Projeler" },
  { to: "/galeri", label: "Galeri" },
  { to: "/haberler", label: "Haberler" },
  { to: "/referanslar", label: "Referanslar" },
  { to: "/iletisim", label: "İletişim" },
] as const;

export function Footer() {
  const { data: settings = {} } = useSettings();

  const company = settings.company_name || "ARKS Yapı Teknolojileri";
  const email = settings.email || "info@arksyapi.com";
  const phone = settings.phone || "+90 (212) 000 00 00";
  const address = settings.address || "İstanbul, Türkiye";

  return (
    <footer className="bg-forest-deep text-bone mt-32">
      <div className="container-editorial py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <Link to="/" className="inline-block mb-8">
              <span className="font-display text-3xl font-medium tracking-tight text-bone">ARKS</span>
            </Link>
            <p className="text-bone/70 text-sm leading-relaxed max-w-xs">
              Endüstriyel yalıtım ve kaplama sistemlerinde uzman; polyurea, poliüretan, sürme izolasyon, zemin kaplama ve yeşil çatı çözümleriyle yapılarınıza kalıcı koruma sağlıyoruz.
            </p>
          </div>

          <div className="md:col-span-2 md:col-start-6">
            <p className="eyebrow text-sage mb-6">Hizmetler</p>
            <ul className="space-y-2.5 text-sm text-bone/75">
              {SERVICES_LINKS.map((s) => (
                <li key={s.to}>
                  <Link to={s.to} className="hover:text-bone transition-colors">{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow text-sage mb-6">Bağlantılar</p>
            <ul className="space-y-2.5 text-sm text-bone/75">
              {QUICK_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-bone transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow text-sage mb-6">İletişim</p>
            <ul className="space-y-3 text-sm text-bone/75">
              <li className="leading-relaxed">{address}</li>
              <li><a href={`mailto:${email}`} className="hover:text-bone transition-colors">{email}</a></li>
              <li><a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-bone transition-colors">{phone}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-bone/15 flex flex-col md:flex-row justify-between gap-4 text-xs text-bone/50">
          <p>© {new Date().getFullYear()} {company}. Tüm hakları saklıdır.</p>
          <p className="eyebrow">Endüstriyel Yalıtım · Kaplama · Sistemleri</p>
        </div>
      </div>
    </footer>
  );
}
