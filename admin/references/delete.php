<?php
/**
 * admin/references/delete.php
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { redirect('/admin/references/list.php'); }
csrf_check();

$id = (int) input('id', 0);
if ((new Reference())->delete($id)) {
    set_flash('success', 'Referans silindi.');
}
redirect('/admin/references/list.php');
