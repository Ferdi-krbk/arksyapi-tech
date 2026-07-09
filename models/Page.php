<?php
if (!defined('APP_RUNNING')) { exit('Direct access not allowed.'); }

/**
 * Page modeli.  Tablo: pages  (Hakkimizda, Gizlilik gibi statik sayfalar)
 */
class Page extends Model
{
    protected string $table = 'pages';
    protected array $fillable = [
        'title', 'slug', 'content', 'seo_title', 'seo_description',
    ];
}
