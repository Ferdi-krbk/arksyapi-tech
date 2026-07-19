<?php
if (!defined('APP_RUNNING')) { exit('Direct access not allowed.'); }

/**
 * Testimonial modeli.  Tablo: testimonials (musteri yorumlari)
 */
class Testimonial extends Model
{
    protected string $table = 'testimonials';
    protected array $fillable = ['name', 'role', 'content', 'rating', 'sort_order', 'is_active'];

    /** Aktif yorumlari sirali getirir */
    public function active(): array
    {
        return $this->db()->query(
            'SELECT * FROM testimonials WHERE is_active = 1 ORDER BY sort_order ASC, id DESC'
        )->fetchAll();
    }
}
