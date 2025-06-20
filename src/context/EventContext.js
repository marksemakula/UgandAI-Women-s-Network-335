// src/context/EventContext.js
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEvents = useCallback(() => {
    setIsLoading(true);
    try {
      const savedEvents = JSON.parse(localStorage.getItem('uwiai_events')) || [];
      // Validate and normalize event data
      const processedEvents = savedEvents.map(event => ({
        id: event.id || Date.now().toString(),
        title: event.title || 'Untitled Event',
        date: event.date || null,
        time: event.time || '',
        location: event.location || 'Location TBD',
        type: event.type || 'Event',
        description: event.description || '',
        googleFormLink: event.googleFormLink || '',
        formResponsesLink: event.formResponsesLink || ''
      }));
      setEvents(processedEvents);
      setError(null);
    } catch (error) {
      console.error('Error loading events:', error);
      setError('Failed to load events');
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateEvents = useCallback((newEvents) => {
    try {
      const processedEvents = newEvents.map(event => ({
        id: event.id || Date.now().toString(),
        title: event.title || 'Untitled Event',
        date: event.date || null,
        time: event.time || '',
        location: event.location || 'Location TBD',
        type: event.type || 'Event',
        description: event.description || '',
        googleFormLink: event.googleFormLink || '',
        formResponsesLink: event.formResponsesLink || ''
      }));
      
      localStorage.setItem('uwiai_events', JSON.stringify(processedEvents));
      setEvents(processedEvents);
      
      // Trigger updates across tabs and components
      window.dispatchEvent(new CustomEvent('uwiai_events_updated'));
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'uwiai_events',
        newValue: JSON.stringify(processedEvents),
        oldValue: localStorage.getItem('uwiai_events'),
        storageArea: localStorage,
        url: window.location.href
      }));
    } catch (error) {
      console.error('Error updating events:', error);
      throw error;
    }
  }, []);

  useEffect(() => {
    // Initial load
    loadEvents();

    // Set up event listeners
    const handleStorageChange = (e) => {
      if (e.key === 'uwiai_events') {
        loadEvents();
      }
    };

    const handleCustomEvent = () => {
      loadEvents();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('uwiai_events_updated', handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('uwiai_events_updated', handleCustomEvent);
    };
  }, [loadEvents]);

  const value = useMemo(() => ({
    events,
    isLoading,
    error,
    loadEvents,
    updateEvents
  }), [events, isLoading, error, loadEvents, updateEvents]);

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}