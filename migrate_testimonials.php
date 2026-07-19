<?php
/**
 * migrate_testimonials.php — testimonials tablosunu olusturur (bir kez calistir).
 */
require_once __DIR__ . '/includes/bootstrap.php';

$sql = "CREATE TABLE IF NOT EXISTS testimonials (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  role VARCHAR(150) NULL,
  content TEXT NOT NULL,
  rating TINYINT NOT NULL DEFAULT 5,
  sort_order INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

Database::conn()->exec($sql);
echo "testimonials tablosu hazir.\n";
