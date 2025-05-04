import ProjectGallery from '../components/ProjectGallery';

const projects = [
  {
    id: 1,
    title: "AI-Powered Crop Disease Detection",
    creator: "Sarah Namukasa",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    description: "A machine learning model that identifies crop diseases from smartphone photos, helping local farmers protect their harvests.",
    tags: ["Machine Learning", "Computer Vision", "Agriculture"],
    status: "Completed",
    links: {
      github: "https://github.com/example/crop-disease-detection",
      demo: "https://crop-disease-demo.example.com"
    }
  },
  // ... other projects remain the same
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectGallery projects={projects} />
        </div>
      </div>
    </div>
  );
}