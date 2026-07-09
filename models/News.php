<?php
if (!defined('APP_RUNNING')) { exit('Direct access not allowed.'); }

/**
 * News modeli.  Tablo: news
 */
class News extends Model
{
    protected string $table = 'news';
    protected array $fillable = [
        'category_id', 'author_id', 'title', 'slug', 'summary',
        'content', 'thumbnail', 'published_at', 'is_active',
    ];

    /**
     * Yayinlanmis haberleri getirir. Kategori ve author JOIN'li.
     */
    public function published(int $limit = 10, int $offset = 0): array
    {
        $sql = 'SELECT n.*,
                       nc.name AS category_name,
                       u.fullname AS author_name
                FROM news n
                LEFT JOIN news_categories nc ON n.category_id = nc.id
                LEFT JOIN users u ON n.author_id = u.id
                WHERE n.is_active = 1
                ORDER BY n.published_at DESC
                LIMIT ? OFFSET ?';
        $stmt = $this->db()->prepare($sql);
        $stmt->execute([$limit, $offset]);
        return $stmt->fetchAll();
    }

    /**
     * Yayinlanmis tek haberi slug'a gore getirir.
     */
    public function publishedBySlug(string $slug): ?array
    {
        $sql = 'SELECT n.*, nc.name AS category_name
                FROM news n
                LEFT JOIN news_categories nc ON n.category_id = nc.id
                WHERE n.slug = ? AND n.is_active = 1
                LIMIT 1';
        $stmt = $this->db()->prepare($sql);
        $stmt->execute([$slug]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    /**
     * Tum haberler (yayinlanmis/taslak dahil), admin panel icin.
     */
    public function allWithDetails(): array
    {
        $sql = 'SELECT n.*,
                       nc.name AS category_name,
                       u.fullname AS author_name
                FROM news n
                LEFT JOIN news_categories nc ON n.category_id = nc.id
                LEFT JOIN users u ON n.author_id = u.id
                ORDER BY n.created_at DESC';
        return $this->db()->query($sql)->fetchAll();
    }

    /**
     * Yayinlanmis haber sayisi (dashboard).
     */
    public function publishedCount(): int
    {
        return (int) $this->db()->query(
            "SELECT COUNT(*) FROM news WHERE is_active = 1"
        )->fetchColumn();
    }
}
