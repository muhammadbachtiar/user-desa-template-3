'use client'

import { useState, useEffect } from 'react';
import RichTextContent from '../shared/RichTextContent';
import Refetch from '../shared/refetch';
import { useDynamicSections } from '@/hooks/settings/useDynamicSections';

export default function Profile() {
  const { sections, isLoading, isError, refetch } = useDynamicSections();
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    if (sections.length > 0 && !activeTab) {
      setActiveTab(sections[0].config.id);
    }
  }, [sections, activeTab]);

  // Loading skeleton
  if (isLoading) {
    return (
      <section className="relative w-full">
        <div className="animate-pulse">
          {/* Tab skeleton */}
          <div className="flex justify-center mb-6">
            <div className="flex gap-3 bg-gray-100 rounded-full p-2">
              <div className="h-10 w-28 bg-gray-300 rounded-full"></div>
              <div className="h-10 w-24 bg-gray-200 rounded-full"></div>
            </div>
          </div>
          {/* Content skeleton */}
          <div className="bg-gray-50 rounded-2xl min-h-[400px] p-8">
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-4 w-full bg-gray-200 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
              <div className="h-32 w-full bg-gray-100 rounded-lg mt-6"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (isError) {
    return (
      <section className="relative w-full">
        <div className="flex min-h-[400px] justify-center items-center">
          <Refetch refetch={refetch} />
        </div>
      </section>
    );
  }

  // No sections available
  if (sections.length === 0) {
    return null;
  }

  const activeSection = sections.find((s) => s.config.id === activeTab) || sections[0];

  return (
    <section className="relative w-full">
      {/* Responsive Tab Bar */}
      <div className="flex justify-center mb-6">
        <div
          className="flex gap-2 bg-gray-100 dark:bg-gray-700 rounded-full p-1.5 overflow-x-auto max-w-full"
          style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {sections.map((section) => (
            <button
              key={section.config.id}
              onClick={() => setActiveTab(section.config.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                activeTab === section.config.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {section.config.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content Canvas */}
      <div
        className=" min-h-[400px] border-gray-100"
        style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="">
          <RichTextContent
            content={activeSection?.content || ''}
            className="max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
