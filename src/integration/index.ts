/**
 * Main integration entry point
 * Exports all necessary functions and types for AngularJS integration
 */

export { mountLunchDashboard } from './mountLunchDashboard';
export { mountLunchDashboardWithConfig } from './enhanced-mount';
export type { IntegrationConfig, MountOptions, AngularJSScope } from './types';

// Global exports for browser usage
if (typeof window !== 'undefined') {
  const { mountLunchDashboard } = require('./mountLunchDashboard');
  const { mountLunchDashboardWithConfig } = require('./enhanced-mount');
  
  (window as any).LunchManagement = {
    mount: mountLunchDashboard,
    mountWithConfig: mountLunchDashboardWithConfig,
  };
}