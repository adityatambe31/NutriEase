'use client';

import type { DetailedHTMLProps, LiHTMLAttributes } from 'react';
import {
  FaClock,
  FaHeartbeat,
  FaLightbulb,
  FaList,
  FaUtensils,
} from 'react-icons/fa';
import { GiMeal } from 'react-icons/gi';
import ReactMarkdown from 'react-markdown';

interface RecipeContentProps {
  content: string;
}

// Define a type for markdown node children
interface MarkdownNodeChild {
  type: string;
  value?: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: MarkdownNodeChild[];
}

// Define a custom LiProps type
interface CustomLiProps
  extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  node?: {
    properties?: {
      className?: string[];
    };
    position?: {
      start: { line: number; column: number };
      end: { line: number; column: number };
    };
    children?: MarkdownNodeChild[];
    tagName?: string;
    parent?: {
      type?: string;
      ordered?: boolean;
    };
    index?: number;
  };
  ordered?: boolean;
}

export default function RecipeContent({ content }: RecipeContentProps) {
  return (
    <div className="relative bg-slate-200 dark:from-slate-700/90 dark:to-slate-800/90 rounded-xl overflow-hidden border border-blue-300/30 dark:border-blue-500/20 shadow-xl p-4">
      <div className="relative z-10">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
                <h1 className="text-xl font-bold text-white">{children}</h1>
              </div>
            ),

            h2: ({ children }) => {
              const headers = {
                'Nutritional Information': {
                  icon: <FaHeartbeat />,
                  bgColor: 'bg-blue-900/30',
                },
                Ingredients: {
                  icon: <FaList />,
                  bgColor: 'bg-blue-900/30',
                },
                Instructions: {
                  icon: <FaUtensils />,
                  bgColor: 'bg-blue-900/30',
                },
                'Cooking Time & Servings': {
                  icon: <FaClock />,
                  bgColor: 'bg-blue-900/30',
                },
                Tips: {
                  icon: <FaLightbulb />,
                  bgColor: 'bg-blue-900/30',
                },
              };

              const header = headers[children as keyof typeof headers] || {
                icon: <GiMeal />,
                bgColor: 'bg-blue-900/30',
              };

              return (
                <div
                  className={`flex items-center gap-3 p-3 ${header.bgColor} border-b border-white/10`}
                >
                  <span className="p-1.5 rounded-lg bg-white/20 text-blue-500">
                    {header.icon}
                  </span>
                  <h2 className="text-base font-semibold text-blue-500">
                    {children}
                  </h2>
                </div>
              );
            },

            ul: ({ children }) => (
              <ul className="p-4 space-y-3 text-black">{children}</ul>
            ),

            ol: ({ children }) => (
              <ol className="p-4 space-y-5 text-black list-decimal ml-4">
                {children}
              </ol>
            ),

            li: ({ children, node, ...props }: CustomLiProps) => {
              const isOrderedList =
                node?.parent?.type === 'list' && node?.parent?.ordered;

              if (isOrderedList) {
                return (
                  <li className="pl-2 text-black" {...props}>
                    <div className="text-sm leading-relaxed">{children}</div>
                  </li>
                );
              }
              return (
                <li className="flex items-start gap-2" {...props}>
                  <span className="mt-1.5 flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  </span>
                  <span className="text-black text-sm">{children}</span>
                </li>
              );
            },

            p: ({ children }) => (
              <p className="px-2 text-black text-sm leading-relaxed">
                {children}
              </p>
            ),
            strong: ({ children }) => (
              <strong className="text-black font-semibold">{children}</strong>
            ),
            em: ({ children }) => (
              <em className="text-blue-300 not-italic">{children}</em>
            ),
            br: () => <div className="h-3" />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
