import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { api } from "@/integrations/api";

export function Footer() {
  const [settings, setSettings] = useState<Record<string, string | null>>({});

  useEffect(() => {
    api.settings().then((res) => setSettings(res.data as Record<string, string | null>)).catch(() => {});
  }, []);

  const company = settings.company_name || "ARKS Yapı Teknolojileri";
  const email   = settings.email || "info@arksyapi.com";
  const phone   = settings.phone || "+90 (212) 000 00 00";
  const address = settings.address || "İstanbul, Türkiye";

  return (
    <footer className="bg-forest-deep text-bone mt-32">
      <div className="container-editorial py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-sage mb-6">— {company}</p>
            <h2 className="display-lg text-bone max-w-lg">
              Yalıtımda sessiz güç, kalıcı kalite.
            </h2>
            <Link
              to="/iletisim"
              className="inline-flex items-center gap-3 mt-10 border border-bone/40 px-6 py-3 text-sm hover:bg-bone hover:text-forest-deep transition-colors"
            >
              Projenizi görüşelim <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="md:col-span-3 md:col-start-8">
            <p className="eyebrow text-sage mb-6">Hizmetler</p>
            <ul className="space-y-3 text-sm text-bone/80">
              <li><Link to="/polyurea" className="hover:text-bone">Polyurea</Link></li>
              <li><Link to="/poliuretan" className="hover:text-bone">Poliüretan</Link></li>
              <li><Link to="/surme-izolasyon" className="hover:text-bone">Sürme İzolasyon</Link></li>
              <li><Link to="/zemin-kaplama" className="hover:text-bone">Zemin Kaplama</Link></li>
              <li><Link to="/yesil-cati-zeminleri" className="hover:text-bone">Yeşil Çatı Zeminleri</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow text-sage mb-6">İletişim</p>
            <ul className="space-y-3 text-sm text-bone/80">
              <li>{address}</li>
              <li><a href={`mailto:${email}`} className="hover:text-bone">{email}</a></li>
              <li><a href={`tel:${phone.replace(/\s/g,"")}`} className="hover:text-bone">{phone}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-bone/15 flex flex-col md:flex-row justify-between gap-4 text-xs text-bone/60">
          <p>© {new Date().getFullYear()} {company}. Tüm hakları saklıdır.</p>
          <p className="eyebrow">Endüstriyel Yalıtım · Kaplama · Sistemleri</p>
        </div>
      </div>
    </footer>
  );
}
