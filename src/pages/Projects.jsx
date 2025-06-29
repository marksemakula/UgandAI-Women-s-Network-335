// Projects.jsx - Updated version
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import ProjectGallery from '../components/ProjectGallery';

const STORAGE_KEYS = {
  PROJECTS: 'uwiai_projects',
  RESEARCH: 'uwiai_research'
};

const DEFAULT_PROJECTS = [
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
    lastUpdated: new Date().toISOString(),
    featured: true
  }
];

const initializeStorage = () => {
  try {
    if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(DEFAULT_PROJECTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.RESEARCH)) {
      localStorage.setItem(STORAGE_KEYS.RESEARCH, JSON.stringify([]));
    }
  } catch (error) {
    console.error('Storage initialization failed:', error);
    throw error;
  }
};

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
      
      const savedProjects = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS)) || [];
      const savedResearch = JSON.parse(localStorage.getItem(STORAGE_KEYS.RESEARCH)) || [];
      
      const combinedContent = [...savedProjects, ...savedResearch]
        .map(project => normalizeProject(project))
        .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));

      setContent(combinedContent.length > 0 ? combinedContent : DEFAULT_PROJECTS);
      setError(null);
    } catch (err) {
      console.error('Error loading projects:', err);
      setError('Failed to load projects. Showing default content.');
      setContent(DEFAULT_PROJECTS);
      toast.error('Could not load projects. Using default content.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
    
    const handleStorageChange = (e) => {
      if ([STORAGE_KEYS.PROJECTS, STORAGE_KEYS.RESEARCH].includes(e.key)) {
        loadProjects();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
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
          {isLoading && (
            <motion.div className="flex justify-center items-center py-16">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent" />
                <p className="mt-4 text-gray-600">Loading projects...</p>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
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