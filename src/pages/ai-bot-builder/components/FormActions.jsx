import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FormActions = ({ 
  onCreateBot, 
  onSaveDraft, 
  onCancel, 
  isFormValid, 
  hasUnsavedChanges,
  isCreating 
}) => {
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      setShowCancelModal(true);
    } else {
      onCancel();
    }
  };

  const confirmCancel = () => {
    setShowCancelModal(false);
    onCancel();
  };

  return (
    <>
      {/* Desktop Actions */}
      <div className="hidden md:flex items-center justify-between pt-6 border-t border-border">
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isCreating}
          >
            Cancel
          </Button>
          
          <Button
            variant="secondary"
            onClick={onSaveDraft}
            disabled={isCreating}
            iconName="Save"
            iconPosition="left"
          >
            Save Draft
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          {hasUnsavedChanges && (
            <div className="flex items-center space-x-2 text-warning">
              <Icon name="AlertCircle" size={16} />
              <span className="text-sm">Unsaved changes</span>
            </div>
          )}
          
          <Button
            variant="default"
            onClick={onCreateBot}
            disabled={!isFormValid || isCreating}
            loading={isCreating}
            iconName="Plus"
            iconPosition="left"
          >
            {isCreating ? 'Creating Bot...' : 'Create Bot'}
          </Button>
        </div>
      </div>

      {/* Mobile Sticky Actions */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-40">
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isCreating}
            className="flex-1"
          >
            Cancel
          </Button>
          
          <Button
            variant="default"
            onClick={onCreateBot}
            disabled={!isFormValid || isCreating}
            loading={isCreating}
            iconName="Plus"
            iconPosition="left"
            className="flex-2"
          >
            {isCreating ? 'Creating...' : 'Create Bot'}
          </Button>
        </div>
        
        <Button
          variant="ghost"
          onClick={onSaveDraft}
          disabled={isCreating}
          iconName="Save"
          iconPosition="left"
          className="w-full mt-2"
          size="sm"
        >
          Save Draft
        </Button>
      </div>

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-warning" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Unsaved Changes</h3>
                <p className="text-sm text-muted-foreground">
                  You have unsaved changes that will be lost.
                </p>
              </div>
            </div>

            <p className="text-sm text-foreground mb-6">
              Are you sure you want to leave without saving your bot configuration?
            </p>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowCancelModal(false)}
                className="flex-1"
              >
                Keep Editing
              </Button>
              
              <Button
                variant="destructive"
                onClick={confirmCancel}
                className="flex-1"
              >
                Discard Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormActions;