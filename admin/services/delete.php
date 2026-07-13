<?php
/**
 * admin/services/delete.php
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { redirect('/admin/services/list.php'); }
csrf_check();

$id = (int) input('id', 0);
$model = new Service();
$item = $model->find($id);
if ($item) {
    delete_upload($item['image']);
    $model->delete($id);
    set_flash('success', 'Hizmet silindi.');
}
redirect('/admin/services/list.php');
