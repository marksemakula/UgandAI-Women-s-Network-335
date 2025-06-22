  // src/hooks/useEventSync.js
  import { useEffect } from 'react';

  export function useEventSync(callback) {
    useEffect(() => {
      const handleStorageChange = (e) => {
        if (e.key === 'uwiai_events') {
          callback();
        }
      };

      const handleCustomEvent = () => callback();

      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('uwiai_events_updated', handleCustomEvent);
      window.addEventListener('uwiai_events_forced_refresh', handleCustomEvent);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('uwiai_events_updated', handleCustomEvent);
        window.removeEventListener('uwiai_events_forced_refresh', handleCustomEvent);
      };
    }, [callback]);
  }