<?php
/**
 * admin/testimonials/list.php
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

$pageTitle = 'Müşteri Yorumları';
$active    = 'testimonials';

$items = (new Testimonial())->all('sort_order ASC, id DESC');

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head">
        <h2>Müşteri Yorumları (<?= count($items) ?>)</h2>
        <a href="<?= BASE_URL ?>/admin/testimonials/create.php" class="btn btn-success">+ Yeni Yorum</a>
    </div>
    <div class="panel-body">
        <?php if (empty($items)): ?>
            <p class="text-muted">Henuz yorum eklenmemis. Frontend'deki "Musteri yorumlari" bolumu ancak yorum ekleyince gorunur.</p>
        <?php else: ?>
            <table>
                <thead><tr><th>Ad</th><th>Unvan/Firma</th><th>Puan</th><th>Durum</th><th>Islem</th></tr></thead>
                <tbody>
                <?php foreach ($items as $t): ?>
                    <tr>
                        <td><?= e($t['name']) ?></td>
                        <td><?= e($t['role'] ?: '-') ?></td>
                        <td><?= str_repeat('★', (int) $t['rating']) ?></td>
                        <td><?= $t['is_active'] ? '<span class="badge-status badge-on">Aktif</span>' : '<span class="badge-status badge-off">Pasif</span>' ?></td>
                        <td class="actions">
                            <a href="<?= BASE_URL ?>/admin/testimonials/edit.php?id=<?= (int) $t['id'] ?>" class="btn btn-sm">Duzenle</a>
                            <form method="post" action="<?= BASE_URL ?>/admin/testimonials/delete.php" style="display:inline" onsubmit="return confirm('Silinsin mi?');">
                                <?= csrf_field() ?>
                                <input type="hidden" name="id" value="<?= (int) $t['id'] ?>">
                                <button class="btn btn-sm btn-danger">Sil</button>
                            </form>
                        </td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
