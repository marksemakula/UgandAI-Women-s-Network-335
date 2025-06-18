import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FiCalendar, FiMapPin, FiClock, FiExternalLink, FiAlertCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default function EventCard({ event }) {
  const { 
    title, 
    date, 
    location, 
    time, 
    description, 
    type, 
    googleFormLink,
    formResponsesLink
  } = event;

  // Format date with proper error handling
  const formattedDate = date ? format(new Date(date), 'MMMM d, yyyy') : 'Date TBD';
  const isPastEvent = date ? new Date(date) < new Date() : false;

  const handleRegisterClick = (e) => {
    if (!googleFormLink) {
      e.preventDefault();
      toast.info('Registration link will be available soon!');
    }
  };

  const handleManageClick = (e) => {
    if (!formResponsesLink) {
      e.preventDefault();
      toast.info('Responses link not available for this event');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 ${
        isPastEvent ? 'border-gray-300' : 'border-accent'
      } hover:shadow-lg transition-shadow duration-300 relative`}
    >
      {isPastEvent && (
        <div className="absolute top-2 right-2 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
          Past Event
        </div>
      )}

      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
            isPastEvent 
              ? 'bg-gray-100 text-gray-600' 
              : 'bg-accent/10 text-accent'
          }`}>
            {type}
          </span>
          {date && (
            <span className="text-xs text-gray-500">
              {format(new Date(date), 'MMM d, yyyy')}
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

        <div className="mt-auto space-y-2">
          <a 
            href={googleFormLink || '#'}
            onClick={handleRegisterClick}
            target="_blank" 
            rel="noopener noreferrer"
            className={`w-full inline-flex items-center justify-center px-4 py-2 rounded-md transition ${
              googleFormLink 
                ? isPastEvent
                  ? 'bg-gray-200 text-gray-600'
                  : 'bg-accent text-white hover:bg-accent-light'
                : 'bg-gray-100 text-gray-500 cursor-not-allowed'
            }`}
          >
            {googleFormLink 
              ? isPastEvent 
                ? 'Event Ended' 
                : 'Register Now' 
              : 'Registration Coming Soon'}
            {googleFormLink && !isPastEvent && <FiExternalLink className="ml-2" size={14} />}
          </a>

          {formResponsesLink && (
            <a
              href={formResponsesLink}
              onClick={handleManageClick}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center px-4 py-2 text-sm text-gray-600 hover:text-accent hover:bg-gray-50 rounded-md transition"
            >
              View Responses
              <FiExternalLink className="ml-2" size={12} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}