<?php
/**
 * admin/news/delete.php
 * Haber silme islemi (sadece POST + CSRF).
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirect('/admin/news/list.php');
}

csrf_check();

$id = (int) input('id', 0);
$newsModel = new News();
$item = $newsModel->find($id);

if ($item) {
    delete_upload($item['thumbnail']); // gorseli diskten sil
    $newsModel->delete($id);
    set_flash('success', 'Haber silindi.');
} else {
    set_flash('error', 'Haber bulunamadi.');
}

redirect('/admin/news/list.php');
