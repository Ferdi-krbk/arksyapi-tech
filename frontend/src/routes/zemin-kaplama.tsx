import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";

export const Route = createFileRoute("/zemin-kaplama")({
  head: () => ({
    meta: [
      { title: "Zemin Kaplama — ARKS Yapı Teknolojileri" },
      { name: "description", content: "Epoksi ve poliüretan esaslı endüstriyel zemin kaplama sistemleri." },
      { property: "og:title", content: "Zemin Kaplama — ARKS Yapı Teknolojileri" },
      { property: "og:description", content: "Hijyen, dayanım ve estetiği birleştiren zemin sistemleri." },
    ],
  }),
  component: () => <ServicePage slug="zemin-kaplama" />,
});
