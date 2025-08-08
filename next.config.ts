import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*', // Terapkan ke semua route
        headers: [
          // Mencegah website Anda ditampilkan di dalam <iframe> di situs lain (Clickjacking)
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // Mencegah browser menebak tipe konten, melindungi dari serangan XSS
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Mengontrol informasi apa yang dikirim saat navigasi ke situs lain
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // Mencegah browser membuka file HTML sebagai unduhan
          {
            key: 'X-Download-Options',
            value: 'noopen',
          },
          // Mengaktifkan filter XSS bawaan di browser lama
          {
             key: 'X-XSS-Protection',
             value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;