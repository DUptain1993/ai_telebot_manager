import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ModelConfigurationCard = ({ models, onModelToggle, onDefaultModelChange, defaultModel }) => {
  const [expandedModels, setExpandedModels] = useState(new Set());

  const toggleModelExpansion = (modelId) => {
    const newExpanded = new Set(expandedModels);
    if (newExpanded?.has(modelId)) {
      newExpanded?.delete(modelId);
    } else {
      newExpanded?.add(modelId);
    }
    setExpandedModels(newExpanded);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-success';
      case 'limited':
        return 'text-warning';
      case 'unavailable':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return 'CheckCircle';
      case 'limited':
        return 'AlertCircle';
      case 'unavailable':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getPerformanceColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Brain" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Model Configuration</h3>
            <p className="text-sm text-muted-foreground">Configure AI models and preferences</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">
            {models?.filter(m => m?.enabled)?.length} of {models?.length} enabled
          </span>
        </div>
      </div>
      <div className="space-y-4">
        {models?.map((model) => (
          <div key={model.id} className="border border-border rounded-lg overflow-hidden">
            {/* Model Header */}
            <div className="p-4 bg-muted/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    checked={model.enabled}
                    onChange={(e) => onModelToggle(model.id, e?.target?.checked)}
                  />
                  <div className="flex items-center space-x-3">
                    <div>
                      <h4 className="font-medium text-foreground">{model.name}</h4>
                      <p className="text-sm text-muted-foreground">{model.description}</p>
                    </div>
                    {model.isNew && (
                      <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                        New
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {/* Default Model Radio */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={`default-${model.id}`}
                      name="defaultModel"
                      checked={defaultModel === model.id}
                      onChange={() => onDefaultModelChange(model.id)}
                      disabled={!model.enabled}
                      className="w-4 h-4 text-primary focus:ring-primary border-border"
                    />
                    <label 
                      htmlFor={`default-${model.id}`} 
                      className="text-sm text-muted-foreground cursor-pointer"
                    >
                      Default
                    </label>
                  </div>
                  
                  {/* Status */}
                  <div className={`flex items-center space-x-1 ${getStatusColor(model.status)}`}>
                    <Icon name={getStatusIcon(model.status)} size={14} />
                    <span className="text-xs font-medium capitalize">{model.status}</span>
                  </div>
                  
                  {/* Expand Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleModelExpansion(model.id)}
                    className="h-8 w-8"
                  >
                    <Icon 
                      name={expandedModels?.has(model.id) ? "ChevronUp" : "ChevronDown"} 
                      size={16} 
                    />
                  </Button>
                </div>
              </div>
            </div>

            {/* Expanded Model Details */}
            {expandedModels?.has(model.id) && (
              <div className="p-4 border-t border-border bg-card">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {/* Performance Metrics */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-medium text-foreground">Performance</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Code Quality</span>
                        <span className={`text-xs font-medium ${getPerformanceColor(model.performance?.codeQuality)}`}>
                          {model.performance?.codeQuality}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Response Speed</span>
                        <span className={`text-xs font-medium ${getPerformanceColor(model.performance?.responseSpeed)}`}>
                          {model.performance?.responseSpeed}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Context Understanding</span>
                        <span className={`text-xs font-medium ${getPerformanceColor(model.performance?.contextUnderstanding)}`}>
                          {model.performance?.contextUnderstanding}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Information */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-medium text-foreground">Pricing</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Input Tokens</span>
                        <span className="text-xs font-medium text-foreground">
                          ${model.pricing?.inputTokens}/1K
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Output Tokens</span>
                        <span className="text-xs font-medium text-foreground">
                          ${model.pricing?.outputTokens}/1K
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Context Window</span>
                        <span className="text-xs font-medium text-foreground">
                          {model.contextWindow?.toLocaleString()} tokens
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Capabilities */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-medium text-foreground">Capabilities</h5>
                    <div className="flex flex-wrap gap-1">
                      {model.capabilities?.map((capability, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                        >
                          {capability}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Usage Statistics */}
                <div className="pt-3 border-t border-border">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Last used: {model.lastUsed}</span>
                    <span>Total requests: {model.totalRequests?.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Model Actions */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Changes will apply to new conversations
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                models?.forEach(model => onModelToggle(model.id, true));
              }}
            >
              Enable All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                models?.forEach(model => onModelToggle(model.id, false));
              }}
            >
              Disable All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelConfigurationCard;