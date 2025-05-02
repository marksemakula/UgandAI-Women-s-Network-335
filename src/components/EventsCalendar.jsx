import { useState } from 'react';
import EventCard from './EventCard';
import { motion } from 'framer-motion';

const filterButtons = ['All', 'Training', 'Workshop', 'Conference'];

export default function EventsCalendar({ events }) {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filteredEvents = events.filter(event => 
    activeFilter === 'All' || event.type === activeFilter
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Upcoming Events</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join us for hands-on AI training sessions, workshops, and networking events
            designed specifically for women in technology.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {filterButtons.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full transition ${
                activeFilter === filter
                  ? 'bg-accent text-white'
                  : 'bg-white text-primary hover:bg-accent/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredEvents.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}