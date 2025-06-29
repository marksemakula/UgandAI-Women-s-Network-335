import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FiLinkedin, FiMail, FiPhone, FiGlobe } from 'react-icons/fi';
import { useParams } from 'react-router-dom';

export default function TalentProfile() {
  const { username } = useParams();
  // In a real app, this would fetch from API based on username
  const profile = {
    name: 'Sarah Nakato',
    title: 'AI Research Scientist',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    bio: 'Passionate about using AI to solve healthcare challenges in Uganda. Currently leading research on AI-powered diagnostic tools for rural clinics.',
    expertise: ['Machine Learning', 'Healthcare AI', 'Computer Vision'],
    contact: {
      email: 'sarah@example.com',
      phone: '+256 752 123 456',
      linkedin: 'https://linkedin.com/in/sarah-nakato',
      website: 'https://sarah-nakato.dev'
    },
    projects: [
      {
        title: 'AI-Powered Malaria Detection',
        description: 'Developed a mobile app that uses computer vision to detect malaria parasites in blood samples.'
      }
      // More projects...
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-primary p-6 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md mb-4 md:mb-0 md:mr-6">
                <img 
                  src={profile.image} 
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{profile.name}</h1>
                <p className="text-accent-light text-xl">{profile.title}</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-primary mb-4">About</h2>
              <p className="text-gray-700">{profile.bio}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-primary mb-4">Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {profile.expertise.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-primary mb-4">Contact</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <FiMail className="text-gray-500 mr-2" />
                  <a href={`mailto:${profile.contact.email}`} className="text-gray-700 hover:text-accent">
                    {profile.contact.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <FiPhone className="text-gray-500 mr-2" />
                  <span className="text-gray-700">{profile.contact.phone}</span>
                </div>
                <div className="flex items-center">
                  <FiLinkedin className="text-gray-500 mr-2" />
                  <a href={profile.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-accent">
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center">
                  <FiGlobe className="text-gray-500 mr-2" />
                  <a href={profile.contact.website} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-accent">
                    Personal Website
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-4">Featured Projects</h2>
              <div className="space-y-4">
                {profile.projects.map((project, index) => (
                  <div key={index} className="border-l-4 border-accent pl-4 py-2">
                    <h3 className="font-medium text-gray-900">{project.title}</h3>
                    <p className="text-gray-600">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Add PropTypes validation if this component receives props
TalentProfile.propTypes = {
  // Example if props were being passed:
  // username: PropTypes.string
};