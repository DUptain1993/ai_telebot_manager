import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const CertificateManager = () => {
  const [activeTab, setActiveTab] = useState('auto-generate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [certificateText, setCertificateText] = useState('');
  const [privateKeyText, setPrivateKeyText] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleAutoGenerate = async () => {
    setIsGenerating(true);
    try {
      // Simulate certificate generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      setUploadStatus({
        type: 'success',
        message: 'Self-signed certificate generated successfully!'
      });
    } catch (error) {
      setUploadStatus({
        type: 'error',
        message: 'Failed to generate certificate. Please try again.'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const validateCertificate = (cert) => {
    if (!cert?.trim()) return 'Certificate is required';
    if (!cert?.includes('-----BEGIN CERTIFICATE-----')) {
      return 'Invalid certificate format. Must start with -----BEGIN CERTIFICATE-----';
    }
    if (!cert?.includes('-----END CERTIFICATE-----')) {
      return 'Invalid certificate format. Must end with -----END CERTIFICATE-----';
    }
    return null;
  };

  const validatePrivateKey = (key) => {
    if (!key?.trim()) return 'Private key is required';
    if (!key?.includes('-----BEGIN PRIVATE KEY-----') && !key?.includes('-----BEGIN RSA PRIVATE KEY-----')) {
      return 'Invalid private key format';
    }
    return null;
  };

  const handleUploadCertificate = () => {
    const errors = {};
    
    const certError = validateCertificate(certificateText);
    const keyError = validatePrivateKey(privateKeyText);
    
    if (certError) errors.certificate = certError;
    if (keyError) errors.privateKey = keyError;
    
    setValidationErrors(errors);
    
    if (Object.keys(errors)?.length === 0) {
      setUploadStatus({
        type: 'success',
        message: 'Certificate uploaded and validated successfully!'
      });
      // Here you would typically send the certificate to your backend
    } else {
      setUploadStatus({
        type: 'error',
        message: 'Please fix the validation errors above.'
      });
    }
  };

  const tabs = [
    { id: 'auto-generate', label: 'Auto-Generate', icon: 'Zap' },
    { id: 'upload', label: 'Upload Certificate', icon: 'Upload' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Tab Headers */}
      <div className="border-b border-border">
        <div className="flex">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => {
                setActiveTab(tab?.id);
                setUploadStatus(null);
                setValidationErrors({});
              }}
              className={`
                flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors duration-200
                ${activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }
              `}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'auto-generate' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Generate Self-Signed Certificate
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Automatically generate a self-signed SSL certificate for development and testing purposes.
              </p>
            </div>

            <div className="bg-muted/30 border border-border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-primary mt-0.5" />
                <div className="text-sm">
                  <p className="text-foreground font-medium mb-1">Certificate Details:</p>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Valid for 365 days</li>
                    <li>• RSA 2048-bit encryption</li>
                    <li>• Subject: localhost</li>
                    <li>• Includes SAN for 127.0.0.1</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button
              onClick={handleAutoGenerate}
              loading={isGenerating}
              iconName="Zap"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              {isGenerating ? 'Generating Certificate...' : 'Generate Certificate'}
            </Button>

            {isGenerating && (
              <div className="bg-muted/30 border border-border rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <div className="animate-spin">
                    <Icon name="Loader2" size={16} className="text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="text-foreground font-medium">Generating certificate...</p>
                    <p className="text-muted-foreground">This may take a few moments.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Upload SSL Certificate
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Upload your own SSL certificate and private key files.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  SSL Certificate
                </label>
                <textarea
                  value={certificateText}
                  onChange={(e) => {
                    setCertificateText(e?.target?.value);
                    if (validationErrors?.certificate) {
                      setValidationErrors(prev => ({ ...prev, certificate: null }));
                    }
                  }}
                  placeholder="-----BEGIN CERTIFICATE-----&#10;MIIDXTCCAkWgAwIBAgIJAKoK/OvD...&#10;-----END CERTIFICATE-----"
                  className={`
                    w-full h-32 px-3 py-2 text-sm border rounded-md resize-none font-mono
                    ${validationErrors?.certificate 
                      ? 'border-error focus:ring-error' :'border-border focus:ring-ring'
                    }
                    bg-background text-foreground placeholder:text-muted-foreground
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                  `}
                />
                {validationErrors?.certificate && (
                  <p className="mt-1 text-sm text-error flex items-center space-x-1">
                    <Icon name="AlertCircle" size={14} />
                    <span>{validationErrors?.certificate}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Private Key
                </label>
                <textarea
                  value={privateKeyText}
                  onChange={(e) => {
                    setPrivateKeyText(e?.target?.value);
                    if (validationErrors?.privateKey) {
                      setValidationErrors(prev => ({ ...prev, privateKey: null }));
                    }
                  }}
                  placeholder="-----BEGIN PRIVATE KEY-----&#10;MIIEvQIBADANBgkqhkiG9w0BAQEF...&#10;-----END PRIVATE KEY-----"
                  className={`
                    w-full h-32 px-3 py-2 text-sm border rounded-md resize-none font-mono
                    ${validationErrors?.privateKey 
                      ? 'border-error focus:ring-error' :'border-border focus:ring-ring'
                    }
                    bg-background text-foreground placeholder:text-muted-foreground
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                  `}
                />
                {validationErrors?.privateKey && (
                  <p className="mt-1 text-sm text-error flex items-center space-x-1">
                    <Icon name="AlertCircle" size={14} />
                    <span>{validationErrors?.privateKey}</span>
                  </p>
                )}
              </div>
            </div>

            <Button
              onClick={handleUploadCertificate}
              iconName="Upload"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Upload Certificate
            </Button>
          </div>
        )}

        {/* Status Messages */}
        {uploadStatus && (
          <div className={`
            mt-6 p-4 rounded-lg border flex items-start space-x-3
            ${uploadStatus?.type === 'success' ?'bg-success/10 border-success/20 text-success' :'bg-error/10 border-error/20 text-error'
            }
          `}>
            <Icon 
              name={uploadStatus?.type === 'success' ? 'CheckCircle' : 'XCircle'} 
              size={16} 
              className="mt-0.5" 
            />
            <p className="text-sm font-medium">{uploadStatus?.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateManager;