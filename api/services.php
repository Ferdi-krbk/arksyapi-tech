<?php
/**
 * GET /api/services.php  -> aktif hizmetler
 */
require_once __DIR__ . '/init.php';

$rows = (new Service())->active();
foreach ($rows as &$r) { $r['image_url'] = image_url($r['image']); }
unset($r);

json(['data' => $rows, 'count' => count($rows)]);
