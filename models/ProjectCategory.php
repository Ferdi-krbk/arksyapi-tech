<?php
if (!defined('APP_RUNNING')) { exit('Direct access not allowed.'); }

/**
 * ProjectCategory modeli.  Tablo: project_categories
 */
class ProjectCategory extends Model
{
    protected string $table = 'project_categories';
    protected array $fillable = ['name', 'slug'];
}
