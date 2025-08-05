import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatInput = ({ onSendMessage, isLoading, disabled }) => {
  const [message, setMessage] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !isLoading) {
      onSendMessage(message?.trim(), attachedFile);
      setMessage('');
      setAttachedFile(null);
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileAttachment = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      // Validate file type (code files only)
      const allowedExtensions = ['.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.cpp', '.c', '.css', '.html', '.json', '.xml', '.sql'];
      const fileExtension = '.' + file?.name?.split('.')?.pop()?.toLowerCase();
      
      if (allowedExtensions?.includes(fileExtension)) {
        setAttachedFile(file);
      } else {
        alert('Please select a valid code file (.js, .jsx, .py, .java, etc.)');
      }
    }
  };

  const removeAttachment = () => {
    setAttachedFile(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef?.current?.scrollHeight, 120) + 'px';
    }
  }, [message]);

  return (
    <div className="border-t border-border bg-card p-4">
      {/* File Attachment Preview */}
      {attachedFile && (
        <div className="mb-3 p-3 bg-muted rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="FileCode" size={16} className="text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">{attachedFile?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(attachedFile?.size / 1024)?.toFixed(1)} KB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeAttachment}
              className="h-8 w-8 p-0"
            >
              <Icon name="X" size={14} />
            </Button>
          </div>
        </div>
      )}
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        {/* File Attachment Button */}
        <div className="flex-shrink-0">
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileAttachment}
            accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.css,.html,.json,.xml,.sql"
            className="hidden"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => fileInputRef?.current?.click()}
            disabled={disabled}
            className="h-10 w-10"
          >
            <Icon name="Paperclip" size={18} />
          </Button>
        </div>

        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e?.target?.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your AI coding assistant anything... (Press Enter to send, Shift+Enter for new line)"
            disabled={disabled || isLoading}
            className="w-full min-h-[44px] max-h-[120px] px-4 py-3 pr-12 text-sm bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            rows={1}
          />
          
          {/* Character Count */}
          <div className="absolute bottom-1 right-1 text-xs text-muted-foreground">
            {message?.length}/2000
          </div>
        </div>

        {/* Send Button */}
        <div className="flex-shrink-0">
          <Button
            type="submit"
            variant="default"
            size="icon"
            disabled={!message?.trim() || isLoading || disabled}
            loading={isLoading}
            className="h-10 w-10"
          >
            <Icon name="Send" size={18} />
          </Button>
        </div>
      </form>
      {/* Quick Actions */}
      <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span>Press Enter to send</span>
          <span>Shift + Enter for new line</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={12} />
          <span>AI-powered coding assistance</span>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;