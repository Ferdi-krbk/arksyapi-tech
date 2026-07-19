<?php
/**
 * admin/projects/edit.php
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

$pageTitle = 'Proje Duzenle';
$active    = 'projects';

$model = new Project();
$id = (int) input('id', 0);
$item = $model->find($id);
if (!$item) { set_flash('error', 'Proje bulunamadi.'); redirect('/admin/projects/list.php'); }

$categories = (new ProjectCategory())->all('name ASC');
$imageModel = new ProjectImage();
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $action = (string) input('action', '');

    // --- Proje gorseli sil ---
    if ($action === 'delete_image') {
        $imgId = (int) input('image_id', 0);
        $img = $imageModel->find($imgId);
        if ($img && (int) $img['project_id'] === $id) {
            delete_upload($img['image_path']);
            $imageModel->delete($imgId);
            set_flash('success', 'Görsel silindi.');
        }
        redirect('/admin/projects/edit.php?id=' . $id);
    }

    // --- Proje gorselleri ekle (coklu) ---
    if ($action === 'add_images') {
        $files = $_FILES['images'] ?? null;
        $added = 0;
        if ($files && is_array($files['name'])) {
            for ($i = 0; $i < count($files['name']); $i++) {
                if (($files['error'][$i] ?? UPLOAD_ERR_NO_FILE) === UPLOAD_ERR_NO_FILE) continue;
                $single = [
                    'name' => $files['name'][$i], 'type' => $files['type'][$i],
                    'tmp_name' => $files['tmp_name'][$i], 'error' => $files['error'][$i],
                    'size' => $files['size'][$i],
                ];
                try {
                    $path = upload_image($single, 'projects');
                    if ($path) { $imageModel->create(['project_id' => $id, 'image_path' => $path, 'caption' => null, 'sort_order' => $i]); $added++; }
                } catch (RuntimeException $ex) { set_flash('error', $ex->getMessage()); }
            }
        }
        set_flash('success', "$added görsel eklendi.");
        redirect('/admin/projects/edit.php?id=' . $id);
    }

    // --- Ana proje guncelleme ---
    $title           = trim((string) input('title', ''));
    $category_id     = input('category_id', '') ?: null;
    $client_name     = trim((string) input('client_name', ''));
    $location        = trim((string) input('location', ''));
    $completion_date = input('completion_date', '') ?: null;
    $summary         = trim((string) input('summary', ''));
    $content         = trim((string) input('content', ''));
    $is_featured     = input('is_featured') ? 1 : 0;
    $is_active       = input('is_active') ? 1 : 0;

    if ($title === '') { $errors[] = 'Baslik zorunludur.'; }

    $cover = $item['cover_image'];
    if (empty($errors)) {
        try {
            $new = upload_image($_FILES['cover_image'] ?? [], 'projects');
            if ($new !== null) { delete_upload($item['cover_image']); $cover = $new; }
        } catch (RuntimeException $ex) { $errors[] = $ex->getMessage(); }
    }

    if (empty($errors)) {
        $model->update($id, [
            'category_id'=>$category_id,'title'=>$title,'client_name'=>$client_name,
            'location'=>$location,'completion_date'=>$completion_date,'summary'=>$summary,
            'content'=>$content,'cover_image'=>$cover,'is_featured'=>$is_featured,'is_active'=>$is_active,
        ]);
        set_flash('success', 'Proje guncellendi.');
        redirect('/admin/projects/list.php');
    }
    $item = array_merge($item, compact('title','category_id','client_name','location',
        'completion_date','summary','content','is_featured','is_active'));
}

$projectImages = $model->images($id);

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head"><h2>Proje Duzenle</h2>
        <a href="<?= BASE_URL ?>/admin/projects/list.php" class="btn btn-secondary btn-sm">Geri</a>
    </div>
    <div class="panel-body">
        <?php foreach ($errors as $err): ?><div class="alert alert-danger"><?= e($err) ?></div><?php endforeach; ?>

        <form method="post" enctype="multipart/form-data">
            <?= csrf_field() ?>

            <div class="form-group"><label>Baslik *</label>
                <input type="text" name="title" class="form-control" value="<?= e($item['title']) ?>"></div>

            <div class="form-row">
                <div class="form-group"><label>Kategori</label>
                    <select name="category_id" class="form-control">
                        <option value="">- Sec -</option>
                        <?php foreach ($categories as $c): ?>
                            <option value="<?= (int) $c['id'] ?>" <?= ($item['category_id']==$c['id'])?'selected':'' ?>><?= e($c['name']) ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <div class="form-group"><label>Kapak Gorseli (bos = degistirme)</label>
                    <input type="file" name="cover_image" class="form-control" accept="image/*">
                    <?php if ($item['cover_image']): ?>
                        <div class="mt-2"><img class="thumb" src="<?= UPLOAD_URL . '/' . e($item['cover_image']) ?>" alt=""></div>
                    <?php endif; ?>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group"><label>Musteri</label>
                    <input type="text" name="client_name" class="form-control" value="<?= e($item['client_name']) ?>"></div>
                <div class="form-group"><label>Konum</label>
                    <input type="text" name="location" class="form-control" value="<?= e($item['location']) ?>"></div>
                <div class="form-group"><label>Tamamlanma Tarihi</label>
                    <input type="date" name="completion_date" class="form-control" value="<?= e($item['completion_date']) ?>"></div>
            </div>

            <div class="form-group"><label>Ozet</label>
                <textarea name="summary" class="form-control" style="min-height:70px"><?= e($item['summary']) ?></textarea></div>

            <div class="form-group"><label>Icerik</label>
                <textarea name="content" class="form-control"><?= e($item['content']) ?></textarea></div>

            <div class="form-group">
                <label><input type="checkbox" name="is_featured" value="1" <?= $item['is_featured']?'checked':'' ?>> One cikan</label>
                &nbsp;&nbsp;
                <label><input type="checkbox" name="is_active" value="1" <?= $item['is_active']?'checked':'' ?>> Yayinda</label>
            </div>

            <button type="submit" class="btn btn-success">Guncelle</button>
        </form>
    </div>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
