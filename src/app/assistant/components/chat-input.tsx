'use client';

import { useState } from 'react';
import { IoSend } from 'react-icons/io5';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({
  onSendMessage,
  isLoading,
}: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={
          isLoading ? 'Generating recipe...' : 'Ask for any recipe...'
        }
        disabled={isLoading}
        className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 
                  placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 
                  focus:border-transparent transition-all duration-300"
      />
      <button
        type="submit"
        disabled={!input.trim() || isLoading}
        className={`px-4 py-3 rounded-lg ${
          !input.trim() || isLoading
            ? 'bg-white/10 text-white/50'
            : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600'
        } flex items-center gap-2 group transition-all duration-300`}
      >
        <span className="hidden sm:inline">Send</span>
        <IoSend
          className={`text-lg ${!input.trim() || isLoading ? '' : 'group-hover:translate-x-1 transition-transform'}`}
        />
      </button>
    </form>
  );
}
