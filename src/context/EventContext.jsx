import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize all required localStorage items
  const initializeStorage = useCallback(() => {
    try {
      ['uwiai_events', 'uwiai_projects', 'uwiai_content'].forEach(key => {
        if (!localStorage.getItem(key)) {
          localStorage.setItem(key, JSON.stringify([]));
        }
      });
    } catch (error) {
      console.error('Storage initialization failed:', error);
      toast.error('Failed to initialize storage');
    }
  }, []);

  // Enhanced event validation and normalization
  const normalizeEvent = useCallback((event) => {
    try {
      // Date validation with fallback
      let validDate = null;
      if (event.date) {
        try {
          const dateObj = new Date(event.date);
          if (!isNaN(dateObj.getTime())) {
            validDate = dateObj.toISOString().split('T')[0]; // Format as YYYY-MM-DD
          }
        } catch (e) {
          console.warn('Invalid date format, using null');
        }
      }

      // Time validation with fallback
      let validTime = '12:00';
      if (event.time && /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(event.time)) {
        validTime = event.time;
      }

      return {
        id: event.id || Date.now().toString(),
        title: event.title || 'Untitled Event',
        date: validDate,
        time: validTime,
        location: event.location || 'Location TBD',
        type: ['Training', 'Workshop', 'Conference', 'Networking'].includes(event.type) 
          ? event.type 
          : 'Training',
        description: event.description || '',
        googleFormLink: event.googleFormLink?.includes('docs.google.com/forms') 
          ? event.googleFormLink 
          : '',
        formResponsesLink: event.googleFormLink?.includes('docs.google.com/forms')
          ? event.googleFormLink.replace('/viewform', '/viewanalytics')
          : '',
        lastUpdated: event.lastUpdated || new Date().toISOString()
      };
    } catch (err) {
      console.error('Error normalizing event:', err);
      throw new Error('Invalid event data');
    }
  }, []);

  // Load events with enhanced error handling
  const loadEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      initializeStorage();
      const savedEvents = JSON.parse(localStorage.getItem('uwiai_events')) || [];
      
      const validatedEvents = savedEvents.map(event => {
        try {
          return normalizeEvent(event);
        } catch (err) {
          console.error('Invalid event skipped:', err);
          return null;
        }
      }).filter(Boolean);

      // Sort events by date (newest first)
      validatedEvents.sort((a, b) => {
        try {
          const dateA = a.date ? new Date(a.date) : new Date(0);
          const dateB = b.date ? new Date(b.date) : new Date(0);
          return dateB - dateA;
        } catch {
          return 0;
        }
      });

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
  }, [initializeStorage, normalizeEvent]);

  // Update events with better synchronization
  const updateEvents = useCallback(async (newEvents) => {
    try {
      setIsLoading(true);
      
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
      
      // Dispatch custom event for same-tab listeners
      window.dispatchEvent(new CustomEvent('uwiai_events_updated', {
        detail: { events: validatedEvents }
      }));
      
      // Dispatch storage event for cross-tab synchronization
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

  // Create event with improved validation
  const createEvent = useCallback(async (eventData) => {
    try {
      if (!eventData.title || !eventData.description) {
        throw new Error('Title and description are required');
      }

      const newEvent = normalizeEvent({
        ...eventData,
        id: Date.now().toString()
      });

      const updatedEvents = [...events, newEvent];
      await updateEvents(updatedEvents);
      toast.success('Event created successfully');
      return newEvent;
    } catch (err) {
      toast.error(err.message || 'Failed to create event');
      throw err;
    }
  }, [events, normalizeEvent, updateEvents]);

  // Update event with better error handling
  const updateEvent = useCallback(async (eventId, updates) => {
    try {
      const existingEvent = events.find(e => e.id === eventId);
      if (!existingEvent) {
        throw new Error('Event not found');
      }

      const updatedEvents = events.map(event => 
        event.id === eventId ? normalizeEvent({ ...event, ...updates }) : event
      );
      
      await updateEvents(updatedEvents);
      toast.success('Event updated successfully');
      return updatedEvents.find(e => e.id === eventId);
    } catch (err) {
      toast.error(err.message || 'Failed to update event');
      throw err;
    }
  }, [events, normalizeEvent, updateEvents]);

  // Delete event with confirmation
  const deleteEvent = useCallback(async (eventId) => {
    try {
      if (!events.some(e => e.id === eventId)) {
        throw new Error('Event not found');
      }

      const updatedEvents = events.filter(event => event.id !== eventId);
      await updateEvents(updatedEvents);
      toast.success('Event deleted successfully');
      return updatedEvents;
    } catch (err) {
      toast.error(err.message || 'Failed to delete event');
      throw err;
    }
  }, [events, updateEvents]);

  // Force refresh with loading state
  const forceRefresh = useCallback(async () => {
    try {
      setIsLoading(true);
      const refreshedEvents = await loadEvents();
      
      window.dispatchEvent(new CustomEvent('uwiai_events_forced_refresh', {
        detail: { events: refreshedEvents }
      }));
      
      toast.success('Events refreshed successfully');
      return refreshedEvents;
    } catch (err) {
      toast.error('Failed to refresh events');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [loadEvents]);

  // Get event by ID with null check
  const getEventById = useCallback((id) => {
    return events.find(event => event.id === id) || null;
  }, [events]);

  // Set up event listeners with cleanup
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
      if (isMounted && e.detail?.events) {
        setEvents(e.detail.events);
      }
    };

    // Initial load
    initializeStorage();
    loadEvents().catch(err => {
      console.error('Initial events load failed:', err);
    });

    // Event listeners
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('uwiai_events_updated', handleCustomEvent);
    window.addEventListener('uwiai_events_forced_refresh', handleCustomEvent);

    return () => {
      isMounted = false;
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('uwiai_events_updated', handleCustomEvent);
      window.removeEventListener('uwiai_events_forced_refresh', handleCustomEvent);
    };
  }, [initializeStorage, loadEvents]);

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