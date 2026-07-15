<?php
/**
 * admin/pages/list.php
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

$pageTitle = 'Sayfalar';
$active    = 'pages';

$pages = (new Page())->all('id DESC');

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head">
        <h2>Sayfalar (<?= count($pages) ?>)</h2>
        <a href="<?= BASE_URL ?>/admin/pages/create.php" class="btn btn-success">+ Yeni Sayfa</a>
    </div>
    <div class="panel-body">
        <?php if (empty($pages)): ?>
            <p class="text-muted">Henuz sayfa yok.</p>
        <?php else: ?>
            <table>
                <thead><tr><th>Baslik</th><th>Slug</th><th>Guncelleme</th><th>Islem</th></tr></thead>
                <tbody>
                <?php foreach ($pages as $p): ?>
                    <tr>
                        <td><?= e($p['title']) ?></td>
                        <td class="text-muted"><?= e($p['slug']) ?></td>
                        <td><?= e((string) $p['updated_at']) ?></td>
                        <td class="actions">
                            <a href="<?= BASE_URL ?>/admin/pages/edit.php?id=<?= (int) $p['id'] ?>" class="btn btn-sm">Duzenle</a>
                            <form method="post" action="<?= BASE_URL ?>/admin/pages/delete.php" style="display:inline" onsubmit="return confirm('Silinsin mi?');">
                                <?= csrf_field() ?>
                                <input type="hidden" name="id" value="<?= (int) $p['id'] ?>">
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
