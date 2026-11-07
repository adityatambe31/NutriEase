'use client';

import { generateRecipeResponse } from '@/app/assistant/utils/assitant-api';
import { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (message: string) => Promise<void>;
  resetChat: () => void;
}

export function useChat(initialMessage?: string): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        initialMessage ||
        'Hello! I\'m your virtual cooking assistant. Ask me for any recipe and I\'ll guide you through it step by step. For example, try "How to make egg fried rice?"',
      timestamp: new Date().toISOString(),
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const currentTime = new Date().toISOString();

    try {
      setIsLoading(true);
      setMessages((prev) => [
        ...prev,
        {
          role: 'user',
          content: message,
          timestamp: currentTime,
        },
      ]);
      const response = await generateRecipeResponse(message);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: response,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Sorry, I encountered an error generating the recipe. Please try again.',
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        role: 'assistant',
        content:
          initialMessage ||
          'Hello! I\'m your virtual cooking assistant. Ask me for any recipe and I\'ll guide you through it step by step. For example, try "How to make egg fried rice?"',
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  return {
    messages,
    isLoading,
    sendMessage,
    resetChat,
  };
}
