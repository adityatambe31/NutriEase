import React from 'react';
import ChatMessage from './chat-message';

interface ChatWindowProps {
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp?: string;
  }>;
  isLoading?: boolean;
}

export default function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          role={message.role}
          content={message.content}
          timestamp={message.timestamp}
        />
      ))}
      
      {isLoading && (
        <ChatMessage
          role="assistant"
          content=""
          isLoading={true}
        />
      )}
    </div>
  );
}