<?php
/**
 * seed_services.php — 5 hizmeti veritabanına aktarır.
 * Sadece bir kez çalıştır; tekrar çalıştırmak duplicate olmaması için kontrol eder.
 */
require_once __DIR__ . '/includes/bootstrap.php';

$services = [
  [
    'title' => 'Polyurea',
    'slug' => 'polyurea',
    'sort_order' => 1,
    'short_description' => 'Hızlı kürleşen, kesintisiz koruma.',
    'content' => 'Çok hızlı kürleşen, çift komponentli saf poliüre sistem. %100 katı, aromatik izosiyanat prepolimer ve amin sonlu reçine tepkimesiyle oluşan esnek sprey kaplama malzemesi. Yüksek basınçlı ve ısıtmalı çok bileşenli sprey makineleri ile uygulanır. Ekstrem sıcaklık, mekanik darbe ve kimyasal etkilere karşı yekpare, dikişsiz bir zırh oluşturur.',
    'is_active' => 1,
  ],
  [
    'title' => 'Poliüretan',
    'slug' => 'poliuretan',
    'sort_order' => 2,
    'short_description' => 'Esnek moleküler yalıtım mimarisi.',
    'content' => 'İlk kez 1937 yılında Otto Bayer tarafından sentezlenen poliüretanlar, diizosiyanatın diol ile reaksiyonuyla elde edilir. Su varlığında gözenekli, köpük yapısı meydana gelir. Isı yalıtımı, su yalıtımı ve akustik konforu tek uygulamada birleştirir. Karmaşık geometrilere tam uyum sağlar; ısı köprülerini ortadan kaldırır.',
    'is_active' => 1,
  ],
  [
    'title' => 'Sürme İzolasyon',
    'slug' => 'surme-izolasyon',
    'sort_order' => 3,
    'short_description' => 'El işçiliği hassasiyetinde su yalıtımı.',
    'content' => 'Bitüm esaslı, poliüretan esaslı, elastomerik reçine esaslı ve çimento esaslı su yalıtım ürünleri; astarlar, emprenye ürünleri ve yardımcı malzemeler. Fırça, rulo ya da mala ile uygulanan geniş ürün ailesi; en dar detaylarda dahi kesintisiz bir su yalıtım filmi oluşturur.',
    'is_active' => 1,
  ],
  [
    'title' => 'Zemin Kaplama',
    'slug' => 'zemin-kaplama',
    'sort_order' => 4,
    'short_description' => 'Mimari yüzeylerde endüstriyel dayanım.',
    'content' => 'Epoksi ve poliüretan esaslı zemin kaplama sistemleri; hijyen, dayanım ve estetiği tek yüzeyde birleştirir. Sağlık, gıda, otopark ve üretim tesisleri için özel formülasyonlar. Kayma direnci, kimyasal dayanım ve renk kararlılığı standarttır.',
    'is_active' => 1,
  ],
  [
    'title' => 'Yeşil Çatı Zeminleri',
    'slug' => 'yesil-cati-zeminleri',
    'sort_order' => 5,
    'short_description' => 'Yapı ile doğa arasındaki elit membran.',
    'content' => 'Bitkilendirilmiş çatı sistemleri için tam entegre su yalıtım ve drenaj çözümleri. Yapıyı korurken, kente nefes veren yüzeyler. Ekstansif ve intansif yeşil çatı sistemleri için kök tutucu membranlar, drenaj katmanları ve büyüme ortamı ile bütünsel bir katman mimarisi kurgularız.',
    'is_active' => 1,
  ],
];

$model = new Service();
$added = 0;

foreach ($services as $s) {
  $existing = $model->findBy('slug', $s['slug']);
  if ($existing) {
    $model->update((int) $existing['id'], $s);
    echo "Guncellendi: {$s['title']}\n";
  } else {
    $model->create($s);
    $added++;
    echo "Eklendi: {$s['title']}\n";
  }
}

echo "\nToplam: $added yeni hizmet eklendi, " . (count($services) - $added) . " guncellendi.\n";
echo "Admin panel: http://localhost:8000/admin/services/list.php\n";
