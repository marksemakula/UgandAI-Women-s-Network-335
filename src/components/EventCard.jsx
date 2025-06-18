import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FiCalendar, FiMapPin, FiClock, FiExternalLink } from 'react-icons/fi';

export default function EventCard({ event }) {
  const { 
    title, 
    date, 
    location, 
    time, 
    description, 
    type, 
    registrationLink 
  } = event;

  // Format date with proper error handling
  const formattedDate = date ? format(new Date(date), 'MMMM d, yyyy') : 'Date TBD';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-accent hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent">
            {type}
          </span>
          {date && (
            <span className="text-xs text-gray-500">
              {format(new Date(date), 'MMM d')}
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
        
        <div className="space-y-2 text-gray-600 mb-4">
          <div className="flex items-center">
            <FiCalendar className="mr-2 min-w-[16px]" />
            <span>{formattedDate}</span>
          </div>
          {time && (
            <div className="flex items-center">
              <FiClock className="mr-2 min-w-[16px]" />
              <span>{time}</span>
            </div>
          )}
          <div className="flex items-center">
            <FiMapPin className="mr-2 min-w-[16px]" />
            <span>{location || 'Location TBD'}</span>
          </div>
        </div>

        {description && (
          <p className="mt-2 text-gray-700 mb-6 line-clamp-3">
            {description}
          </p>
        )}

        <div className="mt-auto">
          <a 
            href={registrationLink || '#'}
            target="_blank" 
            rel="noopener noreferrer"
            className={`mt-4 inline-flex items-center px-4 py-2 rounded-md transition ${
              registrationLink 
                ? 'bg-accent text-white hover:bg-accent-light'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {registrationLink ? 'Register Now' : 'Registration Coming Soon'}
            {registrationLink && <FiExternalLink className="ml-2" size={14} />}
          </a>
        </div>
      </div>
    </motion.div>
  );
}