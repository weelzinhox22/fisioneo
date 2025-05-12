import Link from "next/link";
import { Topic } from "../data/topics";

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
    <div className="mt-12 pt-8 border-t border-gray-200">
      <h3 className="text-xl font-semibold text-[#4A96D1] mb-6">Temas Relacionados</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {relatedTopics.map((topic) => (
          <Link 
            href={`/temas/${topic.id}`} 
            key={topic.id}
            className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-[#F0F9FF] rounded-md">
                {topic.icon}
              </div>
              <div>
                <h4 className="font-medium text-[#333333]">{topic.title}</h4>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{topic.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 