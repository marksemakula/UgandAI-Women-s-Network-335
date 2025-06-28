import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize events in localStorage if empty
  const initializeEvents = useCallback(() => {
    if (!localStorage.getItem('uwiai_events')) {
      localStorage.setItem('uwiai_events', JSON.stringify([]));
    }
  }, []);

  // Validate and normalize event data
  const normalizeEvent = useCallback((event) => {
    try {
      // Parse and validate date
      let validDate = null;
      if (event.date) {
        try {
          const dateObj = new Date(event.date);
          if (!isNaN(dateObj.getTime())) {
            validDate = event.date;
          }
        } catch (e) {
          console.warn('Invalid date format, using null');
        }
      }

      return {
        id: event.id || Date.now().toString(),
        title: event.title || 'Untitled Event',
        date: validDate,
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
      initializeEvents(); // Ensure storage is initialized
      const savedEvents = JSON.parse(localStorage.getItem('uwiai_events')) || [];
      
      // Validate and normalize all events
      const validatedEvents = savedEvents.map(event => {
        try {
          return normalizeEvent(event);
        } catch (err) {
          console.error('Invalid event skipped:', err);
          return null;
        }
      }).filter(Boolean); // Remove any null entries from failed validations

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
  }, [initializeEvents, normalizeEvent]);

  // Update events in localStorage and state
  const updateEvents = useCallback(async (newEvents) => {
    try {
      setIsLoading(true);
      
      // Validate all events before saving
      const validatedEvents = newEvents.map(event => {
        try {
          return normalizeEvent(event);
        } catch (err) {
          console.error('Invalid event skipped during update:', err);
          return null;
        }
      }).filter(Boolean);

      // Save to localStorage
      localStorage.setItem('uwiai_events', JSON.stringify(validatedEvents));
      setEvents(validatedEvents);
      
      // Dispatch events to sync across tabs and components
      window.dispatchEvent(new CustomEvent('uwiai_events_updated', {
        detail: { events: validatedEvents }
      }));
      
      // Also dispatch storage event for other tabs
      const storageEvent = new StorageEvent('storage', {
        key: 'uwiai_events',
        newValue: JSON.stringify(validatedEvents),
        oldValue: localStorage.getItem('uwiai_events'),
        storageArea: localStorage,
        url: window.location.href
      });
      window.dispatchEvent(storageEvent);
      
      return validatedEvents;
    } catch (err) {
      console.error('Error updating events:', err);
      toast.error('Failed to save events');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [normalizeEvent]);

  // Create a new event
  const createEvent = useCallback(async (eventData) => {
    try {
      const newEvent = normalizeEvent({
        ...eventData,
        id: Date.now().toString()
      });
      const updatedEvents = [...events, newEvent];
      await updateEvents(updatedEvents);
      toast.success('Event created successfully');
      return newEvent;
    } catch (err) {
      toast.error('Failed to create event');
      throw err;
    }
  }, [events, normalizeEvent, updateEvents]);

  // Update a single event
  const updateEvent = useCallback(async (eventId, updates) => {
    try {
      const updatedEvents = events.map(event => 
        event.id === eventId ? normalizeEvent({ ...event, ...updates }) : event
      );
      await updateEvents(updatedEvents);
      toast.success('Event updated successfully');
      return updatedEvents.find(e => e.id === eventId);
    } catch (err) {
      toast.error('Failed to update event');
      throw err;
    }
  }, [events, normalizeEvent, updateEvents]);

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
      const events = await loadEvents();
      window.dispatchEvent(new CustomEvent('uwiai_events_forced_refresh', {
        detail: { events }
      }));
      toast.success('Events refreshed successfully');
      return events;
    } catch (err) {
      toast.error('Failed to refresh events');
      throw err;
    }
  }, [loadEvents]);

  // Get event by ID
  const getEventById = useCallback((id) => {
    return events.find(event => event.id === id);
  }, [events]);

  // Set up event listeners and initial load
  useEffect(() => {
    let isMounted = true;

    const handleStorageChange = (e) => {
      if (e.key === 'uwiai_events' && isMounted) {
        loadEvents().catch(err => {
          console.error('Error handling storage change:', err);
        });
      }
    };

    const handleCustomEvent = (e) => {
      if (isMounted) {
        try {
          // Update from custom event data if available
          if (e.detail?.events) {
            setEvents(e.detail.events);
          } else {
            loadEvents().catch(console.error);
          }
        } catch (err) {
          console.error('Error handling custom event:', err);
        }
      }
    };

    // Initial load
    initializeEvents();
    loadEvents().catch(err => {
      console.error('Initial events load failed:', err);
    });

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
  }, [initializeEvents, loadEvents]);

  // Memoized context value
  const value = useMemo(() => ({
    events,
    isLoading,
    error,
    loadEvents,
    updateEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    forceRefresh,
    getEventById,
    normalizeEvent
  }), [
    events,
    isLoading,
    error,
    loadEvents,
    updateEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    forceRefresh,
    getEventById,
    normalizeEvent
  ]);

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