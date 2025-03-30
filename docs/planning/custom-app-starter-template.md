# Custom App Starter Template

This document provides a starter template for the custom app, including project structure, key configuration files, and starter code.

## Project Structure

```
bizzy-app/
├── .github/                    # GitHub workflows and templates
├── .vscode/                    # VSCode configuration
├── public/                     # Static assets
├── src/
│   ├── assets/                 # Application assets
│   ├── components/             # Shared UI components
│   │   ├── common/             # Basic UI elements
│   │   ├── layout/             # Layout components
│   │   └── specialized/        # Feature-specific components
│   ├── core/                   # Core application logic
│   │   ├── auth/               # Authentication system
│   │   ├── chat/               # Chat system
│   │   ├── extension-api/      # Extension framework
│   │   ├── knowledge-base/     # Knowledge base system
│   │   └── mcp/                # MCP integration
│   ├── extensions/             # Extension modules
│   │   ├── core/               # Core extension framework
│   │   └── farmer/             # BizzyFarmer extension
│   ├── features/               # Feature modules
│   │   ├── admin/              # Admin dashboard
│   │   ├── chat/               # Chat interface
│   │   ├── documents/          # Document management
│   │   ├── notes/              # Notes system
│   │   └── settings/           # Settings interface
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility libraries
│   ├── pages/                  # Page components
│   ├── services/               # API services
│   ├── store/                  # State management
│   ├── styles/                 # Global styles
│   ├── types/                  # TypeScript type definitions
│   ├── utils/                  # Utility functions
│   ├── App.tsx                 # Main application component
│   ├── main.tsx                # Application entry point
│   └── vite-env.d.ts           # Vite type definitions
├── .env.example                # Environment variables template
├── .eslintrc.js                # ESLint configuration
├── .gitignore                  # Git ignore file
├── .prettierrc                 # Prettier configuration
├── index.html                  # HTML entry point
├── package.json                # Package configuration
├── postcss.config.js           # PostCSS configuration
├── README.md                   # Project documentation
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite configuration
```

## Key Configuration Files

### package.json

```json
{
  "name": "bizzy-app",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "extensions:list": "node scripts/extensions-list.js",
    "extensions:install": "node scripts/extensions-install.js"
  },
  "dependencies": {
    "@radix-ui/react-avatar": "^1.1.3",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-progress": "^1.1.2",
    "@radix-ui/react-tabs": "^1.1.3",
    "@radix-ui/react-tooltip": "^1.1.8",
    "@tanstack/react-query": "^5.0.0",
    "axios": "^1.6.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "geojson": "^0.5.0",
    "jotai": "^2.5.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.18.0",
    "semver": "^7.5.4",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "@storybook/addon-essentials": "^7.6.0",
    "@storybook/addon-interactions": "^7.6.0",
    "@storybook/addon-links": "^7.6.0",
    "@storybook/blocks": "^7.6.0",
    "@storybook/react": "^7.6.0",
    "@storybook/react-vite": "^7.6.0",
    "@storybook/testing-library": "^0.2.0",
    "@testing-library/jest-dom": "^6.1.0",
    "@testing-library/react": "^14.0.0",
    "@types/node": "^20.8.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@typescript-eslint/eslint-plugin": "^6.10.0",
    "@typescript-eslint/parser": "^6.10.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.53.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.0",
    "jsdom": "^22.1.0",
    "postcss": "^8.4.0",
    "prettier": "^3.0.0",
    "tailwindcss": "^3.3.0",
    "typescript": "^5.2.0",
    "vite": "^5.0.0",
    "vitest": "^0.34.0"
  }
}
```

### vite.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@core': path.resolve(__dirname, './src/core'),
      '@extensions': path.resolve(__dirname, './src/extensions'),
      '@features': path.resolve(__dirname, './src/features'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@services': path.resolve(__dirname, './src/services'),
      '@store': path.resolve(__dirname, './src/store'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@types': path.resolve(__dirname, './src/types'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
});
```

### tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        secondary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@core/*": ["src/core/*"],
      "@extensions/*": ["src/extensions/*"],
      "@features/*": ["src/features/*"],
      "@hooks/*": ["src/hooks/*"],
      "@lib/*": ["src/lib/*"],
      "@pages/*": ["src/pages/*"],
      "@services/*": ["src/services/*"],
      "@store/*": ["src/store/*"],
      "@styles/*": ["src/styles/*"],
      "@types/*": ["src/types/*"],
      "@utils/*": ["src/utils/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### .env.example

```
# App Configuration
VITE_APP_NAME=BizzyApp
VITE_API_URL=http://localhost:8000/api

