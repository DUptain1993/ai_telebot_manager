import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    '/bot-management-dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/ai-bot-builder': { label: 'Create Bot', icon: 'Bot' },
    '/ai-chat-interface': { label: 'Chat Interface', icon: 'MessageSquare' },
    '/server-configuration-dashboard': { label: 'Server Configuration', icon: 'Server' },
    '/api-configuration-settings': { label: 'API Settings', icon: 'Settings' }
  };

  const generateBreadcrumbItems = () => {
    if (customItems) return customItems;

    const pathSegments = location.pathname?.split('/')?.filter(Boolean);
    const items = [];

    // Always start with Dashboard as home
    if (location.pathname !== '/bot-management-dashboard') {
      items?.push({
        label: 'Dashboard',
        path: '/bot-management-dashboard',
        icon: 'LayoutDashboard'
      });
    }

    // Add current page
    const currentRoute = routeMap?.[location.pathname];
    if (currentRoute) {
      items?.push({
        label: currentRoute?.label,
        path: location.pathname,
        icon: currentRoute?.icon,
        isActive: true
      });
    }

    // Handle dynamic routes (e.g., bot-specific pages)
    if (pathSegments?.length > 1) {
      const baseRoute = `/${pathSegments?.[0]}`;
      const dynamicSegment = pathSegments?.[1];
      
      if (routeMap?.[baseRoute] && dynamicSegment) {
        // Replace the last item with more specific breadcrumb
        items[items.length - 1] = {
          ...items?.[items?.length - 1],
          label: `${routeMap?.[baseRoute]?.label} - ${decodeURIComponent(dynamicSegment)}`,
        };
      }
    }

    return items;
  };

  const breadcrumbItems = generateBreadcrumbItems();

  // Don't show breadcrumbs on dashboard home or if only one item
  if (location.pathname === '/bot-management-dashboard' || breadcrumbItems?.length <= 1) {
    return null;
  }

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbItems?.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            {index > 0 && (
              <Icon name="ChevronRight" size={14} className="text-muted-foreground/60" />
            )}
            
            {item?.isActive ? (
              <div className="flex items-center space-x-1.5 text-foreground font-medium">
                {item?.icon && <Icon name={item?.icon} size={14} />}
                <span className="truncate max-w-[200px] sm:max-w-none">
                  {item?.label}
                </span>
              </div>
            ) : (
              <button
                onClick={() => handleNavigation(item?.path)}
                className="flex items-center space-x-1.5 hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 rounded px-1 py-0.5"
              >
                {item?.icon && <Icon name={item?.icon} size={14} />}
                <span className="truncate max-w-[150px] sm:max-w-none">
                  {item?.label}
                </span>
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;