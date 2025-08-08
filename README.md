Berikut adalah versi **README.md** yang sudah diperindah dan diformat secara profesional untuk proyek **Kurikulum AI**:

---

````markdown
# 🌟 Kurikulum AI — Rancang Jalur Belajar Pintar dengan Gemini

**Kurikulum AI** adalah aplikasi web cerdas yang membantu Anda membangun *roadmap* atau kurikulum belajar yang **dipersonalisasi** secara instan, berkat kekuatan **Google Generative AI (Gemini)**.  
Cukup masukkan topik yang ingin dipelajari dan tingkat keahlian Anda — aplikasi akan menyusun jalur belajar yang **terstruktur, efisien, dan sesuai kebutuhan** Anda.

🔗 **[Lihat Demo Langsung](https://kurikulum-ai.vercel.app/)**

---

## 📌 Deskripsi Proyek

Di tengah banyaknya sumber belajar online, seringkali kita kebingungan untuk memulai. **Kurikulum AI hadir sebagai solusi**, menyediakan roadmap yang jelas dan terorganisir, lengkap dengan:

- Modul belajar
- Tujuan pembelajaran
- Daftar topik yang sistematis

Semuanya dibuat otomatis hanya dalam beberapa detik.  
Aplikasi ini dibangun dengan **Next.js App Router** di frontend dan **Vercel Serverless Functions** di backend, menjadikannya ringan, cepat, dan aman.

---

## 🚀 Fitur Unggulan

- ✨ **Roadmap Belajar Otomatis** — Buat kurikulum lengkap hanya dengan satu klik
- 👤 **Personalisasi Berdasarkan Level** — Sesuaikan kurikulum dengan level: *Pemula*, *Menengah*, atau *Mahir*
- ⚡ **Cepat & Responsif** — Didukung React & Framer Motion untuk UI modern dan interaktif
- 🔒 **Keamanan Terjamin** — Validasi input & rate limiting dari Upstash Redis
- 🎨 **Latar Interaktif** — Latar belakang dinamis yang mengikuti gerakan mouse pengguna

---

## 🧰 Teknologi yang Digunakan

### 🔹 Frontend

- [Next.js (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Axios](https://axios-http.com/)
- [Lucide React](https://lucide.dev/)

### 🔸 Backend

- [Next.js API Routes (Route Handlers)](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Google Generative AI (Gemini)](https://ai.google.dev/)
- [Zod](https://zod.dev/) untuk validasi input

### ☁️ Infrastruktur & Keamanan

- [Vercel](https://vercel.com/) untuk deployment serverless
- [Upstash Redis](https://upstash.com/) untuk rate limiting berbasis token

---

## 🛠️ Instalasi & Setup Lokal

Ikuti langkah-langkah berikut untuk menjalankan proyek di komputer lokal Anda:

### 1. Kloning Repository

```bash
git clone https://github.com/wahyu2021/kurikulum-ai.git
cd kurikulum-ai
````

### 2. Install Dependensi

```bash
npm install
```

### 3. Konfigurasi Variabel Lingkungan

Buat file `.env.local` dan isi seperti berikut:

```env
# .env.local

# API Key dari Google AI Studio
GEMINI_API_KEY=your_gemini_api_key
MODEL_NAME=gemini-1.5-flash

# Upstash Redis untuk Rate Limiting
UPSTASH_REDIS_REST_URL=https://your-database-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-database-token
```

* 🔑 Dapatkan `GEMINI_API_KEY` dari [Google AI Studio](https://aistudio.google.com/app/apikey)
* 🔐 Dapatkan kredensial Upstash di [Upstash.com](https://upstash.com/)

### 4. Jalankan Server Lokal

```bash
npm run dev
```

Akses aplikasi di browser melalui: [http://localhost:3000](http://localhost:3000)

---

## 📁 Struktur Proyek

```
kurikulum-ai/
├── .env.local             # Variabel lingkungan (jangan disebar)
├── next.config.mjs        # Konfigurasi Next.js
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── generate/
│   │   │       └── route.ts     # Backend API (Serverless)
│   │   ├── layout.tsx           # Layout global aplikasi
│   │   └── page.tsx             # Halaman utama
│   ├── components/              # Komponen UI
│   ├── hooks/                   # Custom hooks (misal: useRoadmapGenerator)
│   └── lib/                     # Utilitas/helper (misal: particle-loader.ts)
└── ...
```

---

## 📄 Lisensi

Proyek ini menggunakan **Lisensi MIT** — silakan lihat file [`LICENSE`](./LICENSE) untuk informasi selengkapnya.

---

## 📬 Kontak

Dibuat dengan ❤️ oleh [Wahyu Wahid Nugroho](https://github.com/wahyu2021)
Untuk pertanyaan atau kolaborasi, hubungi via GitHub atau email di profil saya.

```