<?php
/**
 * GET /api/news.php            -> yayinlanmis haber listesi
 * GET /api/news.php?slug=xxx   -> tek haber
 * GET /api/news.php?limit=5    -> adet sinirlama
 */
require_once __DIR__ . '/init.php';

$model = new News();

// Tek haber (slug ile)
if (!empty($_GET['slug'])) {
    $row = $model->publishedBySlug((string) $_GET['slug']);
    if (!$row) {
        json(['error' => 'Haber bulunamadi'], 404);
    }
    $row['thumbnail_url'] = image_url($row['thumbnail']);
    json(['data' => $row]);
}

// Liste
$limit  = min(50, max(1, (int) ($_GET['limit'] ?? 10)));
$offset = max(0, (int) ($_GET['offset'] ?? 0));

$rows = $model->published($limit, $offset);
foreach ($rows as &$r) {
    $r['thumbnail_url'] = image_url($r['thumbnail']);
}
unset($r);

json(['data' => $rows, 'count' => count($rows)]);
