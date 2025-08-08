# Kurikulum AI 🧠

 **Kurikulum AI** adalah sebuah aplikasi web cerdas yang dirancang untuk membuat *roadmap* atau kurikulum belajar yang dipersonalisasi menggunakan kekuatan Google Generative AI. Cukup masukkan topik yang ingin Anda pelajari dan level keahlian Anda saat ini, dan biarkan AI menyusun jalur belajar yang terstruktur untuk Anda.

**[Lihat Demo Langsung](https://www.google.com/search?q=https://kurikulum-ai-vercel.app/)** ---

## \#\# Deskripsi Proyek

Aplikasi ini dibangun untuk mengatasi tantangan umum yang dihadapi para pembelajar: "Dari mana saya harus mulai?". Dengan banyaknya sumber daya yang tersedia di internet, seringkali sulit untuk menemukan jalur belajar yang terstruktur. Kurikulum AI memecahkan masalah ini dengan menyediakan *roadmap* yang jelas dan logis, lengkap dengan modul, tujuan, dan topik-topik spesifik yang perlu dipelajari, semuanya dihasilkan dalam hitungan detik.

Proyek ini dibangun menggunakan tumpukan teknologi modern dengan **Next.js App Router** untuk *frontend* dan **Vercel Serverless Functions** untuk *backend*, menjadikannya aplikasi yang cepat, aman, dan dapat diandalkan.

## \#\# Fitur Utama

  * **✨ Generasi Roadmap Cerdas**: Buat kurikulum belajar yang detail untuk topik apa pun, dari "Fisika Kuantum" hingga "Belajar Memasak".
  * **👤 Personalisasi Level**: Sesuaikan *roadmap* berdasarkan level keahlian Anda saat ini: Pemula, Menengah, atau Mahir.
  * **🚀 Cepat & Responsif**: Antarmuka yang dibangun dengan React dan Framer Motion memberikan pengalaman pengguna yang mulus dan modern.
  * **🔒 Aman**: Dilengkapi dengan validasi input di sisi server dan *rate limiting* untuk mencegah penyalahgunaan.
  * **🎨 Latar Belakang Interaktif**: Latar belakang yang merespons gerakan *mouse* untuk pengalaman visual yang lebih menarik.

-----

## \#\# Teknologi yang Digunakan

  * **Frontend**:

      * [Next.js](https://nextjs.org/) (React Framework)
      * [TypeScript](https://www.typescriptlang.org/)
      * [Tailwind CSS](https://tailwindcss.com/)
      * [Framer Motion](https://www.framer.com/motion/) (untuk animasi)
      * [Axios](https://axios-http.com/) (untuk permintaan HTTP)
      * [Lucide React](https://lucide.dev/) (untuk ikon)

  * **Backend**:

      * [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) (dijalankan di Vercel Serverless Functions)
      * [Google Generative AI (Gemini)](https://ai.google.dev/)
      * [Zod](https://zod.dev/) (untuk validasi skema)

  * **Keamanan & Infrastruktur**:

      * [Vercel](https://vercel.com/) (untuk hosting dan deployment)
      * [Upstash Redis](https://upstash.com/) (untuk *rate limiting*)

-----

## \#\# Instalasi dan Setup Lokal

Untuk menjalankan proyek ini di mesin lokal Anda, ikuti langkah-langkah berikut:

#### **1. Kloning Repository**

```bash
git clone https://github.com/wahyu2021/kurikulum-ai.git
cd kurikulum-ai
```

#### **2. Instal Dependensi**

Proyek ini menggunakan `npm`. Jalankan perintah berikut di *root* direktori:

```bash
npm install
```

#### **3. Konfigurasi Variabel Lingkungan**

Buat file bernama `.env.local` di direktori utama proyek dan salin konten dari `.env.example` (jika ada) atau isi dengan variabel berikut:

```
# .env.local

# Kunci API dari Google AI Studio (Gemini)
GEMINI_API_KEY="AIzaxxxxxxxxxxxxxxxxxxxxxxxx"
MODEL_NAME="gemini-1.5-flash"

# Variabel dari Upstash Redis untuk Rate Limiting
UPSTASH_REDIS_REST_URL="https://your-database-url.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-database-token"
```

  * **`GEMINI_API_KEY`**: Dapatkan kunci API Anda dari [Google AI Studio](https://aistudio.google.com/app/apikey).
  * **`UPSTASH_...`**: Dapatkan URL dan Token setelah membuat *database* Redis gratis di [Upstash](https://upstash.com/).

#### **4. Jalankan Server Pengembangan**

```bash
npm run dev
```

Buka [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) di *browser* Anda untuk melihat aplikasi berjalan.

-----

## \#\# Struktur Proyek

```
kurikulum-ai/
├── .env.local             # Variabel lingkungan (rahasia)
├── next.config.mjs        # Konfigurasi Next.js
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── generate/
│   │   │       └── route.ts # Logika backend API
│   │   ├── layout.tsx       # Layout utama aplikasi
│   │   └── page.tsx         # Halaman utama (frontend)
│   ├── components/          # Komponen-komponen React
│   ├── hooks/               # Custom hooks (misal: useRoadmapGenerator)
│   └── lib/                 # Library/helper (misal: particle-loader.ts)
└── ...
```

-----

## \#\# Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT. Lihat file `LICENSE` untuk detail lebih lanjut.