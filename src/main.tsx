import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Custom theme for Ludix - Child-friendly colors
const theme = extendTheme({
  colors: {
    ludix: {
      primary: '#4A90E2',    // Friendly blue
      secondary: '#7B68EE',  // Purple
      accent: '#FFB347',     // Orange
      success: '#90EE90',    // Light green
      warning: '#FFD700',    // Gold
      danger: '#FF6B6B',     // Soft red
      light: '#F8F9FA',      // Light gray
      dark: '#2D3748'        // Dark gray
    }
  },
  fonts: {
    heading: 'Comic Sans MS, cursive',
    body: 'Comic Sans MS, cursive'
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'full',
        fontWeight: 'bold',
        fontSize: 'lg'
      },
      sizes: {
        lg: {
          h: '56px',
          fontSize: 'xl',
          px: '32px'
        }
      }
    },
    Card: {
      baseStyle: {
        borderRadius: '2xl',
        boxShadow: 'lg'
      }
    }
  },
  styles: {
    global: {
      body: {
        bg: 'gradient(to-br, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh'
      }
    }
  }
});

// Initialize auth on app start
const initializeApp = () => {
  // Import auth store after ChakraProvider is available
  import('./stores/authStore').then(({ useAuthStore }) => {
    useAuthStore.getState().initializeAuth();
  });
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

// Initialize app after render
setTimeout(initializeApp, 0);
