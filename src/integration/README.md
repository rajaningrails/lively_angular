# AngularJS Integration Guide

This guide explains how to integrate the React Lunch Management System into an existing AngularJS application.

## Files Overview

- `mountLunchDashboard.ts` - Main mount function for React integration
- `angularjs-directive.js` - AngularJS directive for seamless integration
- `webpack.integration.config.js` - Webpack configuration for building integration bundle

## Integration Steps

### 1. Build the Integration Bundle

```bash
# Build the React app with integration support
npm run build:integration
```

### 2. Include in AngularJS Application

Add the built files to your AngularJS application:

```html
<!-- Include the React integration bundle -->
<script src="path/to/lunch-management-integration.js"></script>
<script src="path/to/angularjs-directive.js"></script>
```

### 3. Add Module Dependency

Add the lunch management module to your AngularJS app:

```javascript
angular.module('yourApp', ['lunchManagement', /* other dependencies */]);
```

### 4. Use the Directive

Use the directive in your AngularJS templates:

```html
<!-- Basic usage -->
<react-lunch-dashboard></react-lunch-dashboard>

<!-- With optional parameters -->
<react-lunch-dashboard 
  user-id="{{currentUser.id}}"
  user-role="{{currentUser.role}}"
  api-endpoint="{{apiBaseUrl}}">
</react-lunch-dashboard>
```

## Advanced Integration

### Passing Data from AngularJS to React

You can extend the directive to pass more data:

```javascript
// In your AngularJS controller
$scope.lunchConfig = {
  userId: $scope.currentUser.id,
  theme: 'corporate',
  features: ['ordering', 'admin']
};
```

```html
<react-lunch-dashboard config="lunchConfig"></react-lunch-dashboard>
```

### Event Communication

For bi-directional communication, you can use custom events:

```javascript
// In React (add to mountLunchDashboard.ts)
window.dispatchEvent(new CustomEvent('lunchOrderPlaced', {
  detail: { orderId: '123', amount: 25.99 }
}));

// In AngularJS
$scope.$on('lunchOrderPlaced', function(event, data) {
  // Handle the event
  console.log('Order placed:', data);
});
```

## Troubleshooting

### Common Issues

1. **Mount function not found**: Ensure the React bundle is loaded before the directive initializes
2. **Styling conflicts**: Use CSS modules or scoped styles to avoid conflicts
3. **State management**: Consider using a shared state management solution if needed

### Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- IE 11+ (with polyfills)

## Development

For development, you can use the standalone React app:

```bash
npm run dev
```

For integration testing with AngularJS:

```bash
npm run build:integration
# Then include the built files in your AngularJS development environment
```