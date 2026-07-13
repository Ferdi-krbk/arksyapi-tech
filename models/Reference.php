<?php
if (!defined('APP_RUNNING')) { exit('Direct access not allowed.'); }

class Reference extends Model
{
    protected string $table = 'references';
    protected array $fillable = ['name', 'description', 'sort_order', 'is_active'];

    public function active(): array
    {
        return $this->db()->query(
            'SELECT * FROM `references` WHERE is_active = 1 ORDER BY sort_order ASC, id ASC'
        )->fetchAll();
    }
}
