import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useEvents } from '../context/EventContext';
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
  const { events, isLoading, error } = useEvents();

  // Filter and sort upcoming events
  const upcomingEvents = useMemo(() => {
    if (!events || isLoading) return [];
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return events
      .filter(event => {
        if (!event.date) return false;
        try {
          const eventDate = new Date(event.date);
          return eventDate >= today;
        } catch {
          return false;
        }
      })
      .sort((a, b) => {
        if (!a.date && !b.date) return 0;
        if (!a.date) return 1;
        if (!b.date) return -1;
        return new Date(a.date) - new Date(b.date);
      });
  }, [events, isLoading]);

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Featured Stories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-primary mb-4"
            >
              Featured Stories
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-gray-600 max-w-2xl mx-auto"
            >
              Discover inspiring stories from our community of women in AI.
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {featuredStories.map((story, index) => (
              <FeatureStory key={`story-${index}`} story={story} />
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 max-w-4xl mx-auto"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">{error}</p>
                  <p className="text-sm text-yellow-600 mt-1">Please try refreshing the page or contact support if the problem persists.</p>
                </div>
              </div>
            </motion.div>
          ) : isLoading ? (
            <motion.div 
              className="py-16 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
              <span className="sr-only">Loading events...</span>
            </motion.div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-primary mb-4">Upcoming Events</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Join our community for these exciting upcoming events.
                </p>
              </div>
              <EventsCalendar events={upcomingEvents} />
            </>
          )}
        </div>
      </section>
    </div>
  );
}