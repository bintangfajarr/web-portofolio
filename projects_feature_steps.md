# Rencana Implementasi Fitur Galeri Gambar & Detail Modal Proyek

Dokumen ini menjelaskan langkah-langkah untuk menambahkan fitur banyak gambar (`image_urls` array) pada proyek, menampilkan modal detail interaktif dengan slideshow, serta menyederhanakan menu navigasi Navbar.

## Langkah 1: Update Database Schema & Seed Data
1. **Database Schema**: Di Supabase SQL Editor, jalankan perintah untuk mengganti field `image_url` menjadi array of text `image_urls text[]`:
   ```sql
   alter table projects drop column if exists image_url;
   alter table projects add column image_urls text[];
   ```
2. **Update Seed Data (`lib/data.ts`)**: Konfigurasikan setiap proyek agar memiliki array `image_urls` berisi beberapa URL gambar berkualitas (misal dari Unsplash).
3. **Update Seed Script (`lib/seed.ts`)**: Skrip seeding sudah aman karena data type projects otomatis dicasting sebagai `any` saat insert ke Supabase.

## Langkah 2: Update Menu Navigasi Navbar (`components/Navbar.tsx`)
1. Sederhanakan daftar navigasi di Navbar menjadi hanya dua menu utama:
   - **About Me** (merujuk ke `/`)
   - **Projects** (merujuk ke `/projects`)

## Langkah 3: Update Modal Admin (`components/AdminModal.tsx`) & Form Config (`app/projects/page.tsx`)
1. Di `app/projects/page.tsx`, ubah konfigurasi field `image_urls` pada `projectFields` menjadi bertipe `"array"` agar form Admin mendukung pengisian multi-line URL gambar (satu URL per baris).
   ```typescript
   { key: "image_urls", label: "Image URLs (One per line)", type: "array" }
   ```

## Langkah 4: Desain Detail Modal Proyek dengan Fitur Slideshow
1. Di dalam Detail Modal (`app/projects/page.tsx`):
   - Tambahkan state `activeImageIndex` (dan reset ke `0` setiap kali proyek dipilih).
   - Tampilkan gambar aktif menggunakan index tersebut.
   - Tambahkan tombol panah navigasi **Kiri** dan **Kanan** (hanya muncul jika gambar > 1) untuk memutar slide gambar.
   - Tambahkan indikator titik-titik (Dots Indicator) di bagian bawah gambar yang merepresentasikan slide aktif.
2. Hubungkan event handler klik pada `ProjectCard` untuk membuka modal ini. Gunakan `e.stopPropagation()` pada tombol edit, delete, dan link GitHub/Demo.
