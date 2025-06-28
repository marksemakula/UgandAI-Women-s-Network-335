import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ProjectGallery from '../components/ProjectGallery';

// Storage keys configuration
const STORAGE_KEYS = {
  PROJECTS: 'uwiai_projects',
  RESEARCH: 'uwiai_research'
};

// Default content with improved structure
const DEFAULT_CONTENT = [
  {
    id: 'default-1',
    title: 'AI-Powered Crop Disease Detection',
    creator: 'Sarah Namukasa',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'A machine learning model that identifies crop diseases from smartphone photos.',
    tags: ['Machine Learning', 'Agriculture'],
    status: 'Completed',
    links: { 
      github: '#', 
      demo: '#',
      documentation: '#'
    },
    category: 'Project',
    lastUpdated: new Date().toISOString(),
    featured: true
  },
  {
    id: 'default-2',
    title: 'AI in African Agriculture',
    creator: 'Dr. Jane Mbeka',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Research paper on AI applications in sub-Saharan agriculture.',
    tags: ['Research', 'Agriculture'],
    status: 'Published',
    links: { 
      pdf: '#',
      publication: '#'
    },
    category: 'Research',
    lastUpdated: new Date().toISOString(),
    featured: true
  }
];

// Enhanced storage initialization
const initializeStorage = () => {
  try {
    [STORAGE_KEYS.PROJECTS, STORAGE_KEYS.RESEARCH].forEach(key => {
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify([]));
      }
    });
  } catch (error) {
    console.error('Storage initialization failed:', error);
    throw error;
  }
};

// Validate and normalize project data
const normalizeProject = (project) => {
  try {
    return {
      id: project.id || Date.now().toString(),
      title: project.title || 'Untitled Project',
      creator: project.creator || 'Unknown Creator',
      image: project.image || '/images/default-project.jpg',
      description: project.description || 'No description available',
      tags: Array.isArray(project.tags) ? project.tags : [],
      status: ['Completed', 'Published', 'In Progress', 'Planned'].includes(project.status) 
        ? project.status 
        : 'In Progress',
      links: typeof project.links === 'object' ? project.links : {},
      category: ['Project', 'Research'].includes(project.category) 
        ? project.category 
        : 'Project',
      lastUpdated: project.lastUpdated || new Date().toISOString(),
      featured: !!project.featured
    };
  } catch (error) {
    console.error('Error normalizing project:', error);
    throw error;
  }
};

export default function Projects() {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      initializeStorage();
      
      // Load and validate projects and research
      const savedProjects = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS)) || [];
      const savedResearch = JSON.parse(localStorage.getItem(STORAGE_KEYS.RESEARCH)) || [];
      
      // Combine, validate and normalize all content
      const combinedContent = [...savedProjects, ...savedResearch]
        .map(project => {
          try {
            return normalizeProject(project);
          } catch {
            return null;
          }
        })
        .filter(Boolean);

      // Sort by lastUpdated (newest first) then by featured status
      combinedContent.sort((a, b) => {
        const dateDiff = new Date(b.lastUpdated) - new Date(a.lastUpdated);
        if (dateDiff !== 0) return dateDiff;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });

      setContent(combinedContent.length > 0 ? combinedContent : DEFAULT_CONTENT);
      setError(null);
    } catch (err) {
      console.error('Error loading projects:', err);
      setError('Failed to load projects. Showing default content.');
      setContent(DEFAULT_CONTENT);
      toast.error('Could not load projects. Using default content.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Handle content updates from other tabs/components
  const handleContentUpdate = useCallback(() => {
    loadProjects().catch(err => {
      console.error('Error during content update:', err);
    });
  }, [loadProjects]);

  useEffect(() => {
    // Initial load
    loadProjects();

    // Set up event listeners
    const handleStorageChange = (e) => {
      if ([STORAGE_KEYS.PROJECTS, STORAGE_KEYS.RESEARCH].includes(e.key)) {
        handleContentUpdate();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('contentUpdated', handleContentUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('contentUpdated', handleContentUpdate);
    };
  }, [loadProjects, handleContentUpdate]);

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
              className="flex justify-center items-center py-16"
            >
              <div className="flex flex-col items-center">
                <div 
                  className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"
                  aria-hidden="true"
                />
                <p className="mt-4 text-gray-600">Loading projects...</p>
              </div>
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
                    className="mt-2 text-sm font-medium text-yellow-600 hover:text-yellow-800 underline"
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

Projects.propTypes = {
  // Component props validation
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
      lastUpdated: PropTypes.string,
      featured: PropTypes.bool
    })
  ).isRequired
};