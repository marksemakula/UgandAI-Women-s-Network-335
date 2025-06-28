import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import ProjectGallery from '../components/ProjectGallery';

// Default content in case localStorage is empty
const defaultContent = [
  {
    id: 'default-1',
    title: 'AI-Powered Crop Disease Detection',
    creator: 'Sarah Namukasa',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'A machine learning model that identifies crop diseases from smartphone photos.',
    tags: ['Machine Learning', 'Agriculture'],
    status: 'Completed',
    links: { github: '#', demo: '#' },
    category: 'Project',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'default-2',
    title: 'AI in African Agriculture',
    creator: 'Dr. Jane Mbeka',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Research paper on AI applications in sub-Saharan agriculture.',
    tags: ['Research', 'Agriculture'],
    status: 'Published',
    links: { pdf: '#' },
    category: 'Research',
    lastUpdated: new Date().toISOString()
  }
];

// Initialize localStorage if empty
const initializeStorage = () => {
  if (!localStorage.getItem('uwiai_projects')) {
    localStorage.setItem('uwiai_projects', JSON.stringify([]));
  }
  if (!localStorage.getItem('uwiai_research')) {
    localStorage.setItem('uwiai_research', JSON.stringify([]));
  }
};

export default function Projects() {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProjects = useCallback(() => {
    setIsLoading(true);
    try {
      initializeStorage();
      
      // Load and validate projects
      const savedProjects = JSON.parse(localStorage.getItem('uwiai_projects')) || [];
      const savedResearch = JSON.parse(localStorage.getItem('uwiai_research')) || [];
      
      // Combine and validate all content
      const combinedContent = [...savedProjects, ...savedResearch].map(item => {
        // Basic validation
        if (!item.id || typeof item.id !== 'string') {
          item.id = Date.now().toString();
        }
        
        return {
          id: item.id,
          title: item.title || 'Untitled Project',
          creator: item.creator || 'Unknown Creator',
          image: item.image || 'https://via.placeholder.com/300',
          description: item.description || 'No description available',
          tags: Array.isArray(item.tags) ? item.tags : [],
          status: item.status || 'In Progress',
          links: typeof item.links === 'object' ? item.links : {},
          category: item.category || 'Project',
          lastUpdated: item.lastUpdated || new Date().toISOString()
        };
      });

      // Sort by lastUpdated (newest first)
      combinedContent.sort((a, b) => 
        new Date(b.lastUpdated) - new Date(a.lastUpdated)
      );

      setContent(combinedContent.length > 0 ? combinedContent : defaultContent);
      setError(null);
    } catch (err) {
      console.error('Error loading projects:', err);
      setError('Failed to load projects. Showing default content.');
      setContent(defaultContent);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial load
    loadProjects();

    // Set up storage event listeners
    const handleStorageChange = (e) => {
      if (e.key === 'uwiai_projects' || e.key === 'uwiai_research') {
        loadProjects();
      }
    };

    // Custom event listener for content updates
    const handleContentUpdate = (e) => {
      if (e.detail?.type === 'projects' || e.detail?.type === 'research') {
        loadProjects();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('contentUpdated', handleContentUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('contentUpdated', handleContentUpdate);
    };
  }, [loadProjects]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading State */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-12"
            >
              <div 
                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"
                aria-hidden="true"
              />
              <span className="sr-only">Loading projects...</span>
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-lg"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg 
                    className="h-5 w-5 text-yellow-400" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">{error}</p>
                  <button
                    onClick={loadProjects}
                    className="mt-2 text-sm text-yellow-600 hover:text-yellow-800 underline"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Content Display */}
          {!isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectGallery projects={content} />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// PropTypes validation
Projects.propTypes = {
  // Add any props your Projects component might receive
};

ProjectGallery.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      creator: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      status: PropTypes.string.isRequired,
      links: PropTypes.object.isRequired,
      category: PropTypes.string.isRequired,
      lastUpdated: PropTypes.string
    })
  ).isRequired
};