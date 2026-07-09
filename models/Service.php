<?php
if (!defined('APP_RUNNING')) { exit('Direct access not allowed.'); }

/**
 * Service modeli.  Tablo: services
 */
class Service extends Model
{
    protected string $table = 'services';
    protected array $fillable = [
        'title', 'slug', 'short_description', 'content',
        'icon', 'image', 'sort_order', 'is_active',
    ];

    /**
     * Aktif hizmetleri sirali getirir.
     */
    public function active(): array
    {
        return $this->db()->query(
            'SELECT * FROM services WHERE is_active = 1 ORDER BY sort_order ASC, id ASC'
        )->fetchAll();
    }
}
