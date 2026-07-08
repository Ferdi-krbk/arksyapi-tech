<?php
/**
 * helpers.php
 * Her yerde kullanacagimiz kucuk yardimci fonksiyonlar.
 */

if (!defined('APP_RUNNING')) {
    http_response_code(403);
    exit('Direct access not allowed.');
}

/**
 * e() = escape. Ekrana veri basmadan once XSS'e karsi temizler.
 * KURAL: Ekrana yazdirilan her kullanici verisi e() ile sarilir.
 */
function e(?string $value): string
{
    return htmlspecialchars($value ?? '', ENT_QUOTES, 'UTF-8');
}

/**
 * Baska bir sayfaya yonlendirir ve scripti durdurur.
 */
function redirect(string $path): void
{
    // Tam URL degilse basina BASE_URL ekle
    if (!preg_match('#^https?://#', $path)) {
        $path = BASE_URL . '/' . ltrim($path, '/');
    }
    header('Location: ' . $path);
    exit;
}

/**
 * Formdan gelen degeri guvenle alir (yoksa varsayilan doner).
 */
function input(string $key, $default = null)
{
    return $_POST[$key] ?? $_GET[$key] ?? $default;
}

/**
 * Metni URL dostu "slug" haline getirir.
 * Ornek: "Yeni Proje Basladi!" => "yeni-proje-basladi"
 */
function slugify(string $text): string
{
    // Turkce karakterleri ingilizce karsiligiyla degistir
    $tr = ['ş','Ş','ı','İ','ğ','Ğ','ü','Ü','ö','Ö','ç','Ç'];
    $en = ['s','s','i','i','g','g','u','u','o','o','c','c'];
    $text = str_replace($tr, $en, $text);

    $text = mb_strtolower($text, 'UTF-8');
    // Harf/rakam disindaki her seyi tireye cevir
    $text = preg_replace('/[^a-z0-9]+/', '-', $text);
    return trim($text, '-');
}

/* ----------------------------------------------------------
 | CSRF KORUMASI (form sahtekarligina karsi)
 ---------------------------------------------------------- */

/**
 * Oturuma bir CSRF token uretir/dondurur. Formlarda gizli alana konur.
 */
function csrf_token(): string
{
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf'];
}

/**
 * Forma gizli CSRF input'unu basar.  Kullanim:  <?= csrf_field() ?>
 */
function csrf_field(): string
{
    return '<input type="hidden" name="csrf" value="' . csrf_token() . '">';
}

/**
 * POST istegindeki token'i dogrular. Yanlissa scripti durdurur.
 */
function csrf_check(): void
{
    $sent = $_POST['csrf'] ?? '';
    if (!hash_equals($_SESSION['csrf'] ?? '', $sent)) {
        http_response_code(419);
        exit('Gecersiz veya suresi dolmus istek (CSRF).');
    }
}

/**
 * Tek seferlik "flash" mesaj kaydeder (bir sonraki sayfada gosterilir).
 */
function set_flash(string $type, string $message): void
{
    $_SESSION['flash'][$type] = $message;
}

/**
 * Flash mesajini okur ve siler.
 */
function get_flash(string $type): ?string
{
    if (!empty($_SESSION['flash'][$type])) {
        $msg = $_SESSION['flash'][$type];
        unset($_SESSION['flash'][$type]);
        return $msg;
    }
    return null;
}
