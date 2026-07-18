import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";

export const Route = createFileRoute("/yesil-cati-zeminleri")({
  head: () => ({
    meta: [
      { title: "Yeşil Çatı Zeminleri — ARKS Yapı Teknolojileri" },
      { name: "description", content: "Bitkilendirilmiş çatı sistemleri için entegre su yalıtım ve drenaj çözümleri." },
      { property: "og:title", content: "Yeşil Çatı Zeminleri — ARKS Yapı Teknolojileri" },
      { property: "og:description", content: "Yapıyı korur, kente nefes verir." },
    ],
  }),
  component: () => <ServicePage slug="yesil-cati-zeminleri" />,
});
