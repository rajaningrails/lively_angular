(function() {
  'use strict';

  angular
    .module('lunchManagement', [])
    .directive('reactLunchDashboard', reactLunchDashboardDirective);

  function reactLunchDashboardDirective() {
    return {
      restrict: 'E',
      scope: {
        userId: '@',
        userRole: '@',
        apiEndpoint: '@'
      },
      link: function(scope, element, attrs) {
        var cleanup = null;
        var container = element[0];
        var maxRetries = 10;
        var retryCount = 0;
        var retryInterval = 100;
        function isReactMountAvailable() {
          return typeof window.mountLunchDashboard === 'function';
        }

        function mountReactComponent() {
          if (isReactMountAvailable()) {
            try {
              cleanup = window.mountLunchDashboard(container);
            } catch (error) {
              console.error('Error mounting React component:', error);
            }
          } else if (retryCount < maxRetries) {
            retryCount++;
            setTimeout(mountReactComponent, retryInterval);
          } else {
            container.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">Loading lunch dashboard...</div>';
          }
        }

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
        mountReactComponent();
        scope.$watch('userId', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            unmountReactComponent();
            retryCount = 0; 
            mountReactComponent();
          }
        });

        scope.$on('$destroy', function() {
          unmountReactComponent();
        });
      }
    };
  }
})();