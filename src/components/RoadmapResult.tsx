import { motion } from "framer-motion";
import { BookOpen, CheckCircle2 } from "lucide-react";

interface RoadmapModule {
  moduleTitle: string;
  objective: string;
  topics: string[];
}
interface RoadmapData {
  roadmapTitle: string;
  description: string;
  modules: RoadmapModule[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export function RoadmapResult({ data }: { data: RoadmapData }) {
  return (
    <motion.section
      className="mt-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        variants={itemVariants}
        className="text-center p-6 mb-8 bg-slate-800/30 border border-slate-700 rounded-xl"
      >
        <h2 className="text-3xl font-bold">{data.roadmapTitle}</h2>
        <p className="text-slate-300 mt-2">{data.description}</p>
      </motion.div>
      <div className="space-y-6">
        {data.modules.map((module, index) => (
          <motion.div
            key={index}
            className="bg-slate-800/30 p-6 rounded-xl border border-slate-700 transition-colors hover:bg-slate-700/50 hover:border-slate-600"
            variants={itemVariants}
          >
            <div className="flex items-start">
              <div className="bg-indigo-600/20 p-2 rounded-lg mr-4">
                <BookOpen size={24} className="text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-400">
                  {module.moduleTitle}
                </h3>
                <p className="text-sm text-slate-400 mt-1">{module.objective}</p>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-slate-300 pl-4">
              {module.topics.map((topic, topicIndex) => (
                <li key={topicIndex} className="flex items-start">
                  <CheckCircle2 size={18} className="text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}