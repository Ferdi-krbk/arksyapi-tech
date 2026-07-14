<?php
/**
 * admin/sliders/delete.php
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { redirect('/admin/sliders/list.php'); }
csrf_check();

$id = (int) input('id', 0);
$model = new Slider();
$item = $model->find($id);
if ($item) {
    delete_upload($item['image_path']);
    $model->delete($id);
    set_flash('success', 'Slider silindi.');
}
redirect('/admin/sliders/list.php');
