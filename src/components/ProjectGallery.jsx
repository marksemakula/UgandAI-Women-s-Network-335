import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';

export default function ProjectGallery({ projects }) {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filters = ['All', 'Machine Learning', 'Computer Vision', 'NLP', 'Robotics'];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'All' || project.tags.includes(filter);
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.creator.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            AI Project Showcase
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover innovative AI projects created by our talented community members.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex flex-wrap gap-2">
            {filters.map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2 rounded-full transition ${
                  filter === filterOption
                    ? 'bg-accent text-white'
                    : 'bg-white text-primary hover:bg-accent/10'
                }`}
              >
                {filterOption}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 rounded-full border border-gray-300 focus:ring-accent focus:border-accent"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-600"
          >
            No projects found matching your criteria.
          </motion.div>
        )}
      </div>
    </section>
  );
}