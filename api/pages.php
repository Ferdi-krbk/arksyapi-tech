<?php
/**
 * GET /api/pages.php?slug=hakkimizda  -> tek sayfa
 * GET /api/pages.php                  -> sayfa listesi (baslik + slug)
 */
require_once __DIR__ . '/init.php';

$model = new Page();

if (!empty($_GET['slug'])) {
    $row = $model->findBy('slug', (string) $_GET['slug']);
    if (!$row) {
        json(['error' => 'Sayfa bulunamadi'], 404);
    }
    json(['data' => $row]);
}

// Liste (icerik olmadan, sadece baslik + slug)
$rows = $model->all('title ASC');
$list = array_map(fn($r) => [
    'id'    => $r['id'],
    'title' => $r['title'],
    'slug'  => $r['slug'],
], $rows);

json(['data' => $list, 'count' => count($list)]);
