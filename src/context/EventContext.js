// src/context/EventContext.js
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useEventSync } from '../hooks/useEventSync';

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);

  const loadEvents = useCallback(() => {
    try {
      const savedEvents = JSON.parse(localStorage.getItem('uwiai_events')) || [];
      setEvents(savedEvents);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  }, []);

  useEventSync(loadEvents);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return (
    <EventContext.Provider value={{ events, loadEvents }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventContext);
}