"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { BaseCard } from "./BaseCard";
import { Modal } from "./Modal";

interface TestimonyCardProps {
  title: string;
  author: string;
  story: string;
  authorImage: string;
  likes: number;
  comments: number;
  shares: number;
  bookmarks: number;
  timestamp: string;
  featured?: boolean;
}

export function TestimonyCard({
  title,
  author,
  story,
  authorImage,
  likes,
  comments,
  shares,
  bookmarks,
  timestamp,
  featured
}: TestimonyCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div onClick={() => setIsModalOpen(true)} className="cursor-pointer h-full">
        <BaseCard featured={featured}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="relative h-12 w-12 rounded-full overflow-hidden">
                <Image
                  src={authorImage}
                  alt={author}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{author}</h3>
                <p className="text-sm text-gray-500">{timestamp}</p>
              </div>
              {featured && (
                <span className="ml-auto px-3 py-1 bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded-full text-sm">
                  Featured
                </span>
              )}
            </div>

            {/* Content - will grow to fill space */}
            <div className="flex-grow">
              <h2 className="text-xl font-semibold mb-3 text-white/90">{title}</h2>
              <p className="text-gray-400 line-clamp-3">{story}</p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
              <div className="flex gap-4">
                <button className="flex items-center gap-1.5 text-gray-500 hover:text-green-600 transition-colors">
                  <Heart className="w-5 h-5" />
                  <span>{likes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-gray-500 hover:text-green-600 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>{comments}</span>
                </button>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 text-gray-500 hover:text-green-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span>{shares}</span>
                </button>
                <button className="flex items-center gap-1.5 text-gray-500 hover:text-green-600 transition-colors">
                  <Bookmark className="w-5 h-5" />
                  <span>{bookmarks}</span>
                </button>
              </div>
            </div>
          </div>
        </BaseCard>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6 space-y-6">
          {/* Modal Header */}
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-full overflow-hidden">
              <Image
                src={authorImage}
                alt={author}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{author}</h3>
              <p className="text-gray-500">{timestamp}</p>
            </div>
            {featured && (
              <span className="ml-auto px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                Featured
              </span>
            )}
          </div>

          {/* Modal Content */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{story}</p>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="flex gap-6">
              <button className="flex items-center gap-2 text-gray-600 hover:text-green-600">
                <Heart className="w-5 h-5" />
                <span>{likes}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-green-600">
                <MessageCircle className="w-5 h-5" />
                <span>{comments}</span>
              </button>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-green-600">
                <Share2 className="w-5 h-5" />
                <span>{shares}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-green-600">
                <Bookmark className="w-5 h-5" />
                <span>{bookmarks}</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}