import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatMessage = ({ message, isUser, isStreaming = false, onRegenerate, onBookmark }) => {
  const [copiedBlocks, setCopiedBlocks] = useState(new Set());

  const copyToClipboard = async (text, blockIndex) => {
    try {
      await navigator.clipboard?.writeText(text);
      setCopiedBlocks(prev => new Set([...prev, blockIndex]));
      setTimeout(() => {
        setCopiedBlocks(prev => {
          const newSet = new Set(prev);
          newSet?.delete(blockIndex);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const detectLanguage = (code) => {
    // Simple language detection based on common patterns
    if (code?.includes('import React') || code?.includes('useState') || code?.includes('useEffect')) return 'jsx';
    if (code?.includes('def ') || code?.includes('import ') || code?.includes('print(')) return 'python';
    if (code?.includes('function ') || code?.includes('const ') || code?.includes('console.log')) return 'javascript';
    if (code?.includes('public class') || code?.includes('System.out.println')) return 'java';
    if (code?.includes('#include') || code?.includes('int main')) return 'cpp';
    if (code?.includes('SELECT') || code?.includes('FROM') || code?.includes('WHERE')) return 'sql';
    return 'text';
  };

  const renderMessageContent = (content) => {
    // Split content by code blocks
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    let blockIndex = 0;

    while ((match = codeBlockRegex?.exec(content)) !== null) {
      // Add text before code block
      if (match?.index > lastIndex) {
        const textContent = content?.slice(lastIndex, match?.index);
        if (textContent?.trim()) {
          parts?.push(
            <div key={`text-${blockIndex}`} className="whitespace-pre-wrap">
              {textContent}
            </div>
          );
        }
      }

      // Add code block
      const language = match?.[1] || detectLanguage(match?.[2]);
      const code = match?.[2]?.trim();
      const currentBlockIndex = blockIndex;

      parts?.push(
        <div key={`code-${blockIndex}`} className="my-4 rounded-lg overflow-hidden border border-border">
          <div className="flex items-center justify-between bg-muted px-4 py-2 border-b border-border">
            <span className="text-sm font-medium text-muted-foreground capitalize">
              {language}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(code, currentBlockIndex)}
              className="h-8 px-2"
            >
              <Icon 
                name={copiedBlocks?.has(currentBlockIndex) ? "Check" : "Copy"} 
                size={14} 
              />
              <span className="ml-1 text-xs">
                {copiedBlocks?.has(currentBlockIndex) ? 'Copied!' : 'Copy'}
              </span>
            </Button>
          </div>
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            showLineNumbers={true}
            customStyle={{
              margin: 0,
              fontSize: '14px',
              lineHeight: '1.5'
            }}
          >
            {code}
          </SyntaxHighlighter>
        </div>
      );

      lastIndex = match?.index + match?.[0]?.length;
      blockIndex++;
    }

    // Add remaining text
    if (lastIndex < content?.length) {
      const remainingText = content?.slice(lastIndex);
      if (remainingText?.trim()) {
        parts?.push(
          <div key={`text-final`} className="whitespace-pre-wrap">
            {remainingText}
          </div>
        );
      }
    }

    return parts?.length > 0 ? parts : <div className="whitespace-pre-wrap">{content}</div>;
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-primary ml-3' : 'bg-accent mr-3'
        }`}>
          <Icon 
            name={isUser ? "User" : "Bot"} 
            size={16} 
            color="white" 
          />
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`rounded-lg px-4 py-3 ${
            isUser 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-card border border-border'
          }`}>
            <div className={`text-sm ${isUser ? 'text-primary-foreground' : 'text-foreground'}`}>
              {isStreaming ? (
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-xs opacity-70">AI is thinking...</span>
                </div>
              ) : (
                renderMessageContent(message?.content)
              )}
            </div>
          </div>

          {/* Message Actions */}
          {!isUser && !isStreaming && (
            <div className="flex items-center space-x-2 mt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRegenerate?.(message?.id)}
                className="h-7 px-2 text-xs"
              >
                <Icon name="RotateCcw" size={12} />
                <span className="ml-1">Regenerate</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onBookmark?.(message?.id)}
                className="h-7 px-2 text-xs"
              >
                <Icon name="Bookmark" size={12} />
                <span className="ml-1">Bookmark</span>
              </Button>
            </div>
          )}

          {/* Timestamp */}
          <div className="text-xs text-muted-foreground mt-1">
            {new Date(message.timestamp)?.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;