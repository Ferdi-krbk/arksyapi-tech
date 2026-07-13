<?php
/**
 * GET /api/references.php  -> aktif referanslar
 */
require_once __DIR__ . '/init.php';

$rows = (new Reference())->active();
json(['data' => $rows, 'count' => count($rows)]);
