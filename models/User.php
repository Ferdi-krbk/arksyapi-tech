<?php
if (!defined('APP_RUNNING')) { exit('Direct access not allowed.'); }

/**
 * User modeli.  Tablo: users
 */
class User extends Model
{
    protected string $table = 'users';
    protected array $fillable = [
        'role_id', 'fullname', 'username', 'email', 'password', 'is_active',
    ];

    /**
     * Rol adiyla birlikte tum kullanicilari getirir.
     */
    public function allWithRole(): array
    {
        $sql = 'SELECT u.*, r.name AS role_name
                FROM users u
                JOIN roles r ON u.role_id = r.id
                ORDER BY u.id DESC';
        return $this->db()->query($sql)->fetchAll();
    }

    /**
     * Parolayi hash'ler. Kayit/guncellemeden ONCE cagrilir.
     */
    public function hashPassword(string $plain): string
    {
        return password_hash($plain, PASSWORD_DEFAULT);
    }
}
