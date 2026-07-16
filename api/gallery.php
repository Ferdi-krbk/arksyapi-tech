<?php
/**
 * GET /api/gallery.php  -> galeri gorselleri
 */
require_once __DIR__ . '/init.php';

$rows = (new Gallery())->ordered();
foreach ($rows as &$r) { $r['image_url'] = image_url($r['image_path']); }
unset($r);

json(['data' => $rows, 'count' => count($rows)]);
