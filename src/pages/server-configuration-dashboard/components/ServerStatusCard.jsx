import React from 'react';
import Icon from '../../../components/AppIcon';


const ServerStatusCard = ({ 
  title, 
  status, 
  statusText, 
  description, 
  icon, 
  actionButton,
  children 
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'active': case'valid': case'connected':
        return 'text-success';
      case 'inactive': case'expired': case'disconnected':
        return 'text-error';
      case 'warning': case'expiring':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'active': case'valid': case'connected':
        return 'CheckCircle';
      case 'inactive': case'expired': case'disconnected':
        return 'XCircle';
      case 'warning': case'expiring':
        return 'AlertTriangle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <Icon 
                name={getStatusIcon()} 
                size={14} 
                className={getStatusColor()} 
              />
              <span className={`text-sm font-medium ${getStatusColor()}`}>
                {statusText}
              </span>
            </div>
          </div>
        </div>
        {actionButton && (
          <div className="flex-shrink-0">
            {actionButton}
          </div>
        )}
      </div>
      
      {description && (
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>
      )}
      
      {children}
    </div>
  );
};

export default ServerStatusCard;