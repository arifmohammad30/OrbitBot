import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';
import EmojiPicker from './EmojiPicker';

interface AttachedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  preview?: string;
}

interface MessageInputProps {
  onSendMessage: (message: string, files?: AttachedFile[]) => void;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((message.trim() || attachedFiles.length > 0) && !disabled) {
      onSendMessage(message.trim(), attachedFiles);
      setMessage('');
      setAttachedFiles([]);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newMessage = message.slice(0, start) + emoji + message.slice(end);
      setMessage(newMessage);
      
      // Move cursor after emoji
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + emoji.length, start + emoji.length);
      }, 0);
    } else {
      setMessage(prev => prev + emoji);
    }
  };

  const handleFilesAttached = (files: FileList | null) => {
    if (!files) return;
    const newFiles: AttachedFile[] = Array.from(files).map(file => ({
      id: `${Date.now()}-${Math.random()}`,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }));
    setAttachedFiles(prev => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (fileId: string) => {
    setAttachedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="flex items-end space-x-2 p-4">
        {/* Paperclip icon and hidden file input */}
        <div className="flex flex-col justify-end">
          <button
            type="button"
            className="p-2 text-muted-foreground hover:text-foreground"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Attach file"
          >
            <Paperclip size={20} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*,.pdf,.doc,.docx,.txt"
            style={{ display: 'none' }}
            onChange={e => handleFilesAttached(e.target.files)}
          />
        </div>
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about ISRO satellite data, weather monitoring, or anything else..."
            disabled={disabled}
            className="chat-input pr-12"
            rows={1}
          />
          <div className="absolute right-2 bottom-2">
            <EmojiPicker onEmojiSelect={handleEmojiSelect} />
          </div>
        </div>
        <button
          type="submit"
          disabled={(!message.trim() && attachedFiles.length === 0) || disabled}
          className="send-button"
          aria-label="Send message"
        >
          <Send size={20} />
        </button>
      </form>
      {/* Show attached files as small chips below input */}
      {attachedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 px-4 pb-2">
          {attachedFiles.map(file => (
            <div key={file.id} className="flex items-center space-x-2 bg-muted/30 rounded-lg px-3 py-1 text-xs">
              <span className="truncate max-w-[100px] font-medium">{file.name}</span>
              <button type="button" onClick={() => handleRemoveFile(file.id)} className="text-destructive hover:underline">✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageInput;