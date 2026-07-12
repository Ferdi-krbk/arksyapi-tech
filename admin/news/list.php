<?php
/**
 * admin/news/list.php
 * Haberleri listeler.
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

$pageTitle = 'Haberler';
$active    = 'news';

$news = (new News())->allWithDetails();

require __DIR__ . '/../partials/header.php';
?>

<div class="panel">
    <div class="panel-head">
        <h2>Haberler (<?= count($news) ?>)</h2>
        <a href="<?= BASE_URL ?>/admin/news/create.php" class="btn btn-success">+ Yeni Haber</a>
    </div>
    <div class="panel-body">
        <?php if (empty($news)): ?>
            <p class="text-muted">Henuz haber eklenmemis.</p>
        <?php else: ?>
            <table>
                <thead>
                    <tr><th>Gorsel</th><th>Baslik</th><th>Kategori</th><th>Durum</th><th>Tarih</th><th>Islem</th></tr>
                </thead>
                <tbody>
                <?php foreach ($news as $n): ?>
                    <tr>
                        <td>
                            <?php if ($n['thumbnail']): ?>
                                <img class="thumb" src="<?= UPLOAD_URL . '/' . e($n['thumbnail']) ?>" alt="">
                            <?php else: ?>
                                <span class="text-muted">-</span>
                            <?php endif; ?>
                        </td>
                        <td><?= e($n['title']) ?></td>
                        <td><?= e($n['category_name'] ?: '-') ?></td>
                        <td>
                            <?php if ($n['is_active']): ?>
                                <span class="badge-status badge-on">Yayinda</span>
                            <?php else: ?>
                                <span class="badge-status badge-off">Taslak</span>
                            <?php endif; ?>
                        </td>
                        <td><?= e((string) $n['created_at']) ?></td>
                        <td class="actions">
                            <a href="<?= BASE_URL ?>/admin/news/edit.php?id=<?= (int) $n['id'] ?>" class="btn btn-sm">Duzenle</a>
                            <form method="post" action="<?= BASE_URL ?>/admin/news/delete.php" style="display:inline"
                                  onsubmit="return confirm('Bu haber silinsin mi?');">
                                <?= csrf_field() ?>
                                <input type="hidden" name="id" value="<?= (int) $n['id'] ?>">
                                <button type="submit" class="btn btn-sm btn-danger">Sil</button>
                            </form>
                        </td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
