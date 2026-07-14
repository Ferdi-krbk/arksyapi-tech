<?php
/**
 * admin/settings/index.php  (sadece admin)
 * Sirket bilgileri, logo ve sosyal medya ayarlari (key/value).
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_admin();

$pageTitle = 'Ayarlar';
$active    = 'settings';

$model = new Setting();

// Yonetilecek ayar anahtarlari
$fields = [
    'company_name'  => 'Sirket Adi',
    'email'         => 'E-posta',
    'phone'         => 'Telefon',
    'address'       => 'Adres',
    'working_hours' => 'Calisma Saatleri',
    'facebook'      => 'Facebook URL',
    'instagram'     => 'Instagram URL',
    'linkedin'      => 'LinkedIn URL',
    'twitter'       => 'Twitter/X URL',
];

$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();

    // Metin ayarlarini kaydet
    foreach ($fields as $key => $label) {
        $model->set($key, trim((string) input($key, '')));
    }

    // Logo yukleme (opsiyonel)
    try {
        $logo = upload_image($_FILES['logo'] ?? [], 'settings');
        if ($logo !== null) {
            delete_upload($model->get('logo'));
            $model->set('logo', $logo);
        }
    } catch (RuntimeException $ex) {
        $errors[] = $ex->getMessage();
    }

    if (empty($errors)) {
        set_flash('success', 'Ayarlar kaydedildi.');
        redirect('/admin/settings/index.php');
    }
}

$current = $model->allAsArray();

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head"><h2>Site Ayarlari</h2></div>
    <div class="panel-body">
        <?php foreach ($errors as $err): ?><div class="alert alert-danger"><?= e($err) ?></div><?php endforeach; ?>

        <form method="post" enctype="multipart/form-data">
            <?= csrf_field() ?>

            <div class="form-group">
                <label>Logo</label>
                <input type="file" name="logo" class="form-control" accept="image/*">
                <?php if (!empty($current['logo'])): ?>
                    <div class="mt-2"><img src="<?= UPLOAD_URL.'/'.e($current['logo']) ?>" style="max-height:60px"></div>
                <?php endif; ?>
            </div>

            <?php foreach ($fields as $key => $label): ?>
                <div class="form-group">
                    <label><?= e($label) ?></label>
                    <input type="text" name="<?= e($key) ?>" class="form-control" value="<?= e($current[$key] ?? '') ?>">
                </div>
            <?php endforeach; ?>

            <button class="btn btn-success">Kaydet</button>
        </form>
    </div>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
