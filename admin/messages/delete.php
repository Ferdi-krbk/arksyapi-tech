<?php
/**
 * admin/messages/delete.php
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { redirect('/admin/messages/list.php'); }
csrf_check();

$id = (int) input('id', 0);
if ((new ContactMessage())->delete($id)) {
    set_flash('success', 'Mesaj silindi.');
}
redirect('/admin/messages/list.php');
