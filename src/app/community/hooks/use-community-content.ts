import { useState } from 'react';
import { communityData } from '../../../config/community-data';


export const FILTER_ORDER = ['articles', 'experiences', 'testimonies', 'surveys'] as const;
type FilterType = typeof FILTER_ORDER[number];

export function useCommunityContent() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('articles');

  const filteredContent = {
    articles: activeFilter === 'articles' ? communityData.articles : undefined,
    experiences: activeFilter === 'experiences' ? communityData.experiences : undefined,
    testimonies: activeFilter === 'testimonies' ? communityData.testimonies : undefined,
    surveys: activeFilter === 'surveys' ? communityData.surveys : undefined,
  };

  return {
    activeFilter,
    setFilter: setActiveFilter,
    filteredContent,
  };
}