<?php
/**
 * config.sample.php
 * Bu dosyayi 'config.php' olarak kopyalayip kendi bilgilerinle doldur.
 *   copy includes\config.sample.php includes\config.php   (Windows)
 * config.php .gitignore'da oldugu icin sifreler repoya girmez.
 */

if (!defined('APP_RUNNING')) {
    http_response_code(403);
    exit('Direct access not allowed.');
}

/* ----------------------------------------------------------
 | VERITABANI BILGILERI (Laragon / MySQL 8)
 ---------------------------------------------------------- */
define('DB_HOST', '127.0.0.1');
define('DB_PORT', '3306');
define('DB_NAME', 'arksyapıtech');   // kendi veritabani adin
define('DB_USER', 'root');
define('DB_PASS', '');               // kendi MySQL sifren
define('DB_CHARSET', 'utf8mb4');

/* ----------------------------------------------------------
 | SITE / YOL AYARLARI
 ---------------------------------------------------------- */
define('BASE_PATH', dirname(__DIR__));
define('UPLOAD_PATH', BASE_PATH . DIRECTORY_SEPARATOR . 'uploads');

// Tarayicida gorunen adres OTOMATIK algilanir; elle degistirmene gerek yok.
if (!empty($_SERVER['HTTP_HOST'])) {
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    define('BASE_URL', $scheme . '://' . $_SERVER['HTTP_HOST']);
} else {
    define('BASE_URL', 'http://localhost');
}

define('UPLOAD_URL', BASE_URL . '/uploads');

/* ----------------------------------------------------------
 | GENEL AYARLAR
 ---------------------------------------------------------- */
define('APP_DEBUG', true);
define('MAX_UPLOAD_SIZE', 2 * 1024 * 1024);
define('ALLOWED_IMAGE_TYPES', [
    'image/jpeg' => 'jpg',
    'image/png'  => 'png',
    'image/webp' => 'webp',
    'image/gif'  => 'gif',
]);

date_default_timezone_set('Europe/Istanbul');
