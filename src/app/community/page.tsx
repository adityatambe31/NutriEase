'use client';

import type { ContentItem, ContentType } from '@/types/community-types';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, ClipboardList, Heart, Plus, Users } from 'lucide-react';

import { ArticleCard } from './components/ArticleCard';
import { ExperienceCard } from './components/ExperienceCard';
import { SurveyCard } from './components/SurveyCard';
import { TestimonyCard } from './components/TestimonyCard';
import {
  FILTER_ORDER,
  useCommunityContent,
} from './hooks/use-community-content';

const filterIcons = {
  articles: BookOpen,
  testimonies: Users,
  surveys: ClipboardList,
  experiences: Heart,
} as const;

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

function renderContentItem(
  type: keyof ContentType,
  item: ContentItem,
): React.ReactElement {
  switch (type) {
    case 'articles':
      if ('summary' in item && 'readTime' in item) {
        return <ArticleCard {...item} />;
      }
      break;

    case 'experiences':
      if ('content' in item && 'tags' in item) {
        return (
          <ExperienceCard
            title={item.title}
            content={item.content}
            author={{
              name: item.author.name,
              image: item.author.image,
              role: item.author.role,
            }}
            date={item.date}
            likes={item.likes}
            comments={item.comments}
            tags={item.tags}
          />
        );
      }
      break;

    case 'testimonies':
      if ('story' in item && 'authorImage' in item) {
        return <TestimonyCard {...item} />;
      }
      break;

    case 'surveys':
      if ('questions' in item && 'estimatedTime' in item) {
        return <SurveyCard {...item} />;
      }
      break;

    default:
      throw new Error(`Unknown content type: ${type}`);
  }

  throw new Error(`Invalid item structure for type: ${type}`);
}

export default function CommunityPage() {
  const { activeFilter, setFilter, filteredContent } = useCommunityContent();

  return (
    <div className="bg-gradient-to-b from-purple-50 to-purple-200 dark:from-gray-900 dark:to-purple-950 min-h-screen">
      <div className="relative container mx-auto px-4 sm:px-6 py-12">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl mb-16 shadow-xl">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0 bg-cover bg-center bg-[url(/community-img.jpg)] bg-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-purple-800/60" />
          <div className="relative text-center py-16 px-6">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Community Hub
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-100 text-lg max-w-2xl mx-auto"
            >
              Join our community of food enthusiasts and share your journey
              towards better health
            </motion.p>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-12">
          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto group px-6 py-3 bg-purple-600 hover:bg-purple-700 
                    text-white font-medium rounded-xl flex items-center justify-center gap-2
                    shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Share Your Story
            </motion.button>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {FILTER_ORDER.map((filter) => {
                const Icon = filterIcons[filter];
                return (
                  <motion.button
                    key={filter}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter(filter)}
                    className={`
                    px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300
                    ${
                      activeFilter === filter
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                    }
                  `}
                  >
                    <Icon className="w-4 h-4" />
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Content Grid */}
          <motion.div
            layout
            className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {Object.entries(filteredContent).map(([type, items]) => {
                if (!items) return null;
                return items.map((item: ContentItem, index: number) => (
                  <motion.div
                    key={`${type}-${index}`}
                    variants={contentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    layout
                    transition={{
                      duration: 0.2,
                      ease: 'easeOut',
                      staggerChildren: 0.1,
                      layoutId: `${type}-${index}`,
                    }}
                    className="h-full"
                  >
                    {renderContentItem(
                      type as keyof ContentType,
                      item as ContentItem,
                    )}
                  </motion.div>
                ));
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
