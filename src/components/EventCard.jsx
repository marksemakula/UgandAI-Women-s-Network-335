import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FiCalendar, FiMapPin, FiClock } from 'react-icons/fi';

export default function EventCard({ event }) {
  const { title, date, location, time, description, type } = event;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-accent"
    >
      <div className="p-6">
        <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent mb-4">
          {type}
        </span>
        <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
        <div className="space-y-2 text-gray-600">
          <div className="flex items-center">
            <FiCalendar className="mr-2" />
            <span>{format(new Date(date), 'MMMM d, yyyy')}</span>
          </div>
          <div className="flex items-center">
            <FiClock className="mr-2" />
            <span>{time}</span>
          </div>
          <div className="flex items-center">
            <FiMapPin className="mr-2" />
            <span>{location}</span>
          </div>
        </div>
        <p className="mt-4 text-gray-700">{description}</p>
        <button className="mt-4 px-4 py-2 bg-accent text-white rounded hover:bg-accent-light transition">
          Register Now
        </button>
      </div>
    </motion.div>
  );
}