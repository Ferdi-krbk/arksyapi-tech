<div align="center">

# ARKS Yapı Teknolojileri

### Kurumsal Web Sitesi + İçerik Yönetim Sistemi (CMS)

Endüstriyel yalıtım ve kaplama firması için geliştirilmiş **full-stack** web uygulaması:
modern bir React arayüzü ve framework kullanmadan yazılmış PHP yönetim paneli + REST API.

<br>

![PHP](https://img.shields.io/badge/PHP-8.3-777BB4?logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)

</div>

---

## İçindekiler

- [Genel Bakış](#genel-bakış)
- [Mimari](#mimari)
- [Teknoloji Yığını](#teknoloji-yığını)
- [Proje Yapısı](#proje-yapısı)
- [Kurulum](#kurulum)
  - [1. Backend (PHP + MySQL)](#1-backend-php--mysql)
  - [2. Frontend (React + Vite)](#2-frontend-react--vite)
- [Yönetim Paneli](#yönetim-paneli)
- [REST API](#rest-api)
- [Veritabanı Şeması](#veritabanı-şeması)
- [Güvenlik](#güvenlik)
- [Sık Sorulanlar](#sık-sorulanlar)

---

## Genel Bakış

Proje iki bağımsız uygulamadan oluşur ve bunlar bir **REST API** üzerinden konuşur:

| Katman | Teknoloji | Görev | Adres (yerel) |
|---|---|---|---|
| **Frontend** | React + Vite + TanStack Router | Ziyaretçilerin gördüğü kurumsal site | `http://localhost:5173` |
| **Backend** | Vanilla PHP + MySQL | Yönetim paneli + JSON API | `http://localhost:8000` |

Yönetici panelden içerik girer (proje, haber, hizmet, galeri, slider, ayarlar); frontend bu içeriği API'den çekip anında gösterir. Yani **kod değiştirmeden** siteyi güncelleyebilirsin.

### Öne Çıkanlar

- 🔐 Oturum tabanlı kimlik doğrulama + rol yönetimi (Administrator / Editor)
- 📝 10 modüllü tam CRUD yönetim paneli
- 🔌 8+ uçlu REST API (frontend tüketimi için)
- 🖼️ Güvenli görsel yükleme (gerçek MIME kontrolü, rastgele isim)
- ⚡ Framework yok — saf PHP + PDO, öğrenmesi ve bakımı kolay
- 🎨 Modern, responsive, editöryel tasarımlı React arayüzü
- 🛡️ SQL injection, XSS, CSRF korumaları

---

## Mimari

```
┌───────────────────────┐         ┌──────────────────────────┐        ┌──────────┐
│   FRONTEND (React)     │  HTTP   │     BACKEND (PHP)         │  PDO   │  MySQL   │
│  localhost:5173        │ ──────► │  localhost:8000           │ ─────► │          │
│                        │  fetch  │                           │        │          │
│  • Sayfalar / Router   │ ◄────── │  • /api/*  → JSON         │ ◄───── │  13 tablo│
│  • fetch('/api/...')   │  JSON   │  • /admin/* → Panel       │  satır │          │
└───────────────────────┘         └──────────────────────────┘        └──────────┘
        Ziyaretçi                        Yönetici (admin)
```

- **Frontend**, veriyi yalnızca API'den `fetch` ile alır — veritabanına doğrudan erişmez.
- **Backend**, MySQL'e sadece PDO **prepared statement** ile erişir.
- İki uygulama tamamen ayrı; birbirinden bağımsız geliştirilebilir ve dağıtılabilir.

---

## Teknoloji Yığını

**Backend**
- PHP 8.3 (framework yok, MVC-lite yapı)
- MySQL 8 + PDO (prepared statements)
- Laragon (yerel geliştirme ortamı)

**Frontend**
- React 18 + TypeScript
- Vite (build & dev server)
- TanStack Router (dosya tabanlı yönlendirme)
- Tailwind CSS + shadcn/ui bileşenleri

---

## Proje Yapısı

```
arks-website/
│
├── includes/              # BACKEND ÇEKİRDEK
│   ├── config.php         #   DB bilgileri (gitignore'da — config.sample.php'den kopyala)
│   ├── Database.php       #   PDO singleton bağlantı
│   ├── Model.php          #   Yeniden kullanılabilir CRUD temel sınıfı
│   ├── auth.php           #   Giriş / oturum / yetki
│   ├── upload.php         #   Güvenli görsel yükleme
│   ├── helpers.php        #   e() / csrf / slug / redirect
│   └── bootstrap.php      #   Hepsini yükler + session başlatır
│
├── models/                # 13 tablo modeli (Model'i genişletir)
│
├── admin/                 # YÖNETİM PANELİ (PHP)
│   ├── login.php          #   Giriş ekranı
│   ├── index.php          #   Dashboard
│   ├── news|projects|services|gallery|sliders|pages|categories|messages|settings|users/
│   └── partials/          #   Ortak header / sidebar / footer
│
├── api/                   # REST API (JSON uçları)
│   ├── news.php  projects.php  services.php  gallery.php
│   ├── sliders.php  pages.php  settings.php
│   └── contact.php        #   İletişim formu (POST)
│
├── uploads/               # Yüklenen görseller (gitignore'da)
├── arksyap__tech.sql      # Veritabanı şeması
│
└── frontend/              # FRONTEND (React + Vite)
    ├── src/
    │   ├── routes/         #   Sayfalar (index, projeler, haberler, iletisim, ...)
    │   ├── components/
    │   │   ├── site/       #   Header, Footer, PageShell, ServicePage
    │   │   └── ui/         #   shadcn/ui bileşenleri
    │   ├── integrations/
    │   │   └── api.ts      #   PHP API istemcisi (fetch wrapper)
    │   ├── lib/            #   Yardımcılar + statik veriler
    │   └── assets/         #   Görseller + ARKS logoları
    ├── package.json
    └── vite.config.ts
```

---

## Kurulum

### Gereksinimler
- [Laragon](https://laragon.org/) (PHP 8.3 + MySQL 8) — ya da eşdeğeri
- [Node.js](https://nodejs.org/) 18+ (frontend için)

### 1. Backend (PHP + MySQL)

```bash
# 1) Veritabanını oluştur ve şemayı içeri aktar
#    phpMyAdmin / HeidiSQL ile arksyap__tech.sql dosyasını import et
#    (veritabanı adı: arksyapıtech)

# 2) Yapılandırmayı hazırla
copy includes\config.sample.php includes\config.php
#    config.php içinde DB_NAME, DB_USER, DB_PASS değerlerini kendine göre düzenle

# 3) Sunucuyu başlat (proje kök dizininde)
php -S localhost:8000
```

Yönetim paneli: **http://localhost:8000/admin/login.php**

| | |
|---|---|
| Kullanıcı adı | `admin` |
| Şifre | `admin123` *(ilk girişten sonra değiştir)* |

> **Not:** `BASE_URL` otomatik algılanır — hangi adresten açarsan (localhost, Laragon `.test` vb.) ona göre ayarlanır.

#### (İsteğe bağlı) Örnek içerik yükleme
```bash
php seed_all.php        # örnek proje, haber, slider + site metinleri
php seed_services.php   # 5 hizmeti veritabanına ekler
```

### 2. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Site: **http://localhost:5173**

> Frontend, API'yi otomatik olarak `http://localhost:8000/api` üzerinden çağırır.
> İki sunucu da (PHP + Vite) aynı anda açık olmalıdır.

---

## Yönetim Paneli

Sol menüden yönetilen modüller — hepsi tam CRUD:

| Modül | Açıklama | Frontend'e yansır |
|---|---|:---:|
| **Dashboard** | Özet sayaçlar, son mesajlar | — |
| **Haberler** | Blog/haber yazıları + görsel + kategori | ✅ |
| **Projeler** | Portfolyo + kapak görseli + müşteri/konum | ✅ |
| **Kategoriler** | Haber & proje kategorileri | ✅ |
| **Hizmetler** | Hizmet sayfaları + açıklama + görsel | ✅ |
| **Galeri** | Görsel galerisi | ✅ |
| **Slider** | Ana sayfa hero slider'ı | ✅ |
| **Sayfalar** | Statik sayfalar (Hakkımızda vb.) + SEO | ✅ |
| **Mesajlar** | İletişim formu kutusu (okundu/okunmadı) | — |
| **Ayarlar** | Şirket bilgisi, logo, sosyal medya, iletişim | ✅ |
| **Kullanıcılar** | Yönetici/editör hesapları *(sadece admin)* | — |

---

## REST API

Tüm uçlar JSON döner. Frontend bunları `fetch` ile tüketir.

| Metod | Uç | Açıklama |
|---|---|---|
| `GET` | `/api/news.php` | Yayınlanmış haberler (`?slug=`, `?limit=`) |
| `GET` | `/api/projects.php` | Projeler (`?slug=` → görselleriyle) |
| `GET` | `/api/services.php` | Aktif hizmetler |
| `GET` | `/api/gallery.php` | Galeri görselleri |
| `GET` | `/api/sliders.php` | Aktif slider'lar |
| `GET` | `/api/pages.php` | Statik sayfalar (`?slug=`) |
| `GET` | `/api/settings.php` | Site ayarları (logo, iletişim, sosyal medya) |
| `POST` | `/api/contact.php` | İletişim formu gönderimi |

**Örnek yanıt** — `GET /api/news.php`
```json
{
  "data": [
    {
      "id": 1,
      "title": "Polyurea Sistemimizle 100.000 m² Barajı Aştık",
      "slug": "polyurea-100bin-m2",
      "summary": "Türkiye genelinde toplam uygulama alanımız...",
      "thumbnail_url": "http://localhost:8000/uploads/news/ab12cd.jpg",
      "published_at": "2024-07-01 10:00:00"
    }
  ],
  "count": 1
}
```

**Örnek istek** — `POST /api/contact.php`
```json
{ "fullname": "Ahmet Yılmaz", "email": "ahmet@ornek.com", "message": "Teklif almak istiyorum." }
```

---

## Veritabanı Şeması

3NF normalizasyon seviyesinde, **13 tablo**:

```
users ─┐                        news ──────► news_categories
       ├─► roles                projects ──► project_categories
       └─► news (author)        projects ──► project_images
                                services   gallery   sliders
                                pages      settings  contact_messages
```

Başlıca ilişkiler (yabancı anahtarlar):
- `users.role_id → roles.id`
- `news.category_id → news_categories.id` · `news.author_id → users.id`
- `projects.category_id → project_categories.id`
- `project_images.project_id → projects.id` *(ON DELETE CASCADE)*

Tüm tablolar `arksyap__tech.sql` içinde tanımlıdır.

---

## Güvenlik

| Tehdit | Önlem |
|---|---|
| **SQL Injection** | Her sorgu PDO prepared statement · `ATTR_EMULATE_PREPARES = false` |
| **XSS** | Çıktıda `htmlspecialchars` (`e()` yardımcısı) |
| **CSRF** | Tüm formlarda token doğrulaması (`csrf_field()` / `csrf_check()`) |
| **Oturum güvenliği** | `httponly` + `samesite` cookie · girişte `session_regenerate_id` |
| **Parola** | `password_hash` (bcrypt) · düz metin asla saklanmaz |
| **Dosya yükleme** | Gerçek MIME kontrolü · rastgele isim · boyut limiti · `uploads/`'ta PHP çalıştırma kapalı |
| **Doğrudan erişim** | `includes/` ve `models/` guard sabiti + `.htaccess` ile korunur |
| **Gizli bilgi** | `config.php` (DB şifresi) gitignore'da — repoya girmez |

---

## Sık Sorulanlar

**Frontend'de içerik gözükmüyor?**
İki sunucunun da açık olduğundan emin ol (`php -S localhost:8000` + `npm run dev`). Admin panelden içerik ekledikten sonra siteyi yenile.

**Admin paneldeki bir değişiklik siteye yansımadı?**
Sayfayı yenile (`Ctrl+F5`). Header/Footer ve iletişim bilgileri **Ayarlar** modülünden yönetilir.

**Şifre / DB bilgisini nereden değiştiririm?**
`includes/config.php` (bu dosya git'e dahil değildir; örneği `config.sample.php`).

---

<div align="center">

**ARKS Yapı Teknolojileri** · Endüstriyel Yalıtım · Kaplama Sistemleri

Eğitim / portföy amaçlı geliştirilmiştir.

</div>
