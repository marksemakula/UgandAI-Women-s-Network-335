import { motion } from 'framer-motion';
import InnovatorSpotlight from '../components/InnovatorSpotlight';

const innovators = [
  {
    id: 1,
    name: "Evelyn Patra Asio, PhD Fellow",
    title: "UX / UI Designer &Lead AI Researcher at Makerere AI Lab",
    image: "/images/Dr.Asio_Evelyn_Patra.png",
    bio: "Dr. Asio leads groundbreaking research in Tools & AI applications for healthcare and agriculture in Uganda. Her work has revolutionized early disease detection in rural communities.",
    achievements: [
      "Published 15+ research papers in top Data Science & AI conferences",
      "Developed AI model for crop, animal & human disease detection projected to be used by 10,000+ farmers",
      "Winner of the 2023 African Tech in Academia Award"
    ],
    links: {
      linkedin: "https://www.linkedin.com/in/evelyn-asio-7973a423/",
      twitter: "https://x.com/AfricanWIT/status/1226085265258708996",
      website: "https://cocis.mak.ac.ug/faculty/information-systems/asio-evelyn-patra-k/"
    },
    featured: true
  },
  {
    id: 2,
    name: "Sandra Nalubega",
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
    name: "Viola Nuwaha",
    title: "AI Education Pioneer",
    image: "/images/Viola_Nuwaha.png",
    bio: "Viola has inspired many young ladies in Tech in Uganda and East Africa, through mentorship & making it accessible to young women through innovative training programs.",
    achievements: [
      "Trained 1000+ women in AI fundamentals",
      "Developed localized AI curriculum in native languages",
      "Google AI Impact Challenge Winner"
    ],
    links: {
      linkedin: "https://de.linkedin.com/in/viola-nuwaha",
      website: "https://wageindicator.org/images/event-speakers/viola-nuwaha.jpeg/view"
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