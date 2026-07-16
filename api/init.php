<?php
/**
 * api/init.php
 * Tum API dosyalarinin basinda cagrilir.
 * JSON basligi ayarlar, CORS acar ve json() yardimcisini tanimlar.
 */
require_once __DIR__ . '/../includes/bootstrap.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');           // frontend farkli porttan cekebilsin
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Tarayici on-kontrol (preflight) istegini gecistir
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

/**
 * JSON cevap dondurur ve scripti durdurur.
 */
function json($data, int $code = 200): void
{
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

/**
 * Yuklenen bir gorselin tam URL'sini uretir (null ise null doner).
 */
function image_url(?string $path): ?string
{
    return $path ? UPLOAD_URL . '/' . $path : null;
}
