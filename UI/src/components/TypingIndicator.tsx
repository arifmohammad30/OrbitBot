import React from 'react';
import botAvatar from '@/assets/bot-avatar.png';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start animate-fade-in-up">
      <div className="flex flex-col max-w-[85%] sm:max-w-[70%]">
        <div className="flex items-center space-x-2 mb-1 ml-1">
          <img 
            src={botAvatar} 
            alt="MOSDAC AI Bot" 
            className="w-6 h-6 rounded-full border border-primary/30"
          />
          <span className="text-xs text-muted-foreground font-medium">MOSDAC AI</span>
        </div>
        
        <div className="message-bot flex items-center space-x-2">
          <div className="typing-dots">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
          <span className="text-xs text-muted-foreground">Analyzing satellite data...</span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;