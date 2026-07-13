<?php
/**
 * admin/references/edit.php
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

$pageTitle = 'Referans Duzenle';
$active    = 'references';

$model = new Reference();
$id = (int) input('id', 0);
$item = $model->find($id);
if (!$item) { set_flash('error','Referans bulunamadi.'); redirect('/admin/references/list.php'); }

$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $name        = trim((string) input('name', ''));
    $description = trim((string) input('description', ''));
    $sort_order  = (int) input('sort_order', 0);
    $is_active   = input('is_active') ? 1 : 0;

    if ($name === '') { $errors[] = 'Firma adi zorunludur.'; }

    $logo = $item['logo_path'] ?? null;
    if (empty($errors)) {
        try {
            $uploaded = upload_image($_FILES['logo'] ?? [], 'references');
            if ($uploaded) {
                delete_upload($item['logo_path'] ?? null);
                $logo = $uploaded;
            }
            if (input('remove_logo')) {
                delete_upload($item['logo_path'] ?? null);
                $logo = null;
            }
        } catch (RuntimeException $ex) { $errors[] = $ex->getMessage(); }
    }

    if (empty($errors)) {
        $model->update($id, ['name'=>$name,'description'=>$description,'logo_path'=>$logo,'sort_order'=>$sort_order,'is_active'=>$is_active]);
        set_flash('success', 'Referans guncellendi.');
        redirect('/admin/references/list.php');
    }
    $item = array_merge($item, compact('name','description','sort_order','is_active'));
}

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head"><h2>Referans Duzenle</h2>
        <a href="<?= BASE_URL ?>/admin/references/list.php" class="btn btn-secondary btn-sm">Geri</a></div>
    <div class="panel-body">
        <?php foreach ($errors as $err): ?><div class="alert alert-danger"><?= e($err) ?></div><?php endforeach; ?>
        <form method="post" enctype="multipart/form-data">
            <?= csrf_field() ?>
            <div class="form-group"><label>Firma Adi *</label>
                <input type="text" name="name" class="form-control" value="<?= e($item['name']) ?>" required></div>
            <div class="form-group"><label>Logo</label>
                <?php if (!empty($item['logo_path'])): ?>
                    <div style="margin-bottom:8px">
                        <img src="<?= BASE_URL ?>/uploads/<?= e($item['logo_path']) ?>" style="max-height:50px" alt="">
                        <label style="margin-left:8px"><input type="checkbox" name="remove_logo" value="1"> Logoyu kaldir</label>
                    </div>
                <?php endif; ?>
                <input type="file" name="logo" accept="image/*" class="form-control">
                <small>Yeni logo yuklerseniz eskisi degisir.</small></div>
            <div class="form-group"><label>Aciklama (opsiyonel)</label>
                <input type="text" name="description" class="form-control" value="<?= e($item['description']) ?>"></div>
            <div class="form-row">
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
