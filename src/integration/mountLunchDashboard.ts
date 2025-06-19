import * as React from 'react';
import { createRoot, Root } from 'react-dom/client';
import App from '../App';

let root: Root | null = null;

/**
 * Mount function for AngularJS integration
 * This function creates a React root and renders the Lunch Management System
 * @param container - The DOM element where React app should be mounted
 * @returns cleanup function to unmount the React app
 */
export function mountLunchDashboard(container: HTMLElement): () => void {
  // Clean up any existing root
  if (root) {
    root.unmount();
    root = null;
  }

  // Create new React root
  root = createRoot(container);
  
  // Render the React app
  root.render(React.createElement(App));

  // Return cleanup function
  return () => {
    if (root) {
      root.unmount();
      root = null;
    }
  };
}

// Export for global access if needed
if (typeof window !== 'undefined') {
  (window as any).mountLunchDashboard = mountLunchDashboard;
}