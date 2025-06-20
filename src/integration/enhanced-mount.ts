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

export function mountLunchDashboardWithConfig(options: MountOptions): () => void {
  const { container, config = {}, onMount, onUnmount } = options;

  if (root) {
    root.unmount();
    root = null;
  }

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

  root = createRoot(container);
  
  root.render(App);

  if (onMount) {
    onMount();
  }

  setupIntegrationEvents(config);

  return () => {
    if (root) {
      root.unmount();
      root = null;
    }
    
    cleanupIntegrationEvents();
    
    if (onUnmount) {
      onUnmount();
    }
  };
}

function setupIntegrationEvents(config: IntegrationConfig) {
  const handleOrderPlaced = (event: CustomEvent) => {
    if (config.onOrderPlaced) {
      config.onOrderPlaced(event.detail);
    }
    
    window.dispatchEvent(new CustomEvent('reactOrderPlaced', {
      detail: event.detail
    }));
  };

  const handleUserAction = (event: CustomEvent) => {
    if (config.onUserAction) {
      config.onUserAction(event.detail.action, event.detail.data);
    }
    
    window.dispatchEvent(new CustomEvent('reactUserAction', {
      detail: event.detail
    }));
  };

  window.addEventListener('lunchOrderPlaced', handleOrderPlaced as EventListener);
  window.addEventListener('lunchUserAction', handleUserAction as EventListener);
}

function cleanupIntegrationEvents() {
  window.removeEventListener('lunchOrderPlaced', () => {});
  window.removeEventListener('lunchUserAction', () => {});
}

export { mountLunchDashboard } from './mountLunchDashboard';