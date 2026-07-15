<?php
/**
 * admin/categories/edit.php
 * Kategori adini degistirir (haber veya proje).
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

$pageTitle = 'Kategori Duzenle';
$active    = 'categories';

$type  = input('type') === 'project' ? 'project' : 'news';
$model = $type === 'project' ? new ProjectCategory() : new NewsCategory();
$id    = (int) input('id', 0);
$item  = $model->find($id);
if (!$item) { set_flash('error', 'Kategori bulunamadi.'); redirect('/admin/categories/index.php'); }

$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $name = trim((string) input('name', ''));
    if ($name === '') {
        $errors[] = 'Kategori adi bos olamaz.';
    } else {
        $model->update($id, ['name' => $name, 'slug' => slugify($name)]);
        set_flash('success', 'Kategori guncellendi.');
        redirect('/admin/categories/index.php');
    }
    $item['name'] = $name;
}

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head"><h2><?= $type === 'project' ? 'Proje' : 'Haber' ?> Kategorisi Duzenle</h2>
        <a href="<?= BASE_URL ?>/admin/categories/index.php" class="btn btn-secondary btn-sm">Geri</a></div>
    <div class="panel-body">
        <?php foreach ($errors as $err): ?><div class="alert alert-danger"><?= e($err) ?></div><?php endforeach; ?>
        <form method="post">
            <?= csrf_field() ?>
            <input type="hidden" name="type" value="<?= e($type) ?>">
            <input type="hidden" name="id" value="<?= (int) $id ?>">
            <div class="form-group"><label>Kategori Adi *</label>
                <input type="text" name="name" class="form-control" value="<?= e($item['name']) ?>"></div>
            <button class="btn btn-success">Guncelle</button>
        </form>
    </div>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
