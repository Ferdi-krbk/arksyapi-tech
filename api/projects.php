<?php
/**
 * GET /api/projects.php           -> yayinlanmis proje listesi
 * GET /api/projects.php?slug=xxx  -> tek proje (gorselleriyle)
 */
require_once __DIR__ . '/init.php';

$model = new Project();

if (!empty($_GET['slug'])) {
    $row = $model->publishedBySlug((string) $_GET['slug']);
    if (!$row) {
        json(['error' => 'Proje bulunamadi'], 404);
    }
    $row['cover_image_url'] = image_url($row['cover_image']);
    // Galeri gorselleri
    $images = $model->images((int) $row['id']);
    foreach ($images as &$img) { $img['image_url'] = image_url($img['image_path']); }
    unset($img);
    $row['images'] = $images;
    json(['data' => $row]);
}

$limit  = min(50, max(1, (int) ($_GET['limit'] ?? 10)));
$offset = max(0, (int) ($_GET['offset'] ?? 0));

$rows = $model->published($limit, $offset);
foreach ($rows as &$r) {
    $r['cover_image_url'] = image_url($r['cover_image']);
}
unset($r);

json(['data' => $rows, 'count' => count($rows)]);
