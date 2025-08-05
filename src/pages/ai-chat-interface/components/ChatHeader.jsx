import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ 
  bot, 
  onToggleHistory, 
  onToggleConfig, 
  isHistoryCollapsed, 
  isConfigCollapsed,
  conversationTitle 
}) => {
  return (
    <div className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Bot Info */}
        <div className="flex items-center space-x-4">
          {/* Toggle History Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleHistory}
            className="h-8 w-8 lg:hidden"
          >
            <Icon name={isHistoryCollapsed ? "PanelLeftOpen" : "PanelLeftClose"} size={16} />
          </Button>

          {/* Bot Avatar and Info */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Bot" size={20} color="white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">{bot?.name}</h1>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Cpu" size={14} />
                <span>{bot?.model}</span>
                <span>•</span>
                <span>{bot?.specialization}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Section - Conversation Title */}
        {conversationTitle && (
          <div className="hidden md:flex flex-1 justify-center max-w-md mx-8">
            <div className="text-center">
              <h2 className="text-sm font-medium text-foreground truncate">
                {conversationTitle}
              </h2>
              <p className="text-xs text-muted-foreground">
                Active Conversation
              </p>
            </div>
          </div>
        )}

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2">
          {/* Status Indicator */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-success/10 rounded-md">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-success">Online</span>
          </div>

          {/* Model Info */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-muted/50 rounded-md">
            <Icon name="Zap" size={12} className="text-primary" />
            <span className="text-xs text-muted-foreground">
              Temp: {bot?.temperature} | Tokens: {bot?.maxTokens}
            </span>
          </div>

          {/* Toggle Config Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleConfig}
            className="h-8 w-8"
          >
            <Icon name={isConfigCollapsed ? "PanelRightOpen" : "PanelRightClose"} size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;