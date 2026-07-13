import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { PageShell } from "@/components/site/PageShell";
import { Reveal } from "@/components/site/Reveal";
import { useSettings, useContactForm } from "@/hooks/queries";

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
  const { data: settings = {} } = useSettings();
  const { mutateAsync: submitContact, isPending: submitting, error: mutationError } = useContactForm();

  const email       = settings.email || "info@arksyapi.com";
  const phone       = settings.phone || "+90 (000) 000 00 00";
  const address     = settings.address || "İstanbul, Türkiye";
  const workingHours = settings.working_hours || "Pzt — Cum · 09:00 — 18:00";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      fullname: String(fd.get("full_name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim() || null,
      subject: String(fd.get("subject") || "").trim() || null,
      message: String(fd.get("message") || "").trim(),
    };
    try {
      await submitContact(payload as Record<string, string>);
      setSent(true);
    } catch {}
  }

  return (
    <PageShell>
      <section className="pt-32 lg:pt-40 pb-16">
        <div className="container-editorial grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-5">
            <Reveal>
            <p className="eyebrow text-forest mb-6">— İletişim</p>
            <h1 className="display-lg text-forest-deep">
              Bir sonraki<br /> yapı için.
            </h1>
            </Reveal>
            <div className="mt-14 space-y-8">
              <div>
                <p className="font-display text-xl text-forest-deep mb-1">Adres</p>
                <p className="text-muted-foreground">{address}</p>
              </div>
              <div>
                <p className="font-display text-xl text-forest-deep mb-1">E-posta</p>
                <a href={`mailto:${email}`} className="text-muted-foreground hover:text-forest transition-colors">
                  {email}
                </a>
              </div>
              <div>
                <p className="font-display text-xl text-forest-deep mb-1">Telefon</p>
                <a href={`tel:${phone.replace(/\s/g,"")}`} className="text-muted-foreground hover:text-forest transition-colors">
                  {phone}
                </a>
              </div>
              <div>
                <p className="font-display text-xl text-forest-deep mb-1">Çalışma Saatleri</p>
                <p className="text-muted-foreground">{workingHours}</p>
              </div>
            </div>
          </div>

          <Reveal className="col-span-12 md:col-span-6 md:col-start-7" delay={0.15}>
            {sent ? (
              <motion.div
                className="bg-sage-soft p-10 md:p-14"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="eyebrow text-forest mb-4">— Teşekkürler</p>
                <p className="font-display text-3xl text-forest-deep">
                  Mesajınız iletildi. En kısa sürede dönüş yapacağız.
                </p>
              </motion.div>
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
                {mutationError && <p className="text-sm text-red-700">Mesaj gönderilemedi. Lütfen tekrar deneyin.</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-3 bg-forest-deep text-bone px-8 py-4 text-sm font-medium hover:bg-forest transition-colors disabled:opacity-60"
                >
                  {submitting ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Gönderiliyor…
                    </span>
                  ) : (
                    <>Mesajı gönder <span aria-hidden>→</span></>
                  )}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
