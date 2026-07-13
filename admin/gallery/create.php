<?php
/**
 * admin/gallery/create.php  (gorsel yukleme)
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

$pageTitle = 'Galeriye Gorsel Ekle';
$active    = 'gallery';

$errors = [];
$old = ['title'=>'','category'=>'','sort_order'=>0];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $old['title']      = trim((string) input('title', ''));
    $old['category']   = trim((string) input('category', ''));
    $old['sort_order'] = (int) input('sort_order', 0);

    $image = null;
    try {
        $image = upload_image($_FILES['image'] ?? [], 'gallery');
    } catch (RuntimeException $ex) { $errors[] = $ex->getMessage(); }

    if ($image === null && empty($errors)) {
        $errors[] = 'Lutfen bir gorsel secin.';
    }

    if (empty($errors)) {
        (new Gallery())->create([
            'title'=>$old['title'],'image_path'=>$image,
            'category'=>$old['category'],'sort_order'=>$old['sort_order'],
        ]);
        set_flash('success', 'Gorsel eklendi.');
        redirect('/admin/gallery/list.php');
    }
}

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head"><h2>Galeriye Gorsel Ekle</h2>
        <a href="<?= BASE_URL ?>/admin/gallery/list.php" class="btn btn-secondary btn-sm">Geri</a></div>
    <div class="panel-body">
        <?php foreach ($errors as $err): ?><div class="alert alert-danger"><?= e($err) ?></div><?php endforeach; ?>
        <form method="post" enctype="multipart/form-data">
            <?= csrf_field() ?>
            <div class="form-group"><label>Gorsel * (JPG/PNG/WEBP, max 2MB)</label>
                <input type="file" name="image" class="form-control" accept="image/*"></div>
            <div class="form-row">
                <div class="form-group"><label>Baslik (ops.)</label>
                    <input type="text" name="title" class="form-control" value="<?= e($old['title']) ?>"></div>
                <div class="form-group"><label>Kategori (ops.)</label>
                    <input type="text" name="category" class="form-control" value="<?= e($old['category']) ?>"></div>
                <div class="form-group"><label>Sira</label>
                    <input type="number" name="sort_order" class="form-control" value="<?= (int) $old['sort_order'] ?>"></div>
            </div>
            <button class="btn btn-success">Yukle</button>
        </form>
    </div>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
