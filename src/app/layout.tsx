import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
            <body className={inter.className}>
                <div id="loader">
                    <canvas id="particle-canvas"></canvas>
                    <div className="loader-text">Booting AI Core...</div>
                </div>
                {children}
            </body>
        </html>
    );
}
