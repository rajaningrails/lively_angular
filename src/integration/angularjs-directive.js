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

        // Function to mount React component
        function mountReactComponent() {
          // Ensure the mount function is available
          if (typeof window.mountLunchDashboard === 'function') {
            cleanup = window.mountLunchDashboard(container);
          } else {
            console.error('mountLunchDashboard function not found. Make sure the React bundle is loaded.');
          }
        }

        // Function to unmount React component
        function unmountReactComponent() {
          if (cleanup && typeof cleanup === 'function') {
            cleanup();
            cleanup = null;
          }
        }

        // Mount on initialization
        mountReactComponent();

        // Watch for scope changes if needed
        scope.$watch('userId', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            unmountReactComponent();
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