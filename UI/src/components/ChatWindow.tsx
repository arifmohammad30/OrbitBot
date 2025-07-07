import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';

interface MessageData {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatWindowProps {
  messages: MessageData[];
  isTyping: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isTyping }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [displayedMessages, setDisplayedMessages] = useState<MessageData[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [displayedMessages, isTyping]);

  // Animate messages appearing one by one
  useEffect(() => {
    if (messages.length > displayedMessages.length) {
      const timer = setTimeout(() => {
        setDisplayedMessages(messages.slice(0, displayedMessages.length + 1));
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayedMessages(messages);
    }
  }, [messages, displayedMessages.length]);

  return (
    <div className="flex-1 overflow-hidden">
      <div className="h-full overflow-y-auto p-4 space-y-4 scroll-smooth">
        {displayedMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-fade-in-up">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Welcome to OrbitBot AI Assistant
              </h3>
              <p className="text-muted-foreground max-w-md">
                I'm here to help you with ISRO satellite data information, weather monitoring, and more. 
                Ask me anything about our satellite systems!
              </p>
            </div>
          </div>
        ) : (
          displayedMessages.map((message) => (
            <Message key={message.id} message={message} />
          ))
        )}
        
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;