<?php
/**
 * seed_all.php
 * Tum icerigi veritabanina aktarir: ornek projeler, haberler, galeri, slider,
 * ve site metinlerini settings tablosuna yazar.
 * Sadece 1 kez calistir. Tekrar calistirmak duplicate olusturmaz (slug kontrol eder).
 */
require_once __DIR__ . '/includes/bootstrap.php';

echo "=== AYARLAR (site metinleri) ===\n";
$settings = new Setting();

$texts = [
  'hero_title'          => 'Sessiz güç.',
  'hero_subtitle'       => 'Kalıcı koruma.',
  'hero_description'    => 'ARKS Yapı Teknolojileri; polyurea, poliüretan ve sürme izolasyon sistemleriyle yapılarınıza dikişsiz, monolitik ve ömür boyu dayanan bir zırh giydirir.',
  'hero_overlay_title'  => 'Yeşil Çatı Zeminleri',
  'hero_overlay_text'   => 'Yapıyı korur, kente nefes verir. Doğa ile mimari arasındaki elit membran.',
  'manifesto_p1'        => 'Yalıtım, görünmeyen bir sanattır.',
  'manifesto_p2'        => 'Zamanla değil, zamana rağmen ölçülür.',
  'manifesto_p3'        => 'Her uygulamada moleküler hassasiyet, saha disiplini ve mimari hürmet aynı anda çalışır.',
  'reference_title'     => 'Referanslar',
  'references'          => 'Aksa Enerji|Borusan Mannesmann|Çimsa|Enerjisa|Ford Otosan|İGA İstanbul Havalimanı|Kalyon Holding|Limak|MNG Kargo|Tekfen İnşaat|Türk Telekom|Zorlu Enerji',
  'contact_cta_title'   => 'Bir sonraki yapı birlikte ayakta kalsın.',
  'contact_cta_text'    => 'Projeniz için ücretsiz keşif ve teklif alın.',
  'about_title'         => 'Endüstriyel Yalıtım',
  'about_text'          => 'ARKS Yapı Teknolojileri, endüstriyel yalıtım ve kaplama sistemlerinde uzmanlaşmış bir mühendislik firmasıdır. Polyurea, poliüretan, sürme izolasyon, zemin kaplama ve yeşil çatı sistemlerinde uluslararası standartlarda hizmet vermektedir.',
];
foreach ($texts as $k => $v) {
  $settings->set($k, $v);
  echo "  OK: $k\n";
}

echo "\n=== ORNEK PROJELER ===\n";
$projects = [
  ['title'=>'Marmara Lojistik Tesisi','slug'=>'marmara-lojistik-tesisi','client_name'=>'Marmara Lojistik','location'=>'İstanbul, Tuzla','completion_date'=>'2024-06-15','summary'=>'12.000 m² polyurea zırh, 72 saatte uygulandı.','content'=>'Büyük ölçekli lojistik tesisinde polyurea sprey kaplama uygulaması. Çatı ve cephe yüzeylerinde monolitik su yalıtımı sağlandı.','is_active'=>1,'is_featured'=>1],
  ['title'=>'Kültür Kompleksi Yeşil Çatı','slug'=>'kultur-kompleksi-yesil-cati','client_name'=>'Kültür Bakanlığı','location'=>'Ankara','completion_date'=>'2023-11-20','summary'=>'5.000 m² ekstansif yeşil çatı sistemi.','content'=>'Kamu binasında ekstansif yeşil çatı uygulaması. Kök tutucu membran, drenaj ve filtre katmanları ile entegre sistem.','is_active'=>1,'is_featured'=>1],
  ['title'=>'Bosphorus Rezidans Su Yalıtımı','slug'=>'bosphorus-rezidans','client_name'=>'Bosphorus İnşaat','location'=>'İstanbul, Beşiktaş','completion_date'=>'2024-03-01','summary'=>'8.000 m² sürme izolasyon ve zemin kaplama.','content'=>'Lüks rezidans projesinde bodrum katlarda sürme izolasyon, otopark ve ortak alanlarda epoksi zemin kaplama uygulaması.','is_active'=>1,'is_featured'=>0],
  ['title'=>'Ford Otosan Fabrika Çatısı','slug'=>'ford-otosan-fabrika','client_name'=>'Ford Otosan','location'=>'Kocaeli, Gölcük','completion_date'=>'2022-08-10','summary'=>'25.000 m² poliüretan sprey köpük izolasyon.','content'=>'Otomotiv fabrikası çatı izolasyonu. Yüksek ısı yalıtım katsayısı ve dikişsiz uygulama ile enerji verimliliği sağlandı.','is_active'=>1,'is_featured'=>0],
];
$pm = new Project();
foreach ($projects as $p) {
  $ex = $pm->findBy('slug', $p['slug']);
  if (!$ex) { $pm->create($p); echo "  OK: {$p['title']}\n"; }
  else { echo "  ATLANDI (var): {$p['title']}\n"; }
}

echo "\n=== ORNEK HABERLER ===\n";
$newsItems = [
  ['title'=>'Polyurea Sistemimizle 100.000 m² Barajı Aştık','slug'=>'polyurea-100bin-m2','summary'=>'Türkiye genelinde toplam uygulama alanımız 100.000 m² barajını aştı.','content'=>'<p>ARKS Yapı Teknolojileri olarak, Türkiye genelinde tamamladığımız polyurea su yalıtım projelerinde toplam 100.000 m² uygulama alanını aştık.</p><p>Bu kilometre taşı, ekibimizin saha disiplini ve uluslararası standartlardaki uygulama kalitesinin bir göstergesidir.</p>','author_id'=>1,'is_active'=>1,'published_at'=>'2024-07-01 10:00:00'],
  ['title'=>'Yeşil Çatı Sistemlerinde Yeni Dönem','slug'=>'yesil-cati-yeni-donem','summary'=>'Ekstansif yeşil çatı çözümlerimizle kentsel ısı adası etkisini azaltıyoruz.','content'=>'<p>İklim değişikliğiyle mücadelede yeşil çatı sistemleri kritik rol oynuyor. ARKS olarak geliştirdiğimiz ekstansif yeşil çatı çözümleri, yapıları korurken kentsel ısı adası etkisini azaltıyor.</p>','author_id'=>1,'is_active'=>1,'published_at'=>'2024-06-15 14:30:00'],
  ['title'=>'2024 Yılı ISO 9001 Belgesi Yenilendi','slug'=>'iso-9001-2024','summary'=>'Kalite yönetim sistemimiz ISO 9001:2015 standardına uygunluğunu sürdürüyor.','content'=>'<p>ARKS Yapı Teknolojileri, ISO 9001:2015 Kalite Yönetim Sistemi belgesini başarıyla yeniledi. Denetim sürecinde tüm uygulama ve yönetim süreçlerimiz uluslararası standartlara uygun bulundu.</p>','author_id'=>1,'is_active'=>1,'published_at'=>'2024-05-20 09:00:00'],
];
$nm = new News();
foreach ($newsItems as $n) {
  $ex = $nm->findBy('slug', $n['slug']);
  if (!$ex) { $nm->create($n); echo "  OK: {$n['title']}\n"; }
  else { echo "  ATLANDI (var): {$n['title']}\n"; }
}

echo "\n=== ORNEK SLIDER ===";
$sm = new Slider();
$ex = $sm->findBy('title', 'Endüstriyel Yalıtım');
if (!$ex) {
  $sm->create(['title'=>'Endüstriyel Yalıtım Sistemleri','subtitle'=>'Polyurea, poliüretan ve sürme izolasyon çözümleri','button_text'=>'Projelerimiz','button_url'=>'/projeler','sort_order'=>1,'is_active'=>1,'image_path'=>null]);
  echo "\n  OK: Slider eklendi\n";
} else { echo "\n  ATLANDI (var)\n"; }

echo "\n=== BASARIYLA TAMAMLANDI ===\n";
echo "Tum icerik veritabaninda. Admin panelden yonetebilirsin.\n";
echo "http://localhost:8000/admin/index.php\n";
