import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const AIConfigurationSection = ({ 
  selectedModel, 
  setSelectedModel, 
  systemPrompt, 
  setSystemPrompt,
  selectedTags,
  setSelectedTags,
  errors 
}) => {
  const [showPromptHelp, setShowPromptHelp] = useState(false);

  const modelOptions = [
    { 
      value: 'gpt-4', 
      label: 'GPT-4', 
      description: 'Most capable model, best for complex coding tasks'
    },
    { 
      value: 'gpt-3.5-turbo', 
      label: 'GPT-3.5 Turbo', 
      description: 'Fast and efficient for most coding assistance'
    },
    { 
      value: 'claude-3', 
      label: 'Claude 3', 
      description: 'Excellent for code analysis and debugging'
    },
    { 
      value: 'codellama', 
      label: 'Code Llama', 
      description: 'Specialized for code generation and completion'
    }
  ];

  const specializationTags = [
    'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java',
    'C++', 'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'C#',
    'Vue.js', 'Angular', 'Django', 'Flask', 'Express', 'Spring',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'DevOps',
    'Machine Learning', 'Data Science', 'API Development', 'Database'
  ];

  const handleTagToggle = (tag) => {
    if (selectedTags?.includes(tag)) {
      setSelectedTags(selectedTags?.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const promptExamples = [
    {
      title: "Python Expert",
      prompt: `You are a Python expert assistant specializing in clean, efficient code. Focus on:\n- Writing Pythonic code following PEP 8\n- Explaining complex concepts clearly\n- Suggesting best practices and optimizations\n- Helping with debugging and error resolution`
    },
    {
      title: "React Developer",
      prompt: `You are a React development assistant. Your expertise includes:\n- Modern React patterns and hooks\n- Component architecture and state management\n- Performance optimization techniques\n- Testing strategies with Jest and React Testing Library`
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Settings" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">AI Configuration</h2>
      </div>
      <div className="space-y-6">
        {/* Model Selection */}
        <Select
          label="AI Model"
          description="Choose the AI model that best fits your bot's purpose"
          options={modelOptions}
          value={selectedModel}
          onChange={setSelectedModel}
          error={errors?.selectedModel}
          required
          searchable
        />

        {/* System Prompt */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-foreground">
              System Prompt
              <span className="text-error ml-1">*</span>
            </label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPromptHelp(!showPromptHelp)}
              iconName="HelpCircle"
              iconPosition="left"
            >
              Examples
            </Button>
          </div>

          {showPromptHelp && (
            <div className="mb-4 p-4 bg-muted/30 rounded-lg border border-border">
              <h4 className="text-sm font-medium text-foreground mb-3">Prompt Examples:</h4>
              <div className="space-y-3">
                {promptExamples?.map((example, index) => (
                  <div key={index} className="p-3 bg-card rounded border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-sm font-medium text-foreground">{example?.title}</h5>
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => setSystemPrompt(example?.prompt)}
                      >
                        Use This
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground whitespace-pre-line">
                      {example?.prompt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e?.target?.value)}
            placeholder="Define your bot's personality, expertise, and response style. Be specific about the programming languages, frameworks, or domains it should specialize in..."
            rows={8}
            className={`w-full px-3 py-2 border rounded-md text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors ${
              errors?.systemPrompt 
                ? 'border-error focus:ring-error' :'border-border focus:ring-primary'
            }`}
          />
          {errors?.systemPrompt && (
            <p className="mt-1 text-sm text-error">{errors?.systemPrompt}</p>
          )}
          <div className="flex justify-between mt-1">
            <p className="text-xs text-muted-foreground">
              Use clear instructions to define your bot's behavior and expertise
            </p>
            <p className="text-xs text-muted-foreground">
              {systemPrompt?.length}/2000 characters
            </p>
          </div>
        </div>

        {/* Specialization Tags */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Specialization Tags
          </label>
          <p className="text-xs text-muted-foreground mb-4">
            Select technologies and domains your bot specializes in (max 8 tags)
          </p>
          
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2 border border-border rounded-lg">
            {specializationTags?.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                disabled={!selectedTags?.includes(tag) && selectedTags?.length >= 8}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                  selectedTags?.includes(tag)
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-foreground border-border hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                {tag}
                {selectedTags?.includes(tag) && (
                  <Icon name="X" size={12} className="ml-1 inline" />
                )}
              </button>
            ))}
          </div>
          
          {selectedTags?.length > 0 && (
            <div className="mt-3 p-3 bg-muted/30 rounded-lg">
              <p className="text-xs font-medium text-foreground mb-2">
                Selected ({selectedTags?.length}/8):
              </p>
              <div className="flex flex-wrap gap-1">
                {selectedTags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIConfigurationSection;