<?php
/**
 * GET /api/references.php  -> aktif referanslar (logo URL'leri ile)
 */
require_once __DIR__ . '/init.php';

$rows = (new Reference())->active();
foreach ($rows as &$r) {
    $r['logo_url'] = image_url($r['logo_path']);
}
unset($r);
json(['data' => $rows, 'count' => count($rows)]);
