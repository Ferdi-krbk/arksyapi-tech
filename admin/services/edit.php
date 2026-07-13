<?php
/**
 * admin/services/edit.php
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

$pageTitle = 'Hizmet Duzenle';
$active    = 'services';

$model = new Service();
$id = (int) input('id', 0);
$item = $model->find($id);
if (!$item) { set_flash('error','Hizmet bulunamadi.'); redirect('/admin/services/list.php'); }

$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $title             = trim((string) input('title', ''));
    $short_description = trim((string) input('short_description', ''));
    $content           = trim((string) input('content', ''));
    $icon              = trim((string) input('icon', ''));
    $sort_order        = (int) input('sort_order', 0);
    $is_active         = input('is_active') ? 1 : 0;

    if ($title === '') { $errors[] = 'Baslik zorunludur.'; }

    $image = $item['image'];
    if (empty($errors)) {
        try {
            $new = upload_image($_FILES['image'] ?? [], 'services');
            if ($new !== null) { delete_upload($item['image']); $image = $new; }
        } catch (RuntimeException $ex) { $errors[] = $ex->getMessage(); }
    }

    if (empty($errors)) {
        $model->update($id, compact('title','short_description','content','icon','sort_order','is_active') + ['image'=>$image]);
        set_flash('success', 'Hizmet guncellendi.');
        redirect('/admin/services/list.php');
    }
    $item = array_merge($item, compact('title','short_description','content','icon','sort_order','is_active'));
}

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head"><h2>Hizmet Duzenle</h2>
        <a href="<?= BASE_URL ?>/admin/services/list.php" class="btn btn-secondary btn-sm">Geri</a></div>
    <div class="panel-body">
        <?php foreach ($errors as $err): ?><div class="alert alert-danger"><?= e($err) ?></div><?php endforeach; ?>
        <form method="post" enctype="multipart/form-data">
            <?= csrf_field() ?>
            <div class="form-group"><label>Baslik *</label>
                <input type="text" name="title" class="form-control" value="<?= e($item['title']) ?>"></div>
            <div class="form-row">
                <div class="form-group"><label>Ikon (CSS class)</label>
                    <input type="text" name="icon" class="form-control" value="<?= e($item['icon']) ?>"></div>
                <div class="form-group"><label>Sira</label>
                    <input type="number" name="sort_order" class="form-control" value="<?= (int) $item['sort_order'] ?>"></div>
                <div class="form-group"><label>Gorsel (bos = degistirme)</label>
                    <input type="file" name="image" class="form-control" accept="image/*">
                    <?php if ($item['image']): ?><div class="mt-2"><img class="thumb" src="<?= UPLOAD_URL.'/'.e($item['image']) ?>"></div><?php endif; ?>
                </div>
            </div>
            <div class="form-group"><label>Kisa Aciklama</label>
                <textarea name="short_description" class="form-control" style="min-height:70px"><?= e($item['short_description']) ?></textarea></div>
            <div class="form-group"><label>Icerik</label>
                <textarea name="content" class="form-control"><?= e($item['content']) ?></textarea></div>
            <div class="form-group"><label><input type="checkbox" name="is_active" value="1" <?= $item['is_active']?'checked':'' ?>> Aktif</label></div>
            <button class="btn btn-success">Guncelle</button>
        </form>
    </div>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
