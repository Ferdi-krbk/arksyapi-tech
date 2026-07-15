<?php
/**
 * admin/categories/index.php
 * Haber ve proje kategorilerini tek sayfadan yonetir.
 * Ekleme ve silme burada; isim degistirme edit.php'de.
 */
require_once __DIR__ . '/../../includes/bootstrap.php';
require_login();

$pageTitle = 'Kategoriler';
$active    = 'categories';

/** type'a gore dogru modeli dondurur */
function category_model(string $type): Model
{
    return $type === 'project' ? new ProjectCategory() : new NewsCategory();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    csrf_check();
    $action = (string) input('action', '');
    $type   = input('type') === 'project' ? 'project' : 'news';
    $model  = category_model($type);

    if ($action === 'create') {
        $name = trim((string) input('name', ''));
        if ($name !== '') {
            $model->create(['name' => $name, 'slug' => slugify($name)]);
            set_flash('success', 'Kategori eklendi.');
        } else {
            set_flash('error', 'Kategori adi bos olamaz.');
        }
    } elseif ($action === 'delete') {
        $model->delete((int) input('id', 0));
        set_flash('success', 'Kategori silindi.');
    }
    redirect('/admin/categories/index.php');
}

$newsCats    = (new NewsCategory())->all('name ASC');
$projectCats = (new ProjectCategory())->all('name ASC');

require __DIR__ . '/../partials/header.php';

/** Bir kategori bolumu render eder (tekrar yazmamak icin) */
function render_category_panel(string $type, string $title, array $rows): void
{
?>
    <div class="panel" style="flex:1">
        <div class="panel-head"><h2><?= e($title) ?> (<?= count($rows) ?>)</h2></div>
        <div class="panel-body">
            <form method="post" style="display:flex; gap:8px; margin-bottom:16px">
                <?= csrf_field() ?>
                <input type="hidden" name="action" value="create">
                <input type="hidden" name="type" value="<?= e($type) ?>">
                <input type="text" name="name" class="form-control" placeholder="Yeni kategori adi" style="flex:1">
                <button class="btn btn-success">Ekle</button>
            </form>

            <?php if (empty($rows)): ?>
                <p class="text-muted">Kategori yok.</p>
            <?php else: ?>
                <table>
                    <thead><tr><th>Ad</th><th>Slug</th><th>Islem</th></tr></thead>
                    <tbody>
                    <?php foreach ($rows as $c): ?>
                        <tr>
                            <td><?= e($c['name']) ?></td>
                            <td class="text-muted"><?= e($c['slug']) ?></td>
                            <td class="actions">
                                <a href="<?= BASE_URL ?>/admin/categories/edit.php?type=<?= e($type) ?>&id=<?= (int) $c['id'] ?>" class="btn btn-sm">Duzenle</a>
                                <form method="post" style="display:inline" onsubmit="return confirm('Silinsin mi?');">
                                    <?= csrf_field() ?>
                                    <input type="hidden" name="action" value="delete">
                                    <input type="hidden" name="type" value="<?= e($type) ?>">
                                    <input type="hidden" name="id" value="<?= (int) $c['id'] ?>">
                                    <button class="btn btn-sm btn-danger">Sil</button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </div>
    </div>
<?php
}
?>

<div style="display:flex; gap:20px; align-items:flex-start">
    <?php render_category_panel('news', 'Haber Kategorileri', $newsCats); ?>
    <?php render_category_panel('project', 'Proje Kategorileri', $projectCats); ?>
</div>

<?php require __DIR__ . '/../partials/footer.php'; ?>
