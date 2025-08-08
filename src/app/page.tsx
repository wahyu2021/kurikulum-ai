'use client';

import { RoadmapResult } from "@/components/RoadmapResult";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { Sparkles } from "lucide-react";
import { useRoadmapGenerator } from "@/hooks/useRoadmapGenerator";
import { motion } from "framer-motion";
import { InteractiveBackground } from "@/components/InteractiveBackground";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ParticleLoader = dynamic(
  () => import('@/components/ParticleLoaderComponent'),
  { 
    ssr: false,
    loading: () => null,
  } 
);

export default function HomePage() {
  const { roadmapData, isLoading, error, generateRoadmap } = useRoadmapGenerator();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const topic = formData.get("topic") as string;
    const level = formData.get("level") as string;
    generateRoadmap(topic, level);
  };

  return (
    <div className="relative min-h-screen font-sans text-white bg-slate-900 overflow-x-hidden">
      <Suspense fallback={null}>
        <ParticleLoader />
      </Suspense>

      <InteractiveBackground />

      <div className="relative z-10">
        <header className="pt-8 pb-4 text-center md:pt-12 md:pb-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400"
          >
            Kurikulum AI 🧠
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-2 text-lg text-slate-400"
          >
            Biarkan AI membuatkan jalur belajarmu!
          </motion.p>
        </header>

        <main className="max-w-2xl px-4 pb-12 mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 border rounded-2xl shadow-lg bg-slate-800/30 border-slate-700 backdrop-blur-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="topic" className="block mb-1 text-sm font-medium text-slate-300">
                  Topik Pembelajaran
                </label>
                <input
                  id="topic"
                  name="topic"
                  type="text"
                  placeholder="Contoh: Fisika Kuantum untuk Pemula"
                  required
                  className="w-full p-2.5 transition bg-slate-700/50 border border-slate-600 rounded-md text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="level" className="block mb-1 text-sm font-medium text-slate-300">
                  Level Keahlian
                </label>
                <select
                  id="level"
                  name="level"
                  defaultValue="Pemula"
                  className="w-full p-2.5 transition bg-slate-700/50 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option>Pemula</option>
                  <option>Menengah</option>
                  <option>Mahir</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md transition-all duration-300 disabled:bg-slate-500 disabled:cursor-not-allowed overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  {isLoading ? "Sedang Berpikir..." : <><Sparkles size={18} className="mr-2" /> Buat Roadmap Saya</>}
                </span>
                <span className="absolute inset-0 z-0 bg-[linear-gradient(110deg,#a285ff,45%,#5777ff,55%,#a285ff)] bg-[length:200%_100%] animate-shimmer"></span>
              </button>
            </form>
          </motion.div>

          {isLoading && <SkeletonLoader />}
          {error && <p className="mt-8 text-center text-red-400">{error}</p>}
          {roadmapData && <RoadmapResult data={roadmapData} />}
        </main>
      </div>
    </div>
  );
}