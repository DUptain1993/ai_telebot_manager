import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ isFiltered = false, onClearFilters }) => {
  const navigate = useNavigate();

  const handleCreateBot = () => {
    navigate('/ai-bot-builder');
  };

  if (isFiltered) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="Search" size={24} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No bots match your filters
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          Try adjusting your search criteria or filters to find the bots you're looking for.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={onClearFilters}
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={16}
          >
            Clear Filters
          </Button>
          <Button
            variant="default"
            onClick={handleCreateBot}
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            Create New Bot
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      {/* Illustration */}
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mb-4">
          <Icon name="Bot" size={48} className="text-primary" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
          <Icon name="Plus" size={16} className="text-white" />
        </div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-warning rounded-full flex items-center justify-center">
          <Icon name="Sparkles" size={12} className="text-white" />
        </div>
      </div>

      {/* Content */}
      <h2 className="text-2xl font-bold text-foreground mb-3">
        Welcome to AI TeleBot Manager
      </h2>
      <p className="text-muted-foreground mb-8 max-w-lg leading-relaxed">
        Create your first AI coding assistant to get started. Build specialized bots for different programming languages, frameworks, and development tasks.
      </p>

      {/* Features List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-2xl">
        <div className="flex flex-col items-center text-center p-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
            <Icon name="Code" size={20} className="text-primary" />
          </div>
          <h4 className="font-semibold text-foreground mb-1">Code Assistance</h4>
          <p className="text-sm text-muted-foreground">
            Get help with coding, debugging, and best practices
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-4">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-3">
            <Icon name="MessageSquare" size={20} className="text-accent" />
          </div>
          <h4 className="font-semibold text-foreground mb-1">Real-time Chat</h4>
          <p className="text-sm text-muted-foreground">
            Interactive conversations with instant responses
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-4">
          <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-3">
            <Icon name="Settings" size={20} className="text-warning" />
          </div>
          <h4 className="font-semibold text-foreground mb-1">Customizable</h4>
          <p className="text-sm text-muted-foreground">
            Configure bots for specific domains and tasks
          </p>
        </div>
      </div>

      {/* CTA */}
      <Button
        variant="default"
        size="lg"
        onClick={handleCreateBot}
        iconName="Plus"
        iconPosition="left"
        iconSize={20}
        className="px-8"
      >
        Create Your First Bot
      </Button>

      {/* Help Text */}
      <p className="text-xs text-muted-foreground mt-6">
        Need help getting started? Check out our{' '}
        <button className="text-primary hover:underline">
          documentation
        </button>{' '}
        or{' '}
        <button className="text-primary hover:underline">
          quick start guide
        </button>
      </p>
    </div>
  );
};

export default EmptyState;