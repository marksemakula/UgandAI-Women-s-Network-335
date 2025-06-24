import { useState, useEffect, useCallback } from 'react';
import ProjectGallery from '../components/ProjectGallery';
import { motion } from 'framer-motion';

// Default content in case localStorage is empty
const defaultContent = [
  {
    id: 1,
    title: 'AI-Powered Crop Disease Detection',
    creator: 'Sarah Namukasa',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'A machine learning model that identifies crop diseases from smartphone photos.',
    tags: ['Machine Learning', 'Agriculture'],
    status: 'Completed',
    links: { github: '#', demo: '#' },
    category: 'Project'
  },
  {
    id: 2,
    title: 'AI in African Agriculture',
    creator: 'Dr. Jane Mbeka',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    description: 'Research paper on AI applications in sub-Saharan agriculture.',
    tags: ['Research', 'Agriculture'],
    status: 'Published',
    links: { pdf: '#' },
    category: 'Research'
  }
];

export default function Projects() {
  const [content, setContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProjects = useCallback(() => {
    try {
      const savedProjects = JSON.parse(localStorage.getItem('uwiai_projects')) || [];
      const savedResearch = JSON.parse(localStorage.getItem('uwiai_research')) || [];
      
      const combinedContent = [...savedProjects, ...savedResearch];
      
      const validatedContent = combinedContent.map(project => ({
        ...project,
        id: project.id || Date.now().toString(),
        title: project.title || 'Untitled Project',
        creator: project.creator || 'Unknown Creator',
        description: project.description || 'No description available',
        tags: project.tags || [],
        status: project.status || 'In Progress',
        links: project.links || {},
        category: project.category || 'Project'
      }));

      setContent(validatedContent.length > 0 ? validatedContent : defaultContent);
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
    loadProjects();

    const handleStorageChange = (e) => {
      if (e.key === 'uwiai_projects' || e.key === 'uwiai_research') {
        loadProjects();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [loadProjects]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center py-12"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">{error}</p>
                </div>
              </div>
            </motion.div>
          ) : null}

          <ProjectGallery projects={content} />
        </div>
      </div>
    </div>
  );
}