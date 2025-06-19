import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiFilter, FiCalendar, FiMapPin, FiClock, FiExternalLink } from 'react-icons/fi';
import { toast } from 'react-toastify';
import EventCard from './EventCard';

const eventTypes = [
  { value: 'All', label: 'All Events' },
  { value: 'Training', label: 'Trainings' },
  { value: 'Workshop', label: 'Workshops' },
  { value: 'Conference', label: 'Conferences' },
  { value: 'Networking', label: 'Networking' },
  { value: 'Ceremony', label: 'Ceremonies' }
];

export default function EventsCalendar() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadEvents = useCallback(() => {
    setIsLoading(true);
    try {
      const savedEvents = JSON.parse(localStorage.getItem('uwiai_events')) || [];
      
      // Process and validate events
      const processedEvents = savedEvents.map(event => ({
        ...event,
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

      // Filter upcoming events
      const upcomingEvents = processedEvents.filter(event => {
        if (!event.date) return true;
        try {
          const eventDate = new Date(event.date);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return eventDate >= today;
        } catch (error) {
          console.error('Invalid date format:', event.date);
          return false;
        }
      });

      // Sort events by date
      upcomingEvents.sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(a.date) - new Date(b.date);
      });

      setEvents(upcomingEvents);
    } catch (error) {
      console.error('Error loading events:', error);
      toast.error('Failed to load events');
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Listen for event updates
  useEffect(() => {
    // Initial load
    loadEvents();

    // Custom event listener for same-tab updates
    const handleCustomEvent = () => {
      loadEvents();
    };

    // Storage event listener for cross-tab updates
    const handleStorageChange = (e) => {
      if (e.key === 'uwiai_events') {
        loadEvents();
      }
    };

    window.addEventListener('eventsUpdated', handleCustomEvent);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('eventsUpdated', handleCustomEvent);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [loadEvents]);

  const filteredEvents = events.filter(event => 
    activeFilter === 'All' || event.type === activeFilter
  );

  return (
    <section className="py-16 bg-gray-50" id="events">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Upcoming Events</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our upcoming AI training sessions, workshops, and networking events.
          </p>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center mb-2 text-sm text-gray-500">
            <FiFilter className="mr-2" />
            <span>Filter by event type:</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {eventTypes.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-3 py-1 text-sm rounded-full transition ${
                  activeFilter === filter.value
                    ? 'bg-accent text-white'
                    : 'bg-white text-primary hover:bg-accent/10 border border-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              {activeFilter === 'All' 
                ? 'No upcoming events scheduled'
                : `No upcoming ${activeFilter.toLowerCase()} events`}
            </h3>
            <p className="text-gray-500">Check back later for new events</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}