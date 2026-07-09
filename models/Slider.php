<?php
if (!defined('APP_RUNNING')) { exit('Direct access not allowed.'); }

/**
 * Slider modeli.  Tablo: sliders  (ana sayfa slider'lari)
 */
class Slider extends Model
{
    protected string $table = 'sliders';
    protected array $fillable = [
        'title', 'subtitle', 'button_text', 'button_url',
        'image_path', 'sort_order', 'is_active',
    ];

    /**
     * Aktif slider'lari sirali getirir.
     */
    public function active(): array
    {
        return $this->db()->query(
            'SELECT * FROM sliders WHERE is_active = 1 ORDER BY sort_order ASC, id ASC'
        )->fetchAll();
    }
}
