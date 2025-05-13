'use client';

import React from 'react';
import { Droplets } from 'lucide-react';

interface TopicIntroductionProps {
  title: string;
  content: string;
  icon?: React.ReactNode;
}

export function TopicIntroduction({ title, content, icon }: TopicIntroductionProps) {
  return (
    <div className="bg-gradient-to-r from-white to-blue-50 p-8 rounded-xl border border-[#E0E0E0] shadow-sm mb-8">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4 bg-[#4A96D1]/10 p-3 rounded-full">
          {icon || <Droplets className="h-6 w-6 text-[#4A96D1]" />}
        </div>
        <div>
          <h3 className="text-2xl text-[#4A96D1] mb-4 font-semibold">{title}</h3>
          <p className="text-gray-700 leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
} 