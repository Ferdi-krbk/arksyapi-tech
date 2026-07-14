<?php
/**
 * admin/users/create.php  (sadece admin)
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_admin();

$pageTitle = 'Yeni Kullanici';
$active    = 'users';

$roles = (new Role())->all('name ASC');
$model = new User();
$errors = [];
$old = ['fullname'=>'','username'=>'','email'=>'','role_id'=>'','is_active'=>1];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $old['fullname'] = trim((string) input('fullname', ''));
    $old['username'] = trim((string) input('username', ''));
    $old['email']    = trim((string) input('email', ''));
    $old['role_id']  = (int) input('role_id', 0);
    $old['is_active']= input('is_active') ? 1 : 0;
    $password        = (string) input('password', '');

    if ($old['fullname'] === '') { $errors[] = 'Ad soyad zorunludur.'; }
    if ($old['username'] === '') { $errors[] = 'Kullanici adi zorunludur.'; }
    if (strlen($password) < 5)   { $errors[] = 'Sifre en az 5 karakter olmalidir.'; }
    if (!$old['role_id'])        { $errors[] = 'Rol seciniz.'; }
    if ($model->findBy('username', $old['username'])) { $errors[] = 'Bu kullanici adi zaten var.'; }

    if (empty($errors)) {
        $model->create([
            'role_id'   => $old['role_id'],
            'fullname'  => $old['fullname'],
            'username'  => $old['username'],
            'email'     => $old['email'] ?: null,
            'password'  => $model->hashPassword($password),
            'is_active' => $old['is_active'],
        ]);
        set_flash('success', 'Kullanici olusturuldu.');
        redirect('/admin/users/list.php');
    }
}

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head"><h2>Yeni Kullanici</h2>
        <a href="<?= BASE_URL ?>/admin/users/list.php" class="btn btn-secondary btn-sm">Geri</a></div>
    <div class="panel-body">
        <?php foreach ($errors as $err): ?><div class="alert alert-danger"><?= e($err) ?></div><?php endforeach; ?>
        <form method="post">
            <?= csrf_field() ?>
            <div class="form-row">
                <div class="form-group"><label>Ad Soyad *</label>
                    <input type="text" name="fullname" class="form-control" value="<?= e($old['fullname']) ?>"></div>
                <div class="form-group"><label>Kullanici Adi *</label>
                    <input type="text" name="username" class="form-control" value="<?= e($old['username']) ?>"></div>
            </div>
            <div class="form-row">
                <div class="form-group"><label>E-posta</label>
                    <input type="email" name="email" class="form-control" value="<?= e($old['email']) ?>"></div>
                <div class="form-group"><label>Sifre *</label>
                    <input type="password" name="password" class="form-control"></div>
            </div>
            <div class="form-row">
                <div class="form-group"><label>Rol *</label>
                    <select name="role_id" class="form-control">
                        <option value="">- Sec -</option>
                        <?php foreach ($roles as $r): ?>
                            <option value="<?= (int) $r['id'] ?>" <?= ($old['role_id']==$r['id'])?'selected':'' ?>><?= e($r['name']) ?></option>
                        <?php endforeach; ?>
                    </select></div>
                <div class="form-group"><label>Durum</label><br>
                    <label><input type="checkbox" name="is_active" value="1" <?= $old['is_active']?'checked':'' ?>> Aktif</label></div>
            </div>
            <button class="btn btn-success">Kaydet</button>
        </form>
    </div>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
