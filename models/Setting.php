<?php
if (!defined('APP_RUNNING')) { exit('Direct access not allowed.'); }

/**
 * Setting modeli.  Tablo: settings  (setting_key / setting_value ikilisi)
 * Ayarlar anahtar-deger seklinde tutulur; get/set ile kolay erisilir.
 */
class Setting extends Model
{
    protected string $table = 'settings';
    protected array $fillable = ['setting_key', 'setting_value'];

    /**
     * Tek bir ayari anahtariyla okur.
     */
    public function get(string $key, ?string $default = null): ?string
    {
        $stmt = $this->db()->prepare(
            'SELECT setting_value FROM settings WHERE setting_key = ? LIMIT 1'
        );
        $stmt->execute([$key]);
        $val = $stmt->fetchColumn();
        return $val !== false ? $val : $default;
    }

    /**
     * Tum ayarlari [anahtar => deger] dizisi olarak getirir.
     */
    public function allAsArray(): array
    {
        $rows = $this->db()->query('SELECT setting_key, setting_value FROM settings')->fetchAll();
        $out = [];
        foreach ($rows as $r) {
            $out[$r['setting_key']] = $r['setting_value'];
        }
        return $out;
    }

    /**
     * Bir ayari kaydeder. Varsa gunceller, yoksa ekler (UPSERT).
     */
    public function set(string $key, ?string $value): void
    {
        $sql = 'INSERT INTO settings (setting_key, setting_value)
                VALUES (?, ?)
                ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)';
        $stmt = $this->db()->prepare($sql);
        $stmt->execute([$key, $value]);
    }
}
