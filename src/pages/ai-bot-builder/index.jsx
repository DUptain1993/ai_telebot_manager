import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import BotIdentitySection from './components/BotIdentitySection';
import AIConfigurationSection from './components/AIConfigurationSection';
import AdvancedSettingsPanel from './components/AdvancedSettingsPanel';
import BotPreviewSidebar from './components/BotPreviewSidebar';
import FormActions from './components/FormActions';
import Icon from '../../components/AppIcon';

const AIBotBuilder = () => {
  const navigate = useNavigate();

  // Form state
  const [botName, setBotName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedModel, setSelectedModel] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1000);
  const [responseFormat, setResponseFormat] = useState('markdown');
  
  // UI state
  const [errors, setErrors] = useState({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Track changes for unsaved indicator
  useEffect(() => {
    const hasChanges = botName || description || selectedAvatar || selectedModel || 
                      systemPrompt || selectedTags?.length > 0;
    setHasUnsavedChanges(hasChanges);
  }, [botName, description, selectedAvatar, selectedModel, systemPrompt, selectedTags]);

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!botName?.trim()) {
      newErrors.botName = 'Bot name is required';
    } else if (botName?.length < 3) {
      newErrors.botName = 'Bot name must be at least 3 characters';
    }

    if (!description?.trim()) {
      newErrors.description = 'Description is required';
    } else if (description?.length < 20) {
      newErrors.description = 'Description must be at least 20 characters';
    } else if (description?.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    if (!selectedModel) {
      newErrors.selectedModel = 'Please select an AI model';
    }

    if (!systemPrompt?.trim()) {
      newErrors.systemPrompt = 'System prompt is required';
    } else if (systemPrompt?.length < 50) {
      newErrors.systemPrompt = 'System prompt must be at least 50 characters';
    } else if (systemPrompt?.length > 2000) {
      newErrors.systemPrompt = 'System prompt must be less than 2000 characters';
    }

    if (maxTokens < 50 || maxTokens > 4000) {
      newErrors.maxTokens = 'Max tokens must be between 50 and 4000';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const isFormValid = () => {
    return botName?.trim() && 
           description?.trim() && 
           selectedModel && 
           systemPrompt?.trim() &&
           botName?.length >= 3 &&
           description?.length >= 20 &&
           description?.length <= 500 &&
           systemPrompt?.length >= 50 &&
           systemPrompt?.length <= 2000 &&
           maxTokens >= 50 &&
           maxTokens <= 4000;
  };

  const handleCreateBot = async () => {
    if (!validateForm()) return;

    setIsCreating(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const botData = {
        id: Date.now(),
        name: botName,
        description,
        avatar: selectedAvatar,
        model: selectedModel,
        systemPrompt,
        tags: selectedTags,
        temperature,
        maxTokens,
        responseFormat,
        createdAt: new Date()?.toISOString(),
        status: 'active'
      };

      // Save to localStorage (mock database)
      const existingBots = JSON.parse(localStorage.getItem('aiBots') || '[]');
      existingBots?.push(botData);
      localStorage.setItem('aiBots', JSON.stringify(existingBots));

      // Success feedback
      setHasUnsavedChanges(false);
      
      // Navigate to dashboard with success message
      navigate('/bot-management-dashboard', { 
        state: { 
          message: `Bot "${botName}" created successfully!`,
          type: 'success'
        }
      });
      
    } catch (error) {
      console.error('Error creating bot:', error);
      setErrors({ general: 'Failed to create bot. Please try again.' });
    } finally {
      setIsCreating(false);
    }
  };

  const handleSaveDraft = () => {
    const draftData = {
      botName,
      description,
      selectedAvatar,
      selectedModel,
      systemPrompt,
      selectedTags,
      temperature,
      maxTokens,
      responseFormat,
      savedAt: new Date()?.toISOString()
    };

    localStorage.setItem('botBuilderDraft', JSON.stringify(draftData));
    setLastSaved(new Date());
    setHasUnsavedChanges(false);
    
    // Show success feedback
    const successMessage = document.createElement('div');
    successMessage.className = 'fixed top-20 right-4 bg-success text-success-foreground px-4 py-2 rounded-lg shadow-lg z-50';
    successMessage.textContent = 'Draft saved successfully!';
    document.body?.appendChild(successMessage);
    
    setTimeout(() => {
      document.body?.removeChild(successMessage);
    }, 3000);
  };

  const handleCancel = () => {
    navigate('/bot-management-dashboard');
  };

  // Load draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('botBuilderDraft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setBotName(draft?.botName || '');
        setDescription(draft?.description || '');
        setSelectedAvatar(draft?.selectedAvatar || null);
        setSelectedModel(draft?.selectedModel || '');
        setSystemPrompt(draft?.systemPrompt || '');
        setSelectedTags(draft?.selectedTags || []);
        setTemperature(draft?.temperature || 0.7);
        setMaxTokens(draft?.maxTokens || 1000);
        setResponseFormat(draft?.responseFormat || 'markdown');
        setLastSaved(new Date(draft.savedAt));
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/bot-management-dashboard', icon: 'LayoutDashboard' },
    { label: 'Create Bot', path: '/ai-bot-builder', icon: 'Bot', isActive: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb customItems={breadcrumbItems} />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Bot" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Create AI Bot</h1>
                <p className="text-muted-foreground">
                  Build a specialized AI coding assistant tailored to your needs
                </p>
              </div>
            </div>
            
            {lastSaved && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={14} />
                <span>Last saved: {lastSaved?.toLocaleTimeString()}</span>
              </div>
            )}
          </div>

          {/* Error Display */}
          {errors?.general && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-error" />
                <p className="text-sm text-error">{errors?.general}</p>
              </div>
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Sections */}
            <div className="lg:col-span-8 space-y-8">
              <BotIdentitySection
                botName={botName}
                setBotName={setBotName}
                description={description}
                setDescription={setDescription}
                selectedAvatar={selectedAvatar}
                setSelectedAvatar={setSelectedAvatar}
                errors={errors}
              />

              <AIConfigurationSection
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
                systemPrompt={systemPrompt}
                setSystemPrompt={setSystemPrompt}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                errors={errors}
              />

              <AdvancedSettingsPanel
                temperature={temperature}
                setTemperature={setTemperature}
                maxTokens={maxTokens}
                setMaxTokens={setMaxTokens}
                responseFormat={responseFormat}
                setResponseFormat={setResponseFormat}
                errors={errors}
              />

              <FormActions
                onCreateBot={handleCreateBot}
                onSaveDraft={handleSaveDraft}
                onCancel={handleCancel}
                isFormValid={isFormValid()}
                hasUnsavedChanges={hasUnsavedChanges}
                isCreating={isCreating}
              />
            </div>

            {/* Preview Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <BotPreviewSidebar
                  botName={botName}
                  description={description}
                  selectedAvatar={selectedAvatar}
                  selectedModel={selectedModel}
                  systemPrompt={systemPrompt}
                  selectedTags={selectedTags}
                  temperature={temperature}
                  maxTokens={maxTokens}
                  responseFormat={responseFormat}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile spacing for sticky actions */}
        <div className="md:hidden h-32"></div>
      </main>
    </div>
  );
};

export default AIBotBuilder;