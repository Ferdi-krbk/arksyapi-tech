<?php
/**
 * admin/references/list.php
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

$pageTitle = 'Referanslar';
$active    = 'references';

$items = (new Reference())->all('sort_order ASC, id ASC');

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head">
        <h2>Referanslar (<?= count($items) ?>)</h2>
        <a href="<?= BASE_URL ?>/admin/references/create.php" class="btn btn-success">+ Yeni Referans</a>
    </div>
    <div class="panel-body">
        <?php if (empty($items)): ?>
            <p class="text-muted">Henuz referans eklenmedi. Frontend'deki referans listesi bos gorunur.</p>
        <?php else: ?>
            <table>
                <thead><tr><th>Sira</th><th>Firma Adi</th><th>Aciklama</th><th>Durum</th><th>Islem</th></tr></thead>
                <tbody>
                <?php foreach ($items as $r): ?>
                    <tr>
                        <td><?= (int) $r['sort_order'] ?></td>
                        <td><?= e($r['name']) ?></td>
                        <td><?= e($r['description'] ?: '-') ?></td>
                        <td><?= $r['is_active'] ? '<span class="badge-status badge-on">Aktif</span>' : '<span class="badge-status badge-off">Pasif</span>' ?></td>
                        <td class="actions">
                            <a href="<?= BASE_URL ?>/admin/references/edit.php?id=<?= (int) $r['id'] ?>" class="btn btn-sm">Duzenle</a>
                            <form method="post" action="<?= BASE_URL ?>/admin/references/delete.php" style="display:inline" onsubmit="return confirm('Silinsin mi?');">
                                <?= csrf_field() ?>
                                <input type="hidden" name="id" value="<?= (int) $r['id'] ?>">
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
