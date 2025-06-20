export interface AngularJSScope {
  userId?: string;
  userRole?: string;
  apiEndpoint?: string;
  config?: any;
  $watch: (expression: string, listener: (newVal: any, oldVal: any) => void) => void;
  $on: (event: string, listener: (...args: any[]) => void) => void;
  $apply: (fn?: () => void) => void;
}

export interface IntegrationConfig {
  userId?: string;
  userRole?: 'admin' | 'user';
  apiEndpoint?: string;
  theme?: 'default' | 'corporate' | 'dark';
  features?: string[];
  onOrderPlaced?: (order: any) => void;
  onUserAction?: (action: string, data: any) => void;
}

export interface MountOptions {
  container: HTMLElement;
  config?: IntegrationConfig;
  onMount?: () => void;
  onUnmount?: () => void;
}