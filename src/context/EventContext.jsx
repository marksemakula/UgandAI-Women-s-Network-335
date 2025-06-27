import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Validate and normalize event data
  const normalizeEvent = useCallback((event) => {
    try {
      return {
        id: event.id || Date.now().toString(),
        title: event.title || 'Untitled Event',
        date: event.date || null,
        time: event.time || '12:00',
        location: event.location || 'Location TBD',
        type: event.type || 'Training',
        description: event.description || '',
        googleFormLink: event.googleFormLink || '',
        formResponsesLink: event.formResponsesLink || 
          (event.googleFormLink ? event.googleFormLink.replace('/viewform', '/viewanalytics') : ''),
        lastUpdated: event.lastUpdated || new Date().toISOString()
      };
    } catch (err) {
      console.error('Error normalizing event:', err);
      throw new Error('Invalid event data');
    }
  }, []);

  // Load events from localStorage with validation
  const loadEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const savedEvents = JSON.parse(localStorage.getItem('uwiai_events')) || [];
      const validatedEvents = savedEvents.map(normalizeEvent);
      setEvents(validatedEvents);
      setError(null);
      return validatedEvents;
    } catch (err) {
      console.error('Error loading events:', err);
      setError('Failed to load events. Please refresh the page.');
      setEvents([]);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [normalizeEvent]);

  // Update events in localStorage and state
  const updateEvents = useCallback(async (newEvents) => {
    try {
      setIsLoading(true);
      const validatedEvents = newEvents.map(normalizeEvent);
      
      localStorage.setItem('uwiai_events', JSON.stringify(validatedEvents));
      setEvents(validatedEvents);
      
      // Dispatch both custom event and storage event for maximum compatibility
      window.dispatchEvent(new CustomEvent('uwiai_events_updated', {
        detail: validatedEvents
      }));
      
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'uwiai_events',
        newValue: JSON.stringify(validatedEvents),
        oldValue: localStorage.getItem('uwiai_events'),
        storageArea: localStorage,
        url: window.location.href
      }));
      
      return validatedEvents;
    } catch (err) {
      console.error('Error updating events:', err);
      toast.error('Failed to save events');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [normalizeEvent]);

  // Delete a single event
  const deleteEvent = useCallback(async (eventId) => {
    try {
      const updatedEvents = events.filter(event => event.id !== eventId);
      await updateEvents(updatedEvents);
      toast.success('Event deleted successfully');
      return updatedEvents;
    } catch (err) {
      toast.error('Failed to delete event');
      throw err;
    }
  }, [events, updateEvents]);

  // Force refresh events data
  const forceRefresh = useCallback(async () => {
    try {
      await loadEvents();
      window.dispatchEvent(new CustomEvent('uwiai_events_forced_refresh'));
      toast.success('Events refreshed successfully');
    } catch (err) {
      toast.error('Failed to refresh events');
      throw err;
    }
  }, [loadEvents]);

  // Set up event listeners and initial load
  useEffect(() => {
    let isMounted = true;

    const handleStorageChange = (e) => {
      if (e.key === 'uwiai_events' && isMounted) {
        loadEvents().catch(console.error);
      }
    };

    const handleCustomEvent = () => {
      if (isMounted) loadEvents().catch(console.error);
    };

    // Initial load
    loadEvents().catch(console.error);

    // Set up listeners
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('uwiai_events_updated', handleCustomEvent);
    window.addEventListener('uwiai_events_forced_refresh', handleCustomEvent);

    return () => {
      isMounted = false;
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('uwiai_events_updated', handleCustomEvent);
      window.removeEventListener('uwiai_events_forced_refresh', handleCustomEvent);
    };
  }, [loadEvents]);

  // Memoized context value
  const value = useMemo(() => ({
    events,
    isLoading,
    error,
    loadEvents,
    updateEvents,
    deleteEvent,
    forceRefresh,
    normalizeEvent
  }), [events, isLoading, error, loadEvents, updateEvents, deleteEvent, forceRefresh, normalizeEvent]);

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

export const EventConsumer = EventContext.Consumer;
export default EventContext;