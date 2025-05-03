import { motion } from 'framer-motion';
import InnovatorSpotlight from '../components/InnovatorSpotlight';

const innovators = [
  {
    id: 1,
    name: "Evelyn Patra Asio, PhD Fellow",
    title: "UX / UI Designer &Lead AI Researcher at Makerere AI Lab",
    image: "/images/Dr.Asio_Evelyn_Patra.png",
    bio: "Dr. Asio is a Designer, Data Analyst, Researcher, Academic & Christian Author. an Assistant Lecturer in Makerere University - School of Computing & Informatics Technology, Academic Facilitator at both MakSchool of Public Health's Msc Health Informatics, and UNIPH in the FETP - Health Informatics track. Her work has revolutionized early disease detection & Surveillance in rural communities.",
    achievements: [
      "Published 15+ research papers in top Data Science journals & AI conferences",
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
    name: "Bonita Nanziri",
    title: "AI Ethics Researcher & Entrepreneur",
    image: "/images/Bonita-Beatrice-Nanziri.jpg",
    bio: "Bonita is a Health Tech innovator and Entrepreneur. She ensures AI solutions are inclusive and beneficial for African communities.",
    achievements: [
      "Founded mDex smartphone-based Sickle Cell Diagnostic tool registered, patent in Uganda & the US",
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
    title: "STEM Mentor & AI Education Advocate",
    image: "/images/vnuwaha.jpeg",
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