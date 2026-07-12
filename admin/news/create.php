<?php
/**
 * admin/news/create.php
 * Yeni haber ekleme formu ve kaydetme islemi.
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

$pageTitle = 'Yeni Haber';
$active    = 'news';

$categories = (new NewsCategory())->all('name ASC');
$errors = [];
$old = ['title' => '', 'category_id' => '', 'summary' => '', 'content' => '', 'is_active' => 1];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();

    $old['title']       = trim((string) input('title', ''));
    $old['category_id'] = input('category_id', '') ?: null;
    $old['summary']     = trim((string) input('summary', ''));
    $old['content']     = trim((string) input('content', ''));
    $old['is_active']   = input('is_active') ? 1 : 0;

    // Dogrulama
    if ($old['title'] === '')   { $errors[] = 'Baslik zorunludur.'; }
    if ($old['content'] === '') { $errors[] = 'Icerik zorunludur.'; }

    // Gorsel yukleme
    $thumbnail = null;
    if (empty($errors)) {
        try {
            $thumbnail = upload_image($_FILES['thumbnail'] ?? [], 'news');
        } catch (RuntimeException $ex) {
            $errors[] = $ex->getMessage();
        }
    }

    if (empty($errors)) {
        (new News())->create([
            'category_id'  => $old['category_id'],
            'author_id'    => current_user_id(),
            'title'        => $old['title'],
            'slug'         => slugify($old['title']) . '-' . time(),
            'summary'      => $old['summary'],
            'content'      => $old['content'],
            'thumbnail'    => $thumbnail,
            'published_at' => date('Y-m-d H:i:s'),
            'is_active'    => $old['is_active'],
        ]);
        set_flash('success', 'Haber eklendi.');
        redirect('/admin/news/list.php');
    }
}

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head"><h2>Yeni Haber</h2>
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
                <input type="text" name="title" class="form-control" value="<?= e($old['title']) ?>">
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Kategori</label>
                    <select name="category_id" class="form-control">
                        <option value="">- Sec -</option>
                        <?php foreach ($categories as $c): ?>
                            <option value="<?= (int) $c['id'] ?>" <?= ($old['category_id'] == $c['id']) ? 'selected' : '' ?>>
                                <?= e($c['name']) ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <div class="form-group">
                    <label>Gorsel (JPG/PNG/WEBP, max 2MB)</label>
                    <input type="file" name="thumbnail" class="form-control" accept="image/*">
                </div>
            </div>

            <div class="form-group">
                <label>Ozet</label>
                <textarea name="summary" class="form-control" style="min-height:70px"><?= e($old['summary']) ?></textarea>
            </div>

            <div class="form-group">
                <label>Icerik *</label>
                <textarea name="content" class="form-control"><?= e($old['content']) ?></textarea>
            </div>

            <div class="form-group">
                <label><input type="checkbox" name="is_active" value="1" <?= $old['is_active'] ? 'checked' : '' ?>> Yayinda</label>
            </div>

            <button type="submit" class="btn btn-success">Kaydet</button>
        </form>
    </div>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
