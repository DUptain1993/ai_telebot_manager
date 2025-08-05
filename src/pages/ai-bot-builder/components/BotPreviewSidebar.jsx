import React from 'react';
import Icon from '../../../components/AppIcon';

const BotPreviewSidebar = ({ 
  botName, 
  description, 
  selectedAvatar, 
  selectedModel, 
  systemPrompt,
  selectedTags,
  temperature,
  maxTokens,
  responseFormat 
}) => {
  const mockConversation = [
    {
      role: 'user',
      content: 'Can you help me optimize this Python function?',
      timestamp: '2:34 PM'
    },
    {
      role: 'bot',
      content: `I'd be happy to help optimize your Python function! Please share the code you'd like me to review.\n\nI'll analyze it for:\n• Performance improvements\n• Code readability\n• Best practices\n• Memory efficiency`,
      timestamp: '2:34 PM'
    },
    {
      role: 'user',content: 'def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)',timestamp: '2:35 PM'
    }
  ];

  const getModelBadgeColor = (model) => {
    switch (model) {
      case 'gpt-4': return 'bg-purple-100 text-purple-800';
      case 'gpt-3.5-turbo': return 'bg-blue-100 text-blue-800';
      case 'claude-3': return 'bg-green-100 text-green-800';
      case 'codellama': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Bot Preview Card */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Eye" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Bot Preview</h3>
        </div>

        {/* Bot Identity Preview */}
        <div className="flex items-start space-x-4 mb-6">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
            selectedAvatar ? selectedAvatar?.color : 'bg-muted'
          }`}>
            <Icon 
              name={selectedAvatar ? selectedAvatar?.icon : 'Bot'} 
              size={20} 
              color="white" 
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-base font-semibold text-foreground truncate">
              {botName || 'Unnamed Bot'}
            </h4>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description || 'No description provided'}
            </p>
          </div>
        </div>

        {/* Configuration Summary */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Model:</span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getModelBadgeColor(selectedModel)}`}>
              {selectedModel || 'Not selected'}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Temperature:</span>
            <span className="text-sm font-medium text-foreground">{temperature}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Max Tokens:</span>
            <span className="text-sm font-medium text-foreground">{maxTokens}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Format:</span>
            <span className="text-sm font-medium text-foreground capitalize">{responseFormat}</span>
          </div>
        </div>

        {/* Specialization Tags */}
        {selectedTags?.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">Specializations:</p>
            <div className="flex flex-wrap gap-1">
              {selectedTags?.slice(0, 6)?.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                >
                  {tag}
                </span>
              ))}
              {selectedTags?.length > 6 && (
                <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                  +{selectedTags?.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Sample Conversation */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="MessageSquare" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Sample Conversation</h3>
        </div>

        <div className="space-y-4 max-h-80 overflow-y-auto">
          {mockConversation?.map((message, index) => (
            <div
              key={index}
              className={`flex ${message?.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${
                message?.role === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground'
              } rounded-lg px-3 py-2`}>
                {message?.role === 'bot' && (
                  <div className="flex items-center space-x-2 mb-1">
                    <div className={`w-4 h-4 rounded flex items-center justify-center ${
                      selectedAvatar ? selectedAvatar?.color : 'bg-primary'
                    }`}>
                      <Icon 
                        name={selectedAvatar ? selectedAvatar?.icon : 'Bot'} 
                        size={10} 
                        color="white" 
                      />
                    </div>
                    <span className="text-xs font-medium">
                      {botName || 'AI Assistant'}
                    </span>
                  </div>
                )}
                <p className="text-sm whitespace-pre-line">{message?.content}</p>
                <p className={`text-xs mt-1 ${
                  message?.role === 'user' ?'text-primary-foreground/70' :'text-muted-foreground'
                }`}>
                  {message?.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            This preview shows how your bot will appear in conversations
          </p>
        </div>
      </div>
      {/* System Prompt Preview */}
      {systemPrompt && (
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="FileText" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">System Prompt</h3>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-3 max-h-32 overflow-y-auto">
            <p className="text-xs font-mono text-foreground whitespace-pre-line">
              {systemPrompt?.slice(0, 200)}
              {systemPrompt?.length > 200 && '...'}
            </p>
          </div>
          
          <p className="text-xs text-muted-foreground mt-2">
            {systemPrompt?.length} characters
          </p>
        </div>
      )}
    </div>
  );
};

export default BotPreviewSidebar;