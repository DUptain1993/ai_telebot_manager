import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ApiCredentialsCard from './components/ApiCredentialsCard';
import ModelConfigurationCard from './components/ModelConfigurationCard';
import SecuritySettingsCard from './components/SecuritySettingsCard';
import ConfigurationActions from './components/ConfigurationActions';

const ApiConfigurationSettings = () => {
  // API Credentials State
  const [apiKey, setApiKey] = useState('vn_1234567890abcdef1234567890abcdef');
  const [connectionStatus, setConnectionStatus] = useState('connected');

  // Model Configuration State
  const [models, setModels] = useState([
    {
      id: 'gpt-4-turbo',
      name: 'GPT-4 Turbo',
      description: 'Most capable model for complex coding tasks',
      enabled: true,
      isNew: false,
      status: 'available',
      performance: {
        codeQuality: 95,
        responseSpeed: 85,
        contextUnderstanding: 92
      },
      pricing: {
        inputTokens: 0.01,
        outputTokens: 0.03
      },
      contextWindow: 128000,
      capabilities: ['Code Generation', 'Debugging', 'Refactoring', 'Documentation'],
      lastUsed: '2 hours ago',
      totalRequests: 1247
    },
    {
      id: 'claude-3-opus',
      name: 'Claude 3 Opus',
      description: 'Excellent for code analysis and complex reasoning',
      enabled: true,
      isNew: true,
      status: 'available',
      performance: {
        codeQuality: 93,
        responseSpeed: 78,
        contextUnderstanding: 96
      },
      pricing: {
        inputTokens: 0.015,
        outputTokens: 0.075
      },
      contextWindow: 200000,
      capabilities: ['Code Analysis', 'Architecture Design', 'Testing', 'Security Review'],
      lastUsed: '1 day ago',
      totalRequests: 892
    },
    {
      id: 'codellama-34b',
      name: 'CodeLlama 34B',
      description: 'Specialized model for code completion and generation',
      enabled: false,
      isNew: false,
      status: 'limited',
      performance: {
        codeQuality: 88,
        responseSpeed: 92,
        contextUnderstanding: 85
      },
      pricing: {
        inputTokens: 0.005,
        outputTokens: 0.015
      },
      contextWindow: 16000,
      capabilities: ['Code Completion', 'Syntax Fixing', 'Language Translation'],
      lastUsed: '1 week ago',
      totalRequests: 456
    },
    {
      id: 'gemini-pro',
      name: 'Gemini Pro',
      description: 'Google\'s advanced model for multimodal tasks',
      enabled: true,
      isNew: false,
      status: 'available',
      performance: {
        codeQuality: 90,
        responseSpeed: 88,
        contextUnderstanding: 89
      },
      pricing: {
        inputTokens: 0.0005,
        outputTokens: 0.0015
      },
      contextWindow: 32000,
      capabilities: ['Code Generation', 'Image Analysis', 'Data Processing'],
      lastUsed: '5 hours ago',
      totalRequests: 723
    },
    {
      id: 'mistral-large',
      name: 'Mistral Large',
      description: 'High-performance European model for coding',
      enabled: false,
      isNew: false,
      status: 'unavailable',
      performance: {
        codeQuality: 87,
        responseSpeed: 90,
        contextUnderstanding: 84
      },
      pricing: {
        inputTokens: 0.008,
        outputTokens: 0.024
      },
      contextWindow: 32000,
      capabilities: ['Code Generation', 'Multilingual Support', 'Performance Optimization'],
      lastUsed: '2 weeks ago',
      totalRequests: 234
    }
  ]);
  const [defaultModel, setDefaultModel] = useState('gpt-4-turbo');

  // Security Settings State
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('60');
  const [auditLogEnabled, setAuditLogEnabled] = useState(true);

  // Configuration State
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isServerRestarting, setIsServerRestarting] = useState(false);

  // Track changes for unsaved indicator
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [apiKey, models, defaultModel, encryptionEnabled, sessionTimeout, auditLogEnabled]);

  // API Credentials Handlers
  const handleApiKeyChange = (newApiKey) => {
    setApiKey(newApiKey);
    setConnectionStatus('untested');
  };

  const handleTestConnection = async () => {
    setConnectionStatus('testing');
    
    // Simulate API connection test
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock validation - check if API key follows expected format
    if (apiKey && apiKey?.startsWith('vn_') && apiKey?.length >= 32) {
      setConnectionStatus('connected');
    } else {
      setConnectionStatus('failed');
    }
  };

  // Model Configuration Handlers
  const handleModelToggle = (modelId, enabled) => {
    setModels(prevModels => 
      prevModels?.map(model => 
        model.id === modelId ? { ...model, enabled } : model
      )
    );
    
    // If disabling the default model, switch to first enabled model
    if (!enabled && defaultModel === modelId) {
      const firstEnabledModel = models?.find(m => m?.enabled && m?.id !== modelId);
      if (firstEnabledModel) {
        setDefaultModel(firstEnabledModel?.id);
      }
    }
  };

  const handleDefaultModelChange = (modelId) => {
    setDefaultModel(modelId);
    
    // Ensure the default model is enabled
    setModels(prevModels => 
      prevModels?.map(model => 
        model.id === modelId ? { ...model, enabled: true } : model
      )
    );
  };

  // Security Settings Handlers
  const handleEncryptionToggle = (enabled) => {
    setEncryptionEnabled(enabled);
  };

  const handleSessionTimeoutChange = (timeout) => {
    setSessionTimeout(timeout);
  };

  const handleAuditLogToggle = (enabled) => {
    setAuditLogEnabled(enabled);
  };

  const handleDownloadAuditLog = async () => {
    // Simulate audit log download
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create mock audit log data
    const auditData = `AI TeleBot Manager - Audit Log
Generated: ${new Date()?.toISOString()}
===========================================

[${new Date(Date.now() - 120000)?.toISOString()}] API_KEY_UPDATED - User updated Venice AI API key
[${new Date(Date.now() - 900000)?.toISOString()}] MODEL_CONFIG_CHANGED - Default model changed to gpt-4-turbo
[${new Date(Date.now() - 3600000)?.toISOString()}] CONNECTION_TEST_SUCCESS - API connection test successful
[${new Date(Date.now() - 10800000)?.toISOString()}] SESSION_TIMEOUT_UPDATED - Session timeout changed to 60 minutes
[${new Date(Date.now() - 86400000)?.toISOString()}] ENCRYPTION_ENABLED - End-to-end encryption activated
[${new Date(Date.now() - 172800000)?.toISOString()}] AUDIT_LOG_ENABLED - Audit logging activated
[${new Date(Date.now() - 259200000)?.toISOString()}] SERVER_RESTART - Configuration changes applied
`;

    // Create and download file
    const blob = new Blob([auditData], { type: 'text/plain' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-telebot-audit-log-${new Date()?.toISOString()?.split('T')?.[0]}.txt`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    window.URL?.revokeObjectURL(url);
  };

  // Configuration Actions Handlers
  const handleSaveConfiguration = async () => {
    setIsServerRestarting(true);
    
    // Simulate configuration save and server restart
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setHasUnsavedChanges(false);
    setIsServerRestarting(false);
  };

  const handleResetToDefaults = async () => {
    setIsServerRestarting(true);
    
    // Simulate reset process
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Reset all settings to defaults
    setApiKey('');
    setConnectionStatus('untested');
    setModels(prevModels => 
      prevModels?.map(model => ({
        ...model,
        enabled: model.id === 'gpt-4-turbo'
      }))
    );
    setDefaultModel('gpt-4-turbo');
    setEncryptionEnabled(false);
    setSessionTimeout('30');
    setAuditLogEnabled(false);
    
    setHasUnsavedChanges(false);
    setIsServerRestarting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  API Configuration Settings
                </h1>
                <p className="text-muted-foreground">
                  Manage Venice AI API credentials, model preferences, and security settings
                </p>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-success/10 rounded-lg">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-success">System Online</span>
              </div>
            </div>
          </div>

          {/* Configuration Cards */}
          <div className="space-y-8">
            {/* API Credentials */}
            <ApiCredentialsCard
              apiKey={apiKey}
              onApiKeyChange={handleApiKeyChange}
              connectionStatus={connectionStatus}
              onTestConnection={handleTestConnection}
            />

            {/* Model Configuration */}
            <ModelConfigurationCard
              models={models}
              onModelToggle={handleModelToggle}
              onDefaultModelChange={handleDefaultModelChange}
              defaultModel={defaultModel}
            />

            {/* Security Settings */}
            <SecuritySettingsCard
              encryptionEnabled={encryptionEnabled}
              onEncryptionToggle={handleEncryptionToggle}
              sessionTimeout={sessionTimeout}
              onSessionTimeoutChange={handleSessionTimeoutChange}
              auditLogEnabled={auditLogEnabled}
              onAuditLogToggle={handleAuditLogToggle}
              onDownloadAuditLog={handleDownloadAuditLog}
            />

            {/* Configuration Actions */}
            <ConfigurationActions
              onSaveConfiguration={handleSaveConfiguration}
              onResetToDefaults={handleResetToDefaults}
              hasUnsavedChanges={hasUnsavedChanges}
              isServerRestarting={isServerRestarting}
            />
          </div>

          {/* Footer Information */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Configuration Version</h4>
                <p className="text-xs text-muted-foreground">v2.1.3 - Updated {new Date()?.toLocaleDateString()}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">API Status</h4>
                <p className="text-xs text-success">Venice AI - Connected & Operational</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Security Level</h4>
                <p className="text-xs text-success">High - All security features enabled</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApiConfigurationSettings;