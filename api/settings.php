<?php
/**
 * GET /api/settings.php  -> site ayarlari (sirket adi, logo, sosyal medya)
 * Frontend footer/header icin.
 */
require_once __DIR__ . '/init.php';

$settings = (new Setting())->allAsArray();

// Logo'yu tam URL yap
if (!empty($settings['logo'])) {
    $settings['logo_url'] = image_url($settings['logo']);
}

json(['data' => $settings]);
