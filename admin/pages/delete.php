<?php
/**
 * admin/pages/delete.php
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { redirect('/admin/pages/list.php'); }
csrf_check();

$id = (int) input('id', 0);
if ((new Page())->delete($id)) {
    set_flash('success', 'Sayfa silindi.');
}
redirect('/admin/pages/list.php');
