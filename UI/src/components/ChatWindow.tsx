import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import botAvatar from '@/assets/bot-avatar.jpg';

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
            <div className="w-16 h-16 rounded-full border-2 border-primary-foreground/20 avatar-float overflow-hidden flex items-center justify-center">
              <img src={botAvatar} alt="OrbitBot" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Welcome to OrbitBot AI Assistant
              </h3>
              <p className="text-muted-foreground max-w-md">
                I'm your AI HELPER BOT !Ask anything regarding MOSDAC website.
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