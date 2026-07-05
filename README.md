# GoPPOB

Static PPOB website untuk domain `goppob.com`.

Project ini tetap memakai Next.js hanya sebagai build tool lokal. Hasil deploy untuk Hostinger adalah HTML, CSS, JS, dan asset statis di folder `out/`.

## Jalankan Lokal

```bash
npm install
npm run dev
```

## Build Static Untuk Hostinger

```bash
npm run build
```

Upload seluruh isi folder:

```text
C:\goppob\out
```

ke `public_html` di Hostinger.

## Route Utama

- `/` homepage.
- `/checkout` checkout sandbox static.
- `/dashboard` dashboard user static.
- `/admin/login` login admin static.
- `/admin` admin CMS static.
- `/pulsa`, `/data`, `/pln`, `/bills`, `/e-wallet`, `/games`.

Catatan: karena hosting static tidak menjalankan backend Node.js, endpoint `/api/*`, database, dan autentikasi server sudah tidak dipakai.
