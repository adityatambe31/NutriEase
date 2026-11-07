"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { BaseCard } from './BaseCard';
import { Modal } from './Modal';

interface ExperienceCardProps {
  author: {
    name: string;
    image?: string;
    role?: string;
  };
  title: string;
  content: string;
  date: string;
  likes: number;
  comments: number;
  tags?: string[];
}

export function ExperienceCard({
  author,
  title,
  content,
  date,
  likes,
  comments,
  tags = []
}: ExperienceCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsModalOpen(true)} className="cursor-pointer h-full">
        <BaseCard>
          <div className="flex flex-col h-full">
            {/* Header - Fixed height */}
            <div className="flex items-center gap-4 h-12 mb-4">
              <div className="relative h-12 w-12 flex-shrink-0 rounded-full overflow-hidden border-2 border-green-100 dark:border-green-800">
                {author.image ? (
                  <Image
                    src={author.image}
                    alt={author.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-green-100 dark:bg-green-800 flex items-center justify-center text-green-700 dark:text-green-200 font-medium">
                    {author.name[0]}
                  </div>
                )}
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{author.name}</h3>
                {author.role && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{author.role}</p>
                )}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">{date}</span>
            </div>

            {/* Content - Fixed height with overflow */}
            <div className="flex-1 min-h-[150px] max-h-[150px] space-y-3 overflow-hidden">
              <h2 className="text-xl font-semibold text-white/90 line-clamp-1">{title}</h2>
              <p className="text-gray-400 line-clamp-3">{content}</p>
            </div>

            {/* Tags - Fixed height */}
            <div className="h-10 mt-3 overflow-hidden">
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  {tags.length > 2 && (
                    <span className="text-sm text-gray-400">+{tags.length - 2}</span>
                  )}
                </div>
              )}
            </div>

            {/* Footer - Fixed height */}
            <div className="flex items-center justify-between h-14 pt-4 mt-4 border-t border-white/5">
              <div className="flex gap-4">
                <button className="flex items-center gap-1.5 text-gray-500 hover:text-green-600 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">{likes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-gray-500 hover:text-green-600 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{comments}</span>
                </button>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-500 hover:text-green-600 transition-colors rounded-full hover:bg-green-50 dark:hover:bg-green-900/30">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-green-600 transition-colors rounded-full hover:bg-green-50 dark:hover:bg-green-900/30">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 ">
              {author.image ? (
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-green-100 dark:bg-green-800 flex items-center justify-center text-green-700 dark:text-green-200 font-medium text-xl">
                  {author.name[0]}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">{author.name}</h3>
              {author.role && (
                <p className="text-gray-400">{author.role}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">{date}</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{content}</p>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-4">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-900/30 text-white rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10">
            <div className="flex gap-4">
              <button className="flex items-center gap-1.5 text-gray-400 hover:text-green-400">
                <Heart className="w-5 h-5" />
                <span>{likes}</span>
              </button>
              <button className="flex items-center gap-1.5 text-gray-400 hover:text-green-400">
                <MessageCircle className="w-5 h-5" />
                <span>{comments}</span>
              </button>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-gray-400 hover:text-green-400 rounded-full hover:bg-green-900/30">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-green-400 rounded-full hover:bg-green-900/30">
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}