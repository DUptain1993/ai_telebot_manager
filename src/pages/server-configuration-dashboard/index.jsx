import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ServerStatusCard from './components/ServerStatusCard';
import CertificateManager from './components/CertificateManager';
import SystemLogsPanel from './components/SystemLogsPanel';
import RestartServerModal from './components/RestartServerModal';

const ServerConfigurationDashboard = () => {
  const [serverStatus, setServerStatus] = useState({
    https: { status: 'active', port: 8443 },
    certificate: { status: 'valid', expiresIn: 45 },
    tunnel: { status: 'active', url: 'https://abc123.loca.lt' }
  });
  const [isRestartModalOpen, setIsRestartModalOpen] = useState(false);
  const [lastRestart, setLastRestart] = useState(new Date(Date.now() - 3600000));

  // Copy to clipboard functionality
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard?.writeText(text);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleRestartServer = async (reason) => {
    // Simulate server restart
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLastRestart(new Date());
    setIsRestartModalOpen(false);
    
    // Update server status to show restart
    setServerStatus(prev => ({
      ...prev,
      https: { ...prev?.https, status: 'active' }
    }));
  };

  const generateTunnelUrl = async () => {
    // Simulate tunnel URL generation
    const randomId = Math.random()?.toString(36)?.substring(2, 8);
    const newUrl = `https://${randomId}.loca.lt`;
    
    setServerStatus(prev => ({
      ...prev,
      tunnel: { ...prev?.tunnel, url: newUrl }
    }));
  };

  // Simulate real-time status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setServerStatus(prev => ({
        ...prev,
        certificate: {
          ...prev?.certificate,
          expiresIn: Math.max(0, prev?.certificate?.expiresIn - 1)
        }
      }));
    }, 86400000); // Update daily

    return () => clearInterval(interval);
  }, []);

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
                  Server Configuration
                </h1>
                <p className="text-muted-foreground">
                  Manage HTTPS settings, SSL certificates, and server monitoring
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={generateTunnelUrl}
                  iconName="Globe"
                  iconPosition="left"
                >
                  Generate Tunnel URL
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => setIsRestartModalOpen(true)}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Restart Server
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Server Status & Certificate Management */}
            <div className="lg:col-span-8 space-y-6">
              {/* Server Status Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* HTTPS Status */}
                <ServerStatusCard
                  title="HTTPS Server"
                  status={serverStatus?.https?.status}
                  statusText={serverStatus?.https?.status === 'active' ? 'Running' : 'Stopped'}
                  description={`Port ${serverStatus?.https?.port} • Last restart: ${lastRestart?.toLocaleTimeString()}`}
                  icon="Server"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Uptime:</span>
                    <span className="text-foreground font-medium">
                      {Math.floor((Date.now() - lastRestart?.getTime()) / 3600000)}h {Math.floor(((Date.now() - lastRestart?.getTime()) % 3600000) / 60000)}m
                    </span>
                  </div>
                </ServerStatusCard>

                {/* Certificate Status */}
                <ServerStatusCard
                  title="SSL Certificate"
                  status={serverStatus?.certificate?.expiresIn > 30 ? 'valid' : 'warning'}
                  statusText={serverStatus?.certificate?.expiresIn > 30 ? 'Valid' : 'Expiring Soon'}
                  description={`Expires in ${serverStatus?.certificate?.expiresIn} days`}
                  icon="Shield"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="text-foreground font-medium">Self-signed</span>
                  </div>
                </ServerStatusCard>

                {/* Tunnel Status */}
                <ServerStatusCard
                  title="Public Tunnel"
                  status={serverStatus?.tunnel?.status}
                  statusText={serverStatus?.tunnel?.status === 'active' ? 'Connected' : 'Disconnected'}
                  description="Localtunnel service for public access"
                  icon="Globe"
                  actionButton={
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(serverStatus?.tunnel?.url)}
                      iconName="Copy"
                      iconSize={14}
                    >
                      Copy
                    </Button>
                  }
                >
                  <div className="bg-muted/50 rounded p-2 mt-2">
                    <p className="text-xs font-mono text-foreground break-all">
                      {serverStatus?.tunnel?.url}
                    </p>
                  </div>
                </ServerStatusCard>
              </div>

              {/* Certificate Management */}
              <div>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    Certificate Management
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Generate or upload SSL certificates for secure HTTPS connections
                  </p>
                </div>
                <CertificateManager />
              </div>
            </div>

            {/* Right Column - System Logs */}
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    System Logs
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Real-time server activity and system events
                  </p>
                </div>
                <div className="h-[600px]">
                  <SystemLogsPanel />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Server Information */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Cpu" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">CPU Usage</span>
              </div>
              <p className="text-2xl font-bold text-foreground">23%</p>
              <p className="text-xs text-muted-foreground">Average load</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="HardDrive" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Memory</span>
              </div>
              <p className="text-2xl font-bold text-foreground">45%</p>
              <p className="text-xs text-muted-foreground">2.1GB / 4.7GB</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Users" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Active Connections</span>
              </div>
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-xs text-muted-foreground">Current sessions</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Activity" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Requests/min</span>
              </div>
              <p className="text-2xl font-bold text-foreground">847</p>
              <p className="text-xs text-muted-foreground">Last 5 minutes</p>
            </div>
          </div>
        </div>
      </main>
      {/* Restart Server Modal */}
      <RestartServerModal
        isOpen={isRestartModalOpen}
        onClose={() => setIsRestartModalOpen(false)}
        onConfirm={handleRestartServer}
      />
    </div>
  );
};

export default ServerConfigurationDashboard;