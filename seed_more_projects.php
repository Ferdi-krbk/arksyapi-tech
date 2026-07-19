<?php
/**
 * seed_more_projects.php — 3 ornek proje daha ekler (kapak + galeri gorselleriyle).
 */
require_once __DIR__ . '/includes/bootstrap.php';

$project = new Project();

$data = [
  [
    'title' => 'Marmara Lojistik Merkezi',
    'slug' => 'marmara-lojistik-merkezi',
    'client_name' => 'Marmara Lojistik A.Ş.',
    'location' => 'İstanbul, Tuzla',
    'completion_date' => '2024-09-20',
    'summary' => '12.000 m² depo çatısında polyurea su yalıtımı ve zemin güçlendirme.',
    'content' => "Büyük ölçekli lojistik tesisinin çatı ve zemininde bütünsel yalıtım çözümü uygulandı.\n\n- 12.000 m² çatıda polyurea sprey su yalıtımı\n- Yükleme alanlarında ağır hizmet epoksi zemin\n- 72 saatte, işletme durmadan tamamlandı\n\nSonuç: dikişsiz, ek yeri olmayan, 10 yıl garantili bir koruma katmanı.",
    'cover_image' => 'projects/marmara-kapak.jpg',
    'is_featured' => 1, 'is_active' => 1,
    'images' => [
      ['image_path' => 'projects/marmara-1.jpg', 'caption' => 'Çatı sprey uygulaması'],
      ['image_path' => 'projects/marmara-2.jpg', 'caption' => 'Membran detayı'],
    ],
  ],
  [
    'title' => 'Yeşil Çatı Konut Projesi',
    'slug' => 'yesil-cati-konut-projesi',
    'client_name' => 'Bosphorus İnşaat',
    'location' => 'İstanbul, Sarıyer',
    'completion_date' => '2024-04-10',
    'summary' => 'Lüks konut bloklarında 4.500 m² ekstansif yeşil çatı sistemi.',
    'content' => "Konut projesinin teras çatılarında bitkilendirilmiş yeşil çatı sistemi kuruldu.\n\n- Kök tutucu membran + drenaj + filtre katmanları\n- Ekstansif bitki örtüsü ile düşük bakım\n- Yağmur suyu yönetimi ve ısı yalıtımı\n\nYapı korunurken sakinlere yeşil bir yaşam alanı kazandırıldı.",
    'cover_image' => 'projects/yesil-kapak.jpg',
    'is_featured' => 1, 'is_active' => 1,
    'images' => [
      ['image_path' => 'projects/yesil-1.jpg', 'caption' => 'Tamamlanan yeşil çatı'],
    ],
  ],
  [
    'title' => 'Endüstriyel Zemin Kaplama',
    'slug' => 'endustriyel-zemin-kaplama',
    'client_name' => 'Ford Otosan',
    'location' => 'Kocaeli, Gölcük',
    'completion_date' => '2023-12-05',
    'summary' => 'Üretim tesisinde 8.000 m² kimyasal dayanımlı epoksi zemin.',
    'content' => "Otomotiv üretim tesisinin zemininde yüksek dayanımlı epoksi kaplama uygulandı.\n\n- Kimyasal ve mekanik dayanımlı sistem\n- Kayma direnci ve hijyenik yüzey\n- Forklift trafiğine uygun yük taşıma\n\nÜretim hattı kesintiye uğramadan, etaplı çalışma ile tamamlandı.",
    'cover_image' => 'projects/zemin-kapak.jpg',
    'is_featured' => 0, 'is_active' => 1,
    'images' => [
      ['image_path' => 'projects/zemin-1.jpg', 'caption' => 'Epoksi zemin uygulaması'],
    ],
  ],
];

$pi = new ProjectImage();
foreach ($data as $d) {
    $images = $d['images']; unset($d['images']);
    $ex = $project->findBy('slug', $d['slug']);
    if ($ex) { echo "Atlandi (var): {$d['title']}\n"; continue; }
    $pid = $project->create($d);
    echo "Eklendi: {$d['title']} (id=$pid)\n";
    $i = 1;
    foreach ($images as $img) {
        $pi->create(['project_id' => $pid, 'image_path' => $img['image_path'], 'caption' => $img['caption'], 'sort_order' => $i++]);
        echo "  Gorsel: {$img['image_path']}\n";
    }
}
echo "\nTamamlandi.\n";
