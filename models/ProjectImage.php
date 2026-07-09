<?php
if (!defined('APP_RUNNING')) { exit('Direct access not allowed.'); }

/**
 * ProjectImage modeli.  Tablo: project_images
 */
class ProjectImage extends Model
{
    protected string $table = 'project_images';
    protected array $fillable = ['project_id', 'image_path', 'caption', 'sort_order'];
}
