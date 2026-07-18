import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";

export const Route = createFileRoute("/surme-izolasyon")({
  head: () => ({
    meta: [
      { title: "Sürme İzolasyon — ARKS Yapı Teknolojileri" },
      { name: "description", content: "Bitüm, poliüretan ve çimento esaslı sürme su yalıtım sistemleri." },
      { property: "og:title", content: "Sürme İzolasyon — ARKS Yapı Teknolojileri" },
      { property: "og:description", content: "El işçiliği hassasiyetinde sürme su yalıtım çözümleri." },
    ],
  }),
  component: () => <ServicePage slug="surme-izolasyon" />,
});
