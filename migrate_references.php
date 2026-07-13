<?php
require_once __DIR__ . '/includes/bootstrap.php';

$db = Database::conn();

try {
    $db->exec("
        CREATE TABLE IF NOT EXISTS `references` (
          `id` int NOT NULL AUTO_INCREMENT,
          `name` varchar(200) NOT NULL,
          `description` varchar(300) DEFAULT NULL,
          `sort_order` int DEFAULT '0',
          `is_active` tinyint(1) DEFAULT '1',
          `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
    ");
    echo "Table 'references' created.\n";

    $check = $db->query("SELECT COUNT(*) FROM `references`")->fetchColumn();
    if ($check == 0) {
        $refs = [
            'Aksa Enerji', 'Borusan Mannesmann', 'Cimsa Cimento', 'Enerjisa',
            'Ford Otosan', 'IGA Istanbul Havalimani', 'Kalyon Holding', 'Limak Insaat',
            'MNG Kargo', 'Tekfen Insaat', 'Turk Telekom', 'Zorlu Enerji',
            'Anadolu Efes', 'Arcelik', 'Coca-Cola Icecek', 'Dogus Insaat',
            'ENKA Insaat', 'Eczacibasi', 'Sisecam', 'TAV Havalimanlari',
        ];
        $stmt = $db->prepare("INSERT INTO `references` (name, sort_order) VALUES (?, ?)");
        foreach ($refs as $i => $name) {
            $stmt->execute([$name, $i + 1]);
        }
        echo "Seeded " . count($refs) . " references.\n";
    } else {
        echo "Already seeded, skipping.\n";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
