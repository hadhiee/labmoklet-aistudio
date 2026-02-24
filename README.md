<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/a82ee11b-c949-47d9-a08e-56b57c23661a

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. (Optional) Set `NEXT_PUBLIC_NEWS_API_KEY` untuk berita teknologi real-time dari [NewsAPI.org](https://newsapi.org/)
4. Run the app:
   `npm run dev`

## Struktur Aplikasi

- **Homescreen Publik (`/`)**: Halaman landing tanpa login, menampilkan status lab dan berita teknologi terkini (auto-update 30 menit)
- **Portal Siswa (`/portal`)**: Dashboard booking lab khusus siswa terautentikasi
- **Dashboard Operator (`/operator`)**: Kelola jadwal dan persetujuan peminjaman
- **Dashboard Admin (`/admin`)**: Manajemen, SNP compliance, dan analytics

## Login Demo (Role-based)

Aplikasi sekarang memiliki **homescreen publik** di `/` yang dapat diakses tanpa login. Untuk mengakses fitur authenticated:

1. Klik tombol **"Login Demo"** atau **"Login Google SSO"** (placeholder, redirect ke `/login`)
2. Pilih role dan isi kredensial demo

### Flow Login/Logout

- **Logout** → Kembali ke homescreen publik (`/`)
- **Login Siswa** → Portal Siswa (`/portal`)
- **Login Operator** → Dashboard Operator (`/operator`)
- **Login Admin** → Dashboard Admin (`/admin`)

Session disimpan di cookie untuk kebutuhan demo UI/UX.

### Akun Dummy

- Siswa: `siswa@smktelkom-mlg.sch.id` / `siswa123`
- Operator: `operator@smktelkom-mlg.sch.id` / `operator123`
- Admin: `admin@smktelkom-mlg.sch.id` / `admin123`

## Fitur Homescreen Publik

- **Real-time Lab Status**: Daftar laboratorium dengan status ketersediaan (Available/In Use/Maintenance)
- **Lab Statistics**: Total lab, kapasitas, dan ketersediaan real-time
- **Tech News**: Berita teknologi terkini dari NewsAPI.org (auto-update 30 menit)
  - Fallback ke mock data jika API key tidak diset
  - Client-side caching untuk performa optimal
- **Google SSO Placeholder**: Tombol untuk integrasi autentikasi Google (TODO: implement NextAuth.js)
- **Responsive Design**: Mobile-friendly layout dengan Tailwind CSS
- **Public Access**: Tidak perlu login untuk melihat informasi lab dan berita

## Tech Stack

- **Framework**: Next.js 15.5 (App Router)
- **Styling**: Tailwind CSS 4.1
- **Icons**: Lucide React
- **Charts**: Recharts (untuk dashboard admin)
- **Authentication**: Cookie-based session (mock), persiapan untuk NextAuth.js
- **API**: Route handlers dengan ISR (Incremental Static Regeneration)
- **TypeScript**: Full type safety
