<?php
/**
 * admin/references/create.php
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

$pageTitle = 'Yeni Referans';
$active    = 'references';

$errors = [];
$old = ['name'=>'','description'=>'','sort_order'=>0,'is_active'=>1];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $old['name']        = trim((string) input('name', ''));
    $old['description'] = trim((string) input('description', ''));
    $old['sort_order']  = (int) input('sort_order', 0);
    $old['is_active']   = input('is_active') ? 1 : 0;

    if ($old['name'] === '') { $errors[] = 'Firma adi zorunludur.'; }

    if (empty($errors)) {
        (new Reference())->create($old);
        set_flash('success', 'Referans eklendi.');
        redirect('/admin/references/list.php');
    }
}

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head"><h2>Yeni Referans</h2>
        <a href="<?= BASE_URL ?>/admin/references/list.php" class="btn btn-secondary btn-sm">Geri</a></div>
    <div class="panel-body">
        <?php foreach ($errors as $err): ?><div class="alert alert-danger"><?= e($err) ?></div><?php endforeach; ?>
        <form method="post">
            <?= csrf_field() ?>
            <div class="form-group"><label>Firma Adi *</label>
                <input type="text" name="name" class="form-control" value="<?= e($old['name']) ?>" required></div>
            <div class="form-group"><label>Aciklama (opsiyonel)</label>
                <input type="text" name="description" class="form-control" value="<?= e($old['description']) ?>" placeholder="orn. Proje tipi, sektor"></div>
            <div class="form-row">
                <div class="form-group"><label>Sira</label>
                    <input type="number" name="sort_order" class="form-control" value="<?= (int) $old['sort_order'] ?>"></div>
                <div class="form-group"><label>Durum</label><br>
                    <label><input type="checkbox" name="is_active" value="1" <?= $old['is_active']?'checked':'' ?>> Aktif</label></div>
            </div>
            <button class="btn btn-success">Kaydet</button>
        </form>
    </div>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
