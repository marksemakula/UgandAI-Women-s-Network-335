import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FiLinkedin, FiTwitter, FiAward, FiExternalLink, FiGithub } from 'react-icons/fi';

const InnovatorSpotlight = ({ innovator }) => {
  const { name, title, image, bio, achievements, links, featured } = innovator;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-white rounded-lg shadow-lg overflow-hidden ${
        featured ? 'md:col-span-2 md:grid md:grid-cols-2' : ''
      }`}
    >
      <div className={`relative ${featured ? 'h-full' : 'h-64'}`}>
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
        {featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-accent text-white px-4 py-1 rounded-full text-sm font-medium">
              Featured Innovator
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-primary mb-2">{name}</h3>
        <p className="text-accent mb-4">{title}</p>
        
        <p className="text-gray-600 mb-6">{bio}</p>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-primary mb-3">Key Achievements</h4>
          <ul className="space-y-2">
            {achievements.map((achievement, index) => (
              <li key={index} className="flex items-start">
                <FiAward className="text-accent mt-1 mr-2 flex-shrink-0" />
                <span className="text-gray-700">{achievement}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex space-x-4">
          {links.linkedin && (
            <a 
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-accent transition"
            >
              <FiLinkedin size={20} />
            </a>
          )}
          {links.twitter && (
            <a 
              href={links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-accent transition"
            >
              <FiTwitter size={20} />
            </a>
          )}
          {links.github && (
            <a 
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-accent transition"
            >
              <FiGithub size={20} />
            </a>
          )}
          {links.website && (
            <a 
              href={links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-accent transition"
            >
              <FiExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

InnovatorSpotlight.propTypes = {
  innovator: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    featured: PropTypes.bool,
    achievements: PropTypes.arrayOf(PropTypes.string).isRequired,
    links: PropTypes.shape({
      linkedin: PropTypes.string,
      twitter: PropTypes.string,
      github: PropTypes.string,
      website: PropTypes.string
    }).isRequired
  }).isRequired
};

export default InnovatorSpotlight;