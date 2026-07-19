<?php
/**
 * admin/testimonials/edit.php
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

$pageTitle = 'Yorum Duzenle';
$active    = 'testimonials';

$model = new Testimonial();
$id = (int) input('id', 0);
$item = $model->find($id);
if (!$item) { set_flash('error','Yorum bulunamadi.'); redirect('/admin/testimonials/list.php'); }

$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $name       = trim((string) input('name', ''));
    $role       = trim((string) input('role', ''));
    $content    = trim((string) input('content', ''));
    $rating     = max(1, min(5, (int) input('rating', 5)));
    $sort_order = (int) input('sort_order', 0);
    $is_active  = input('is_active') ? 1 : 0;

    if ($name === '')    { $errors[] = 'Ad zorunludur.'; }
    if ($content === '') { $errors[] = 'Yorum metni zorunludur.'; }

    if (empty($errors)) {
        $model->update($id, compact('name','role','content','rating','sort_order','is_active'));
        set_flash('success', 'Yorum guncellendi.');
        redirect('/admin/testimonials/list.php');
    }
    $item = array_merge($item, compact('name','role','content','rating','sort_order','is_active'));
}

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head"><h2>Yorum Duzenle</h2>
        <a href="<?= BASE_URL ?>/admin/testimonials/list.php" class="btn btn-secondary btn-sm">Geri</a></div>
    <div class="panel-body">
        <?php foreach ($errors as $err): ?><div class="alert alert-danger"><?= e($err) ?></div><?php endforeach; ?>
        <form method="post">
            <?= csrf_field() ?>
            <div class="form-row">
                <div class="form-group"><label>Ad Soyad *</label>
                    <input type="text" name="name" class="form-control" value="<?= e($item['name']) ?>"></div>
                <div class="form-group"><label>Unvan / Firma</label>
                    <input type="text" name="role" class="form-control" value="<?= e($item['role']) ?>"></div>
            </div>
            <div class="form-group"><label>Yorum *</label>
                <textarea name="content" class="form-control"><?= e($item['content']) ?></textarea></div>
            <div class="form-row">
                <div class="form-group"><label>Puan (1-5)</label>
                    <input type="number" name="rating" min="1" max="5" class="form-control" value="<?= (int) $item['rating'] ?>"></div>
                <div class="form-group"><label>Sira</label>
                    <input type="number" name="sort_order" class="form-control" value="<?= (int) $item['sort_order'] ?>"></div>
                <div class="form-group"><label>Durum</label><br>
                    <label><input type="checkbox" name="is_active" value="1" <?= $item['is_active']?'checked':'' ?>> Aktif</label></div>
            </div>
            <button class="btn btn-success">Guncelle</button>
        </form>
    </div>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
