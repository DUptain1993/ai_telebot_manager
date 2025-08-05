import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";

// Local Components
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";

// Page Components
import AIBotBuilder from './pages/ai-bot-builder';
import ApiConfigurationSettings from './pages/api-configuration-settings';
import BotManagementDashboard from './pages/bot-management-dashboard';
import NotFound from "./pages/NotFound"; // <-- Corrected this path
import OptimizedComponent from './pages/ai-chat-interface';
import ServerConfigurationDashboard from './pages/server-configuration-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Page Routes */}
          <Route path="/" element={<AIBotBuilder />} />
          <Route path="/ai-bot-builder" element={<AIBotBuilder />} />
          <Route path="/ai-chat-interface" element={<OptimizedComponent />} />
          <Route path="/bot-management-dashboard" element={<BotManagementDashboard />} />
          <Route path="/api-configuration-settings" element={<ApiConfigurationSettings />} />
          <Route path="/server-configuration-dashboard" element={<ServerConfigurationDashboard />} />
          
          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
