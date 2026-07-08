<?php
/**
 * Model.php
 * Tum modeller icin temel CRUD sinifi.
 * Her model sadece $table ve $fillable tanimlar; SQL'i burada bir kez yaziyoruz.
 * Boylece kod tekrari olmaz.
 */

if (!defined('APP_RUNNING')) {
    http_response_code(403);
    exit('Direct access not allowed.');
}

abstract class Model
{
    /** Tablo adi (alt sinif tanimlar) */
    protected string $table;

    /** INSERT/UPDATE'de izin verilen sutunlar (guvenlik: mass-assignment korumasi) */
    protected array $fillable = [];

    /** PDO baglantisi */
    protected function db(): PDO
    {
        return Database::conn();
    }

    /**
     * Tum kayitlari getirir.
     * @param string $order Siralama (orn. "id DESC")
     */
    public function all(string $order = 'id DESC'): array
    {
        $sql = "SELECT * FROM `{$this->table}` ORDER BY {$order}";
        return $this->db()->query($sql)->fetchAll();
    }

    /**
     * Tek kaydi id'ye gore getirir.
     */
    public function find(int $id): ?array
    {
        $stmt = $this->db()->prepare("SELECT * FROM `{$this->table}` WHERE id = ? LIMIT 1");
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    /**
     * Belirli bir sutuna gore tek kayit getirir (orn. slug, email).
     */
    public function findBy(string $column, $value): ?array
    {
        $stmt = $this->db()->prepare("SELECT * FROM `{$this->table}` WHERE `{$column}` = ? LIMIT 1");
        $stmt->execute([$value]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    /**
     * Yeni kayit ekler. Eklenen kaydin id'sini dondurur.
     */
    public function create(array $data): int
    {
        $data = $this->filter($data);
        if (empty($data)) {
            throw new InvalidArgumentException('Eklenecek gecerli alan yok.');
        }

        $columns = array_keys($data);
        $colList = '`' . implode('`, `', $columns) . '`';
        $holders = implode(', ', array_fill(0, count($columns), '?'));

        $sql  = "INSERT INTO `{$this->table}` ({$colList}) VALUES ({$holders})";
        $stmt = $this->db()->prepare($sql);
        $stmt->execute(array_values($data));

        return (int) $this->db()->lastInsertId();
    }

    /**
     * Var olan kaydi gunceller. Etkilenen satir sayisini dondurur.
     */
    public function update(int $id, array $data): int
    {
        $data = $this->filter($data);
        if (empty($data)) {
            return 0;
        }

        $set = implode(', ', array_map(fn($c) => "`{$c}` = ?", array_keys($data)));
        $sql = "UPDATE `{$this->table}` SET {$set} WHERE id = ?";

        $values   = array_values($data);
        $values[] = $id;

        $stmt = $this->db()->prepare($sql);
        $stmt->execute($values);

        return $stmt->rowCount();
    }

    /**
     * Kaydi siler. Etkilenen satir sayisini dondurur.
     */
    public function delete(int $id): int
    {
        $stmt = $this->db()->prepare("DELETE FROM `{$this->table}` WHERE id = ?");
        $stmt->execute([$id]);
        return $stmt->rowCount();
    }

    /**
     * Toplam kayit sayisi (dashboard sayaclarinda kullanilir).
     */
    public function count(): int
    {
        return (int) $this->db()->query("SELECT COUNT(*) FROM `{$this->table}`")->fetchColumn();
    }

    /**
     * $data icinden yalnizca $fillable'da tanimli sutunlari birakir.
     * Boylece kullanici formda olmayan/yasak sutunlara veri gonderemez.
     */
    protected function filter(array $data): array
    {
        return array_intersect_key($data, array_flip($this->fillable));
    }
}
