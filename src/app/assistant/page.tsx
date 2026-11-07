'use client';

import ChatInput from '@/app/assistant/components/chat-input';
import ChatWindow from '@/app/assistant/components/chat-window';
import { useChat } from '@/app/assistant/hooks/use-chat';
import { IoRestaurant } from 'react-icons/io5';

export default function AssistantPage() {
  const { messages, isLoading, sendMessage } = useChat();
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-slate-800">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/PlannerBG.jpg')] bg-cover bg-fixed bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10" />
      </div>
      <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-teal-400 mb-4">
            Chefy
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Your personal chief assistant to help you with any recipe you want
            to cook.
          </p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-1">
          <div className="flex items-center gap-3 p-4 border-b border-white/10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <IoRestaurant className="text-white text-lg" />
            </div>
            <div>
              <h2 className="text-white font-medium">Chef Assistant</h2>
              <p className="text-white/60 text-sm">Built by Team404</p>
            </div>
          </div>
          <div className="h-[60vh] overflow-y-auto p-4">
            <ChatWindow messages={messages} isLoading={isLoading} />
          </div>
          <div className="p-4 border-t border-white/10">
            <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
