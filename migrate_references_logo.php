<?php
require_once __DIR__ . '/includes/bootstrap.php';

$db = Database::conn();

try {
    $cols = $db->query("SHOW COLUMNS FROM `references` LIKE 'logo_path'")->fetchAll();
    if (empty($cols)) {
        $db->exec("ALTER TABLE `references` ADD COLUMN `logo_path` varchar(255) DEFAULT NULL AFTER `description`");
        echo "Added logo_path column.\n";
    } else {
        echo "logo_path column already exists.\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
