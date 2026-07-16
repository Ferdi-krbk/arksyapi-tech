import polyureaImg from "@/assets/service-polyurea.jpg";
import floorImg from "@/assets/service-floor.jpg";
import greenRoofImg from "@/assets/hero-green-roof.jpg";
import industrialImg from "@/assets/project-industrial.jpg";
import membraneImg from "@/assets/project-membrane.jpg";

export type Service = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  intro: string;
  detail: string;
  features: string[];
  image: string;
  to:
    | "/polyurea"
    | "/poliuretan"
    | "/surme-izolasyon"
    | "/zemin-kaplama"
    | "/yesil-cati-zeminleri";
};

export const SERVICES: Service[] = [
  {
    slug: "polyurea",
    to: "/polyurea",
    index: "01",
    title: "Polyurea",
    tagline: "Hızlı kürleşen, kesintisiz koruma.",
    intro:
      "Çok hızlı kürleşen, çift komponentli saf poliüre sistem. %100 katı, aromatik izosiyanat prepolimer ve amin sonlu reçine tepkimesiyle oluşan esnek sprey kaplama malzemesi.",
    detail:
      "Yüksek basınçlı ve ısıtmalı çok bileşenli sprey makineleri ile uygulanır. Ekstrem sıcaklık, mekanik darbe ve kimyasal etkilere karşı yekpare, dikişsiz bir zırh oluşturur.",
    features: [
      "Uygulamadan saniyeler sonra kürleşme",
      "Yüksek çekme ve yırtılma dayanımı",
      "UV, kimyasal ve aşınma direnci",
      "Dikişsiz, monolitik yüzey",
    ],
    image: polyureaImg,
  },
  {
    slug: "poliuretan",
    to: "/poliuretan",
    index: "02",
    title: "Poliüretan",
    tagline: "Esnek moleküler yalıtım mimarisi.",
    intro:
      "İlk kez 1937 yılında Otto Bayer tarafından sentezlenen poliüretanlar, diizosiyanatın diol ile reaksiyonuyla elde edilir. Su varlığında gözenekli, köpük yapısı meydana gelir.",
    detail:
      "Isı yalıtımı, su yalıtımı ve akustik konforu tek uygulamada birleştirir. Karmaşık geometrilere tam uyum sağlar; ısı köprülerini ortadan kaldırır.",
    features: [
      "Yüksek ısı yalıtım katsayısı",
      "Dikişsiz uygulama",
      "Hafif ve yapıya minimum yük",
      "Uzun servis ömrü",
    ],
    image: industrialImg,
  },
  {
    slug: "surme-izolasyon",
    to: "/surme-izolasyon",
    index: "03",
    title: "Sürme İzolasyon",
    tagline: "El işçiliği hassasiyetinde su yalıtımı.",
    intro:
      "Bitüm esaslı, poliüretan esaslı, elastomerik reçine esaslı ve çimento esaslı su yalıtım ürünleri; astarlar, emprenye ürünleri ve yardımcı malzemeler.",
    detail:
      "Fırça, rulo ya da mala ile uygulanan geniş ürün ailesi; en dar detaylarda dahi kesintisiz bir su yalıtım filmi oluşturur.",
    features: [
      "Bitüm & poliüretan sistemler",
      "Çimento esaslı çift bileşenli çözümler",
      "Detaylara mükemmel uyum",
      "Yaya ve araç trafiğine dayanım",
    ],
    image: membraneImg,
  },
  {
    slug: "zemin-kaplama",
    to: "/zemin-kaplama",
    index: "04",
    title: "Zemin Kaplama",
    tagline: "Mimari yüzeylerde endüstriyel dayanım.",
    intro:
      "Epoksi ve poliüretan esaslı zemin kaplama sistemleri; hijyen, dayanım ve estetiği tek yüzeyde birleştirir.",
    detail:
      "Sağlık, gıda, otopark ve üretim tesisleri için özel formülasyonlar. Kayma direnci, kimyasal dayanım ve renk kararlılığı standarttır.",
    features: [
      "Self-levelling epoksi sistemler",
      "Antibakteriyel & hijyenik yüzeyler",
      "Yüksek trafiğe dayanım",
      "Estetik renk ve doku seçenekleri",
    ],
    image: floorImg,
  },
  {
    slug: "yesil-cati-zeminleri",
    to: "/yesil-cati-zeminleri",
    index: "05",
    title: "Yeşil Çatı Zeminleri",
    tagline: "Yapı ile doğa arasındaki elit membran.",
    intro:
      "Bitkilendirilmiş çatı sistemleri için tam entegre su yalıtım ve drenaj çözümleri. Yapıyı korurken, kente nefes veren yüzeyler.",
    detail:
      "Ekstansif ve intansif yeşil çatı sistemleri için kök tutucu membranlar, drenaj katmanları ve büyüme ortamı ile bütünsel bir katman mimarisi kurgularız.",
    features: [
      "Kök geçirmez izolasyon membranları",
      "Drenaj ve filtre katmanları",
      "Ekstansif & intansif sistem tasarımı",
      "Uzun ömürlü, sürdürülebilir çözüm",
    ],
    image: greenRoofImg,
  },
];

export const getService = (slug: string) =>
  SERVICES.find((s) => s.slug === slug);
