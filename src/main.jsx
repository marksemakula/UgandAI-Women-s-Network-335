import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { EventProvider } from './context/EventContext';
import './index.css';

// Initialize localStorage with empty arrays if they don't exist
const initializeLocalStorage = () => {
  try {
    if (!localStorage.getItem('uwiai_events')) {
      localStorage.setItem('uwiai_events', JSON.stringify([]));
    }
    if (!localStorage.getItem('uwiai_projects')) {
      localStorage.setItem('uwiai_projects', JSON.stringify([]));
    }
    if (!localStorage.getItem('uwiai_content')) {
      localStorage.setItem('uwiai_content', JSON.stringify([]));
    }
    if (!localStorage.getItem('uwiai_research')) {
      localStorage.setItem('uwiai_research', JSON.stringify([]));
    }
  } catch (error) {
    console.error('Failed to initialize localStorage:', error);
  }
};

// Initialize before rendering the app
initializeLocalStorage();

const container = document.getElementById('root');

if (!container) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <EventProvider>
      <App />
    </EventProvider>
  </StrictMode>
);