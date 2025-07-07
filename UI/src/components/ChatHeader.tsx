import React, { useState } from 'react';
import { Download, Settings, Moon, Sun, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import botAvatar from '@/assets/bot-avatar.jpg';

interface ChatHeaderProps {
  onExport: () => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
  isOnline: boolean;
  messagesCount: number;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  onExport, 
  onToggleTheme, 
  isDarkMode, 
  isOnline, 
  messagesCount 
}) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <header className="cosmic-header relative z-10">
      <div className="relative z-10 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Bot Info Section */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img 
                src={botAvatar} 
                alt="OrbitBot" 
                className="w-10 h-10 rounded-full border-2 border-primary-foreground/20"
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
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleTheme}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onExport}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Download className="w-4 h-4" />
            </Button>

            <Popover open={showSettings} onOpenChange={setShowSettings}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Settings className="w-4 h-4" />
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
                    <Button variant="ghost" size="sm" onClick={onToggleTheme} className="justify-start">
                      {isDarkMode ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
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