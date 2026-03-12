# Deployment Guide

Aplikasi ini sudah siap untuk di-deploy ke berbagai platform: **Lokal (Docker)**, **Huggingface Spaces**, **Netlify**, maupun **GitHub Pages**.

## 1. Menjalankan via Docker (Lokal)
Aplikasi ini sudah dilengkapi dengan `Dockerfile` dan konfigurasi `nginx.conf`.
**Langkah-langkah:**
1. Buka terminal, masuk ke folder project ini.
2. Build image Docker:
   ```bash
   docker build -t judol_game_simulator .
   ```
3. Jalankan container:
   ```bash
   docker run -p 8080:8080 judol_game_simulator
   ```
4. Buka browser: `http://localhost:8080`

## 2. Deploy ke Netlify
Netlify sangat ideal untuk aplikasi React (Vite).
**Langkah-langkah:**
1. Login ke [Netlify](https://app.netlify.com/).
2. Buat site baru: **Add new site** -> **Import from an existing project** (hubungkan ke repository GitHub Anda).
3. Setelah repository terhubung, atur build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Klik **Deploy Site**. Dalam hitungan detik, aplikasi game anti-judol Anda akan online.

## 3. Deploy ke Huggingface Spaces
Huggingface Spaces mendukung Docker untuk web app.
**Langkah-langkah:**
1. Login ke [Huggingface](https://huggingface.co/).
2. Buat Space baru (klik foto profil -> **New Space**).
3. Isi kolom:
   - **Space name**: (misal: `anti-judol-simulator`)
   - **License**: bebas pilih
   - **Select the Space SDK**: Pilih **Docker** (Blank).
   - **Space hardware**: Free.
4. Klik **Create Space**.
5. Clone repository space Anda, lalu unggah semua file dalam folder ini (termasuk `Dockerfile` dan `nginx.conf`) ke repository Huggingface tersebut, commit, dan push.
6. Huggingface otomatis akan mem-build dan menjalankan `Dockerfile` yang telah diset di port `8080`.

## 4. Deploy ke GitHub Pages
Jika ingin menggunakan GitHub Pages (gratis):
1. Buka file `vite.config.js`. Tambahkan property `base` dengan nama repo Anda, misal:
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/nama-repo-Anda/'
   })
   ```
2. Jalankan build di lokal: `npm run build`
3. Push file di dalam folder `dist` ke branch `gh-pages` pada repository GitHub Anda.
   *(Sangat disarankan menggunakan GitHub Actions `gh-pages` library untuk proses ini otomatis).*
