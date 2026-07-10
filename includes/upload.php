<?php
/**
 * upload.php
 * Guvenli resim yukleme fonksiyonu.
 * Kullanim:
 *     $path = upload_image($_FILES['thumbnail'], 'news');
 *     // $path => "news/ab12cd34....jpg"  (DB'ye bu kaydedilir)
 */

if (!defined('APP_RUNNING')) {
    http_response_code(403);
    exit('Direct access not allowed.');
}

/**
 * Bir resmi guvenle yukler ve DB'ye kaydedilecek goreli yolu dondurur.
 *
 * @param array  $file    $_FILES['xxx'] dizisi
 * @param string $folder  Hedef alt klasor (news, projects, gallery...)
 * @return string|null    Basarili: "folder/dosyaadi.jpg" | Bos yukleme: null
 * @throws RuntimeException Gecersiz dosya durumunda
 */
function upload_image(array $file, string $folder): ?string
{
    // Hic dosya secilmediyse (opsiyonel alan) sessizce null don
    if (!isset($file['error']) || $file['error'] === UPLOAD_ERR_NO_FILE) {
        return null;
    }

    // 1) Yukleme hatasi kontrolu
    if ($file['error'] !== UPLOAD_ERR_OK) {
        throw new RuntimeException('Dosya yuklenirken hata olustu (kod: ' . $file['error'] . ').');
    }

    // 2) Gercekten HTTP ile yuklenmis bir dosya mi?
    if (!is_uploaded_file($file['tmp_name'])) {
        throw new RuntimeException('Gecersiz dosya kaynagi.');
    }

    // 3) Boyut kontrolu
    if ($file['size'] > MAX_UPLOAD_SIZE) {
        $mb = MAX_UPLOAD_SIZE / 1024 / 1024;
        throw new RuntimeException("Dosya cok buyuk. En fazla {$mb} MB olabilir.");
    }

    // 4) GERCEK MIME kontrolu (tarayicidan gelen tipe GUVENME)
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mime  = $finfo->file($file['tmp_name']);
    $allowed = ALLOWED_IMAGE_TYPES;
    if (!isset($allowed[$mime])) {
        throw new RuntimeException('Gecersiz dosya turu. Yalnizca JPG, PNG, WEBP, GIF yuklenebilir.');
    }
    $ext = $allowed[$mime];

    // 5) Benzersiz ve guvenli dosya adi uret (orijinal ad tamamen yok sayilir)
    $name = bin2hex(random_bytes(16)) . '.' . $ext;

    // 6) Hedef klasoru olustur (yoksa)
    $dir = UPLOAD_PATH . DIRECTORY_SEPARATOR . $folder;
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    $dest = $dir . DIRECTORY_SEPARATOR . $name;

    // 7) Tasi
    if (!move_uploaded_file($file['tmp_name'], $dest)) {
        throw new RuntimeException('Dosya kaydedilemedi.');
    }

    // DB'ye kaydedilecek goreli yol (ileri slash ile)
    return $folder . '/' . $name;
}

/**
 * Yuklenmis bir dosyayi diskten siler (kayit silinirken cagrilir).
 */
function delete_upload(?string $relativePath): void
{
    if (!$relativePath) {
        return;
    }
    $full = UPLOAD_PATH . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $relativePath);
    if (is_file($full)) {
        @unlink($full);
    }
}
