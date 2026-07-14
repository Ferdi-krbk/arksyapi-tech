<?php
/**
 * admin/sliders/edit.php
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

$pageTitle = 'Slider Duzenle';
$active    = 'sliders';

$model = new Slider();
$id = (int) input('id', 0);
$item = $model->find($id);
if (!$item) { set_flash('error','Slider bulunamadi.'); redirect('/admin/sliders/list.php'); }

$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $title       = trim((string) input('title', ''));
    $subtitle    = trim((string) input('subtitle', ''));
    $button_text = trim((string) input('button_text', ''));
    $button_url  = trim((string) input('button_url', ''));
    $sort_order  = (int) input('sort_order', 0);
    $is_active   = input('is_active') ? 1 : 0;

    $image = $item['image_path'];
    try {
        $new = upload_image($_FILES['image'] ?? [], 'sliders');
        if ($new !== null) { delete_upload($item['image_path']); $image = $new; }
    } catch (RuntimeException $ex) { $errors[] = $ex->getMessage(); }

    if (empty($errors)) {
        $model->update($id, compact('title','subtitle','button_text','button_url','sort_order','is_active') + ['image_path'=>$image]);
        set_flash('success', 'Slider guncellendi.');
        redirect('/admin/sliders/list.php');
    }
    $item = array_merge($item, compact('title','subtitle','button_text','button_url','sort_order','is_active'));
}

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head"><h2>Slider Duzenle</h2>
        <a href="<?= BASE_URL ?>/admin/sliders/list.php" class="btn btn-secondary btn-sm">Geri</a></div>
    <div class="panel-body">
        <?php foreach ($errors as $err): ?><div class="alert alert-danger"><?= e($err) ?></div><?php endforeach; ?>
        <form method="post" enctype="multipart/form-data">
            <?= csrf_field() ?>
            <div class="form-group"><label>Gorsel (bos = degistirme)</label>
                <input type="file" name="image" class="form-control" accept="image/*">
                <?php if ($item['image_path']): ?><div class="mt-2"><img class="thumb" src="<?= UPLOAD_URL.'/'.e($item['image_path']) ?>"></div><?php endif; ?>
            </div>
            <div class="form-group"><label>Baslik</label>
                <input type="text" name="title" class="form-control" value="<?= e($item['title']) ?>"></div>
            <div class="form-group"><label>Alt Baslik</label>
                <textarea name="subtitle" class="form-control" style="min-height:60px"><?= e($item['subtitle']) ?></textarea></div>
            <div class="form-row">
                <div class="form-group"><label>Buton Yazisi</label>
                    <input type="text" name="button_text" class="form-control" value="<?= e($item['button_text']) ?>"></div>
                <div class="form-group"><label>Buton Linki</label>
                    <input type="text" name="button_url" class="form-control" value="<?= e($item['button_url']) ?>"></div>
                <div class="form-group"><label>Sira</label>
                    <input type="number" name="sort_order" class="form-control" value="<?= (int) $item['sort_order'] ?>"></div>
            </div>
            <div class="form-group"><label><input type="checkbox" name="is_active" value="1" <?= $item['is_active']?'checked':'' ?>> Aktif</label></div>
            <button class="btn btn-success">Guncelle</button>
        </form>
    </div>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
