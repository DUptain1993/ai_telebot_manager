import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  if (!activeFilters || activeFilters?.length === 0) {
    return null;
  }

  const getFilterIcon = (type) => {
    switch (type) {
      case 'specialization':
        return 'Tag';
      case 'model':
        return 'Cpu';
      case 'status':
        return 'Activity';
      case 'usage':
        return 'BarChart3';
      default:
        return 'Filter';
    }
  };

  const getFilterLabel = (filter) => {
    return `${filter?.type}: ${filter?.value}`;
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-sm text-muted-foreground">Active filters:</span>
      {activeFilters?.map((filter, index) => (
        <div
          key={index}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
        >
          <Icon name={getFilterIcon(filter?.type)} size={12} />
          <span>{getFilterLabel(filter)}</span>
          <button
            onClick={() => onRemoveFilter(index)}
            className="ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-colors duration-200"
          >
            <Icon name="X" size={12} />
          </button>
        </div>
      ))}
      {activeFilters?.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          iconName="X"
          iconPosition="left"
          iconSize={12}
          className="text-muted-foreground hover:text-foreground"
        >
          Clear all
        </Button>
      )}
    </div>
  );
};

export default FilterChips;