<?php
/**
 * admin/partials/header.php
 * Tum admin sayfalarinin ust kismi (HTML basi + sidebar + topbar).
 * Kullanim (sayfanin en ustunde):
 *
 *     require_once __DIR__ . '/../../includes/bootstrap.php';
 *     require_login();
 *     $pageTitle = 'Haberler';
 *     $active = 'news';
 *     require __DIR__ . '/../partials/header.php';
 *
 * Not: $active ve $pageTitle degiskenleri header'dan ONCE tanimlanmalidir.
 */

if (!defined('APP_RUNNING')) { exit('Direct access not allowed.'); }

// Guvenlik: header dahil edilen her sayfa giris ister
require_login();

$pageTitle = $pageTitle ?? 'Panel';
$active    = $active ?? '';

// Okunmamis mesaj sayisi (sidebar rozeti icin)
$unreadMessages = (new ContactMessage())->unreadCount();

/** Sidebar link yardimcisi: aktif olani isaretler */
function nav_link(string $key, string $active, string $url, string $label, ?int $badge = null): string
{
    $cls = ($key === $active) ? ' class="active"' : '';
    $b   = ($badge && $badge > 0) ? ' <span class="badge">' . $badge . '</span>' : '';
    return '<a href="' . BASE_URL . $url . '"' . $cls . '>' . $label . $b . '</a>';
}
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= e($pageTitle) ?> - ARKS Yonetim</title>
    <link rel="stylesheet" href="<?= BASE_URL ?>/admin/assets/style.css">
</head>
<body>
<div class="layout">
    <aside class="sidebar">
        <div class="brand">ARKS Yonetim</div>
        <nav>
            <?= nav_link('dashboard', $active, '/admin/index.php', 'Dashboard') ?>
            <?= nav_link('news', $active, '/admin/news/list.php', 'Haberler') ?>
            <?= nav_link('projects', $active, '/admin/projects/list.php', 'Projeler') ?>
            <?= nav_link('categories', $active, '/admin/categories/index.php', 'Kategoriler') ?>
            <?= nav_link('services', $active, '/admin/services/list.php', 'Hizmetler') ?>
            <?= nav_link('gallery', $active, '/admin/gallery/list.php', 'Galeri') ?>
            <?= nav_link('sliders', $active, '/admin/sliders/list.php', 'Slider') ?>
            <?= nav_link('testimonials', $active, '/admin/testimonials/list.php', 'Yorumlar') ?>
            <?= nav_link('pages', $active, '/admin/pages/list.php', 'Sayfalar') ?>
            <?= nav_link('messages', $active, '/admin/messages/list.php', 'Mesajlar', $unreadMessages) ?>
            <?php if (current_role() === 'Administrator'): ?>
                <?= nav_link('settings', $active, '/admin/settings/index.php', 'Ayarlar') ?>
                <?= nav_link('users', $active, '/admin/users/list.php', 'Kullanicilar') ?>
            <?php endif; ?>
        </nav>
    </aside>

    <div class="main">
        <div class="topbar">
            <strong><?= e($pageTitle) ?></strong>
            <div class="user">
                <?= e(current_user_name()) ?> (<?= e(current_role()) ?>) &nbsp;|&nbsp;
                <a href="<?= BASE_URL ?>/admin/logout.php">Cikis</a>
            </div>
        </div>

        <div class="content">
            <?php if ($msg = get_flash('success')): ?>
                <div class="alert alert-success"><?= e($msg) ?></div>
            <?php endif; ?>
            <?php if ($msg = get_flash('error')): ?>
                <div class="alert alert-danger"><?= e($msg) ?></div>
            <?php endif; ?>
