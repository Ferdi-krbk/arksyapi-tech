import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";

export const Route = createFileRoute("/poliuretan")({
  head: () => ({
    meta: [
      { title: "Poliüretan — ARKS Yapı Teknolojileri" },
      { name: "description", content: "Isı ve su yalıtımını birleştiren poliüretan sprey sistemleri." },
      { property: "og:title", content: "Poliüretan — ARKS Yapı Teknolojileri" },
      { property: "og:description", content: "Poliüretan sprey ısı ve su yalıtım sistemleri." },
    ],
  }),
  component: () => <ServicePage slug="poliuretan" />,
});
