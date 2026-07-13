-- References table
CREATE TABLE IF NOT EXISTS `references` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` varchar(300) DEFAULT NULL,
  `sort_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Seed default references
INSERT INTO `references` (`name`, `description`, `sort_order`) VALUES
('Aksa Enerji', NULL, 1),
('Borusan Mannesmann', NULL, 2),
('Çimsa Çimento', NULL, 3),
('Enerjisa', NULL, 4),
('Ford Otosan', NULL, 5),
('İGA İstanbul Havalimanı', NULL, 6),
('Kalyon Holding', NULL, 7),
('Limak İnşaat', NULL, 8),
('MNG Kargo', NULL, 9),
('Tekfen İnşaat', NULL, 10),
('Türk Telekom', NULL, 11),
('Zorlu Enerji', NULL, 12),
('Anadolu Efes', NULL, 13),
('Arçelik', NULL, 14),
('Coca-Cola İçecek', NULL, 15),
('Doğuş İnşaat', NULL, 16),
('ENKA İnşaat', NULL, 17),
('Eczacıbaşı', NULL, 18),
('Şişecam', NULL, 19),
('TAV Havalimanları', NULL, 20);
