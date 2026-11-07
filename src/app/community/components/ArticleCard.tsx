"use client";

import { BaseCard } from "./BaseCard";
import { Clock, MessageCircle, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  title: string;
  summary: string;
  readTime: string;
  category: string;
  author: {
    name: string;
    image: string;
    role: string;
  };
  date: string;
  likes: number;
  comments: number;
  link: string;
}

export function ArticleCard({
  title,
  summary,
  readTime,
  category,
  author,
  date,
  likes,
  comments,
  link
}: ArticleCardProps) {
  return (
    <Link 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full transition-transform hover:-translate-y-1"
    >
      <BaseCard>
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden">
              <Image
                src={author.image}
                alt={author.name}
                fill
                className="rounded-full object-cover ring-2 ring-white/10"
              />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-semibold text-gray-600 truncate">{author.name}</h3>
              <p className="text-xs sm:text-sm text-gray-400">{author.role}</p>
            </div>
          </div>

          <div className="flex-1 space-y-2 sm:space-y-3 mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-white/90 line-clamp-2">{title}</h2>
            <p className="text-sm text-gray-400 line-clamp-3">{summary}</p>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-400">
            <span className="px-3 py-1 text-xs font-medium bg-teal-500/10 text-teal-400 rounded-full">
              {category}
            </span>
            <span className="flex items-center text-xs text-gray-400">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {readTime}
            </span>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span className="flex items-center">
                <Heart className="w-4 h-4 mr-1" />
                {likes}
              </span>
              <span className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-1" />
                {comments}
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              {date}
            </div>
          </div>
        </div>
      </BaseCard>
    </Link>
  );
}