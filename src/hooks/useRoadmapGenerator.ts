import { useState } from "react";
import axios from "axios";

export interface RoadmapData {
  roadmapTitle: string;
  description: string;
  modules: {
    moduleTitle: string;
    objective: string;
    topics: string[];
  }[];
}

export function useRoadmapGenerator() {
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateRoadmap = async (topic: string, level: string) => {
    setIsLoading(true);
    setError(null);
    setRoadmapData(null);

    try {
      const response = await axios.post("/api/generate", {
        topic,
        level,
      });
      setRoadmapData(response.data);
    } catch (err) {
      setError("Gagal membuat roadmap. Server mungkin sibuk, silakan coba lagi.");
      console.error("[Error]: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { roadmapData, isLoading, error, generateRoadmap };
}