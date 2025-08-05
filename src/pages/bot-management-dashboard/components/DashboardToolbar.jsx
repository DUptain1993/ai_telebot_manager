import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DashboardToolbar = ({ 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange, 
  selectedCount,
  onBulkDelete,
  onClearSelection 
}) => {
  const navigate = useNavigate();

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'created', label: 'Recently Created' },
    { value: 'created-desc', label: 'Oldest First' },
    { value: 'lastUsed', label: 'Recently Used' },
    { value: 'lastUsed-desc', label: 'Least Used' },
    { value: 'usage', label: 'Most Active' },
    { value: 'usage-desc', label: 'Least Active' }
  ];

  const handleCreateBot = () => {
    navigate('/ai-bot-builder');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      {/* Main Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        {/* Left Side - Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Search bots by name, specialization, or model..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pl-10"
            />
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" 
            />
          </div>
          
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            placeholder="Sort by..."
            className="w-full sm:w-48"
          />
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center gap-3">
          {selectedCount > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedCount} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={onBulkDelete}
                iconName="Trash2"
                iconPosition="left"
                iconSize={14}
              >
                Delete
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearSelection}
                iconName="X"
                iconSize={14}
              />
            </div>
          )}
          
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
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Bot" size={16} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Total Bots</p>
            <p className="text-xs text-muted-foreground">12 active</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
          <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="MessageSquare" size={16} className="text-accent" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Total Chats</p>
            <p className="text-xs text-muted-foreground">1,247 this month</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
          <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={16} className="text-warning" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Avg Response</p>
            <p className="text-xs text-muted-foreground">1.2s</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
          <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={16} className="text-success" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Success Rate</p>
            <p className="text-xs text-muted-foreground">98.5%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardToolbar;