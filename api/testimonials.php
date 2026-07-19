<?php
/**
 * GET /api/testimonials.php  -> aktif musteri yorumlari
 */
require_once __DIR__ . '/init.php';

$rows = (new Testimonial())->active();
json(['data' => $rows, 'count' => count($rows)]);
