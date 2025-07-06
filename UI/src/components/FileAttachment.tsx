import React, { useRef, useState } from 'react';
import { Paperclip, X, FileText, Image, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AttachedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  preview?: string;
}

interface FileAttachmentProps {
  onFilesAttached: (files: AttachedFile[]) => void;
  attachedFiles: AttachedFile[];
  onRemoveFile: (fileId: string) => void;
}

const FileAttachment: React.FC<FileAttachmentProps> = ({
  onFilesAttached,
  attachedFiles,
  onRemoveFile
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles: AttachedFile[] = Array.from(files).map(file => ({
      id: `${Date.now()}-${Math.random()}`,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }));

    onFilesAttached([...attachedFiles, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <Image className="w-4 h-4" />;
    if (fileType.startsWith('video/')) return <Video className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div className="space-y-2">
      {/* Attached Files Display */}
      {attachedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto">
          {attachedFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center space-x-2 bg-muted/30 rounded-lg px-3 py-2 text-xs"
            >
              {file.preview ? (
                <img src={file.preview} alt={file.name} className="w-6 h-6 rounded object-cover" />
              ) : (
                getFileIcon(file.type)
              )}
              <div className="flex-1 min-w-0">
                <p className="truncate font-medium">{file.name}</p>
                <p className="text-muted-foreground">{formatFileSize(file.size)}</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onRemoveFile(file.id)}
                className="h-6 w-6 p-0 hover:bg-destructive/20"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* File Input Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-2 transition-colors ${
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-border/50 hover:border-primary/50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,.pdf,.doc,.docx,.txt"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex items-center justify-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="w-4 h-4" />
            <span className="text-xs">{isDragging ? 'Drop files here' : 'Attach files'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FileAttachment;