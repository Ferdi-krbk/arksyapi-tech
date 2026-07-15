<?php
/**
 * admin/pages/edit.php
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

$pageTitle = 'Sayfa Duzenle';
$active    = 'pages';

$model = new Page();
$id = (int) input('id', 0);
$item = $model->find($id);
if (!$item) { set_flash('error','Sayfa bulunamadi.'); redirect('/admin/pages/list.php'); }

$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $title           = trim((string) input('title', ''));
    $content         = trim((string) input('content', ''));
    $seo_title       = trim((string) input('seo_title', ''));
    $seo_description = trim((string) input('seo_description', ''));

    if ($title === '') { $errors[] = 'Baslik zorunludur.'; }

    // Slug: baslik degistiyse yeniden uret, benzersizligi koru
    $slug = slugify($title);
    $dup = $model->findBy('slug', $slug);
    if ($dup && (int) $dup['id'] !== $id) { $slug .= '-' . time(); }

    if (empty($errors)) {
        $model->update($id, [
            'title'=>$title,'slug'=>$slug,'content'=>$content,
            'seo_title'=>$seo_title ?: null,'seo_description'=>$seo_description ?: null,
        ]);
        set_flash('success', 'Sayfa guncellendi.');
        redirect('/admin/pages/list.php');
    }
    $item = array_merge($item, compact('title','content','seo_title','seo_description'));
}

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head"><h2>Sayfa Duzenle</h2>
        <a href="<?= BASE_URL ?>/admin/pages/list.php" class="btn btn-secondary btn-sm">Geri</a></div>
    <div class="panel-body">
        <?php foreach ($errors as $err): ?><div class="alert alert-danger"><?= e($err) ?></div><?php endforeach; ?>
        <form method="post">
            <?= csrf_field() ?>
            <div class="form-group"><label>Baslik *</label>
                <input type="text" name="title" class="form-control" value="<?= e($item['title']) ?>"></div>
            <div class="form-group"><label>Icerik</label>
                <textarea name="content" class="form-control" style="min-height:200px"><?= e($item['content']) ?></textarea></div>
            <div class="form-row">
                <div class="form-group"><label>SEO Baslik</label>
                    <input type="text" name="seo_title" class="form-control" value="<?= e($item['seo_title']) ?>"></div>
                <div class="form-group"><label>SEO Aciklama</label>
                    <input type="text" name="seo_description" class="form-control" value="<?= e($item['seo_description']) ?>"></div>
            </div>
            <button class="btn btn-success">Guncelle</button>
        </form>
    </div>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
