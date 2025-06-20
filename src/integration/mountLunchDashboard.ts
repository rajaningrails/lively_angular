import * as React from 'react';
import { createRoot, Root } from 'react-dom/client';
import App from '../App';

let root: Root | null = null;
export function mountLunchDashboard(container: HTMLElement): () => void {
  if (root) {
    root.unmount();
    root = null;
  }

  root = createRoot(container);
  
  // Render the React app
  root.render(React.createElement(App));

  return () => {
    if (root) {
      root.unmount();
      root = null;
    }
  };
}

if (typeof window !== 'undefined') {
  (window as any).mountLunchDashboard = mountLunchDashboard;
  
  const event = new CustomEvent('reactBundleReady', {
    detail: { mountFunction: mountLunchDashboard }
  });
  window.dispatchEvent(event);
}