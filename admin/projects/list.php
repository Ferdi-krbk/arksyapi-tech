<?php
/**
 * admin/projects/list.php
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

$pageTitle = 'Projeler';
$active    = 'projects';

$projects = (new Project())->allWithDetails();

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head">
        <h2>Projeler (<?= count($projects) ?>)</h2>
        <a href="<?= BASE_URL ?>/admin/projects/create.php" class="btn btn-success">+ Yeni Proje</a>
    </div>
    <div class="panel-body">
        <?php if (empty($projects)): ?>
            <p class="text-muted">Henuz proje eklenmemis.</p>
        <?php else: ?>
            <table>
                <thead>
                    <tr><th>Gorsel</th><th>Baslik</th><th>Kategori</th><th>Musteri</th><th>Durum</th><th>Islem</th></tr>
                </thead>
                <tbody>
                <?php foreach ($projects as $p): ?>
                    <tr>
                        <td>
                            <?php if ($p['cover_image']): ?>
                                <img class="thumb" src="<?= UPLOAD_URL . '/' . e($p['cover_image']) ?>" alt="">
                            <?php else: ?><span class="text-muted">-</span><?php endif; ?>
                        </td>
                        <td><?= e($p['title']) ?></td>
                        <td><?= e($p['category_name'] ?: '-') ?></td>
                        <td><?= e($p['client_name'] ?: '-') ?></td>
                        <td>
                            <?php if ($p['is_active']): ?>
                                <span class="badge-status badge-on">Yayinda</span>
                            <?php else: ?>
                                <span class="badge-status badge-off">Taslak</span>
                            <?php endif; ?>
                        </td>
                        <td class="actions">
                            <a href="<?= BASE_URL ?>/admin/projects/edit.php?id=<?= (int) $p['id'] ?>" class="btn btn-sm">Duzenle</a>
                            <form method="post" action="<?= BASE_URL ?>/admin/projects/delete.php" style="display:inline"
                                  onsubmit="return confirm('Bu proje silinsin mi?');">
                                <?= csrf_field() ?>
                                <input type="hidden" name="id" value="<?= (int) $p['id'] ?>">
                                <button type="submit" class="btn btn-sm btn-danger">Sil</button>
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
