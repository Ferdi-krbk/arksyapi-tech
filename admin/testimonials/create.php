<?php
/**
 * admin/testimonials/create.php
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

$pageTitle = 'Yeni Yorum';
$active    = 'testimonials';

$errors = [];
$old = ['name'=>'','role'=>'','content'=>'','rating'=>5,'sort_order'=>0,'is_active'=>1];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $old['name']       = trim((string) input('name', ''));
    $old['role']       = trim((string) input('role', ''));
    $old['content']    = trim((string) input('content', ''));
    $old['rating']     = max(1, min(5, (int) input('rating', 5)));
    $old['sort_order'] = (int) input('sort_order', 0);
    $old['is_active']  = input('is_active') ? 1 : 0;

    if ($old['name'] === '')    { $errors[] = 'Ad zorunludur.'; }
    if ($old['content'] === '') { $errors[] = 'Yorum metni zorunludur.'; }

    if (empty($errors)) {
        (new Testimonial())->create($old);
        set_flash('success', 'Yorum eklendi.');
        redirect('/admin/testimonials/list.php');
    }
}

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head"><h2>Yeni Yorum</h2>
        <a href="<?= BASE_URL ?>/admin/testimonials/list.php" class="btn btn-secondary btn-sm">Geri</a></div>
    <div class="panel-body">
        <?php foreach ($errors as $err): ?><div class="alert alert-danger"><?= e($err) ?></div><?php endforeach; ?>
        <form method="post">
            <?= csrf_field() ?>
            <div class="form-row">
                <div class="form-group"><label>Ad Soyad *</label>
                    <input type="text" name="name" class="form-control" value="<?= e($old['name']) ?>"></div>
                <div class="form-group"><label>Unvan / Firma</label>
                    <input type="text" name="role" class="form-control" value="<?= e($old['role']) ?>" placeholder="orn. Insaat Muduru · Firma"></div>
            </div>
            <div class="form-group"><label>Yorum *</label>
                <textarea name="content" class="form-control"><?= e($old['content']) ?></textarea></div>
            <div class="form-row">
                <div class="form-group"><label>Puan (1-5)</label>
                    <input type="number" name="rating" min="1" max="5" class="form-control" value="<?= (int) $old['rating'] ?>"></div>
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
