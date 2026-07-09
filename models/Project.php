<?php
if (!defined('APP_RUNNING')) { exit('Direct access not allowed.'); }

/**
 * Project modeli.  Tablo: projects
 */
class Project extends Model
{
    protected string $table = 'projects';
    protected array $fillable = [
        'category_id', 'title', 'slug', 'client_name', 'location',
        'completion_date', 'summary', 'content', 'cover_image',
        'is_featured', 'is_active',
    ];

    /**
     * Yayinlanmis projeleri getirir.
     */
    public function published(int $limit = 10, int $offset = 0): array
    {
        $sql = 'SELECT p.*, pc.name AS category_name
                FROM projects p
                LEFT JOIN project_categories pc ON p.category_id = pc.id
                WHERE p.is_active = 1
                ORDER BY p.completion_date DESC
                LIMIT ? OFFSET ?';
        $stmt = $this->db()->prepare($sql);
        $stmt->execute([$limit, $offset]);
        return $stmt->fetchAll();
    }

    /**
     * Yayinlanmis tek projeyi slug'a gore getirir.
     */
    public function publishedBySlug(string $slug): ?array
    {
        $sql = 'SELECT p.*, pc.name AS category_name
                FROM projects p
                LEFT JOIN project_categories pc ON p.category_id = pc.id
                WHERE p.slug = ? AND p.is_active = 1
                LIMIT 1';
        $stmt = $this->db()->prepare($sql);
        $stmt->execute([$slug]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    /**
     * Tum projeler (admin panel icin).
     */
    public function allWithDetails(): array
    {
        $sql = 'SELECT p.*, pc.name AS category_name
                FROM projects p
                LEFT JOIN project_categories pc ON p.category_id = pc.id
                ORDER BY p.created_at DESC';
        return $this->db()->query($sql)->fetchAll();
    }

    /**
     * Bir projeye ait tum gorselleri getirir.
     */
    public function images(int $projectId): array
    {
        $stmt = $this->db()->prepare(
            'SELECT * FROM project_images WHERE project_id = ? ORDER BY sort_order ASC'
        );
        $stmt->execute([$projectId]);
        return $stmt->fetchAll();
    }

    /**
     * Yayinlanmis proje sayisi.
     */
    public function publishedCount(): int
    {
        return (int) $this->db()->query(
            "SELECT COUNT(*) FROM projects WHERE is_active = 1"
        )->fetchColumn();
    }
}
