<?php
/**
 * auth.php
 * Oturum ve yetkilendirme fonksiyonlari.
 * Her admin sayfasinin basinda cagrilir:
 *
 *     require_login();       // session yoksa login'e gonder
 *     require_admin();       // sadece admin rolu girebilir
 *     can('news')            // editor kullanici haberleri yonetebilir mi?
 */

if (!defined('APP_RUNNING')) {
    http_response_code(403);
    exit('Direct access not allowed.');
}

/**
 * Kullanici giris yapmis mi? Oturum yoksa login sayfasina yonlendirir.
 */
function require_login(): void
{
    if (empty($_SESSION['user_id'])) {
        redirect('/admin/login.php');
    }
}

/**
 * Sadece admin rolu girmesin istiyorsan bunu cagir.
 * Editor'leri disari atar.
 */
function require_admin(): void
{
    require_login();
    if (($_SESSION['role'] ?? '') !== 'Administrator') {
        http_response_code(403);
        exit('Bu sayfaya yalnizca yonetici erisebilir.');
    }
}

/**
 * Su an oturum acmis kullanici var mi?
 */
function is_logged_in(): bool
{
    return !empty($_SESSION['user_id']);
}

/**
 * Mevcut kullanicinin rolu.
 */
function current_role(): string
{
    return $_SESSION['role'] ?? '';
}

/**
 * Mevcut kullanici ID'si.
 */
function current_user_id(): int
{
    return (int) ($_SESSION['user_id'] ?? 0);
}

/**
 * Mevcut kullanicin adi.
 */
function current_user_name(): string
{
    return $_SESSION['user_fullname'] ?? '';
}

/**
 * Basit yetki kontrolu.
 * Admin her seyi, editor sadece icerik modullerini gorebilir.
 * Moduller: news, projects, services, gallery, pages, sliders, messages, settings
 */
function can(string $module): bool
{
    if (current_role() === 'Administrator') {
        return true;
    }
    // Editor'un erisebilecegi moduller
    $editor_modules = ['news', 'projects', 'services', 'gallery', 'pages', 'sliders', 'messages'];
    return in_array($module, $editor_modules, true);
}

/**
 * Giris denemesi yapar.
 * Basariliysa session'a kullanici bilgilerini yazar ve true doner.
 * Basarisizsa false doner.
 */
function attempt_login(string $username, string $password): bool
{
    // Kullaniciyi username'e gore ara
    $stmt = Database::conn()->prepare(
        'SELECT u.id, u.role_id, u.fullname, u.username, u.password, u.is_active,
                r.name AS role_name
         FROM users u
         JOIN roles r ON u.role_id = r.id
         WHERE u.username = ? OR u.email = ?
         LIMIT 1'
    );
    $stmt->execute([$username, $username]);
    $user = $stmt->fetch();

    if (!$user) {
        return false;
    }

    // Hesap aktif mi?
    if (!$user['is_active']) {
        return false;
    }

    // Parola dogru mu?
    if (!password_verify($password, $user['password'])) {
        return false;
    }

    // Session fixation saldirisina karsi: yeni session id ata
    session_regenerate_id(true);

    $_SESSION['user_id']       = (int) $user['id'];
    $_SESSION['role']          = $user['role_name'];
    $_SESSION['user_fullname'] = $user['fullname'];

    return true;
}

/**
 * Cikis yapar: session'i temizler ve login sayfasina yonlendirir.
 */
function logout(): void
{
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(), '',
            time() - 42000,
            $params['path'],
            $params['domain'],
            $params['secure'],
            $params['httponly']
        );
    }
    session_destroy();
    redirect('/admin/login.php');
}
