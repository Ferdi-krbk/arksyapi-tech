<?php
/**
 * Database.php
 * PDO baglantisini yoneten sinif.
 * Singleton deseni: tum uygulama boyunca TEK baglanti kullanilir.
 * Kullanim:  $pdo = Database::conn();
 */

if (!defined('APP_RUNNING')) {
    http_response_code(403);
    exit('Direct access not allowed.');
}

class Database
{
    // Tek PDO ornegini burada tutariz
    private static ?PDO $pdo = null;

    // new Database() yapilmasin diye constructor gizli
    private function __construct() {}

    /**
     * Aktif PDO baglantisini dondurur. Yoksa olusturur.
     */
    public static function conn(): PDO
    {
        if (self::$pdo === null) {
            $dsn = sprintf(
                'mysql:host=%s;port=%s;dbname=%s;charset=%s',
                DB_HOST,
                DB_PORT,
                DB_NAME,
                DB_CHARSET
            );

            $options = [
                // Hatalari exception olarak firlat (sessizce yutma)
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                // Sonuclari isimli dizi olarak getir
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                // GERCEK prepared statement kullan (SQL injection'a karsi guvenli)
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];

            try {
                self::$pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
            } catch (PDOException $e) {
                // Baglanti hatasi: debug modda detay goster, degilse genel mesaj
                if (APP_DEBUG) {
                    exit('Veritabani baglanti hatasi: ' . $e->getMessage());
                }
                http_response_code(500);
                exit('Sunucu hatasi. Lutfen daha sonra tekrar deneyin.');
            }
        }

        return self::$pdo;
    }
}
