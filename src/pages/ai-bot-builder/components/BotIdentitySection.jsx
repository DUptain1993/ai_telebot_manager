import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BotIdentitySection = ({ 
  botName, 
  setBotName, 
  description, 
  setDescription, 
  selectedAvatar, 
  setSelectedAvatar,
  errors 
}) => {
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  const avatarOptions = [
    { id: 'bot-1', name: 'Classic Bot', icon: 'Bot', color: 'bg-blue-500' },
    { id: 'bot-2', name: 'Code Assistant', icon: 'Code', color: 'bg-green-500' },
    { id: 'bot-3', name: 'Terminal Bot', icon: 'Terminal', color: 'bg-purple-500' },
    { id: 'bot-4', name: 'AI Helper', icon: 'Sparkles', color: 'bg-orange-500' },
    { id: 'bot-5', name: 'Debug Bot', icon: 'Bug', color: 'bg-red-500' },
    { id: 'bot-6', name: 'Data Bot', icon: 'Database', color: 'bg-indigo-500' }
  ];

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    setShowAvatarPicker(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="User" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Bot Identity</h2>
      </div>
      <div className="space-y-6">
        {/* Bot Name */}
        <Input
          label="Bot Name"
          type="text"
          placeholder="e.g., Python Expert, React Helper"
          value={botName}
          onChange={(e) => setBotName(e?.target?.value)}
          error={errors?.botName}
          required
          description="Choose a descriptive name for your AI assistant"
        />

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Description
            <span className="text-error ml-1">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e?.target?.value)}
            placeholder="Describe what this bot specializes in and how it can help developers..."
            rows={4}
            className={`w-full px-3 py-2 border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors ${
              errors?.description 
                ? 'border-error focus:ring-error' :'border-border focus:ring-primary'
            }`}
          />
          {errors?.description && (
            <p className="mt-1 text-sm text-error">{errors?.description}</p>
          )}
          <p className="mt-1 text-xs text-muted-foreground">
            {description?.length}/500 characters
          </p>
        </div>

        {/* Avatar Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Avatar
          </label>
          
          {/* Current Avatar Display */}
          <div className="flex items-center space-x-4 mb-4">
            <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${
              selectedAvatar ? selectedAvatar?.color : 'bg-muted'
            }`}>
              <Icon 
                name={selectedAvatar ? selectedAvatar?.icon : 'Bot'} 
                size={24} 
                color="white" 
              />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {selectedAvatar ? selectedAvatar?.name : 'No avatar selected'}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                iconName={showAvatarPicker ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
              >
                {showAvatarPicker ? 'Hide Options' : 'Choose Avatar'}
              </Button>
            </div>
          </div>

          {/* Avatar Picker */}
          {showAvatarPicker && (
            <div className="grid grid-cols-3 gap-3 p-4 bg-muted/30 rounded-lg border border-border">
              {avatarOptions?.map((avatar) => (
                <button
                  key={avatar?.id}
                  onClick={() => handleAvatarSelect(avatar)}
                  className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                    selectedAvatar?.id === avatar?.id
                      ? 'border-primary bg-primary/10' :'border-border hover:border-primary/50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${avatar?.color}`}>
                    <Icon name={avatar?.icon} size={20} color="white" />
                  </div>
                  <span className="text-xs font-medium text-foreground text-center">
                    {avatar?.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BotIdentitySection;