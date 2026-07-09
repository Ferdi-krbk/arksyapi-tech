<?php
if (!defined('APP_RUNNING')) { exit('Direct access not allowed.'); }

/**
 * Role modeli.  Tablo: roles
 */
class Role extends Model
{
    protected string $table = 'roles';
    protected array $fillable = ['name'];
}
