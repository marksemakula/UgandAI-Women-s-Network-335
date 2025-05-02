import { motion } from 'framer-motion';
import InnovatorSpotlight from '../components/InnovatorSpotlight';

const innovators = [
  {
    id: 1,
    name: "Dr. Sarah Namukasa",
    title: "Lead AI Researcher at Makerere AI Lab",
    image: "https://images.unsplash.com/photo-1573496527892-904f809f8f2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    bio: "Dr. Namukasa leads groundbreaking research in AI applications for healthcare and agriculture in Uganda. Her work has revolutionized early disease detection in rural communities.",
    achievements: [
      "Published 15+ research papers in top AI conferences",
      "Developed AI model for crop disease detection used by 10,000+ farmers",
      "Winner of the 2023 African Innovation Award"
    ],
    links: {
      linkedin: "https://linkedin.com/in/example",
      twitter: "https://twitter.com/example",
      website: "https://example.com"
    },
    featured: true
  },
  {
    id: 2,
    name: "Grace Achieng",
    title: "AI Ethics Researcher & Advocate",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    bio: "Grace specializes in ethical AI development and ensuring AI solutions are inclusive and beneficial for African communities.",
    achievements: [
      "Founded AI Ethics Initiative Uganda",
      "Advisor to Ministry of ICT on AI policy",
      "TEDx speaker on Responsible AI"
    ],
    links: {
      linkedin: "https://linkedin.com/in/example",
      twitter: "https://twitter.com/example"
    },
    featured: false
  },
  {
    id: 3,
    name: "Patricia Nalweyiso",
    title: "AI Education Pioneer",
    image: "https://images.unsplash.com/photo-1573497019236-17f8177b81e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    bio: "Patricia has transformed AI education in Uganda, making it accessible to young women through innovative training programs.",
    achievements: [
      "Trained 1000+ women in AI fundamentals",
      "Developed localized AI curriculum in native languages",
      "Google AI Impact Challenge Winner"
    ],
    links: {
      linkedin: "https://linkedin.com/in/example",
      website: "https://example.com"
    },
    featured: false
  }
];

export default function Innovators() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-primary mb-4">
            AI Innovator Spotlights
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrating the brilliant women leading AI innovation and research in Uganda.
            These trailblazers are shaping the future of artificial intelligence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {innovators.map((innovator) => (
            <InnovatorSpotlight 
              key={innovator.id} 
              innovator={innovator}
            />
          ))}
        </div>
      </div>
    </div>
  );
}