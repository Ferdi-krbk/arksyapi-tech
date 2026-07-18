import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";

export const Route = createFileRoute("/polyurea")({
  head: () => ({
    meta: [
      { title: "Polyurea — ARKS Yapı Teknolojileri" },
      { name: "description", content: "Hızlı kürleşen, dikişsiz polyurea sprey kaplama sistemleri." },
      { property: "og:title", content: "Polyurea — ARKS Yapı Teknolojileri" },
      { property: "og:description", content: "Yekpare, monolitik polyurea koruma sistemleri." },
    ],
  }),
  component: () => <ServicePage slug="polyurea" />,
});
