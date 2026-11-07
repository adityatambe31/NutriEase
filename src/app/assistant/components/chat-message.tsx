'use client';

import { FaUser } from 'react-icons/fa';
import { IoRestaurant } from 'react-icons/io5';

import ChefLoadingAnimation from './loading-animation';
import RecipeContent from './recipe-content';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
  isLoading?: boolean;
}

const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
};

export default function ChatMessage({
  role,
  content,
  timestamp,
  isLoading,
}: ChatMessageProps) {
  return (
    <div
      className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} mb-6`}
    >
      <div className="flex items-start max-w-[85%] gap-3">
        {/* Avatar Section */}
        {role === 'assistant' && (
          <div className="flex-shrink-0 mr-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <IoRestaurant className="text-white text-sm" />
            </div>
          </div>
        )}

        {/* Message Content */}
        <div className="flex-1">
          {role === 'assistant' && isLoading ? (
            <ChefLoadingAnimation />
          ) : role === 'assistant' ? (
            <RecipeContent content={content} />
          ) : (
            <div className="relative p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-tr-none">
              <p className="text-sm">{content}</p>
            </div>
          )}

          {/* Timestamp */}
          {timestamp && (
            <div
              className={`text-xs mt-1 ${role === 'user' ? 'text-right text-gray-400' : 'text-gray-400'}`}
            >
              {formatTime(timestamp)}
            </div>
          )}
        </div>

        {/* User Avatar (right side) */}
        {role === 'user' && (
          <div className="flex-shrink-0 ml-3">
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <FaUser className="text-white/70 text-sm" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
