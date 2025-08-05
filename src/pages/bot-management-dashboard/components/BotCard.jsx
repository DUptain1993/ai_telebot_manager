import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BotCard = ({ bot, onEdit, onDelete, onSelect, isSelected }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleChatClick = (e) => {
    e?.stopPropagation();
    navigate(`/ai-chat-interface?botId=${bot?.id}`);
  };

  const handleEditClick = (e) => {
    e?.stopPropagation();
    onEdit(bot);
  };

  const handleDeleteClick = (e) => {
    e?.stopPropagation();
    onDelete(bot);
  };

  const handleCardClick = () => {
    navigate(`/ai-chat-interface?botId=${bot?.id}`);
  };

  const handleSelectClick = (e) => {
    e?.stopPropagation();
    onSelect(bot?.id);
  };

  const formatLastUsed = (timestamp) => {
    const now = new Date();
    const lastUsed = new Date(timestamp);
    const diffInHours = Math.floor((now - lastUsed) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return lastUsed?.toLocaleDateString();
  };

  const getModelBadgeColor = (model) => {
    const colors = {
      'gpt-4': 'bg-primary/10 text-primary',
      'gpt-3.5-turbo': 'bg-accent/10 text-accent',
      'claude-3': 'bg-warning/10 text-warning',
      'gemini-pro': 'bg-secondary/10 text-secondary'
    };
    return colors?.[model] || 'bg-muted text-muted-foreground';
  };

  return (
    <div
      className={`
        relative bg-card border border-border rounded-lg p-6 cursor-pointer transition-all duration-200
        hover:shadow-md hover:border-primary/20 group
        ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          onClick={handleSelectClick}
          className={`
            w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200
            ${isSelected 
              ? 'bg-primary border-primary text-white' :'border-border hover:border-primary'
            }
          `}
        >
          {isSelected && <Icon name="Check" size={12} />}
        </button>
      </div>
      {/* Bot Avatar and Basic Info */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
            <Image
              src={bot?.avatar}
              alt={`${bot?.name} avatar`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`
            absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card
            ${bot?.status === 'active' ? 'bg-success' : 'bg-muted-foreground'}
          `} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate mb-1">
            {bot?.name}
          </h3>
          <div className="flex flex-wrap gap-1 mb-2">
            {bot?.specializations?.slice(0, 2)?.map((spec, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground"
              >
                {spec}
              </span>
            ))}
            {bot?.specializations?.length > 2 && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground">
                +{bot?.specializations?.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
      {/* Model and Stats */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <span className={`
            inline-flex items-center px-2 py-1 rounded-md text-xs font-medium
            ${getModelBadgeColor(bot?.model)}
          `}>
            <Icon name="Cpu" size={12} className="mr-1" />
            {bot?.model}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatLastUsed(bot?.lastUsed)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="MessageSquare" size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground">
              {bot?.totalChats} chats
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground">
              {bot?.avgResponseTime}ms
            </span>
          </div>
        </div>
      </div>
      {/* Quick Actions - Show on Hover */}
      <div className={`
        absolute inset-x-4 bottom-4 flex space-x-2 transition-all duration-200
        ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
      `}>
        <Button
          variant="default"
          size="sm"
          onClick={handleChatClick}
          className="flex-1"
          iconName="MessageSquare"
          iconPosition="left"
          iconSize={14}
        >
          Chat Now
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleEditClick}
          iconName="Edit"
          iconSize={14}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={handleDeleteClick}
          iconName="Trash2"
          iconSize={14}
        />
      </div>
      {/* Usage Progress Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
          <span>Usage this month</span>
          <span>{bot?.monthlyUsage}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-1.5">
          <div
            className="bg-primary rounded-full h-1.5 transition-all duration-300"
            style={{ width: `${Math.min(bot?.monthlyUsage, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default BotCard;