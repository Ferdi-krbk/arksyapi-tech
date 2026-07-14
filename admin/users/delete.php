<?php
/**
 * admin/users/delete.php  (sadece admin)
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_admin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { redirect('/admin/users/list.php'); }
csrf_check();

$id = (int) input('id', 0);

// Kendini silmeyi engelle
if ($id === current_user_id()) {
    set_flash('error', 'Kendi hesabinizi silemezsiniz.');
    redirect('/admin/users/list.php');
}

if ((new User())->delete($id)) {
    set_flash('success', 'Kullanici silindi.');
}
redirect('/admin/users/list.php');
