<?php
/**
 * admin/sliders/create.php
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

$pageTitle = 'Yeni Slider';
$active    = 'sliders';

$errors = [];
$old = ['title'=>'','subtitle'=>'','button_text'=>'','button_url'=>'','sort_order'=>0,'is_active'=>1];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $old['title']       = trim((string) input('title', ''));
    $old['subtitle']    = trim((string) input('subtitle', ''));
    $old['button_text'] = trim((string) input('button_text', ''));
    $old['button_url']  = trim((string) input('button_url', ''));
    $old['sort_order']  = (int) input('sort_order', 0);
    $old['is_active']   = input('is_active') ? 1 : 0;

    $image = null;
    try { $image = upload_image($_FILES['image'] ?? [], 'sliders'); }
    catch (RuntimeException $ex) { $errors[] = $ex->getMessage(); }

    if ($image === null && empty($errors)) { $errors[] = 'Slider gorseli zorunludur.'; }

    if (empty($errors)) {
        (new Slider())->create([
            'title'=>$old['title'],'subtitle'=>$old['subtitle'],'button_text'=>$old['button_text'],
            'button_url'=>$old['button_url'],'image_path'=>$image,'sort_order'=>$old['sort_order'],'is_active'=>$old['is_active'],
        ]);
        set_flash('success', 'Slider eklendi.');
        redirect('/admin/sliders/list.php');
    }
}

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head"><h2>Yeni Slider</h2>
        <a href="<?= BASE_URL ?>/admin/sliders/list.php" class="btn btn-secondary btn-sm">Geri</a></div>
    <div class="panel-body">
        <?php foreach ($errors as $err): ?><div class="alert alert-danger"><?= e($err) ?></div><?php endforeach; ?>
        <form method="post" enctype="multipart/form-data">
            <?= csrf_field() ?>
            <div class="form-group"><label>Gorsel *</label>
                <input type="file" name="image" class="form-control" accept="image/*"></div>
            <div class="form-group"><label>Baslik</label>
                <input type="text" name="title" class="form-control" value="<?= e($old['title']) ?>"></div>
            <div class="form-group"><label>Alt Baslik</label>
                <textarea name="subtitle" class="form-control" style="min-height:60px"><?= e($old['subtitle']) ?></textarea></div>
            <div class="form-row">
                <div class="form-group"><label>Buton Yazisi</label>
                    <input type="text" name="button_text" class="form-control" value="<?= e($old['button_text']) ?>"></div>
                <div class="form-group"><label>Buton Linki</label>
                    <input type="text" name="button_url" class="form-control" value="<?= e($old['button_url']) ?>"></div>
                <div class="form-group"><label>Sira</label>
                    <input type="number" name="sort_order" class="form-control" value="<?= (int) $old['sort_order'] ?>"></div>
            </div>
            <div class="form-group"><label><input type="checkbox" name="is_active" value="1" <?= $old['is_active']?'checked':'' ?>> Aktif</label></div>
            <button class="btn btn-success">Kaydet</button>
        </form>
    </div>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
