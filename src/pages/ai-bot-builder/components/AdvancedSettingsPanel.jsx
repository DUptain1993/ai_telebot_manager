import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const AdvancedSettingsPanel = ({ 
  temperature, 
  setTemperature, 
  maxTokens, 
  setMaxTokens,
  responseFormat,
  setResponseFormat,
  errors 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const responseFormatOptions = [
    { value: 'markdown', label: 'Markdown', description: 'Formatted text with code blocks' },
    { value: 'plain', label: 'Plain Text', description: 'Simple text responses' },
    { value: 'json', label: 'JSON', description: 'Structured JSON responses' },
    { value: 'code', label: 'Code Only', description: 'Focus on code snippets' }
  ];

  const getTemperatureDescription = (temp) => {
    if (temp <= 0.3) return 'Very focused and deterministic';
    if (temp <= 0.7) return 'Balanced creativity and consistency';
    if (temp <= 1.0) return 'Creative and varied responses';
    return 'Highly creative and unpredictable';
  };

  const getTemperatureColor = (temp) => {
    if (temp <= 0.3) return 'text-blue-600';
    if (temp <= 0.7) return 'text-green-600';
    if (temp <= 1.0) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Sliders" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Advanced Settings</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
      </div>
      {isExpanded && (
        <div className="space-y-6">
          {/* Temperature Slider */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-foreground">
                Temperature
              </label>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-mono text-foreground">{temperature}</span>
                <span className={`text-xs font-medium ${getTemperatureColor(temperature)}`}>
                  {getTemperatureDescription(temperature)}
                </span>
              </div>
            </div>
            
            <div className="relative">
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0 (Focused)</span>
                <span>1 (Balanced)</span>
                <span>2 (Creative)</span>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground mt-2">
              Controls randomness in responses. Lower values make output more focused and deterministic.
            </p>
          </div>

          {/* Max Tokens */}
          <Input
            label="Max Tokens"
            type="number"
            min="50"
            max="4000"
            value={maxTokens}
            onChange={(e) => setMaxTokens(parseInt(e?.target?.value) || 1000)}
            error={errors?.maxTokens}
            description="Maximum length of bot responses (50-4000 tokens)"
          />

          {/* Response Format */}
          <Select
            label="Response Format"
            description="How the bot should format its responses"
            options={responseFormatOptions}
            value={responseFormat}
            onChange={setResponseFormat}
            error={errors?.responseFormat}
          />

          {/* Performance Indicators */}
          <div className="p-4 bg-muted/30 rounded-lg border border-border">
            <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
              <Icon name="Gauge" size={16} className="mr-2" />
              Performance Estimate
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">
                  {temperature <= 0.5 ? 'Fast' : temperature <= 1.0 ? 'Medium' : 'Slower'}
                </div>
                <div className="text-xs text-muted-foreground">Response Speed</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-semibold text-foreground">
                  {maxTokens <= 1000 ? 'Low' : maxTokens <= 2000 ? 'Medium' : 'High'}
                </div>
                <div className="text-xs text-muted-foreground">Token Usage</div>
              </div>
            </div>
          </div>

          {/* Reset to Defaults */}
          <div className="pt-4 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setTemperature(0.7);
                setMaxTokens(1000);
                setResponseFormat('markdown');
              }}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Reset to Defaults
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSettingsPanel;