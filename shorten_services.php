<?php
/**
 * shorten_services.php — Hizmet aciklamalarini ~3 cumleye kisaltir.
 */
require_once __DIR__ . '/includes/bootstrap.php';

$updates = [
  'polyurea' => 'Çok hızlı kürleşen, çift komponentli ve %100 katı poliüre esaslı sprey kaplama sistemidir. Ekstrem sıcaklık, mekanik darbe ve kimyasallara karşı yekpare, dikişsiz bir koruma tabakası oluşturur. Su depoları, çatılar, otoparklar ve endüstriyel yüzeylerde uzun ömürlü performans sağlar.',
  'poliuretan' => 'Isı yalıtımı, su yalıtımı ve akustik konforu tek uygulamada birleştiren esnek poliüretan sistemidir. Yüzeye püskürtülerek en karmaşık geometrilere tam uyum sağlar ve ısı köprülerini ortadan kaldırır. Hafif yapısıyla binaya minimum yük bindirir, enerji tüketimini belirgin şekilde düşürür.',
  'surme-izolasyon' => 'Fırça, rulo veya mala ile uygulanan bitüm, poliüretan ve çimento esaslı su yalıtım sistemidir. En dar detaylarda bile kesintisiz, ek yersiz bir su yalıtım filmi oluşturur. Islak hacimler, teraslar ve temel perdelerinde yüksek performans gösterir.',
  'zemin-kaplama' => 'Epoksi ve poliüretan esaslı, yüksek dayanımlı endüstriyel ve dekoratif zemin kaplama sistemidir. Hijyen, kimyasal dayanım ve estetiği tek yüzeyde birleştirir. Sağlık, gıda, otopark ve üretim tesislerinde yoğun trafiğe karşı uzun ömürlüdür.',
  'yesil-cati-zeminleri' => 'Bitkilendirilmiş çatılar için su yalıtımı, kök tutuculuk ve drenajı bir arada sunan çok katmanlı sistemdir. Yapıyı korurken kentsel ısı adası etkisini azaltır ve yağmur suyu yönetimine katkı sağlar. Ekstansif ve intansif çözümlerle sürdürülebilir, uzun ömürlü yüzeyler oluşturur.',
];

$model = new Service();
foreach ($updates as $slug => $content) {
  $row = $model->findBy('slug', $slug);
  if ($row) {
    $model->update((int) $row['id'], ['content' => $content]);
    echo "Kisaltildi: {$row['title']} (" . mb_strlen($content) . " karakter)\n";
  }
}
echo "Tamamlandi.\n";
