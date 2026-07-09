<?php
if (!defined('APP_RUNNING')) { exit('Direct access not allowed.'); }

/**
 * NewsCategory modeli.  Tablo: news_categories
 */
class NewsCategory extends Model
{
    protected string $table = 'news_categories';
    protected array $fillable = ['name', 'slug'];
}
