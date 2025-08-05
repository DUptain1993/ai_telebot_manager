import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeleteConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  bot, 
  isDeleting = false,
  isBulkDelete = false,
  selectedCount = 0 
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  const getModalContent = () => {
    if (isBulkDelete) {
      return {
        title: `Delete ${selectedCount} Bots`,
        description: `Are you sure you want to delete ${selectedCount} selected bots? This action cannot be undone and will permanently remove all chat history and configurations.`,
        icon: 'Trash2',
        iconColor: 'text-error'
      };
    }

    return {
      title: `Delete "${bot?.name}"`,
      description: `Are you sure you want to delete this bot? This action cannot be undone and will permanently remove all chat history and configurations for "${bot?.name}".`,
      icon: 'AlertTriangle',
      iconColor: 'text-warning'
    };
  };

  const { title, description, icon, iconColor } = getModalContent();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-card border border-border rounded-lg shadow-lg max-w-md w-full mx-4 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center`}>
              <Icon name={icon} size={20} className={iconColor} />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-1 rounded-md hover:bg-muted"
            disabled={isDeleting}
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-muted-foreground leading-relaxed mb-6">
            {description}
          </p>

          {!isBulkDelete && bot && (
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                  <Icon name="Bot" size={20} className="text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{bot?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {bot?.specializations?.join(', ')} • {bot?.model}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-error/5 border border-error/20 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
              <div>
                <p className="text-sm font-medium text-error mb-1">
                  This action is irreversible
                </p>
                <p className="text-xs text-error/80">
                  All chat history, configurations, and associated data will be permanently deleted.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/20">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            loading={isDeleting}
            iconName="Trash2"
            iconPosition="left"
            iconSize={16}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;