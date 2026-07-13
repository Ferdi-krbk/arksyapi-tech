<?php
/**
 * admin/projects/create.php
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

$pageTitle = 'Yeni Proje';
$active    = 'projects';

$categories = (new ProjectCategory())->all('name ASC');
$errors = [];
$old = ['title'=>'','category_id'=>'','client_name'=>'','location'=>'','completion_date'=>'',
        'summary'=>'','content'=>'','is_featured'=>0,'is_active'=>1];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $old['title']           = trim((string) input('title', ''));
    $old['category_id']     = input('category_id', '') ?: null;
    $old['client_name']     = trim((string) input('client_name', ''));
    $old['location']        = trim((string) input('location', ''));
    $old['completion_date'] = input('completion_date', '') ?: null;
    $old['summary']         = trim((string) input('summary', ''));
    $old['content']         = trim((string) input('content', ''));
    $old['is_featured']     = input('is_featured') ? 1 : 0;
    $old['is_active']       = input('is_active') ? 1 : 0;

    if ($old['title'] === '') { $errors[] = 'Baslik zorunludur.'; }

    $cover = null;
    if (empty($errors)) {
        try { $cover = upload_image($_FILES['cover_image'] ?? [], 'projects'); }
        catch (RuntimeException $ex) { $errors[] = $ex->getMessage(); }
    }

    if (empty($errors)) {
        (new Project())->create([
            'category_id'     => $old['category_id'],
            'title'           => $old['title'],
            'slug'            => slugify($old['title']) . '-' . time(),
            'client_name'     => $old['client_name'],
            'location'        => $old['location'],
            'completion_date' => $old['completion_date'],
            'summary'         => $old['summary'],
            'content'         => $old['content'],
            'cover_image'     => $cover,
            'is_featured'     => $old['is_featured'],
            'is_active'       => $old['is_active'],
        ]);
        set_flash('success', 'Proje eklendi.');
        redirect('/admin/projects/list.php');
    }
}

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head"><h2>Yeni Proje</h2>
        <a href="<?= BASE_URL ?>/admin/projects/list.php" class="btn btn-secondary btn-sm">Geri</a>
    </div>
    <div class="panel-body">
        <?php foreach ($errors as $err): ?><div class="alert alert-danger"><?= e($err) ?></div><?php endforeach; ?>

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
                            <option value="<?= (int) $c['id'] ?>" <?= ($old['category_id']==$c['id'])?'selected':'' ?>><?= e($c['name']) ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <div class="form-group">
                    <label>Kapak Gorseli</label>
                    <input type="file" name="cover_image" class="form-control" accept="image/*">
                </div>
            </div>

            <div class="form-row">
                <div class="form-group"><label>Musteri</label>
                    <input type="text" name="client_name" class="form-control" value="<?= e($old['client_name']) ?>"></div>
                <div class="form-group"><label>Konum</label>
                    <input type="text" name="location" class="form-control" value="<?= e($old['location']) ?>"></div>
                <div class="form-group"><label>Tamamlanma Tarihi</label>
                    <input type="date" name="completion_date" class="form-control" value="<?= e($old['completion_date']) ?>"></div>
            </div>

            <div class="form-group"><label>Ozet</label>
                <textarea name="summary" class="form-control" style="min-height:70px"><?= e($old['summary']) ?></textarea></div>

            <div class="form-group"><label>Icerik</label>
                <textarea name="content" class="form-control"><?= e($old['content']) ?></textarea></div>

            <div class="form-group">
                <label><input type="checkbox" name="is_featured" value="1" <?= $old['is_featured']?'checked':'' ?>> One cikan</label>
                &nbsp;&nbsp;
                <label><input type="checkbox" name="is_active" value="1" <?= $old['is_active']?'checked':'' ?>> Yayinda</label>
            </div>

            <button type="submit" class="btn btn-success">Kaydet</button>
        </form>
    </div>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
