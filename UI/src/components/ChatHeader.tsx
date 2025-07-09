import React, { useState } from 'react';
import { Download, Settings, Moon, Sun, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import botAvatar from '@/assets/bot-avatar.jpg';

interface ChatHeaderProps {
  onExport: () => void;
  isOnline: boolean;
  messagesCount: number;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  onExport, 
  isOnline, 
  messagesCount 
}) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <header
      className="sticky top-0 z-20 w-full min-h-[64px] px-4"
      style={{
        background: 'linear-gradient(135deg, rgba(10,20,60,0.92) 0%, rgba(34,20,60,0.85) 60%, rgba(60,54,123,0.78) 100%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(80,80,160,0.18)',
        boxShadow: '0 10px 30px -10px rgba(40,30,80,0.25)'
      }}
    >
      <div className="relative z-10 py-3 w-full">
        <div className="flex items-center justify-between gap-x-4">
          {/* Bot Info Section */}
          <div className="flex items-center gap-x-3 ml-0">
            <div className="relative">
              <img 
                src={botAvatar} 
                alt="OrbitBot" 
                className="w-12 h-12 rounded-full border-2 border-primary-foreground/20 avatar-float"
              />
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-primary-foreground/20 ${
                isOnline ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {isOnline ? (
                  <Wifi className="w-2 h-2 text-white absolute top-0.5 left-0.5" />
                ) : (
                  <WifiOff className="w-2 h-2 text-white absolute top-0.5 left-0.5" />
                )}
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-primary-foreground">OrbitBot AI Assistant</h1>
              <div className="flex items-center space-x-2 text-xs text-primary-foreground/80">
                <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span>{isOnline ? 'Online' : 'Offline'}</span>
                <span>•</span>
                <span>{messagesCount} messages</span>
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className="flex items-center space-x-2 ml-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onExport}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Download className="w-5 h-5" />
            </Button>

            <Popover open={showSettings} onOpenChange={setShowSettings}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Settings className="w-5 h-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="end">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Chat Settings</h4>
                  <Separator />
                  <div className="grid gap-2">
                    <Button variant="ghost" size="sm" onClick={onExport} className="justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Export Chat
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;