import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 })?.map((_, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-6 animate-pulse"
        >
          {/* Header */}
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-12 h-12 bg-muted rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="flex space-x-2">
                <div className="h-3 bg-muted rounded w-16" />
                <div className="h-3 bg-muted rounded w-12" />
              </div>
            </div>
          </div>

          {/* Model and Stats */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <div className="h-3 bg-muted rounded w-20" />
              <div className="h-3 bg-muted rounded w-16" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-muted rounded" />
                <div className="h-3 bg-muted rounded w-12" />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-muted rounded" />
                <div className="h-3 bg-muted rounded w-16" />
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="h-3 bg-muted rounded w-20" />
              <div className="h-3 bg-muted rounded w-8" />
            </div>
            <div className="w-full h-2 bg-muted rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;