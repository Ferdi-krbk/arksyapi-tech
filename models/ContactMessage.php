<?php
if (!defined('APP_RUNNING')) { exit('Direct access not allowed.'); }

/**
 * ContactMessage modeli.  Tablo: contact_messages
 */
class ContactMessage extends Model
{
    protected string $table = 'contact_messages';
    protected array $fillable = [
        'fullname', 'email', 'phone', 'subject', 'message', 'is_read',
    ];

    /**
     * Okunmamis mesaj sayisi (dashboard / inbox rozeti).
     */
    public function unreadCount(): int
    {
        return (int) $this->db()->query(
            'SELECT COUNT(*) FROM contact_messages WHERE is_read = 0'
        )->fetchColumn();
    }

    /**
     * Mesaji okundu olarak isaretler.
     */
    public function markRead(int $id): void
    {
        $stmt = $this->db()->prepare('UPDATE contact_messages SET is_read = 1 WHERE id = ?');
        $stmt->execute([$id]);
    }
}
