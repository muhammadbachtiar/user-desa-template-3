"use client"

import HeroSection from "@/components/section/hero";
import AppSection from "@/components/section/app";
import ProfileSection from "@/components/section/profile";
import ArticleSection from "@/components/section/article";
import Tour from "@/components/section/tour";
import Infografis from "@/components/section/infografis";
import DynamicInstagramFeed from "@/components/instagram/DynamicInstagramFeed";
import useFeatureFlags, { type SectionKey } from "@/hooks/settings/useFeatureFlags";

const SECTION_COMPONENTS: Record<SectionKey, React.ComponentType> = {
  dynamic_section: ProfileSection,
  service: AppSection,
  news: ArticleSection,
  instagram: DynamicInstagramFeed,
  infografis: Infografis,
  tour: Tour,
};

export default function Home() {
  const { sectionsOrder } = useFeatureFlags();

  const enabledSections = sectionsOrder.filter((s) => s.enabled);

  return (
    <>
      <HeroSection />
      <div className="flex w-full border-gray-200 justify-center items-center pb-8">
        <div className="w-full px-6 sm:px-0 max-w-lg md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl flex flex-col gap-[56px] row-start-2 items-center sm:items-start">
          {enabledSections.map((section) => {
            const Component = SECTION_COMPONENTS[section.key];
            return Component ? <Component key={section.key} /> : null;
          })}
        </div>
      </div>
    </>
  );
}

