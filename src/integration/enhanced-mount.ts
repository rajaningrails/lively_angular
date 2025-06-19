import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { store } from '../store';
import { theme } from '../theme';
import AppRoutes from '../routes';
import { IntegrationConfig, MountOptions } from './types';

let root: Root | null = null;

/**
 * Enhanced mount function with configuration support
 */
export function mountLunchDashboardWithConfig(options: MountOptions): () => void {
  const { container, config = {}, onMount, onUnmount } = options;

  // Clean up any existing root
  if (root) {
    root.unmount();
    root = null;
  }

  // Create React app with configuration
  const App = React.createElement(
    Provider,
    { store },
    React.createElement(
      ThemeProvider,
      { theme },
      React.createElement(CssBaseline),
      React.createElement(
        BrowserRouter,
        { basename: config.apiEndpoint || '/' },
        React.createElement(AppRoutes)
      )
    )
  );

  // Create new React root
  root = createRoot(container);
  
  // Render the React app
  root.render(App);

  // Call onMount callback
  if (onMount) {
    onMount();
  }

  // Set up event listeners for integration
  setupIntegrationEvents(config);

  // Return cleanup function
  return () => {
    if (root) {
      root.unmount();
      root = null;
    }
    
    // Clean up event listeners
    cleanupIntegrationEvents();
    
    // Call onUnmount callback
    if (onUnmount) {
      onUnmount();
    }
  };
}

/**
 * Set up event listeners for AngularJS communication
 */
function setupIntegrationEvents(config: IntegrationConfig) {
  // Listen for orders placed in React
  const handleOrderPlaced = (event: CustomEvent) => {
    if (config.onOrderPlaced) {
      config.onOrderPlaced(event.detail);
    }
    
    // Dispatch to AngularJS
    window.dispatchEvent(new CustomEvent('reactOrderPlaced', {
      detail: event.detail
    }));
  };

  // Listen for user actions
  const handleUserAction = (event: CustomEvent) => {
    if (config.onUserAction) {
      config.onUserAction(event.detail.action, event.detail.data);
    }
    
    // Dispatch to AngularJS
    window.dispatchEvent(new CustomEvent('reactUserAction', {
      detail: event.detail
    }));
  };

  window.addEventListener('lunchOrderPlaced', handleOrderPlaced as EventListener);
  window.addEventListener('lunchUserAction', handleUserAction as EventListener);
}

/**
 * Clean up integration event listeners
 */
function cleanupIntegrationEvents() {
  // Remove event listeners
  window.removeEventListener('lunchOrderPlaced', () => {});
  window.removeEventListener('lunchUserAction', () => {});
}

// Export both mount functions
export { mountLunchDashboard } from './mountLunchDashboard';