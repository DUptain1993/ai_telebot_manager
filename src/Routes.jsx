import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import BotManagementDashboard from './pages/bot-management-dashboard';
import ApiConfigurationSettings from './pages/api-configuration-settings';
import ServerConfigurationDashboard from './pages/server-configuration-dashboard';
import AIBotBuilder from './pages/ai-bot-builder';
import OptimizedComponent from './pages/ai-chat-interface';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AIBotBuilder />} />
        <Route path="/bot-management-dashboard" element={<BotManagementDashboard />} />
        <Route path="/api-configuration-settings" element={<ApiConfigurationSettings />} />
        <Route path="/server-configuration-dashboard" element={<ServerConfigurationDashboard />} />
        <Route path="/ai-bot-builder" element={<AIBotBuilder />} />
        <Route path="/ai-chat-interface" element={<OptimizedComponent />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
