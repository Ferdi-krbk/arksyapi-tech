<?php
/**
 * admin/index.php
 * Dashboard - ozet sayaclar ve son mesajlar.
 */
require_once __DIR__ . '/../includes/bootstrap.php';
require_login();

$pageTitle = 'Dashboard';
$active    = 'dashboard';

// Sayaclar
$newsCount     = (new News())->count();
$projectCount  = (new Project())->count();
$serviceCount  = (new Service())->count();
$galleryCount  = (new Gallery())->count();
$unreadCount   = (new ContactMessage())->unreadCount();

// Son 5 mesaj
$latestMessages = array_slice((new ContactMessage())->all('created_at DESC'), 0, 5);

require __DIR__ . '/partials/header.php';
?>

<div class="cards">
    <div class="card"><div class="num"><?= $newsCount ?></div><div class="label">Haber</div></div>
    <div class="card"><div class="num"><?= $projectCount ?></div><div class="label">Proje</div></div>
    <div class="card"><div class="num"><?= $serviceCount ?></div><div class="label">Hizmet</div></div>
    <div class="card"><div class="num"><?= $galleryCount ?></div><div class="label">Galeri Gorseli</div></div>
    <div class="card"><div class="num"><?= $unreadCount ?></div><div class="label">Okunmamis Mesaj</div></div>
</div>

<div class="panel">
    <div class="panel-head">
        <h2>Son Mesajlar</h2>
        <a href="<?= BASE_URL ?>/admin/messages/list.php" class="btn btn-sm btn-secondary">Tumu</a>
    </div>
    <div class="panel-body">
        <?php if (empty($latestMessages)): ?>
            <p class="text-muted">Henuz mesaj yok.</p>
        <?php else: ?>
            <table>
                <thead>
                    <tr><th>Ad</th><th>Konu</th><th>Tarih</th><th>Durum</th></tr>
                </thead>
                <tbody>
                <?php foreach ($latestMessages as $m): ?>
                    <tr>
                        <td><?= e($m['fullname']) ?></td>
                        <td><?= e($m['subject'] ?: '-') ?></td>
                        <td><?= e($m['created_at']) ?></td>
                        <td>
                            <?php if ($m['is_read']): ?>
                                <span class="badge-status badge-off">Okundu</span>
                            <?php else: ?>
                                <span class="badge-status badge-on">Yeni</span>
                            <?php endif; ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>
</div>

<?php require __DIR__ . '/partials/footer.php'; ?>
