// src/context/EventContext.jsx
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
      const validatedEvents = savedEvents.map(event => ({
        id: event.id || Date.now().toString(),
        title: event.title || 'Untitled Event',
        date: event.date || null,
        time: event.time || '',
        location: event.location || 'Location TBD',
        type: event.type || 'Event',
        description: event.description || '',
        googleFormLink: event.googleFormLink || '',
        formResponsesLink: event.formResponsesLink || 
          (event.googleFormLink ? event.googleFormLink.replace('/viewform', '/viewanalytics') : ''),
        lastUpdated: event.lastUpdated || new Date().toISOString()
      }));
      setEvents(validatedEvents);
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
      const validatedEvents = newEvents.map(event => ({
        id: event.id || Date.now().toString(),
        title: event.title || 'Untitled Event',
        date: event.date || null,
        time: event.time || '',
        location: event.location || 'Location TBD',
        type: event.type || 'Event',
        description: event.description || '',
        googleFormLink: event.googleFormLink || '',
        formResponsesLink: event.formResponsesLink || 
          (event.googleFormLink ? event.googleFormLink.replace('/viewform', '/viewanalytics') : ''),
        lastUpdated: new Date().toISOString()
      }));
      
      localStorage.setItem('uwiai_events', JSON.stringify(validatedEvents));
      setEvents(validatedEvents);
      
      // Dispatch both custom event and storage event for broader compatibility
      window.dispatchEvent(new CustomEvent('uwiai_events_updated'));
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'uwiai_events',
        newValue: JSON.stringify(validatedEvents)
      }));
      
      return validatedEvents;
    } catch (error) {
      console.error('Error updating events:', error);
      throw error;
    }
  }, []);

  const deleteEvent = useCallback((eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    return updateEvents(updatedEvents);
  }, [events, updateEvents]);

  const forceRefresh = useCallback(() => {
    loadEvents();
    window.dispatchEvent(new CustomEvent('uwiai_events_forced_refresh'));
  }, [loadEvents]);

  useEffect(() => {
    // Initial load
    loadEvents();

    const handleStorageChange = (e) => {
      if (e.key === 'uwiai_events') {
        loadEvents();
      }
    };

    const handleCustomEvent = () => loadEvents();

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('uwiai_events_updated', handleCustomEvent);
    window.addEventListener('uwiai_events_forced_refresh', handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('uwiai_events_updated', handleCustomEvent);
      window.removeEventListener('uwiai_events_forced_refresh', handleCustomEvent);
    };
  }, [loadEvents]);

  const value = useMemo(() => ({
    events,
    isLoading,
    error,
    loadEvents,
    updateEvents,
    deleteEvent,
    forceRefresh
  }), [events, isLoading, error, loadEvents, updateEvents, deleteEvent, forceRefresh]);

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