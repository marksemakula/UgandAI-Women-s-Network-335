// src/hooks/useEventSync.js
import { useEffect } from 'react';

export function useEventSync(callback) {
  useEffect(() => {
    // Listen for localStorage changes
    const handleStorageChange = (e) => {
      if (e.key === 'uwiai_events') {
        callback();
      }
    };

    // Listen for custom events
    const handleCustomEvent = () => callback();

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('eventsUpdated', handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('eventsUpdated', handleCustomEvent);
    };
  }, [callback]);
}