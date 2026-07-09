<?php
if (!defined('APP_RUNNING')) { exit('Direct access not allowed.'); }

/**
 * Gallery modeli.  Tablo: gallery
 */
class Gallery extends Model
{
    protected string $table = 'gallery';
    protected array $fillable = ['title', 'image_path', 'category', 'sort_order'];

    /**
     * Galeriyi sirali getirir.
     */
    public function ordered(): array
    {
        return $this->db()->query(
            'SELECT * FROM gallery ORDER BY sort_order ASC, id DESC'
        )->fetchAll();
    }
}
