// ProjectCard.jsx
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiUser, FiFile } from 'react-icons/fi';
import PropTypes from 'prop-types';

export default function ProjectCard({ project }) {
  const { title, creator, image, description, tags, links, status, category } = project;
  
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 flex items-center space-x-2">
          {category === 'Research' && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium flex items-center">
              <FiFile className="mr-1" /> Research
            </span>
          )}
          <span className={`
            px-3 py-1 rounded-full text-sm font-medium
            ${status === 'Completed' || status === 'Published' ? 'bg-green-100 text-green-800' : 
      status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
        'bg-blue-100 text-blue-800'}
          `}>
            {status}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
        
        <div className="flex items-center mb-4 text-gray-600">
          <FiUser className="mr-2" />
          <span>{creator}</span>
        </div>

        <p className="text-gray-700 mb-4">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          {links.github && (
            <a 
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-accent transition"
            >
              <FiGithub className="mr-1" /> Code
            </a>
          )}
          {links.demo && (
            <a 
              href={links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-accent transition"
            >
              <FiExternalLink className="mr-1" /> Demo
            </a>
          )}
          {links.pdf && (
            <a 
              href={links.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-accent transition"
            >
              <FiFile className="mr-1" /> PDF
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    status: PropTypes.oneOf(['Completed', 'Published', 'In Progress']).isRequired,
    category: PropTypes.oneOf(['Project', 'Research']).isRequired,
    links: PropTypes.shape({
      github: PropTypes.string,
      demo: PropTypes.string,
      pdf: PropTypes.string
    })
  }).isRequired
};