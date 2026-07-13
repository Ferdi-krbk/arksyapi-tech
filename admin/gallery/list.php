<?php
/**
 * admin/gallery/list.php
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

$pageTitle = 'Galeri';
$active    = 'gallery';

$items = (new Gallery())->ordered();

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head">
        <h2>Galeri (<?= count($items) ?>)</h2>
        <a href="<?= BASE_URL ?>/admin/gallery/create.php" class="btn btn-success">+ Gorsel Ekle</a>
    </div>
    <div class="panel-body">
        <?php if (empty($items)): ?>
            <p class="text-muted">Henuz gorsel yok.</p>
        <?php else: ?>
            <table>
                <thead><tr><th>Gorsel</th><th>Baslik</th><th>Kategori</th><th>Sira</th><th>Islem</th></tr></thead>
                <tbody>
                <?php foreach ($items as $g): ?>
                    <tr>
                        <td><img class="thumb" src="<?= UPLOAD_URL.'/'.e($g['image_path']) ?>"></td>
                        <td><?= e($g['title'] ?: '-') ?></td>
                        <td><?= e($g['category'] ?: '-') ?></td>
                        <td><?= (int) $g['sort_order'] ?></td>
                        <td class="actions">
                            <form method="post" action="<?= BASE_URL ?>/admin/gallery/delete.php" style="display:inline" onsubmit="return confirm('Silinsin mi?');">
                                <?= csrf_field() ?>
                                <input type="hidden" name="id" value="<?= (int) $g['id'] ?>">
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
