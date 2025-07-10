import React, { useState, useCallback, useEffect } from 'react';
import ChatWindow from '@/components/ChatWindow';
import MessageInput from '@/components/MessageInput';
import QuickActions from '@/components/QuickActions';
import ChatHeader from '@/components/ChatHeader';
import { useToast } from '@/hooks/use-toast';

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

const Index = () => {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const { toast } = useToast();

  const mockResponses: { [key: string]: string } = {
    "INSAT-3DR features": "INSAT-3DR is an advanced meteorological satellite with improved imaging capabilities. It features:\n\n• Enhanced Imager with 1 km spatial resolution for visible band\n• 19-channel Sounder for atmospheric profiling\n• Data Relay Transponder for automatic weather stations\n• Search and Rescue Transponder\n• Real-time weather monitoring capabilities\n\nLaunched in 2016, it's positioned at 74°E longitude and provides crucial weather data for the Indian subcontinent.",
    "Weather monitoring": "MOSDAC provides comprehensive weather monitoring through multiple satellite systems:\n\n🛰️ **Real-time Monitoring:**\n• Cyclone tracking and intensity analysis\n• Rainfall estimation and nowcasting\n• Sea surface temperature monitoring\n• Wind speed and direction analysis\n\n🌡️ **Data Products:**\n• Hourly/3-hourly weather bulletins\n• Quantitative Precipitation Estimates (QPE)\n• Atmospheric motion vectors\n• Outgoing Longwave Radiation (OLR)\n\nOur systems monitor 24/7 to provide early warnings for severe weather events across India and the Indian Ocean region.",
    "Spatial resolution": "Spatial resolution varies by satellite instrument and spectral band:\n\n**INSAT-3D/3DR Imager:**\n• Visible (0.55-0.75 μm): 1 km\n• Shortwave IR (1.55-1.70 μm): 1 km\n• Water Vapor (6.50-7.10 μm): 8 km\n• Thermal IR (10.3-11.3 μm): 4 km\n\n**INSAT-3D/3DR Sounder:**\n• Long-wave IR channels: 10 km\n• Short/Mid-wave IR: 10 km\n\n**Oceansat-2:**\n• Ocean Color Monitor: 360 m\n• Scatterometer: 50 km\n\nHigher resolution provides more detailed observations but generates larger data volumes.",
    "Data download": "MOSDAC offers multiple ways to access satellite data:\n\n**Web Portal:** https://mosdac.gov.in\n• Browse and download archived data\n• Real-time data visualization\n• Custom data extraction tools\n\n**FTP Services:**\n• Bulk data download for research\n• Automated data retrieval\n• Scheduled data delivery\n\n**API Access:**\n• RESTful APIs for developers\n• JSON/XML data formats\n• Authentication required\n\n**Data Formats:**\n• HDF5, NetCDF for processed data\n• GRIB for meteorological data\n• GeoTIFF for image products\n\nRegistration required for data access. Educational and research use is free!",
    "Real-time imagery": "MOSDAC provides real-time satellite imagery updated every 30 minutes:\n\n🌍 **Available Products:**\n• Full Disk imagery from INSAT-3D/3DR\n• Indian region focus at higher resolution\n• Multi-spectral composite images\n• Enhancement products (temperature, moisture)\n\n⚡ **Update Frequency:**\n• Visible imagery: Every 30 minutes (daylight only)\n• Infrared imagery: Every 30 minutes (24/7)\n• Rapid scan: Every 15 minutes for severe weather\n\n🔍 **Applications:**\n• Cyclone monitoring and tracking\n• Rainfall nowcasting\n• Fog and low cloud detection\n• Aviation weather support\n\nImages are available within 15-20 minutes of satellite observation!",
    "Cyclone tracking": "MOSDAC's cyclone tracking system provides comprehensive storm monitoring:\n\n🌪️ **Tracking Capabilities:**\n• Automatic cyclone detection and tracking\n• Intensity estimation using Dvorak technique\n• Eye wall replacement cycle monitoring\n• Storm structure analysis\n\n📊 **Key Parameters:**\n• Maximum sustained winds\n• Central pressure estimation\n• Storm motion (speed & direction)\n• Size of storm circulation\n\n⚠️ **Warning Products:**\n• 3-hourly position updates\n• 72-hour track forecasts\n• Intensity change predictions\n• Landfall time and location estimates\n\n🎯 **Accuracy:**\n• Position accuracy: ±25 km\n• Intensity accuracy: ±15 kt\n• Track forecast skill: >85% at 24 hours\n\nOur system has successfully tracked over 200+ cyclones since 2010!"
  };

  const generateResponse = useCallback((userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(mockResponses)) {
      if (lowerMessage.includes(key.toLowerCase())) return response;
    }

    if (lowerMessage.includes('resolution') || lowerMessage.includes('spatial')) {
      return mockResponses["Spatial resolution"];
    }
    if (lowerMessage.includes('weather') || lowerMessage.includes('monitoring')) {
      return mockResponses["Weather monitoring"];
    }
    if (lowerMessage.includes('insat') || lowerMessage.includes('satellite')) {
      return mockResponses["INSAT-3DR features"];
    }
    if (lowerMessage.includes('download') || lowerMessage.includes('data')) {
      return mockResponses["Data download"];
    }
    if (lowerMessage.includes('real-time') || lowerMessage.includes('imagery')) {
      return mockResponses["Real-time imagery"];
    }
    if (lowerMessage.includes('cyclone') || lowerMessage.includes('storm')) {
      return mockResponses["Cyclone tracking"];
    }

    return "Thank you for your question about ISRO satellite systems! I can help you with:\n\n• INSAT-3D/3DR satellite features\n• Weather monitoring and forecasting\n• Spatial resolution info\n• Data download procedures\n• Real-time imagery\n• Cyclone tracking\n\nTry the quick action buttons below too!";
  }, []);

  const handleToggleTheme = useCallback(() => {
    setIsDarkMode(prev => !prev);
    document.documentElement.classList.toggle('dark');
    toast({
      title: `Switched to ${!isDarkMode ? 'Dark' : 'Light'} Mode`,
      duration: 2000,
    });
  }, [isDarkMode, toast]);

  const handleExport = useCallback(() => {
    const exportData = {
      timestamp: new Date().toISOString(),
      messages: messages.map(msg => ({
        sender: msg.sender,
        text: msg.text,
        timestamp: msg.timestamp.toISOString(),
        files: msg.files?.map(file => ({ name: file.name, size: file.size, type: file.type }))
      }))
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mosdac-chat-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Chat Exported Successfully",
      description: `${messages.length} messages exported to JSON file`,
      duration: 3000,
    });
  }, [messages, toast]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline(prev => Math.random() > 0.1 ? true : prev);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = useCallback(async (messageText: string, files?: AttachedFile[]) => {
    const userMessage: MessageData = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
      files: files
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    if (files && files.length > 0) {
      const botResponse: MessageData = {
        id: (Date.now() + 1).toString(),
        text: "File upload functionality will be integrated in the future. For now, file sharing is not supported.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      return;
    }

    try {
      const delay = 1500 + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));

      const response = await fetch("http://localhost:8000/query-fusion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: messageText })
      });

      if (!response.ok) throw new Error("API error");

      const data = await response.json();
      const botResponse: MessageData = {
        id: (Date.now() + 2).toString(),
        text: data.answer,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      const fallback = generateResponse(messageText);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          text: fallback || "Sorry, I couldn't get an answer from the server.",
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [generateResponse]);

  const handleQuickAction = useCallback((action: string) => {
    handleSendMessage(`Tell me about ${action}`);
  }, [handleSendMessage]);

  return (
    <div className="min-h-screen flex flex-col">
      <ChatHeader
        onExport={handleExport}
        onToggleTheme={handleToggleTheme}
        isDarkMode={isDarkMode}
        isOnline={isOnline}
        messagesCount={messages.length}
      />

      <main className="flex-1 flex flex-col w-full max-w-4xl mx-auto sm:rounded-xl sm:shadow-lg sm:my-4">
        <ChatWindow messages={messages} isTyping={isTyping} />

        {messages.length === 0 && (
          <div className="px-4 py-2">
            <p className="text-sm text-muted-foreground mb-3 text-center">
              Try these quick actions:
            </p>
            <QuickActions 
              onQuickAction={handleQuickAction}
              disabled={isTyping}
            />
          </div>
        )}

        <MessageInput 
          onSendMessage={handleSendMessage}
          disabled={isTyping}
        />
      </main>
    </div>
  );
};

export default Index;
