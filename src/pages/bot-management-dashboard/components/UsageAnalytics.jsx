import React from 'react';
import Icon from '../../../components/AppIcon';

const UsageAnalytics = () => {
  const analyticsData = {
    totalRequests: 15847,
    avgResponseTime: 1.2,
    successRate: 98.5,
    activeUsers: 23,
    topModels: [
      { name: 'GPT-4', usage: 45, color: 'bg-primary' },
      { name: 'Claude-3', usage: 30, color: 'bg-accent' },
      { name: 'GPT-3.5', usage: 20, color: 'bg-warning' },
      { name: 'Gemini Pro', usage: 5, color: 'bg-secondary' }
    ],
    recentActivity: [
      {
        id: 1,
        action: 'Bot created',
        bot: 'React Helper',
        user: 'John Doe',
        timestamp: '2 minutes ago',
        icon: 'Plus',
        color: 'text-success'
      },
      {
        id: 2,
        action: 'Chat session',
        bot: 'Python Expert',
        user: 'Jane Smith',
        timestamp: '5 minutes ago',
        icon: 'MessageSquare',
        color: 'text-primary'
      },
      {
        id: 3,
        action: 'Bot updated',
        bot: 'DevOps Assistant',
        user: 'Mike Johnson',
        timestamp: '12 minutes ago',
        icon: 'Edit',
        color: 'text-warning'
      },
      {
        id: 4,
        action: 'Bot deleted',
        bot: 'Old Helper',
        user: 'Sarah Wilson',
        timestamp: '1 hour ago',
        icon: 'Trash2',
        color: 'text-error'
      }
    ]
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000)?.toFixed(1) + 'k';
    }
    return num?.toString();
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="BarChart3" size={20} className="mr-2" />
          Usage Analytics
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-primary mb-1">
              {formatNumber(analyticsData?.totalRequests)}
            </div>
            <div className="text-xs text-muted-foreground">Total Requests</div>
          </div>
          
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-accent mb-1">
              {analyticsData?.avgResponseTime}s
            </div>
            <div className="text-xs text-muted-foreground">Avg Response</div>
          </div>
          
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-success mb-1">
              {analyticsData?.successRate}%
            </div>
            <div className="text-xs text-muted-foreground">Success Rate</div>
          </div>
          
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-warning mb-1">
              {analyticsData?.activeUsers}
            </div>
            <div className="text-xs text-muted-foreground">Active Users</div>
          </div>
        </div>
      </div>
      {/* Model Usage Distribution */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Cpu" size={16} className="mr-2" />
          Model Usage
        </h4>
        
        <div className="space-y-3">
          {analyticsData?.topModels?.map((model, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${model.color}`} />
                <span className="text-sm font-medium text-foreground">
                  {model.name}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${model.color}`}
                    style={{ width: `${model.usage}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8 text-right">
                  {model.usage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Activity" size={16} className="mr-2" />
          Recent Activity
        </h4>
        
        <div className="space-y-3">
          {analyticsData?.recentActivity?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-colors duration-200">
              <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center ${activity?.color}`}>
                <Icon name={activity?.icon} size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {activity?.action}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {activity?.bot} • {activity?.user}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity?.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-4 text-sm text-primary hover:text-primary/80 transition-colors duration-200">
          View all activity
        </button>
      </div>
    </div>
  );
};

export default UsageAnalytics;