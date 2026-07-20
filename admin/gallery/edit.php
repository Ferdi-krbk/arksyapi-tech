<?php
/**
 * admin/gallery/edit.php
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

$pageTitle = 'Galeri Düzenle';
$active    = 'gallery';

$model = new Gallery();
$id = (int) input('id', 0);
$item = $model->find($id);
if (!$item) { set_flash('error', 'Görsel bulunamadı.'); redirect('/admin/gallery/list.php'); }

$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $title     = trim((string) input('title', ''));
    $category  = trim((string) input('category', ''));
    $sort_order = (int) input('sort_order', 0);

    $image = $item['image_path'];
    if (empty($errors)) {
        try {
            $new = upload_image($_FILES['image'] ?? [], 'gallery');
            if ($new !== null) { delete_upload($item['image_path']); $image = $new; }
        } catch (RuntimeException $ex) { $errors[] = $ex->getMessage(); }
    }

    if (empty($errors)) {
        $model->update($id, compact('title', 'category', 'sort_order') + ['image_path' => $image]);
        set_flash('success', 'Görsel güncellendi.');
        redirect('/admin/gallery/list.php');
    }
    $item = array_merge($item, compact('title', 'category', 'sort_order'));
}

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head"><h2>Galeri Düzenle</h2>
        <a href="<?= BASE_URL ?>/admin/gallery/list.php" class="btn btn-secondary btn-sm">Geri</a></div>
    <div class="panel-body">
        <?php foreach ($errors as $err): ?><div class="alert alert-danger"><?= e($err) ?></div><?php endforeach; ?>

        <div class="mb-4"><img class="thumb" src="<?= UPLOAD_URL . '/' . e($item['image_path']) ?>"></div>

        <form method="post" enctype="multipart/form-data">
            <?= csrf_field() ?>
            <div class="form-group"><label>Başlık</label>
                <input type="text" name="title" class="form-control" value="<?= e($item['title'] ?? '') ?>"></div>
            <div class="form-row">
                <div class="form-group"><label>Kategori</label>
                    <input type="text" name="category" class="form-control" value="<?= e($item['category'] ?? '') ?>"></div>
                <div class="form-group"><label>Sıra</label>
                    <input type="number" name="sort_order" class="form-control" value="<?= (int) ($item['sort_order'] ?? 0) ?>"></div>
            </div>
            <div class="form-group"><label>Yeni Görsel (değiştirmek istemezseniz boş bırakın)</label>
                <input type="file" name="image" class="form-control"></div>
            <button type="submit" class="btn btn-primary">Güncelle</button>
        </form>
    </div>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
