<?php
/**
 * admin/testimonials/delete.php
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') { redirect('/admin/testimonials/list.php'); }
csrf_check();

$id = (int) input('id', 0);
if ((new Testimonial())->delete($id)) {
    set_flash('success', 'Yorum silindi.');
}
redirect('/admin/testimonials/list.php');
