import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConfigurationActions = ({ 
  onSaveConfiguration, 
  onResetToDefaults, 
  hasUnsavedChanges,
  isServerRestarting 
}) => {
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleSaveConfiguration = async () => {
    setIsSaving(true);
    await onSaveConfiguration();
    setIsSaving(false);
    setShowSaveConfirmation(false);
  };

  const handleResetToDefaults = async () => {
    setIsResetting(true);
    await onResetToDefaults();
    setIsResetting(false);
    setShowResetConfirmation(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Settings" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Configuration Actions</h3>
            <p className="text-sm text-muted-foreground">Save changes or restore defaults</p>
          </div>
        </div>
        {hasUnsavedChanges && (
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-warning/10 rounded-full">
            <Icon name="AlertCircle" size={14} className="text-warning" />
            <span className="text-xs font-medium text-warning">Unsaved Changes</span>
          </div>
        )}
      </div>
      {/* Server Restart Notification */}
      {isServerRestarting && (
        <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-md">
          <div className="flex items-center space-x-3">
            <Icon name="RefreshCw" size={16} className="text-primary animate-spin" />
            <div>
              <p className="text-sm font-medium text-primary">Server Restarting</p>
              <p className="text-xs text-muted-foreground">
                Configuration changes are being applied. This may take a few moments.
              </p>
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="default"
          onClick={() => setShowSaveConfirmation(true)}
          disabled={!hasUnsavedChanges || isServerRestarting}
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
          className="flex-1"
        >
          Save Configuration
        </Button>
        
        <Button
          variant="outline"
          onClick={() => setShowResetConfirmation(true)}
          disabled={isServerRestarting}
          loading={isResetting}
          iconName="RotateCcw"
          iconPosition="left"
          className="flex-1"
        >
          Reset to Defaults
        </Button>
      </div>
      {/* Configuration Status */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Last Saved</p>
              <p className="text-sm font-medium text-foreground">
                {new Date()?.toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="User" size={16} className="text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Modified By</p>
              <p className="text-sm font-medium text-foreground">System Admin</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="GitBranch" size={16} className="text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Config Version</p>
              <p className="text-sm font-medium text-foreground">v2.1.3</p>
            </div>
          </div>
        </div>
      </div>
      {/* Save Confirmation Modal */}
      {showSaveConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Save" size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground">Save Configuration</h4>
                <p className="text-sm text-muted-foreground">Confirm configuration changes</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-foreground mb-3">
                This will save your current configuration and restart the server to apply changes.
              </p>
              <div className="p-3 bg-warning/10 border border-warning/20 rounded-md">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertTriangle" size={14} className="text-warning mt-0.5" />
                  <p className="text-xs text-warning">
                    Server restart may temporarily interrupt active connections.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowSaveConfirmation(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleSaveConfiguration}
                loading={isSaving}
                className="flex-1"
              >
                Save & Restart
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Reset Confirmation Modal */}
      {showResetConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-error" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground">Reset to Defaults</h4>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-foreground mb-3">
                This will reset all configuration settings to their default values and restart the server.
              </p>
              <div className="p-3 bg-error/10 border border-error/20 rounded-md">
                <div className="flex items-start space-x-2">
                  <Icon name="XCircle" size={14} className="text-error mt-0.5" />
                  <p className="text-xs text-error">
                    All custom API keys, model preferences, and security settings will be lost.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowResetConfirmation(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleResetToDefaults}
                loading={isResetting}
                className="flex-1"
              >
                Reset All Settings
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfigurationActions;