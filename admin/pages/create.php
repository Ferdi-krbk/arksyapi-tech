<?php
/**
 * admin/pages/create.php
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

$pageTitle = 'Yeni Sayfa';
$active    = 'pages';

$model = new Page();
$errors = [];
$old = ['title'=>'','content'=>'','seo_title'=>'','seo_description'=>''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $old['title']           = trim((string) input('title', ''));
    $old['content']         = trim((string) input('content', ''));
    $old['seo_title']       = trim((string) input('seo_title', ''));
    $old['seo_description'] = trim((string) input('seo_description', ''));

    if ($old['title'] === '') { $errors[] = 'Baslik zorunludur.'; }

    // Slug benzersiz olmali (pages.slug UNIQUE)
    $slug = slugify($old['title']);
    if (empty($errors) && $model->findBy('slug', $slug)) {
        $slug .= '-' . time();
    }

    if (empty($errors)) {
        $model->create([
            'title'=>$old['title'],'slug'=>$slug,'content'=>$old['content'],
            'seo_title'=>$old['seo_title'] ?: null,'seo_description'=>$old['seo_description'] ?: null,
        ]);
        set_flash('success', 'Sayfa eklendi.');
        redirect('/admin/pages/list.php');
    }
}

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head"><h2>Yeni Sayfa</h2>
        <a href="<?= BASE_URL ?>/admin/pages/list.php" class="btn btn-secondary btn-sm">Geri</a></div>
    <div class="panel-body">
        <?php foreach ($errors as $err): ?><div class="alert alert-danger"><?= e($err) ?></div><?php endforeach; ?>
        <form method="post">
            <?= csrf_field() ?>
            <div class="form-group"><label>Baslik *</label>
                <input type="text" name="title" class="form-control" value="<?= e($old['title']) ?>"></div>
            <div class="form-group"><label>Icerik</label>
                <textarea name="content" class="form-control" style="min-height:200px"><?= e($old['content']) ?></textarea></div>
            <div class="form-row">
                <div class="form-group"><label>SEO Baslik (ops.)</label>
                    <input type="text" name="seo_title" class="form-control" value="<?= e($old['seo_title']) ?>"></div>
                <div class="form-group"><label>SEO Aciklama (ops.)</label>
                    <input type="text" name="seo_description" class="form-control" value="<?= e($old['seo_description']) ?>"></div>
            </div>
            <button class="btn btn-success">Kaydet</button>
        </form>
    </div>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
