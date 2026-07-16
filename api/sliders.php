<?php
/**
 * GET /api/sliders.php  -> aktif slider'lar
 */
require_once __DIR__ . '/init.php';

$rows = (new Slider())->active();
foreach ($rows as &$r) { $r['image_url'] = image_url($r['image_path']); }
unset($r);

json(['data' => $rows, 'count' => count($rows)]);
