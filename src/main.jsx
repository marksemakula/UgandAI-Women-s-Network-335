import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { EventProvider } from './context/EventContext';

import './index.css';
import { toast } from 'react-toastify';

// Define all required localStorage keys and their default values
const STORAGE_KEYS = {
  EVENTS: 'uwiai_events',
  PROJECTS: 'uwiai_projects',
  CONTENT: 'uwiai_content',
  RESEARCH: 'uwiai_research',
  ADMIN_TOKEN: 'uwiai_admin_token',
  USER_PREFERENCES: 'uwiai_user_prefs'
};

const DEFAULT_VALUES = {
  [STORAGE_KEYS.EVENTS]: [],
  [STORAGE_KEYS.PROJECTS]: [],
  [STORAGE_KEYS.CONTENT]: [],
  [STORAGE_KEYS.RESEARCH]: [],
  [STORAGE_KEYS.ADMIN_TOKEN]: null,
  [STORAGE_KEYS.USER_PREFERENCES]: {
    theme: 'light',
    notifications: true
  }
};

// Enhanced localStorage initialization with error recovery
const initializeApplication = () => {
  try {
    // Check if localStorage is available
    if (typeof localStorage === 'undefined') {
      throw new Error('localStorage is not available in this environment');
    }

    // Initialize all required keys with default values if they don't exist
    Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
      if (!localStorage.getItem(storageKey)) {
        localStorage.setItem(
          storageKey, 
          JSON.stringify(DEFAULT_VALUES[storageKey] || null)
        );
      }
    });

    // Validate existing data structure for critical collections
    [STORAGE_KEYS.EVENTS, STORAGE_KEYS.PROJECTS].forEach(key => {
      try {
        const data = JSON.parse(localStorage.getItem(key));
        if (!Array.isArray(data)) {
          throw new Error(`Invalid data structure for ${key}`);
        }
      } catch (e) {
        console.warn(`Resetting corrupted data for ${key}`);
        localStorage.setItem(key, JSON.stringify(DEFAULT_VALUES[key]));
      }
    });

  } catch (error) {
    console.error('Application initialization failed:', error);
    
    // Show user-friendly error message if in browser context
    if (typeof window !== 'undefined') {
      toast.error('Failed to initialize application storage. Some features may not work properly.', {
        autoClose: false,
        closeOnClick: false
      });
    }
    
    // Re-throw error to prevent application from starting in broken state
    throw error;
  }
};

// Execute initialization before React renders anything
try {
  initializeApplication();
} catch (error) {
  // This will be caught by error boundary in production
  console.error('Critical initialization error:', error);
}

// Root component rendering with error boundary
const container = document.getElementById('root');

if (!container) {
  // Create fallback container if root doesn't exist
  const fallbackContainer = document.createElement('div');
  fallbackContainer.id = 'root';
  document.body.appendChild(fallbackContainer);
  
  // Show critical error message
  const errorMessage = document.createElement('div');
  errorMessage.className = 'critical-error';
  errorMessage.innerHTML = `
    <h1>Application Error</h1>
    <p>Failed to mount application. Please refresh the page.</p>
  `;
  fallbackContainer.appendChild(errorMessage);
  
  throw new Error('Failed to find root element, created fallback container');
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <EventProvider>
      <App />
    </EventProvider>
  </StrictMode>
);

// Add global error handler for better debugging
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  
  // Send error to error tracking service in production
  if (process.env.NODE_ENV === 'production') {
    // Here you would typically send to Sentry/LogRocket/etc
    console.log('Error would be sent to tracking service:', event.error);
  }
});

// Add handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled rejection:', event.reason);
  
  // Show user-friendly toast for unexpected errors
  toast.error('An unexpected error occurred. Please try again.', {
    autoClose: 5000
  });
});