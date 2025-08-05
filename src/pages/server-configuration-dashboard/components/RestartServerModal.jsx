import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RestartServerModal = ({ isOpen, onClose, onConfirm }) => {
  const [isRestarting, setIsRestarting] = useState(false);
  const [restartReason, setRestartReason] = useState('');

  const handleRestart = async () => {
    setIsRestarting(true);
    try {
      await onConfirm(restartReason);
      // Modal will be closed by parent component
    } catch (error) {
      console.error('Restart failed:', error);
    } finally {
      setIsRestarting(false);
    }
  };

  const handleClose = () => {
    if (!isRestarting) {
      setRestartReason('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={handleClose}
      />
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-card border border-border rounded-lg shadow-xl w-full max-w-md">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Icon name="RotateCcw" size={20} className="text-warning" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Restart Server
                </h3>
                <p className="text-sm text-muted-foreground">
                  This action will temporarily interrupt service
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              disabled={isRestarting}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                <div className="text-sm">
                  <p className="text-foreground font-medium mb-1">
                    Warning: Service Interruption
                  </p>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• All active connections will be terminated</li>
                    <li>• Server will be unavailable for 10-30 seconds</li>
                    <li>• SSL certificates will be reloaded</li>
                    <li>• Tunnel connections will be re-established</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Reason for restart (optional)
              </label>
              <textarea
                value={restartReason}
                onChange={(e) => setRestartReason(e?.target?.value)}
                placeholder="e.g., Certificate update, configuration changes..."
                className="w-full h-20 px-3 py-2 text-sm border border-border rounded-md resize-none bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                disabled={isRestarting}
              />
            </div>

            {isRestarting && (
              <div className="bg-muted/30 border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin">
                    <Icon name="Loader2" size={16} className="text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="text-foreground font-medium">Restarting server...</p>
                    <p className="text-muted-foreground">Please wait while the server restarts.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isRestarting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRestart}
              loading={isRestarting}
              iconName="RotateCcw"
              iconPosition="left"
            >
              {isRestarting ? 'Restarting...' : 'Restart Server'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestartServerModal;