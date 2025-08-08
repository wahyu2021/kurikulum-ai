'use client';

import { ParticleLoader } from "@/lib/particle-loader";
import { useEffect } from "react";

export default function ParticleLoaderComponent() {
  useEffect(() => {
    const handle = requestIdleCallback(() => {
      const loaderElement = document.getElementById('loader');
      const canvasElement = document.getElementById('particle-canvas') as HTMLCanvasElement;

      if (loaderElement && canvasElement) {
        if (canvasElement.getContext('2d')) {
          const particleLoader = new ParticleLoader('particle-canvas');
          particleLoader.start();

          setTimeout(() => {
            loaderElement.classList.add('hidden');
            setTimeout(() => particleLoader.stop(), 1500); 
          }, 2500);
        }
      }
    });

    return () => cancelIdleCallback(handle);
  }, []);

  return null;
}