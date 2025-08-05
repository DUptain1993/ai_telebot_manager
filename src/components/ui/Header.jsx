import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [serverStatus, setServerStatus] = useState({ 
    status: 'connected', 
    https: true, 
    tunnel: 'active' 
  });
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: '/bot-management-dashboard', 
      icon: 'LayoutDashboard',
      tooltip: 'Manage your AI bots and view analytics'
    },
    { 
      label: 'Create Bot', 
      path: '/ai-bot-builder', 
      icon: 'Bot',
      tooltip: 'Build and configure new AI assistants'
    },
    { 
      label: 'Chat', 
      path: '/ai-chat-interface', 
      icon: 'MessageSquare',
      tooltip: 'Interact with your AI assistants'
    },
    { 
      label: 'Server', 
      path: '/server-configuration-dashboard', 
      icon: 'Server',
      tooltip: 'Configure server settings and infrastructure'
    },
    { 
      label: 'Settings', 
      path: '/api-configuration-settings', 
      icon: 'Settings',
      tooltip: 'Manage API configurations and preferences'
    }
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getStatusColor = () => {
    switch (serverStatus?.status) {
      case 'connected':
        return 'text-success';
      case 'connecting':
        return 'text-warning';
      case 'disconnected':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = () => {
    switch (serverStatus?.status) {
      case 'connected':
        return 'CheckCircle';
      case 'connecting':
        return 'Clock';
      case 'disconnected':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  // Simulate server status updates
  useEffect(() => {
    const interval = setInterval(() => {
      // This would be replaced with actual WebSocket connection
      setServerStatus(prev => ({
        ...prev,
        status: Math.random() > 0.1 ? 'connected' : 'connecting'
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
      <div className="w-full px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Bot" size={20} color="white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold text-foreground leading-none">
                  AI TeleBot
                </h1>
                <span className="text-xs text-muted-foreground leading-none">
                  Manager
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-out
                  hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                  ${isActivePath(item?.path) 
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground'
                  }
                `}
                title={item?.tooltip}
              >
                <div className="flex items-center space-x-2">
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                </div>
                {isActivePath(item?.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Server Status & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Server Status Indicator */}
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 bg-muted/50 rounded-md">
              <div className={`flex items-center space-x-1 ${getStatusColor()}`}>
                <Icon 
                  name={getStatusIcon()} 
                  size={12} 
                  className={serverStatus?.status === 'connecting' ? 'animate-status-pulse' : ''} 
                />
                <span className="text-xs font-medium capitalize">
                  {serverStatus?.status}
                </span>
              </div>
              {serverStatus?.https && (
                <div className="flex items-center space-x-1 text-success">
                  <Icon name="Shield" size={12} />
                  <span className="text-xs">HTTPS</span>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="md:hidden"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-card border-b border-border shadow-lg animate-slide-in">
          <nav className="px-6 py-4 space-y-2">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ease-out
                  hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                  ${isActivePath(item?.path) 
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </button>
            ))}
            
            {/* Mobile Server Status */}
            <div className="pt-4 mt-4 border-t border-border">
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-sm text-muted-foreground">Server Status</span>
                <div className={`flex items-center space-x-2 ${getStatusColor()}`}>
                  <Icon 
                    name={getStatusIcon()} 
                    size={14} 
                    className={serverStatus?.status === 'connecting' ? 'animate-status-pulse' : ''} 
                  />
                  <span className="text-sm font-medium capitalize">
                    {serverStatus?.status}
                  </span>
                </div>
              </div>
              {serverStatus?.https && (
                <div className="flex items-center justify-between px-4 py-1">
                  <span className="text-sm text-muted-foreground">Security</span>
                  <div className="flex items-center space-x-1 text-success">
                    <Icon name="Shield" size={14} />
                    <span className="text-sm">HTTPS Active</span>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;