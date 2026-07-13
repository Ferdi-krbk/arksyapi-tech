<?php
/**
 * admin/projects/delete.php
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { redirect('/admin/projects/list.php'); }
csrf_check();

$id = (int) input('id', 0);
$model = new Project();
$item = $model->find($id);
if ($item) {
    delete_upload($item['cover_image']);
    $model->delete($id);
    set_flash('success', 'Proje silindi.');
} else {
    set_flash('error', 'Proje bulunamadi.');
}
redirect('/admin/projects/list.php');
