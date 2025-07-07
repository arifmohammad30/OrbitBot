import React from 'react';
import botAvatar from '@/assets/bot-avatar.jpg';
import userAvatar from '@/assets/user-avatar.png';

interface AttachedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  preview?: string;
}

interface MessageData {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  files?: AttachedFile[];
}

interface MessageProps {
  message: MessageData;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} animate-fade-in-up`}>
      <div className="flex flex-col max-w-[85%] sm:max-w-[70%]">
        {/* Avatar and Name */}
        <div className={`flex items-center space-x-2 mb-1 ${isBot ? 'ml-1' : 'mr-1 justify-end'}`}>
          {isBot && (
            <>
              <img 
                src={botAvatar} 
                alt="OrbitBot" 
                className="w-6 h-6 rounded-full border border-primary/30"
              />
              <span className="text-xs text-muted-foreground font-medium">OrbitBot</span>
            </>
          )}
          {!isBot && (
            <>
              <span className="text-xs text-muted-foreground font-medium">You</span>
              <img 
                src={userAvatar} 
                alt="User" 
                className="w-6 h-6 rounded-full border border-accent/30"
              />
            </>
          )}
        </div>
        
        {/* Message Content */}
        <div className={`${isBot ? 'message-bot' : 'message-user'} relative`}>
          {/* Attached Files */}
          {message.files && message.files.length > 0 && (
            <div className="mb-3 space-y-2">
              {message.files.map((file) => (
                <div key={file.id} className="flex items-center space-x-2 bg-background/20 rounded p-2">
                  {file.preview ? (
                    <img src={file.preview} alt={file.name} className="w-8 h-8 rounded object-cover" />
                  ) : (
                    <div className="w-8 h-8 bg-muted/50 rounded flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Message Text */}
          {message.text && (
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message.text}
            </p>
          )}
        </div>
        
        {/* Timestamp and Status */}
        <div className={`flex items-center mt-1 text-xs text-muted-foreground ${isBot ? 'justify-start ml-1' : 'justify-end mr-1'}`}>
          <span>{formatTime(message.timestamp)}</span>
          {!isBot && (
            <svg className="w-3 h-3 ml-1 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;