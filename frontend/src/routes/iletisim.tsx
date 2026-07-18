import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/site/PageShell";
import { api } from "@/integrations/api";

export const Route = createFileRoute("/iletisim")({
  head: () => ({
    meta: [
      { title: "İletişim — ARKS Yapı Teknolojileri" },
      { name: "description", content: "Projeleriniz için ARKS ile iletişime geçin." },
      { property: "og:title", content: "İletişim — ARKS Yapı Teknolojileri" },
      { property: "og:description", content: "Ücretsiz keşif ve teklif için bize ulaşın." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [settings, setSettings] = useState<Record<string, string | null>>({});

  useEffect(() => {
    api.settings().then((res) => setSettings(res.data as Record<string, string | null>)).catch(() => {});
  }, []);

  const email       = settings.email || "info@arksyapi.com";
  const phone       = settings.phone || "+90 (000) 000 00 00";
  const address     = settings.address || "İstanbul, Türkiye";
  const workingHours = settings.working_hours || "Pzt — Cum · 09:00 — 18:00";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      fullname: String(fd.get("full_name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim() || null,
      subject: String(fd.get("subject") || "").trim() || null,
      message: String(fd.get("message") || "").trim(),
    };
    try {
      await api.contact(payload as Record<string, string>);
      setSent(true);
    } catch {
      setError("Mesaj gönderilemedi. Lütfen tekrar deneyin.");
    }
    setSubmitting(false);
  }

  return (
    <PageShell>
      <section className="pt-32 lg:pt-40 pb-16">
        <div className="container-editorial grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-5">
            <p className="eyebrow text-forest mb-6">— İletişim</p>
            <h1 className="display-lg text-forest-deep">
              Bir sonraki<br /> yapı için.
            </h1>
            <div className="mt-14 space-y-8">
              <div>
                <p className="eyebrow text-forest mb-2">Adres</p>
                <p className="text-forest-deep">{address}</p>
              </div>
              <div>
                <p className="eyebrow text-forest mb-2">E-posta</p>
                <a href={`mailto:${email}`} className="text-forest-deep hover:text-forest">
                  {email}
                </a>
              </div>
              <div>
                <p className="eyebrow text-forest mb-2">Telefon</p>
                <a href={`tel:${phone.replace(/\s/g,"")}`} className="text-forest-deep hover:text-forest">
                  {phone}
                </a>
              </div>
              <div>
                <p className="eyebrow text-forest mb-2">Çalışma Saatleri</p>
                <p className="text-forest-deep">{workingHours}</p>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6 md:col-start-7">
            {sent ? (
              <div className="bg-sage-soft p-10 md:p-14">
                <p className="eyebrow text-forest mb-4">— Teşekkürler</p>
                <p className="font-display text-3xl text-forest-deep">
                  Mesajınız iletildi. En kısa sürede dönüş yapacağız.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="block">
                    <span className="eyebrow text-forest">Ad Soyad</span>
                    <input name="full_name" required minLength={2} maxLength={120} className="mt-2 w-full bg-transparent border-b border-forest-deep/40 py-3 focus:border-forest-deep outline-none text-forest-deep" />
                  </label>
                  <label className="block">
                    <span className="eyebrow text-forest">Telefon</span>
                    <input name="phone" maxLength={40} className="mt-2 w-full bg-transparent border-b border-forest-deep/40 py-3 focus:border-forest-deep outline-none text-forest-deep" />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="eyebrow text-forest">E-posta</span>
                    <input name="email" type="email" required maxLength={200} className="mt-2 w-full bg-transparent border-b border-forest-deep/40 py-3 focus:border-forest-deep outline-none text-forest-deep" />
                  </label>
                </div>
                <label className="block">
                  <span className="eyebrow text-forest">İlgilendiğiniz Sistem</span>
                  <select name="subject" className="mt-2 w-full bg-transparent border-b border-forest-deep/40 py-3 focus:border-forest-deep outline-none text-forest-deep">
                    <option>Polyurea</option>
                    <option>Poliüretan</option>
                    <option>Sürme İzolasyon</option>
                    <option>Zemin Kaplama</option>
                    <option>Yeşil Çatı Zeminleri</option>
                    <option>Belirsiz / Danışmanlık</option>
                  </select>
                </label>
                <label className="block">
                  <span className="eyebrow text-forest">Proje Detayı</span>
                  <textarea name="message" required minLength={5} maxLength={5000} rows={5} className="mt-2 w-full bg-transparent border-b border-forest-deep/40 py-3 focus:border-forest-deep outline-none text-forest-deep resize-none" />
                </label>
                {error && <p className="text-sm text-red-700">{error}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-3 bg-forest-deep text-bone px-8 py-4 text-sm font-medium hover:bg-forest transition-colors disabled:opacity-60"
                >
                  {submitting ? "Gönderiliyor…" : "Mesajı gönder"} <span aria-hidden>→</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
