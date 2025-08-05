import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ApiCredentialsCard = ({ apiKey, onApiKeyChange, connectionStatus, onTestConnection }) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    await onTestConnection();
    setIsTestingConnection(false);
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-success';
      case 'failed':
        return 'text-error';
      case 'testing':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'CheckCircle';
      case 'failed':
        return 'XCircle';
      case 'testing':
        return 'Clock';
      default:
        return 'Circle';
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'API connection verified';
      case 'failed':
        return 'Connection failed - check API key';
      case 'testing':
        return 'Testing connection...';
      default:
        return 'Not tested';
    }
  };

  const maskApiKey = (key) => {
    if (!key) return '';
    if (key?.length <= 8) return '*'?.repeat(key?.length);
    return key?.substring(0, 4) + '*'?.repeat(key?.length - 8) + key?.substring(key?.length - 4);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Key" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">API Credentials</h3>
            <p className="text-sm text-muted-foreground">Manage Venice AI API access</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-xs text-success font-medium">Encrypted</span>
        </div>
      </div>
      <div className="space-y-6">
        {/* API Key Input */}
        <div className="space-y-3">
          <div className="relative">
            <Input
              label="Venice AI API Key"
              type={showApiKey ? "text" : "password"}
              placeholder="Enter your Venice AI API key"
              value={showApiKey ? apiKey : maskApiKey(apiKey)}
              onChange={(e) => onApiKeyChange(e?.target?.value)}
              description="Your API key is encrypted and stored securely"
              className="pr-12"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-8 p-1 rounded-md hover:bg-muted transition-colors"
              aria-label={showApiKey ? "Hide API key" : "Show API key"}
            >
              <Icon name={showApiKey ? "EyeOff" : "Eye"} size={16} className="text-muted-foreground" />
            </button>
          </div>

          {/* Connection Status */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
            <div className={`flex items-center space-x-2 ${getConnectionStatusColor()}`}>
              <Icon 
                name={getConnectionStatusIcon()} 
                size={16} 
                className={connectionStatus === 'testing' ? 'animate-spin' : ''} 
              />
              <span className="text-sm font-medium">
                {getConnectionStatusText()}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleTestConnection}
              loading={isTestingConnection}
              disabled={!apiKey || isTestingConnection}
              iconName="Zap"
              iconPosition="left"
            >
              Test Connection
            </Button>
          </div>
        </div>

        {/* API Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/20 rounded-md">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Globe" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Endpoint</span>
            </div>
            <p className="text-sm text-muted-foreground font-mono">
              https://api.venice.ai/v1
            </p>
          </div>
          <div className="p-4 bg-muted/20 rounded-md">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Timeout</span>
            </div>
            <p className="text-sm text-muted-foreground">
              30 seconds
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-start space-x-3 p-4 bg-warning/10 border border-warning/20 rounded-md">
          <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
          <div>
            <p className="text-sm font-medium text-warning">Security Notice</p>
            <p className="text-xs text-muted-foreground mt-1">
              API keys are encrypted using AES-256 encryption and stored locally. Never share your API key with unauthorized users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiCredentialsCard;