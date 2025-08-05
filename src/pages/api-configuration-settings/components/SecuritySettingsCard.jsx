import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SecuritySettingsCard = ({ 
  encryptionEnabled, 
  onEncryptionToggle, 
  sessionTimeout, 
  onSessionTimeoutChange,
  auditLogEnabled,
  onAuditLogToggle,
  onDownloadAuditLog 
}) => {
  const [isDownloadingLog, setIsDownloadingLog] = useState(false);

  const timeoutOptions = [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '120', label: '2 hours' },
    { value: '240', label: '4 hours' },
    { value: '480', label: '8 hours' },
    { value: 'never', label: 'Never expire' }
  ];

  const handleDownloadLog = async () => {
    setIsDownloadingLog(true);
    await onDownloadAuditLog();
    setIsDownloadingLog(false);
  };

  const getSecurityLevel = () => {
    let level = 0;
    if (encryptionEnabled) level += 40;
    if (auditLogEnabled) level += 30;
    if (sessionTimeout !== 'never' && parseInt(sessionTimeout) <= 60) level += 30;
    
    if (level >= 80) return { level: 'High', color: 'text-success', bgColor: 'bg-success/10' };
    if (level >= 50) return { level: 'Medium', color: 'text-warning', bgColor: 'bg-warning/10' };
    return { level: 'Low', color: 'text-error', bgColor: 'bg-error/10' };
  };

  const securityLevel = getSecurityLevel();

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Security Settings</h3>
            <p className="text-sm text-muted-foreground">Configure security and privacy options</p>
          </div>
        </div>
        <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${securityLevel?.bgColor}`}>
          <Icon name="Shield" size={14} className={securityLevel?.color} />
          <span className={`text-xs font-medium ${securityLevel?.color}`}>
            {securityLevel?.level} Security
          </span>
        </div>
      </div>
      <div className="space-y-6">
        {/* Encryption Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Data Encryption</h4>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-4 border border-border rounded-md">
              <Checkbox
                checked={encryptionEnabled}
                onChange={(e) => onEncryptionToggle(e?.target?.checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-foreground">
                    Enable End-to-End Encryption
                  </span>
                  <Icon name="Lock" size={14} className="text-success" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Encrypt all API communications and stored data using AES-256 encryption. 
                  This ensures maximum security for sensitive information.
                </p>
              </div>
            </div>

            {encryptionEnabled && (
              <div className="ml-6 p-3 bg-success/5 border border-success/20 rounded-md">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="CheckCircle" size={14} className="text-success" />
                  <span className="text-xs font-medium text-success">Encryption Active</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-muted-foreground">
                  <div>
                    <span className="font-medium">Algorithm:</span> AES-256-GCM
                  </div>
                  <div>
                    <span className="font-medium">Key Rotation:</span> Every 30 days
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Session Management */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Session Management</h4>
          <div className="space-y-3">
            <Select
              label="Session Timeout"
              description="Automatically log out after period of inactivity"
              options={timeoutOptions}
              value={sessionTimeout}
              onChange={onSessionTimeoutChange}
              className="max-w-xs"
            />

            <div className="flex items-start space-x-3 p-4 border border-border rounded-md">
              <Icon name="Clock" size={16} className="text-muted-foreground mt-1" />
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Session Status</p>
                <p className="text-xs text-muted-foreground">
                  Current session expires in {sessionTimeout === 'never' ? 'never' : `${sessionTimeout} minutes of inactivity`}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-xs text-success">Active Session</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Logging */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Audit & Monitoring</h4>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-4 border border-border rounded-md">
              <Checkbox
                checked={auditLogEnabled}
                onChange={(e) => onAuditLogToggle(e?.target?.checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-foreground">
                    Enable Audit Logging
                  </span>
                  <Icon name="FileText" size={14} className="text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Track all API calls, configuration changes, and security events for compliance and monitoring.
                </p>
              </div>
            </div>

            {auditLogEnabled && (
              <div className="ml-6 space-y-3">
                <div className="p-3 bg-muted/20 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Activity Log</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadLog}
                      loading={isDownloadingLog}
                      iconName="Download"
                      iconPosition="left"
                    >
                      Download Log
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-muted-foreground">
                    <div>
                      <span className="font-medium">Total Events:</span> 1,247
                    </div>
                    <div>
                      <span className="font-medium">Last 24h:</span> 23 events
                    </div>
                    <div>
                      <span className="font-medium">Log Size:</span> 2.3 MB
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-2">
                  <span className="text-xs font-medium text-foreground">Recent Activity</span>
                  <div className="space-y-1">
                    {[
                      { time: '2 minutes ago', event: 'API key updated', type: 'security' },
                      { time: '15 minutes ago', event: 'Model configuration changed', type: 'config' },
                      { time: '1 hour ago', event: 'Successful API connection test', type: 'api' },
                      { time: '3 hours ago', event: 'Session timeout updated', type: 'security' }
                    ]?.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          activity?.type === 'security' ? 'bg-warning' :
                          activity?.type === 'config' ? 'bg-primary' : 'bg-success'
                        }`}></div>
                        <span className="text-muted-foreground">{activity?.time}</span>
                        <span className="text-foreground">{activity?.event}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Security Recommendations */}
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-md">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium text-primary mb-2">Security Recommendations</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Enable encryption for production environments</li>
                <li>• Set session timeout to 60 minutes or less for sensitive data</li>
                <li>• Enable audit logging for compliance requirements</li>
                <li>• Regularly download and backup audit logs</li>
                <li>• Monitor failed authentication attempts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettingsCard;