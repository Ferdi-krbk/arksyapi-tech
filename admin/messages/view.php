<?php
/**
 * admin/messages/view.php  (mesaj detayi + okundu isaretle)
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

$pageTitle = 'Mesaj Detayi';
$active    = 'messages';

$model = new ContactMessage();
$id = (int) input('id', 0);
$m = $model->find($id);
if (!$m) { set_flash('error','Mesaj bulunamadi.'); redirect('/admin/messages/list.php'); }

// Ilk goruntulemede okundu isaretle
if (!$m['is_read']) { $model->markRead($id); $m['is_read'] = 1; }

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head"><h2>Mesaj Detayi</h2>
        <a href="<?= BASE_URL ?>/admin/messages/list.php" class="btn btn-secondary btn-sm">Geri</a></div>
    <div class="panel-body">
        <table>
            <tr><th style="width:140px">Ad Soyad</th><td><?= e($m['fullname']) ?></td></tr>
            <tr><th>E-posta</th><td><a href="mailto:<?= e($m['email']) ?>"><?= e($m['email']) ?></a></td></tr>
            <tr><th>Telefon</th><td><?= e($m['phone'] ?: '-') ?></td></tr>
            <tr><th>Konu</th><td><?= e($m['subject'] ?: '-') ?></td></tr>
            <tr><th>Tarih</th><td><?= e((string) $m['created_at']) ?></td></tr>
            <tr><th>Mesaj</th><td><?= nl2br(e($m['message'])) ?></td></tr>
        </table>
    </div>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
