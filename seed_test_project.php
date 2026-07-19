<?php
/**
 * seed_test_project.php — Detay sayfasini gostermek icin fotografli deneme projesi ekler.
 */
require_once __DIR__ . '/includes/bootstrap.php';

$project = new Project();
$slug = 'deneme-projesi';

$existing = $project->findBy('slug', $slug);
if ($existing) {
    $id = (int) $existing['id'];
    echo "Deneme projesi zaten var (id=$id), guncelleniyor.\n";
    $project->update($id, [
        'cover_image' => 'projects/deneme-kapak.jpg',
    ]);
} else {
    $id = $project->create([
        'category_id'     => null,
        'title'           => 'Deneme Projesi',
        'slug'            => $slug,
        'client_name'     => 'ARKS Test Müşterisi',
        'location'        => 'İstanbul, Türkiye',
        'completion_date' => '2025-05-15',
        'summary'         => 'Detay sayfasını ve fotoğraf galerisini test etmek için eklenmiş örnek projedir.',
        'content'         => "Bu projede polyurea sprey kaplama ile 3.500 m² endüstriyel çatı yüzeyi yalıtıldı.\n\nUygulama aşamaları:\n- Yüzey hazırlığı ve astar uygulaması\n- İki komponentli polyurea sprey uygulaması\n- Kalite kontrol ve kalınlık ölçümü\n\nProje 5 günde, sıfır sızıntı hedefiyle tamamlandı. Aşağıda uygulama sürecinden fotoğraflar yer almaktadır.",
        'is_featured'     => 1,
        'is_active'       => 1,
    ]);
    echo "Deneme projesi olusturuldu (id=$id)\n";
}

// Proje gorselleri (project_images)
$pi = new ProjectImage();
$check = Database::conn()->prepare('SELECT COUNT(*) FROM project_images WHERE project_id = ?');
$check->execute([$id]);
if ((int) $check->fetchColumn() === 0) {
    $imgs = [
        ['image_path' => 'projects/deneme-1.jpg', 'caption' => 'Uygulama öncesi yüzey', 'sort_order' => 1],
        ['image_path' => 'projects/deneme-2.jpg', 'caption' => 'Polyurea sprey uygulaması', 'sort_order' => 2],
        ['image_path' => 'projects/deneme-3.jpg', 'caption' => 'Tamamlanan zemin', 'sort_order' => 3],
    ];
    foreach ($imgs as $img) {
        $pi->create($img + ['project_id' => $id]);
        echo "  Gorsel eklendi: {$img['image_path']}\n";
    }
} else {
    echo "  Proje gorselleri zaten var, atlaniyor.\n";
}

echo "\nTamamlandi. Detay: http://localhost:5173/projeler/{$slug}\n";
