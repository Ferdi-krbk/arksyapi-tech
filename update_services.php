<?php
/**
 * update_services.php — Mevcut 5 hizmetin aciklamalarini uzatir/gelistirir.
 * Slug'a gore bulur ve content + short_description gunceller.
 */
require_once __DIR__ . '/includes/bootstrap.php';

$updates = [
  'polyurea' => [
    'short_description' => 'Hızlı kürleşen, dikişsiz ve ömür boyu dayanan sprey poliüre koruma sistemleri.',
    'content' => 'Polyurea (saf poliüre), çift komponentli ve %100 katı yapıya sahip, çok hızlı kürleşen elastomerik bir sprey kaplama malzemesidir. Aromatik ya da alifatik izosiyanat prepolimeri ile amin sonlu reçinenin yüksek basınç altında, ısıtmalı çok bileşenli sprey makinelerinde karışmasıyla oluşur.

Uygulamadan yalnızca birkaç saniye sonra kürleşmeye başlaması sayesinde, dikey yüzeylerde bile akma yapmadan tek seferde kalın film oluşturabilir. Bu hız, projelerde iş sürekliliği ve minimum süreç kaybı anlamına gelir; 24 saat içinde yüzey tam servise alınabilir.

Oluşturduğu yekpare, dikişsiz membran; ekstrem sıcaklık farklarına (-40°C / +150°C), mekanik darbeye, aşınmaya, UV etkisine ve pek çok kimyasala karşı üstün direnç gösterir. Bu nedenle su depoları, arıtma tesisleri, köprü ve viyadük tabliyeleri, endüstriyel çatılar, otopark döşemeleri, tüneller ve sekonder sızdırmazlık havuzları gibi yüksek performans gerektiren alanlarda tercih edilir.

ARKS olarak polyurea uygulamalarında yüzey hazırlığından astar seçimine, nem ve sıcaklık kontrolünden final kalınlık ölçümüne kadar her aşamayı sertifikalı ekiplerimizle ve kalibre ekipmanlarımızla yürütür; uygulama sonrası kür ve yapışma testleriyle performansı belgeleriz.',
  ],
  'poliuretan' => [
    'short_description' => 'Isı, su ve ses yalıtımını tek uygulamada birleştiren esnek poliüretan sistemleri.',
    'content' => 'Poliüretan, ilk kez 1937 yılında Otto Bayer tarafından sentezlenen, diizosiyanatın poliol ile reaksiyonundan elde edilen çok yönlü bir polimer ailesidir. Formülasyona ve su varlığına göre sert köpük, esnek köpük ya da elastomerik kaplama olarak farklı yapılarda üretilebilir.

Sprey poliüretan köpük (SPF) uygulamalarında malzeme yüzeye püskürtüldüğü anda genleşerek en karmaşık geometrilere, boşluklara ve detaylara tam uyum sağlar. Böylece ısı köprülerini tamamen ortadan kaldırır, dikişsiz ve fugasız bir yalıtım tabakası oluşturur. Yüksek ısı yalıtım katsayısı sayesinde binalarda enerji tüketimini önemli ölçüde düşürür.

Isı yalıtımının yanında su yalıtımı ve akustik konfor da tek uygulamada sağlanır. Hafif yapısı yapıya minimum yük bindirir; bu da özellikle geniş açıklıklı endüstriyel çatılarda ve mevcut yapı güçlendirmelerinde büyük avantaj sunar.

ARKS olarak soğuk hava depoları, fabrika ve tesis çatıları, cephe yalıtımları ve teras uygulamalarında poliüretan sistemlerini; doğru yoğunluk, kalınlık ve kür koşullarıyla, uzun servis ömrü hedefiyle uygularız. Gerektiğinde UV dayanımı için üzerine koruyucu üst kat kaplama ile sistemi tamamlarız.',
  ],
  'surme-izolasyon' => [
    'short_description' => 'En dar detaylarda bile kesintisiz su yalıtımı sağlayan sürme sistem çözümleri.',
    'content' => 'Sürme izolasyon, fırça, rulo veya mala ile uygulanan; bitüm esaslı, poliüretan esaslı, elastomerik reçine esaslı ve çimento esaslı su yalıtım ürünlerinin oluşturduğu geniş bir çözüm ailesidir. Astarlar, emprenye ürünleri, bandlar ve yardımcı malzemelerle birlikte bütünsel bir sistem olarak kurgulanır.

Bu yöntemin en büyük avantajı, karmaşık ve dar detaylara mükemmel uyum sağlamasıdır. Boru dipleri, gider ağızları, köşe ve birleşim noktaları, perde-temel bağlantıları gibi klasik membranların zorlandığı bölgelerde; sürme sistemler kesintisiz, ek yersiz ve tam yapışkan bir su yalıtım filmi oluşturur.

Çimento esaslı çift bileşenli sistemler ıslak hacimlerde ve su depolarında; poliüretan esaslı elastomerik sistemler ise teraslarda, balkonlarda ve yaya/araç trafiğine maruz yüzeylerde yüksek performans gösterir. Uygulanan filmin esnekliği, yapının hareketlerine ve çatlak köprüleme ihtiyacına cevap verir.

ARKS olarak sürme izolasyon projelerinde zemin nemini ölçer, doğru astarı seçer, kat kalınlıklarını ve sarfiyatı kontrol ederek uygularız. Detay çözümlerini file ve band takviyeleriyle güçlendirir, uygulama sonrası su tutma testleriyle sızdırmazlığı doğrularız.',
  ],
  'zemin-kaplama' => [
    'short_description' => 'Hijyen, mekanik dayanım ve estetiği tek yüzeyde birleştiren endüstriyel zemin sistemleri.',
    'content' => 'Zemin kaplama sistemleri; epoksi ve poliüretan esaslı reçinelerle oluşturulan, yüksek performanslı endüstriyel ve dekoratif yüzey çözümleridir. Self-levelling (kendiliğinden yayılan) sistemlerden, kayma dirençli tekstürlü kaplamalara kadar geniş bir yelpazede uygulanır.

Sağlık tesisleri, gıda üretim ve içecek fabrikaları, ilaç ve kozmetik üretim alanları, otoparklar, depolar ve ağır sanayi tesisleri için özel formülasyonlar sunulur. Antibakteriyel ve hijyenik yüzeyler, gıda güvenliği ve temizlik standartlarını karşılarken; kimyasal dayanımlı sistemler agresif maddelere ve yıkama süreçlerine karşı yüzeyi korur.

Bu kaplamalar yüksek yaya ve forklift trafiğine, ani sıcaklık değişimlerine ve mekanik darbelere karşı uzun ömürlü performans sağlar. Renk kararlılığı, kolay temizlenebilirlik ve tozumasız yüzey standarttır; dekoratif seçeneklerle estetik beklentiler de karşılanır.

ARKS olarak zemin kaplama projelerinde beton yüzey mukavemetini ve nemini ölçer, gerekli yüzey aşındırma (shot-blasting / freze) işlemini yapar, astar-orta kat-üst kat sistemini projeye uygun kalınlıkta uygularız. Kayma direnci sınıfı ve kaplama kalınlığı, kullanım amacına göre belirlenir.',
  ],
  'yesil-cati-zeminleri' => [
    'short_description' => 'Yapıyı koruyan, kente nefes veren tam entegre yeşil çatı ve drenaj sistemleri.',
    'content' => 'Yeşil çatı sistemleri; bitkilendirilmiş çatı yüzeyleri için su yalıtımı, kök tutuculuk, drenaj, filtrasyon ve büyüme ortamını bir arada barındıran, çok katmanlı bir mimaridir. Yapıyı dış etkenlerden korurken; kentsel ısı adası etkisini azaltır, yağmur suyu yönetimine katkı sağlar ve binaya ekstra ısı-ses yalıtımı kazandırır.

Ekstansif (hafif, düşük bakım gerektiren, sedum-bitki ağırlıklı) ve intansif (bahçe niteliğinde, yoğun bitkilendirmeye uygun) olmak üzere iki temel sistem tasarlanır. Her iki yaklaşımda da katman sıralaması kritik önemdedir: kök geçirmez su yalıtım membranı, koruma keçesi, drenaj ve su tutma levhaları, filtre tabakası ve uygun büyüme ortamı bütünsel olarak çözülür.

Doğru kurgulanmış bir yeşil çatı; membran ömrünü UV ve termal şoklardan koruyarak uzatır, yağmur suyunun ani deşarjını geciktirerek altyapı yükünü azaltır ve yapının enerji performansını iyileştirir. Estetik ve sürdürülebilirlik açısından da binaya belirgin değer katar.

ARKS olarak yeşil çatı projelerinde önce su yalıtımı ve kök bariyerini garanti altına alır, drenaj kapasitesini ve yük hesaplarını statik verilerle uyumlu planlar, bitki ve büyüme ortamı seçimini iklim koşullarına göre yaparız. Böylece hem su yalıtımı hem peyzaj uzun ömürlü ve sürdürülebilir olur.',
  ],
];

$model = new Service();
foreach ($updates as $slug => $data) {
  $row = $model->findBy('slug', $slug);
  if ($row) {
    $model->update((int) $row['id'], $data);
    echo "Guncellendi: {$row['title']} (" . strlen($data['content']) . " karakter)\n";
  } else {
    echo "BULUNAMADI: $slug\n";
  }
}
echo "\nTamamlandi. Site + admin panelde uzun aciklamalar aktif.\n";
