import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export default function FeatureStory({ story }) {
  const { title, author, date, image, excerpt } = story;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="h-48 w-full overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">
          By {author} • {date}
        </p>
        <p className="text-gray-700 mb-4">{excerpt}</p>
        <button className="text-accent hover:text-accent-light transition font-medium">
          Read More →
        </button>
      </div>
    </motion.div>
  );
}

FeatureStory.propTypes = {
  story: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired
  }).isRequired
};