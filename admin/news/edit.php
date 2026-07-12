<?php
/**
 * admin/news/edit.php
 * Haber duzenleme formu ve guncelleme islemi.
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

$pageTitle = 'Haber Duzenle';
$active    = 'news';

$newsModel = new News();
$id = (int) input('id', 0);
$item = $newsModel->find($id);

if (!$item) {
    set_flash('error', 'Haber bulunamadi.');
    redirect('/admin/news/list.php');
}

$categories = (new NewsCategory())->all('name ASC');
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();

    $title       = trim((string) input('title', ''));
    $category_id = input('category_id', '') ?: null;
    $summary     = trim((string) input('summary', ''));
    $content     = trim((string) input('content', ''));
    $is_active   = input('is_active') ? 1 : 0;

    if ($title === '')   { $errors[] = 'Baslik zorunludur.'; }
    if ($content === '') { $errors[] = 'Icerik zorunludur.'; }

    // Yeni gorsel yuklendiyse eskisini degistir
    $thumbnail = $item['thumbnail'];
    if (empty($errors)) {
        try {
            $new = upload_image($_FILES['thumbnail'] ?? [], 'news');
            if ($new !== null) {
                delete_upload($item['thumbnail']); // eskiyi sil
                $thumbnail = $new;
            }
        } catch (RuntimeException $ex) {
            $errors[] = $ex->getMessage();
        }
    }

    if (empty($errors)) {
        $newsModel->update($id, [
            'category_id' => $category_id,
            'title'       => $title,
            'summary'     => $summary,
            'content'     => $content,
            'thumbnail'   => $thumbnail,
            'is_active'   => $is_active,
        ]);
        set_flash('success', 'Haber guncellendi.');
        redirect('/admin/news/list.php');
    }

    // Hata varsa formda gosterilecek guncel degerler
    $item = array_merge($item, [
        'title' => $title, 'category_id' => $category_id,
        'summary' => $summary, 'content' => $content, 'is_active' => $is_active,
    ]);
}

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head"><h2>Haber Duzenle</h2>
        <a href="<?= BASE_URL ?>/admin/news/list.php" class="btn btn-secondary btn-sm">Geri</a>
    </div>
    <div class="panel-body">
        <?php foreach ($errors as $err): ?>
            <div class="alert alert-danger"><?= e($err) ?></div>
        <?php endforeach; ?>

        <form method="post" enctype="multipart/form-data">
            <?= csrf_field() ?>

            <div class="form-group">
                <label>Baslik *</label>
                <input type="text" name="title" class="form-control" value="<?= e($item['title']) ?>">
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Kategori</label>
                    <select name="category_id" class="form-control">
                        <option value="">- Sec -</option>
                        <?php foreach ($categories as $c): ?>
                            <option value="<?= (int) $c['id'] ?>" <?= ($item['category_id'] == $c['id']) ? 'selected' : '' ?>>
                                <?= e($c['name']) ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <div class="form-group">
                    <label>Gorsel (bos birak = degistirme)</label>
                    <input type="file" name="thumbnail" class="form-control" accept="image/*">
                    <?php if ($item['thumbnail']): ?>
                        <div class="mt-2"><img class="thumb" src="<?= UPLOAD_URL . '/' . e($item['thumbnail']) ?>" alt=""></div>
                    <?php endif; ?>
                </div>
            </div>

            <div class="form-group">
                <label>Ozet</label>
                <textarea name="summary" class="form-control" style="min-height:70px"><?= e($item['summary']) ?></textarea>
            </div>

            <div class="form-group">
                <label>Icerik *</label>
                <textarea name="content" class="form-control"><?= e($item['content']) ?></textarea>
            </div>

            <div class="form-group">
                <label><input type="checkbox" name="is_active" value="1" <?= $item['is_active'] ? 'checked' : '' ?>> Yayinda</label>
            </div>

            <button type="submit" class="btn btn-success">Guncelle</button>
        </form>
    </div>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
