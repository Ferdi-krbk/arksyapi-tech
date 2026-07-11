<?php
/**
 * admin/login.php
 * Yonetici giris sayfasi ve giris islemi.
 */
require_once __DIR__ . '/../includes/bootstrap.php';

// Zaten giris yapmissa dashboard'a gonder
if (is_logged_in()) {
    redirect('/admin/index.php');
}

$error = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();

    $username = trim((string) input('username', ''));
    $password = (string) input('password', '');

    if ($username === '' || $password === '') {
        $error = 'Kullanici adi ve sifre zorunludur.';
    } elseif (attempt_login($username, $password)) {
        set_flash('success', 'Hos geldin, ' . current_user_name() . '!');
        redirect('/admin/index.php');
    } else {
        $error = 'Kullanici adi veya sifre hatali.';
    }
}
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yonetici Girisi</title>
    <link rel="stylesheet" href="<?= BASE_URL ?>/admin/assets/style.css">
</head>
<body>
    <div class="login-wrap">
        <form class="login-box" method="post" action="">
            <h1>ARKS Yonetim</h1>
            <p class="sub">Devam etmek icin giris yap</p>

            <?php if ($error): ?>
                <div class="alert alert-danger"><?= e($error) ?></div>
            <?php endif; ?>

            <?= csrf_field() ?>

            <div class="form-group">
                <label for="username">Kullanici Adi</label>
                <input type="text" id="username" name="username" class="form-control"
                       value="<?= e((string) input('username', '')) ?>" autofocus>
            </div>

            <div class="form-group">
                <label for="password">Sifre</label>
                <input type="password" id="password" name="password" class="form-control">
            </div>

            <button type="submit" class="btn btn-block">Giris Yap</button>
        </form>
    </div>
</body>
</html>
