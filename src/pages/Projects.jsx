// Projects.jsx
import { useState, useEffect } from 'react';
import ProjectGallery from '../components/ProjectGallery';

const defaultContent = [
  {
    id: 1,
    title: "AI-Powered Crop Disease Detection",
    creator: "Sarah Namukasa",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    description: "A machine learning model that identifies crop diseases from smartphone photos.",
    tags: ["Machine Learning", "Agriculture"],
    status: "Completed",
    links: { github: "#", demo: "#" },
    category: "Project"
  },
  {
    id: 2,
    title: "AI in African Agriculture",
    creator: "Dr. Jane Mbeka",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    description: "Research paper on AI applications in sub-Saharan agriculture.",
    tags: ["Research", "Agriculture"],
    status: "Published",
    links: { pdf: "#" },
    category: "Research"
  }
];

export default function Projects() {
  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('uwiai_projects')) || [];
    const savedResearch = JSON.parse(localStorage.getItem('uwiai_research')) || [];
    setContent([...savedProjects, ...savedResearch]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectGallery projects={content} />
        </div>
      </div>
    </div>
  );
}