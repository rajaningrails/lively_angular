/**
 * AngularJS Directive for mounting React Lunch Management System
 * This file should be included in your AngularJS application
 */

(function() {
  'use strict';

  angular
    .module('lunchManagement', [])
    .directive('reactLunchDashboard', reactLunchDashboardDirective);

  function reactLunchDashboardDirective() {
    return {
      restrict: 'E',
      scope: {
        // You can add scope variables here if needed to pass data from Angular to React
        userId: '@',
        userRole: '@',
        apiEndpoint: '@'
      },
      link: function(scope, element, attrs) {
        var cleanup = null;
        var container = element[0];
        var maxRetries = 10;
        var retryCount = 0;
        var retryInterval = 100; // milliseconds

        // Function to check if React mount function is available
        function isReactMountAvailable() {
          return typeof window.mountLunchDashboard === 'function';
        }

        // Function to mount React component with retry logic
        function mountReactComponent() {
          if (isReactMountAvailable()) {
            try {
              cleanup = window.mountLunchDashboard(container);
              console.log('React component mounted successfully');
            } catch (error) {
              console.error('Error mounting React component:', error);
            }
          } else if (retryCount < maxRetries) {
            retryCount++;
            console.log(`Waiting for React bundle to load... (attempt ${retryCount}/${maxRetries})`);
            setTimeout(mountReactComponent, retryInterval);
          } else {
            console.error('mountLunchDashboard function not found after ' + maxRetries + ' attempts. Make sure the React bundle is loaded.');
            // Optionally show a fallback message
            container.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">Loading lunch dashboard...</div>';
          }
        }

        // Function to unmount React component
        function unmountReactComponent() {
          if (cleanup && typeof cleanup === 'function') {
            try {
              cleanup();
              cleanup = null;
            } catch (error) {
              console.error('Error unmounting React component:', error);
            }
          }
        }

        // Mount on initialization
        mountReactComponent();

        // Watch for scope changes if needed
        scope.$watch('userId', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            unmountReactComponent();
            retryCount = 0; // Reset retry count
            mountReactComponent();
          }
        });

        // Cleanup on scope destroy
        scope.$on('$destroy', function() {
          unmountReactComponent();
        });
      }
    };
  }
})();