# Authentication
VITE_AUTH_ENABLED=true
VITE_AUTH_PROVIDER=local

# LLM Configuration
VITE_DEFAULT_LLM_PROVIDER=openai
VITE_OPENAI_API_KEY=
VITE_ANTHROPIC_API_KEY=

# Vector Database
VITE_VECTOR_DB=chroma
VITE_CHROMA_URL=http://localhost:8000

# Extension Configuration
VITE_EXTENSIONS_ENABLED=true
VITE_DEFAULT_EXTENSIONS=farmer

# MCP Configuration
VITE_MCP_ENABLED=true
VITE_MCP_SERVERS=weather,github

# Feature Flags
VITE_FEATURE_OFFLINE_MODE=false
VITE_FEATURE_MULTI_MODAL=true
VITE_FEATURE_ARTIFACTS=true
```

## Starter Code

### src/main.tsx

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './styles/index.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
```

### src/App.tsx

```tsx
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthStore } from '@store/authStore';
import MainLayout from '@components/layout/MainLayout';
import LoadingScreen from '@components/common/LoadingScreen';

// Lazy-loaded pages
const Dashboard = lazy(() => import('@pages/Dashboard'));
const Chat = lazy(() => import('@pages/Chat'));
const Documents = lazy(() => import('@pages/Documents'));
const Notes = lazy(() => import('@pages/Notes'));
const Settings = lazy(() => import('@pages/Settings'));
const Login = lazy(() => import('@pages/Login'));
const Register = lazy(() => import('@pages/Register'));
const NotFound = lazy(() => import('@pages/NotFound'));

// Admin pages
const AdminDashboard = lazy(() => import('@pages/admin/Dashboard'));
const UserManagement = lazy(() => import('@pages/admin/UserManagement'));
const ExtensionManagement = lazy(() => import('@pages/admin/ExtensionManagement'));
const SystemManagement = lazy(() => import('@pages/admin/SystemManagement'));

function App() {
  const { isAuthenticated, isInitialized } = useAuthStore();

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/extensions" element={<ExtensionManagement />} />
          <Route path="/admin/system" element={<SystemManagement />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
```

### src/store/authStore.ts

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      isInitialized: false,
      user: null,
      token: null,
      
      initialize: async () => {
        // Check if token is valid
        const { token } = get();
        if (!token) {
          set({ isInitialized: true });
          return;
        }
        
        try {
          // Validate token with API
          // const response = await api.auth.validate(token);
          // set({ isAuthenticated: true, user: response.user, isInitialized: true });
          
          // For now, just set initialized
          set({ isInitialized: true });
        } catch (error) {
          set({ isAuthenticated: false, user: null, token: null, isInitialized: true });
        }
      },
      
      login: async (email, password) => {
        try {
          // Call API to login
          // const response = await api.auth.login(email, password);
          
          // Mock response for now
          const mockUser = {
            id: '1',
            name: 'Test User',
            email,
            role: 'admin' as const,
          };
          const mockToken = 'mock-token';
          
          set({ isAuthenticated: true, user: mockUser, token: mockToken });
        } catch (error) {
          throw new Error('Login failed');
        }
      },
      
      register: async (name, email, password) => {
        try {
          // Call API to register
          // const response = await api.auth.register(name, email, password);
          
          // Mock response for now
          const mockUser = {
            id: '1',
            name,
            email,
            role: 'user' as const,
          };
          const mockToken = 'mock-token';
          
          set({ isAuthenticated: true, user: mockUser, token: mockToken });
        } catch (error) {
          throw new Error('Registration failed');
        }
      },
      
      logout: () => {
        set({ isAuthenticated: false, user: null, token: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token }),
    }
  )
);
```

### src/components/layout/MainLayout.tsx

```tsx
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
```

### src/components/layout/Sidebar.tsx

```tsx
import { NavLink } from 'react-router-dom';
import { useAuthStore } from '@store/authStore';

