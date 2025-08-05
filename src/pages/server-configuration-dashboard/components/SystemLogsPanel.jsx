import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemLogsPanel = () => {
  const [logs, setLogs] = useState([]);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [filter, setFilter] = useState('all');

  // Mock log data
  const mockLogs = [
    {
      id: 1,
      timestamp: new Date(Date.now() - 300000),
      level: 'info',
      message: 'HTTPS server started on port 8443',
      source: 'server'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 240000),
      level: 'success',
      message: 'SSL certificate loaded successfully',
      source: 'ssl'
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 180000),
      level: 'info',
      message: 'Localtunnel connection established',
      source: 'tunnel'
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 120000),
      level: 'warning',
      message: 'Certificate expires in 30 days',
      source: 'ssl'
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 60000),
      level: 'info',
      message: 'New client connection from 192.168.1.100',
      source: 'server'
    },
    {
      id: 6,
      timestamp: new Date(Date.now() - 30000),
      level: 'error',
      message: 'Failed to connect to Venice AI API - retrying...',
      source: 'api'
    },
    {
      id: 7,
      timestamp: new Date(Date.now() - 15000),
      level: 'success',
      message: 'Venice AI API connection restored',
      source: 'api'
    },
    {
      id: 8,
      timestamp: new Date(Date.now() - 5000),
      level: 'info',
      message: 'System health check completed',
      source: 'system'
    }
  ];

  useEffect(() => {
    setLogs(mockLogs);
    
    // Simulate real-time log updates
    const interval = setInterval(() => {
      const newLog = {
        id: Date.now(),
        timestamp: new Date(),
        level: ['info', 'success', 'warning']?.[Math.floor(Math.random() * 3)],
        message: [
          'Heartbeat check completed',
          'Client request processed',
          'Memory usage: 45%',
          'CPU usage: 23%',
          'Tunnel connection verified'
        ]?.[Math.floor(Math.random() * 5)],
        source: ['server', 'system', 'tunnel']?.[Math.floor(Math.random() * 3)]
      };
      
      setLogs(prev => [newLog, ...prev]?.slice(0, 50)); // Keep only last 50 logs
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getLevelColor = (level) => {
    switch (level) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getLevelIcon = (level) => {
    switch (level) {
      case 'success':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      default:
        return 'Info';
    }
  };

  const getSourceColor = (source) => {
    switch (source) {
      case 'server':
        return 'bg-blue-100 text-blue-800';
      case 'ssl':
        return 'bg-green-100 text-green-800';
      case 'tunnel':
        return 'bg-purple-100 text-purple-800';
      case 'api':
        return 'bg-orange-100 text-orange-800';
      case 'system':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLogs = filter === 'all' 
    ? logs 
    : logs?.filter(log => log?.level === filter);

  const formatTime = (timestamp) => {
    return timestamp?.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const clearLogs = () => {
    setLogs([]);
  };

  const exportLogs = () => {
    const logText = logs?.map(log => 
      `[${log?.timestamp?.toISOString()}] ${log?.level?.toUpperCase()} [${log?.source}] ${log?.message}`
    )?.join('\n');
    
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `server-logs-${new Date()?.toISOString()?.split('T')?.[0]}.txt`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Terminal" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">System Logs</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearLogs}
              iconName="Trash2"
              iconSize={14}
            >
              Clear
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={exportLogs}
              iconName="Download"
              iconSize={14}
            >
              Export
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2">
          {['all', 'info', 'success', 'warning', 'error']?.map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`
                px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200
                ${filter === level
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }
              `}
            >
              {level?.charAt(0)?.toUpperCase() + level?.slice(1)}
            </button>
          ))}
        </div>
      </div>
      {/* Auto-scroll toggle */}
      <div className="px-4 py-2 bg-muted/30 border-b border-border">
        <label className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            checked={isAutoScroll}
            onChange={(e) => setIsAutoScroll(e?.target?.checked)}
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
          />
          <span className="text-muted-foreground">Auto-scroll to latest</span>
        </label>
      </div>
      {/* Logs List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-sm">
        {filteredLogs?.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            <div className="text-center">
              <Icon name="FileText" size={24} className="mx-auto mb-2 opacity-50" />
              <p>No logs available</p>
            </div>
          </div>
        ) : (
          filteredLogs?.map((log) => (
            <div
              key={log?.id}
              className="flex items-start space-x-3 p-2 rounded hover:bg-muted/30 transition-colors duration-150"
            >
              <div className="flex-shrink-0 mt-0.5">
                <Icon
                  name={getLevelIcon(log?.level)}
                  size={14}
                  className={getLevelColor(log?.level)}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs text-muted-foreground">
                    {formatTime(log?.timestamp)}
                  </span>
                  <span className={`
                    px-2 py-0.5 text-xs font-medium rounded-full
                    ${getSourceColor(log?.source)}
                  `}>
                    {log?.source}
                  </span>
                </div>
                <p className="text-foreground break-words">
                  {log?.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Footer */}
      <div className="p-3 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{filteredLogs?.length} entries</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemLogsPanel;