<?php
/**
 * admin/users/edit.php  (sadece admin)
 * Sifre bos birakilirsa degistirilmez.
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_admin();

$pageTitle = 'Kullanici Duzenle';
$active    = 'users';

$model = new User();
$id = (int) input('id', 0);
$item = $model->find($id);
if (!$item) { set_flash('error','Kullanici bulunamadi.'); redirect('/admin/users/list.php'); }

$roles = (new Role())->all('name ASC');
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $fullname = trim((string) input('fullname', ''));
    $username = trim((string) input('username', ''));
    $email    = trim((string) input('email', ''));
    $role_id  = (int) input('role_id', 0);
    $is_active= input('is_active') ? 1 : 0;
    $password = (string) input('password', '');

    if ($fullname === '') { $errors[] = 'Ad soyad zorunludur.'; }
    if ($username === '') { $errors[] = 'Kullanici adi zorunludur.'; }
    if (!$role_id)        { $errors[] = 'Rol seciniz.'; }

    // Kullanici adi baskasinda var mi?
    $dup = $model->findBy('username', $username);
    if ($dup && (int) $dup['id'] !== $id) { $errors[] = 'Bu kullanici adi baskasinda kayitli.'; }

    if (empty($errors)) {
        $data = [
            'role_id'   => $role_id,
            'fullname'  => $fullname,
            'username'  => $username,
            'email'     => $email ?: null,
            'is_active' => $is_active,
        ];
        // Yeni sifre girildiyse guncelle
        if ($password !== '') {
            if (strlen($password) < 5) {
                $errors[] = 'Sifre en az 5 karakter olmalidir.';
            } else {
                $data['password'] = $model->hashPassword($password);
            }
        }
        if (empty($errors)) {
            $model->update($id, $data);
            set_flash('success', 'Kullanici guncellendi.');
            redirect('/admin/users/list.php');
        }
    }
    $item = array_merge($item, compact('fullname','username','email','role_id','is_active'));
}

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head"><h2>Kullanici Duzenle</h2>
        <a href="<?= BASE_URL ?>/admin/users/list.php" class="btn btn-secondary btn-sm">Geri</a></div>
    <div class="panel-body">
        <?php foreach ($errors as $err): ?><div class="alert alert-danger"><?= e($err) ?></div><?php endforeach; ?>
        <form method="post">
            <?= csrf_field() ?>
            <div class="form-row">
                <div class="form-group"><label>Ad Soyad *</label>
                    <input type="text" name="fullname" class="form-control" value="<?= e($item['fullname']) ?>"></div>
                <div class="form-group"><label>Kullanici Adi *</label>
                    <input type="text" name="username" class="form-control" value="<?= e($item['username']) ?>"></div>
            </div>
            <div class="form-row">
                <div class="form-group"><label>E-posta</label>
                    <input type="email" name="email" class="form-control" value="<?= e($item['email']) ?>"></div>
                <div class="form-group"><label>Yeni Sifre (bos = degistirme)</label>
                    <input type="password" name="password" class="form-control"></div>
            </div>
            <div class="form-row">
                <div class="form-group"><label>Rol *</label>
                    <select name="role_id" class="form-control">
                        <option value="">- Sec -</option>
                        <?php foreach ($roles as $r): ?>
                            <option value="<?= (int) $r['id'] ?>" <?= ($item['role_id']==$r['id'])?'selected':'' ?>><?= e($r['name']) ?></option>
                        <?php endforeach; ?>
                    </select></div>
                <div class="form-group"><label>Durum</label><br>
                    <label><input type="checkbox" name="is_active" value="1" <?= $item['is_active']?'checked':'' ?>> Aktif</label></div>
            </div>
            <button class="btn btn-success">Guncelle</button>
        </form>
    </div>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
