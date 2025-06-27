import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

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
    } catch (err) {
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
      
      // Dispatch events with consistent naming
      window.dispatchEvent(new CustomEvent('uwiai_events_updated'));
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'uwiai_events',
        newValue: JSON.stringify(validatedEvents),
        oldValue: localStorage.getItem('uwiai_events'),
        storageArea: localStorage,
        url: window.location.href
      }));
      
      return validatedEvents;
    } catch (err) {
      throw new Error('Error updating events');
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

EventProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}

// Export the context for testing purposes if needed
export const EventConsumer = EventContext.Consumer;
export default EventContext;