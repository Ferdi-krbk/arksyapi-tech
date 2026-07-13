<?php
/**
 * admin/services/create.php
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

$pageTitle = 'Yeni Hizmet';
$active    = 'services';

$errors = [];
$old = ['title'=>'','short_description'=>'','content'=>'','icon'=>'','sort_order'=>0,'is_active'=>1];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $old['title']             = trim((string) input('title', ''));
    $old['short_description'] = trim((string) input('short_description', ''));
    $old['content']           = trim((string) input('content', ''));
    $old['icon']              = trim((string) input('icon', ''));
    $old['sort_order']        = (int) input('sort_order', 0);
    $old['is_active']         = input('is_active') ? 1 : 0;

    if ($old['title'] === '') { $errors[] = 'Baslik zorunludur.'; }

    $image = null;
    if (empty($errors)) {
        try { $image = upload_image($_FILES['image'] ?? [], 'services'); }
        catch (RuntimeException $ex) { $errors[] = $ex->getMessage(); }
    }

    if (empty($errors)) {
        (new Service())->create([
            'title'=>$old['title'],'slug'=>slugify($old['title']).'-'.time(),
            'short_description'=>$old['short_description'],'content'=>$old['content'],
            'icon'=>$old['icon'],'image'=>$image,'sort_order'=>$old['sort_order'],'is_active'=>$old['is_active'],
        ]);
        set_flash('success', 'Hizmet eklendi.');
        redirect('/admin/services/list.php');
    }
}

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head"><h2>Yeni Hizmet</h2>
        <a href="<?= BASE_URL ?>/admin/services/list.php" class="btn btn-secondary btn-sm">Geri</a></div>
    <div class="panel-body">
        <?php foreach ($errors as $err): ?><div class="alert alert-danger"><?= e($err) ?></div><?php endforeach; ?>
        <form method="post" enctype="multipart/form-data">
            <?= csrf_field() ?>
            <div class="form-group"><label>Baslik *</label>
                <input type="text" name="title" class="form-control" value="<?= e($old['title']) ?>"></div>
            <div class="form-row">
                <div class="form-group"><label>Ikon (CSS class, ops.)</label>
                    <input type="text" name="icon" class="form-control" value="<?= e($old['icon']) ?>" placeholder="orn. fa-building"></div>
                <div class="form-group"><label>Sira</label>
                    <input type="number" name="sort_order" class="form-control" value="<?= (int) $old['sort_order'] ?>"></div>
                <div class="form-group"><label>Gorsel</label>
                    <input type="file" name="image" class="form-control" accept="image/*"></div>
            </div>
            <div class="form-group"><label>Kisa Aciklama</label>
                <textarea name="short_description" class="form-control" style="min-height:70px"><?= e($old['short_description']) ?></textarea></div>
            <div class="form-group"><label>Icerik</label>
                <textarea name="content" class="form-control"><?= e($old['content']) ?></textarea></div>
            <div class="form-group"><label><input type="checkbox" name="is_active" value="1" <?= $old['is_active']?'checked':'' ?>> Aktif</label></div>
            <button class="btn btn-success">Kaydet</button>
        </form>
    </div>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
