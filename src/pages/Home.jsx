import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import FeatureStory from '../components/FeatureStory';
import EventsCalendar from '../components/EventsCalendar';

const featuredStories = [
  {
    title: "Breaking Barriers in AI Research",
    author: "Viola Nuwaha",
    date: "March 15, 2024",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    excerpt: "How a team of Ugandan women researchers are revolutionizing healthcare with AI, in collaboration with communities like inzozi.co and other women-led AI initiatives."
  },
  {
    title: "African Women in AI: Pivots, Perseverances and Pleasures",
    author: "Sarah Nalubega",
    date: "August 01, 2022",
    image: "/images/vnuwahagermany.jpeg",
    excerpt: "Moved by the absence of data and information on this topic, we decided that this was a project worth embarking on."
  }
];

export default function Home() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to load and process events
  const loadEvents = () => {
    try {
      const savedEvents = JSON.parse(localStorage.getItem('uwiai_events')) || [];
      
      // Process events to ensure proper date format
      const processedEvents = savedEvents.map(event => ({
        ...event,
        // Ensure date is in correct format (YYYY-MM-DD)
        date: event.date ? new Date(event.date).toISOString().split('T')[0] : null,
        // Set default type if missing
        type: event.type || 'Event'
      }));

      // Filter upcoming events (include events without dates)
      const filteredEvents = processedEvents.filter(event => {
        if (!event.date) return true;
        const eventDate = new Date(event.date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return eventDate >= today;
      });

      // Sort events by date (soonest first, undefined dates last)
      filteredEvents.sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(a.date) - new Date(b.date);
      });

      setUpcomingEvents(filteredEvents);
    } catch (error) {
      console.error('Error loading events:', error);
      setUpcomingEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial load
    loadEvents();

    // Set up storage event listener
    const handleStorageChange = (e) => {
      if (e.key === 'uwiai_events') {
        loadEvents();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Custom event listener for same-tab updates
    const handleCustomEventUpdate = () => loadEvents();
    window.addEventListener('eventUpdated', handleCustomEventUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('eventUpdated', handleCustomEventUpdate);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-primary mb-4"
            >
              Featured Stories
            </motion.h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover inspiring stories from our community of women in AI.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredStories.map((story, index) => (
              <FeatureStory key={index} story={story} />
            ))}
          </div>
        </div>
      </section>
      
      {isLoading ? (
        <div className="py-16 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
        </div>
      ) : (
        <EventsCalendar events={upcomingEvents} />
      )}
    </div>
  );
}