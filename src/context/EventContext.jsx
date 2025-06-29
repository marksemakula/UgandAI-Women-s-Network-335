// EventContext.jsx - Updated version
import PropTypes from 'prop-types';
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize storage with default events if empty
  const initializeStorage = useCallback(() => {
    try {
      const defaultEvents = [
        {
          id: 'default-1',
          title: 'AI Workshop',
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
          time: '14:00',
          location: 'Virtual',
          type: 'Workshop',
          description: 'Introduction to AI concepts',
          googleFormLink: '',
          lastUpdated: new Date().toISOString()
        }
      ];

      if (!localStorage.getItem('uwiai_events')) {
        localStorage.setItem('uwiai_events', JSON.stringify(defaultEvents));
      }
    } catch (error) {
      console.error('Storage initialization failed:', error);
      toast.error('Failed to initialize storage');
    }
  }, []);

  // Enhanced event normalization
  const normalizeEvent = useCallback((event) => {
    try {
      return {
        id: event.id || Date.now().toString(),
        title: event.title || 'Untitled Event',
        date: event.date || '',
        time: event.time || '12:00',
        location: event.location || 'Virtual',
        type: ['Training', 'Workshop', 'Conference', 'Networking'].includes(event.type) 
          ? event.type 
          : 'Workshop',
        description: event.description || '',
        googleFormLink: event.googleFormLink || '',
        formResponsesLink: event.googleFormLink?.includes('docs.google.com/forms')
          ? event.googleFormLink.replace('/viewform', '/viewanalytics')
          : '',
        lastUpdated: new Date().toISOString()
      };
    } catch (err) {
      console.error('Error normalizing event:', err);
      throw new Error('Invalid event data');
    }
  }, []);

  // Load events with error handling
  const loadEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      initializeStorage();
      const savedEvents = JSON.parse(localStorage.getItem('uwiai_events')) || [];
      
      const validatedEvents = savedEvents.map(normalizeEvent);
      validatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

      setEvents(validatedEvents);
      setError(null);
      return validatedEvents;
    } catch (err) {
      console.error('Error loading events:', err);
      setError('Failed to load events');
      setEvents([]);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [initializeStorage, normalizeEvent]);

  // Update events in storage and state
  const updateEvents = useCallback(async (newEvents) => {
    try {
      setIsLoading(true);
      const validatedEvents = newEvents.map(normalizeEvent);
      localStorage.setItem('uwiai_events', JSON.stringify(validatedEvents));
      setEvents(validatedEvents);
      
      // Trigger sync across tabs
      window.dispatchEvent(new CustomEvent('uwiai_events_updated'));
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'uwiai_events',
        newValue: JSON.stringify(validatedEvents)
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

  // CRUD operations
  const createEvent = useCallback(async (eventData) => {
    const newEvent = normalizeEvent(eventData);
    return updateEvents([...events, newEvent]);
  }, [events, normalizeEvent, updateEvents]);

  const updateEvent = useCallback(async (eventId, updates) => {
    const updatedEvents = events.map(event => 
      event.id === eventId ? normalizeEvent({ ...event, ...updates }) : event
    );
    return updateEvents(updatedEvents);
  }, [events, normalizeEvent, updateEvents]);

  const deleteEvent = useCallback(async (eventId) => {
    return updateEvents(events.filter(event => event.id !== eventId));
  }, [events, updateEvents]);

  // Initial load and event listeners
  useEffect(() => {
    loadEvents();
    
    const handleStorageChange = (e) => {
      if (e.key === 'uwiai_events') loadEvents();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [loadEvents]);

  const value = useMemo(() => ({
    events,
    isLoading,
    error,
    loadEvents,
    updateEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    normalizeEvent
  }), [events, isLoading, error, loadEvents, updateEvents, createEvent, updateEvent, deleteEvent, normalizeEvent]);

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
}

EventProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) throw new Error('useEvents must be used within an EventProvider');
  return context;
}

export const EventConsumer = EventContext.Consumer;
EventConsumer.propTypes = {
  children: PropTypes.func.isRequired
};

export default EventContext;