const Sidebar = () => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">BizzyApp</h2>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block px-4 py-2 rounded transition-colors ${
                  isActive ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'
                }`
              }
              end
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/chat"
              className={({ isActive }) =>
                `block px-4 py-2 rounded transition-colors ${
                  isActive ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'
                }`
              }
            >
              Chat
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/documents"
              className={({ isActive }) =>
                `block px-4 py-2 rounded transition-colors ${
                  isActive ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'
                }`
              }
            >
              Documents
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/notes"
              className={({ isActive }) =>
                `block px-4 py-2 rounded transition-colors ${
                  isActive ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'
                }`
              }
            >
              Notes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `block px-4 py-2 rounded transition-colors ${
                  isActive ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'
                }`
              }
            >
              Settings
            </NavLink>
          </li>
        </ul>

        {isAdmin && (
          <>
            <div className="mt-8 mb-2 px-4 text-sm font-medium text-gray-500">
              Administration
            </div>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded transition-colors ${
                      isActive ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'
                    }`
                  }
                  end
                >
                  Admin Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/users"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded transition-colors ${
                      isActive ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'
                    }`
                  }
                >
                  User Management
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/extensions"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded transition-colors ${
                      isActive ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'
                    }`
                  }
                >
                  Extension Management
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/system"
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded transition-colors ${
                      isActive ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'
                    }`
                  }
                >
                  System Management
                </NavLink>
              </li>
            </ul>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
```

### src/components/layout/Header.tsx

```tsx
import { useAuthStore } from '@store/authStore';

const Header = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white shadow-sm p-4 border-b flex justify-between items-center">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <div className="text-sm">
          <span className="text-gray-500">Welcome,</span>{' '}
          <span className="font-medium">{user?.name}</span>
        </div>
        <button
          onClick={logout}
          className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
```

### src/pages/Dashboard.tsx

```tsx
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    documents: 0,
    conversations: 0,
    notes: 0,
  });

  useEffect(() => {
    // Fetch dashboard stats
    // In a real app, this would be an API call
    setStats({
      documents: 24,
      conversations: 12,
      notes: 36,
    });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Documents</h3>
          <div className="flex items-center">
            <span className="text-3xl font-bold">{stats.documents}</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Conversations</h3>
          <div className="flex items-center">
            <span className="text-3xl font-bold">{stats.conversations}</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Notes</h3>
          <div className="flex items-center">
            <span className="text-3xl font-bold">{stats.notes}</span>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <p className="text-sm font-medium">Document uploaded: Farm Report 2023</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <p className="text-sm font-medium">Chat conversation: Crop Planning</p>
              <p className="text-xs text-gray-500">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <p className="text-sm font-medium">Note created: Field Observations</p>
              <p className="text-xs text-gray-500">Yesterday at 3:45 PM</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
            <h4 className="font-medium mb-1">Upload Document</h4>
            <p className="text-sm text-gray-500">Add new documents to your knowledge base</p>
          </button>
          <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
            <h4 className="font-medium mb-1">Start Chat</h4>
            <p className="text-sm text-gray-500">Begin a new conversation with AI assistant</p>
          </button>
          <button className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left">
            <h4 className="font-medium mb-1">Create Note</h4>
            <p className="text-sm text-gray-500">Record observations or ideas</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
```

## Getting Started

To use this template:

1. Create a new project directory
2. Initialize a new Vite project with React and TypeScript
   ```bash
   npm create vite@latest bizzy-app -- --template react-ts
   ```
3. Navigate to the project directory
   ```bash
   cd bizzy-app
   ```
4. Install dependencies
   ```bash
   npm install
   ```
5. Set up the project structure according to the template
6. Copy the configuration files and starter code
7. Start the development server
   ```bash
   npm run dev
   ```

## Next Steps

After setting up the basic project structure:

1. Implement the core knowledge base system
2. Add the chat interface with streaming support
3. Create the extension framework
4. Implement the BizzyFarmer extension
5. Add authentication and user management
6. Set up the document processing pipeline
7. Implement the MCP integration
