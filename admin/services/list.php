<?php
/**
 * admin/services/list.php
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

$pageTitle = 'Hizmetler';
$active    = 'services';

$services = (new Service())->all('sort_order ASC, id ASC');

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head">
        <h2>Hizmetler (<?= count($services) ?>)</h2>
        <a href="<?= BASE_URL ?>/admin/services/create.php" class="btn btn-success">+ Yeni Hizmet</a>
    </div>
    <div class="panel-body">
        <?php if (empty($services)): ?>
            <p class="text-muted">Henuz hizmet eklenmemis.</p>
        <?php else: ?>
            <table>
                <thead><tr><th>Gorsel</th><th>Baslik</th><th>Sira</th><th>Durum</th><th>Islem</th></tr></thead>
                <tbody>
                <?php foreach ($services as $s): ?>
                    <tr>
                        <td><?php if ($s['image']): ?><img class="thumb" src="<?= UPLOAD_URL.'/'.e($s['image']) ?>"><?php else: ?><span class="text-muted">-</span><?php endif; ?></td>
                        <td><?= e($s['title']) ?></td>
                        <td><?= (int) $s['sort_order'] ?></td>
                        <td><?= $s['is_active'] ? '<span class="badge-status badge-on">Aktif</span>' : '<span class="badge-status badge-off">Pasif</span>' ?></td>
                        <td class="actions">
                            <a href="<?= BASE_URL ?>/admin/services/edit.php?id=<?= (int) $s['id'] ?>" class="btn btn-sm">Duzenle</a>
                            <form method="post" action="<?= BASE_URL ?>/admin/services/delete.php" style="display:inline" onsubmit="return confirm('Silinsin mi?');">
                                <?= csrf_field() ?>
                                <input type="hidden" name="id" value="<?= (int) $s['id'] ?>">
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
