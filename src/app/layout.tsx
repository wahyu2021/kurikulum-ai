import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kurikulum AI",
  description: "Biarkan AI membuatkan jalur belajarmu!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div id="loader">
          <canvas id="particle-canvas"></canvas>
          <div className="loader-text">Booting AI Core...</div>
        </div>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}