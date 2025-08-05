import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BotConfigPanel = ({ 
  bot, 
  isCollapsed, 
  onToggleCollapse, 
  onQuickPrompt 
}) => {
  const [activeTab, setActiveTab] = useState('config');

  const quickPrompts = [
    {
      id: 1,
      title: "Code Review",
      prompt: "Please review this code for best practices, potential bugs, and optimization opportunities:",
      icon: "Search",
      category: "review"
    },
    {
      id: 2,
      title: "Debug Help",
      prompt: "I\'m encountering an error in my code. Can you help me debug and fix it?",
      icon: "Bug",
      category: "debug"
    },
    {
      id: 3,
      title: "Refactor Code",
      prompt: "Can you help me refactor this code to make it more maintainable and efficient?",
      icon: "RefreshCw",
      category: "refactor"
    },
    {
      id: 4,
      title: "Add Comments",
      prompt: "Please add comprehensive comments and documentation to this code:",
      icon: "MessageSquare",
      category: "documentation"
    },
    {
      id: 5,
      title: "Unit Tests",
      prompt: "Generate unit tests for the following code:",
      icon: "TestTube",
      category: "testing"
    },
    {
      id: 6,
      title: "Explain Code",
      prompt: "Can you explain how this code works and what each part does?",
      icon: "HelpCircle",
      category: "explanation"
    }
  ];

  const tabs = [
    { id: 'config', label: 'Config', icon: 'Settings' },
    { id: 'prompts', label: 'Prompts', icon: 'Zap' }
  ];

  return (
    <div className={`bg-card border-l border-border transition-all duration-300 ${
      isCollapsed ? 'w-0 overflow-hidden' : 'w-80'
    } flex flex-col h-full`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Bot Info</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="h-8 w-8"
          >
            <Icon name="PanelRightClose" size={16} />
          </Button>
        </div>

        {/* Bot Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Bot" size={20} color="white" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">{bot?.name}</h3>
            <p className="text-sm text-muted-foreground">{bot?.specialization}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab?.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={14} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'config' && (
          <div className="space-y-4">
            {/* Model Info */}
            <div className="bg-muted/50 rounded-lg p-3">
              <h4 className="text-sm font-medium text-foreground mb-2">Current Model</h4>
              <div className="flex items-center space-x-2">
                <Icon name="Cpu" size={16} className="text-primary" />
                <span className="text-sm text-foreground">{bot?.model}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Optimized for {bot?.specialization?.toLowerCase()} tasks
              </p>
            </div>

            {/* System Prompt */}
            <div className="bg-muted/50 rounded-lg p-3">
              <h4 className="text-sm font-medium text-foreground mb-2">System Prompt</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {bot?.systemPrompt}
              </p>
            </div>

            {/* Settings */}
            <div className="bg-muted/50 rounded-lg p-3">
              <h4 className="text-sm font-medium text-foreground mb-3">Settings</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Temperature</span>
                  <span className="text-xs font-medium text-foreground">{bot?.temperature}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Max Tokens</span>
                  <span className="text-xs font-medium text-foreground">{bot?.maxTokens}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Context Window</span>
                  <span className="text-xs font-medium text-foreground">{bot?.contextWindow}</span>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="bg-muted/50 rounded-lg p-3">
              <h4 className="text-sm font-medium text-foreground mb-2">Status</h4>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-foreground">Active</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Ready to assist with coding tasks
              </p>
            </div>
          </div>
        )}

        {activeTab === 'prompts' && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground mb-3">Quick Prompts</h4>
            {quickPrompts?.map((prompt) => (
              <button
                key={prompt.id}
                onClick={() => onQuickPrompt(prompt.prompt)}
                className="w-full text-left p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={prompt.icon} size={14} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-medium text-foreground mb-1">
                      {prompt.title}
                    </h5>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {prompt.prompt}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BotConfigPanel;