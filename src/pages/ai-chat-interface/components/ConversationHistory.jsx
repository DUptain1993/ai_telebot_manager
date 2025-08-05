import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ConversationHistory = ({ 
  conversations, 
  activeConversationId, 
  onSelectConversation, 
  onNewConversation,
  isCollapsed,
  onToggleCollapse 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations?.filter(conv =>
    conv?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    conv?.preview?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
      return date?.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date?.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className={`bg-card border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-0 overflow-hidden' : 'w-80'
    } flex flex-col h-full`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Conversations</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="h-8 w-8"
          >
            <Icon name="PanelLeftClose" size={16} />
          </Button>
        </div>

        {/* New Conversation Button */}
        <Button
          variant="default"
          onClick={onNewConversation}
          className="w-full mb-4"
          iconName="Plus"
          iconPosition="left"
        >
          New Conversation
        </Button>

        {/* Search */}
        <Input
          type="search"
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations?.length === 0 ? (
          <div className="p-4 text-center">
            <Icon name="MessageSquare" size={48} className="mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {searchQuery ? 'No conversations found' : 'No conversations yet'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {searchQuery ? 'Try a different search term' : 'Start a new conversation to begin'}
            </p>
          </div>
        ) : (
          <div className="p-2">
            {filteredConversations?.map((conversation) => (
              <button
                key={conversation?.id}
                onClick={() => onSelectConversation(conversation?.id)}
                className={`w-full text-left p-3 rounded-lg mb-2 transition-all duration-200 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring ${
                  activeConversationId === conversation?.id 
                    ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-medium truncate ${
                      activeConversationId === conversation?.id 
                        ? 'text-primary' :'text-foreground'
                    }`}>
                      {conversation?.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {conversation?.preview}
                    </p>
                    <div className="flex items-center mt-2 space-x-2">
                      <div className="flex items-center space-x-1">
                        <Icon name="Bot" size={12} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {conversation?.botName}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="MessageSquare" size={12} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {conversation?.messageCount}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end ml-2">
                    <span className="text-xs text-muted-foreground">
                      {formatDate(conversation?.lastActivity)}
                    </span>
                    {conversation?.hasBookmarks && (
                      <Icon name="Bookmark" size={12} className="text-warning mt-1" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Footer Stats */}
      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">
          {filteredConversations?.length} conversation{filteredConversations?.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
};

export default ConversationHistory;