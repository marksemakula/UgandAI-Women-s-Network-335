import { FaLinkedin, FaTwitter, FaGlobe, FaGithub } from 'react-icons/fa';
import PropTypes from 'prop-types';

const FeaturedInnovator = ({ innovator }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Image on left */}
        <div className="md:w-1/3">
          <img 
            src={innovator.image} 
            alt={innovator.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content on right */}
        <div className="md:w-2/3 p-6">
          <h2 className="text-2xl font-bold text-gray-800">{innovator.name}</h2>
          <p className="text-lg text-primary mb-4">{innovator.title}</p>
          <p className="text-gray-600 mb-4">{innovator.bio}</p>
          
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800">Notable Achievements:</h3>
            <ul className="list-disc pl-5 text-gray-600">
              {innovator.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
          
          <div className="flex space-x-4 mt-4">
            {innovator.links.linkedin && (
              <a href={innovator.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-2xl">
                <FaLinkedin />
              </a>
            )}
            {innovator.links.twitter && (
              <a href={innovator.links.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 text-2xl">
                <FaTwitter />
              </a>
            )}
            {innovator.links.website && (
              <a href={innovator.links.website} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 text-2xl">
                <FaGlobe />
              </a>
            )}
            {innovator.links.github && (
              <a href={innovator.links.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600 text-2xl">
                <FaGithub />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

FeaturedInnovator.propTypes = {
  innovator: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    achievements: PropTypes.arrayOf(PropTypes.string).isRequired,
    links: PropTypes.shape({
      linkedin: PropTypes.string,
      twitter: PropTypes.string,
      website: PropTypes.string,
      github: PropTypes.string
    }).isRequired
  }).isRequired
};

export default FeaturedInnovator;