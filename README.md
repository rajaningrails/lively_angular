# Lunch Management System

A comprehensive React-based lunch ordering system designed to integrate with AngularJS applications. Built with TypeScript, Redux Toolkit, and IndexedDB for persistent storage.

## Data Models

### Core Interfaces
```typescript
interface LunchItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  category?: string;
  available?: boolean;
}

interface Order {
  id: string;
  userId: string;
  userName: string;
  date: string;
  items: LunchItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}
```

## Getting Started

### Development
```bash
npm install
npm run dev
```

### Building
```bash
npm run build
```

### Testing
```bash
npm run test
```

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

MIT License - See LICENSE file for details