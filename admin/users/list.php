<?php
/**
 * admin/users/list.php  (sadece admin)
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_admin();

$pageTitle = 'Kullanicilar';
$active    = 'users';

$users = (new User())->allWithRole();

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head">
        <h2>Kullanicilar (<?= count($users) ?>)</h2>
        <a href="<?= BASE_URL ?>/admin/users/create.php" class="btn btn-success">+ Yeni Kullanici</a>
    </div>
    <div class="panel-body">
        <table>
            <thead><tr><th>Ad Soyad</th><th>Kullanici Adi</th><th>E-posta</th><th>Rol</th><th>Durum</th><th>Islem</th></tr></thead>
            <tbody>
            <?php foreach ($users as $u): ?>
                <tr>
                    <td><?= e($u['fullname']) ?></td>
                    <td><?= e($u['username']) ?></td>
                    <td><?= e($u['email'] ?: '-') ?></td>
                    <td><?= e($u['role_name']) ?></td>
                    <td><?= $u['is_active'] ? '<span class="badge-status badge-on">Aktif</span>' : '<span class="badge-status badge-off">Pasif</span>' ?></td>
                    <td class="actions">
                        <a href="<?= BASE_URL ?>/admin/users/edit.php?id=<?= (int) $u['id'] ?>" class="btn btn-sm">Duzenle</a>
                        <?php if ((int) $u['id'] !== current_user_id()): ?>
                            <form method="post" action="<?= BASE_URL ?>/admin/users/delete.php" style="display:inline" onsubmit="return confirm('Silinsin mi?');">
                                <?= csrf_field() ?>
                                <input type="hidden" name="id" value="<?= (int) $u['id'] ?>">
                                <button class="btn btn-sm btn-danger">Sil</button>
                            </form>
                        <?php else: ?>
                            <span class="text-muted">(siz)</span>
                        <?php endif; ?>
                    </td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
