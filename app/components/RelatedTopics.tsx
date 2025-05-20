import Link from "next/link";
import { Topic } from "../data/topics";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface RelatedTopicsProps {
  currentTopic: Topic;
  allTopics: Topic[];
}

export default function RelatedTopics({ currentTopic, allTopics }: RelatedTopicsProps) {
  // Filtra 3 tópicos relacionados, excluindo o atual
  const relatedTopics = allTopics
    .filter(topic => topic.id !== currentTopic.id)
    .slice(0, 3);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-16 pt-10 border-t border-gray-200"
    >
      <h3 className="text-2xl font-semibold bg-gradient-to-r from-[#4A96D1] to-[#6EC1E4] bg-clip-text text-transparent mb-8">Temas Relacionados</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedTopics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
          >
            <Link 
              href={`/temas/${topic.id}`}
              className="block h-full bg-gradient-to-br from-white to-[#F8FBFF] p-6 rounded-xl border border-[#E0E0E0]/50 shadow-md hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#F0F9FF] rounded-xl group-hover:bg-[#E6F3FF] transition-colors">
                  {topic.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-lg text-[#333333] mb-2 group-hover:text-[#4A96D1] transition-colors">{topic.title}</h4>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{topic.description}</p>
                  <div className="flex justify-end">
                    <span className="inline-flex items-center text-sm font-medium text-[#4A96D1] group-hover:translate-x-1 transition-transform">
                      Ver tema <ChevronRight className="h-4 w-4 ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 