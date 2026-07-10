<?php
/**
 * bootstrap.php
 * Uygulamanin acilis dosyasi.
 * Her sayfanin (admin, api, public) EN BASINDA su sekilde cagrilir:
 *
 *     require_once __DIR__ . '/../includes/bootstrap.php';
 *
 * Gorevleri:
 *  - Cekirdek dosyalari yukler
 *  - Guvenli session baslatir
 *  - Model siniflarini otomatik yukler (autoload)
 */

// Tum alt dosyalarin dogrudan erisimi engellemesi icin bu sabiti tanimlariz
define('APP_RUNNING', true);

// --- Cekirdek dosyalar (sira onemli) ---
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/Database.php';
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/Model.php';
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/upload.php';

// --- Hata gosterimi (debug moduna gore) ---
if (APP_DEBUG) {
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
} else {
    error_reporting(0);
    ini_set('display_errors', '0');
}

// --- Model siniflarini otomatik yukle ---
// "new News()" yazinca models/News.php otomatik dahil edilir.
spl_autoload_register(function (string $class): void {
    $file = BASE_PATH . DIRECTORY_SEPARATOR . 'models' . DIRECTORY_SEPARATOR . $class . '.php';
    if (is_file($file)) {
        require_once $file;
    }
});

// --- Guvenli session baslat ---
if (session_status() === PHP_SESSION_NONE) {
    session_set_cookie_params([
        'lifetime' => 0,
        'path'     => '/',
        'httponly' => true,   // JavaScript cookie'yi okuyamaz (XSS koruma)
        'samesite' => 'Lax',  // CSRF'e karsi ek koruma
        'secure'   => false,  // Canlida HTTPS varsa true yap
    ]);
    session_start();
}
