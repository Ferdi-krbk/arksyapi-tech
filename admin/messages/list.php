<?php
/**
 * admin/messages/list.php
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

$pageTitle = 'Mesajlar';
$active    = 'messages';

$messages = (new ContactMessage())->all('created_at DESC');

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head"><h2>Gelen Mesajlar (<?= count($messages) ?>)</h2></div>
    <div class="panel-body">
        <?php if (empty($messages)): ?>
            <p class="text-muted">Henuz mesaj yok.</p>
        <?php else: ?>
            <table>
                <thead><tr><th>Durum</th><th>Ad</th><th>E-posta</th><th>Konu</th><th>Tarih</th><th>Islem</th></tr></thead>
                <tbody>
                <?php foreach ($messages as $m): ?>
                    <tr>
                        <td><?= $m['is_read'] ? '<span class="badge-status badge-off">Okundu</span>' : '<span class="badge-status badge-on">Yeni</span>' ?></td>
                        <td><?= e($m['fullname']) ?></td>
                        <td><?= e($m['email']) ?></td>
                        <td><?= e($m['subject'] ?: '-') ?></td>
                        <td><?= e((string) $m['created_at']) ?></td>
                        <td class="actions">
                            <a href="<?= BASE_URL ?>/admin/messages/view.php?id=<?= (int) $m['id'] ?>" class="btn btn-sm">Goruntule</a>
                            <form method="post" action="<?= BASE_URL ?>/admin/messages/delete.php" style="display:inline" onsubmit="return confirm('Silinsin mi?');">
                                <?= csrf_field() ?>
                                <input type="hidden" name="id" value="<?= (int) $m['id'] ?>">
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
