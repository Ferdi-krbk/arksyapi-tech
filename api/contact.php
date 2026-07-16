<?php
/**
 * POST /api/contact.php  -> iletisim formu gonderimi
 * Beklenen alanlar: fullname, email, phone (ops.), subject (ops.), message
 * JSON govde veya form-data kabul eder.
 */
require_once __DIR__ . '/init.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json(['error' => 'Yalnizca POST kabul edilir'], 405);
}

// JSON govde geldiyse onu da $_POST'a dahil et
$raw = file_get_contents('php://input');
if ($raw && stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') !== false) {
    $body = json_decode($raw, true);
    if (is_array($body)) { $_POST = array_merge($_POST, $body); }
}

$fullname = trim((string) input('fullname', ''));
$email    = filter_var(trim((string) input('email', '')), FILTER_VALIDATE_EMAIL);
$phone    = trim((string) input('phone', ''));
$subject  = trim((string) input('subject', ''));
$message  = trim((string) input('message', ''));

// Dogrulama
$errors = [];
if ($fullname === '')      { $errors[] = 'Ad soyad zorunludur.'; }
if ($email === false)      { $errors[] = 'Gecerli bir e-posta girin.'; }
if ($message === '')       { $errors[] = 'Mesaj zorunludur.'; }

if ($errors) {
    json(['error' => 'Dogrulama hatasi', 'details' => $errors], 422);
}

(new ContactMessage())->create([
    'fullname' => $fullname,
    'email'    => $email,
    'phone'    => $phone ?: null,
    'subject'  => $subject ?: null,
    'message'  => $message,
    'is_read'  => 0,
]);

json(['success' => true, 'message' => 'Mesajiniz alindi. Tesekkur ederiz.'], 201);
