import { motion } from 'framer-motion';

import FeaturedInnovator from '../components/FeaturedInnovator';
import InnovatorSpotlight from '../components/InnovatorSpotlight';

const innovators = [
  // Featured Innovators (will appear in single rows)
  {
    id: 1,
    name: 'Evelyn Patra Asio, PhD Fellow',
    title: 'UX Designer, Data Analyst, Researcher, Academic & Christian Author',
    image: '/images/Dr.Asio_Evelyn_Patra.png',
    bio: 'She is an Assistant Lecturer at Makerere University - College of Computing & Informatics Technology, Academic Facilitator at both MakSchool of Public Health\'s Msc Health Informatics, and UNIPH in the FETP - Health Informatics track. Her work has revolutionized early disease detection & Public Health Surveillance. Her research focuses on areas such as disaster management, mental health and well-being, digital health systems, safe built environments, and the welfare of aging communities, as well as government systems.',
    achievements: [
      'Published 15+ research papers in top Data Science journals & AI conferences',
      'STEM & DS mentor...',
      'Founding Director of Burgeon Consults Co., LTD'
    ],
    links: {
      linkedin: 'https://www.linkedin.com/in/evelyn-asio-7973a423/',
      twitter: 'https://x.com/AfricanWIT/status/1226085265258708996',
      website: 'https://cocis.mak.ac.ug/faculty/information-systems/asio-evelyn-patra-k/'
    },
    isFeatured: true
  },
  {
    id: 4,
    name: 'Dr. Amina Zawedde, PhD',
    title: 'Permanent Secretary, Ministry of ICT & National Guidance',
    image: '/images/Dr.Amina-Zawedde.jpg',
    bio: 'Dr. Amina Zawedde is a seasoned ICT professional with extensive experience in both public and private sectors. She has been instrumental in driving Uganda\'s digital transformation agenda and promoting women in tech initiatives.',
    achievements: [
      'Spearheaded Uganda\'s National ICT Policy implementation',
      'Champion for increasing women participation...',
      'Recipient of multiple awards...'
    ],
    links: {
      linkedin: 'https://ug.linkedin.com/in/aminahzawedde',
      twitter: 'https://twitter.com/azawedde'
    },
    isFeatured: true
  },

  // Regular Innovators (will appear in pairs)
  {
    id: 2,
    name: 'Bonita Nanziri',
    title: 'AI Ethics Researcher & Entrepreneur',
    image: '/images/Bonita-Beatrice-Nanziri.jpg',
    bio: 'Bonita is a Health Tech innovator and Entrepreneur...',
    achievements: [
      'Founded mDex smartphone-based Sickle Cell Diagnostic tool...',
      'Advisor to Ministry of ICT on AI policy...',
      'TEDx speaker on Responsible AI'
    ],
    links: {
      linkedin: 'https://linkedin.com/in/example',
      twitter: 'https://ug.linkedin.com/in/bonita-beatrice-nanziri-13124668'
    },
    isFeatured: false
  },
  {
    id: 6,
    name: 'Dr. Dorothy Okello, PhD',
    title: 'Dean, School of Engineering, Makerere University',
    image: '/images/Makerere-CEDAT-Eng-Dr-Dorothy-Okello.jpg',
    bio: 'Professor Dorothy Okello is a telecommunications engineer and academic who has dedicated her career to advancing ICT for development and promoting women in engineering fields across Africa.',
    achievements: [
      'First female Dean of Engineering at Makerere University',
      'Founder of Women of Uganda Network (WOUGNET)',
      'Fellow of the Uganda National Academy of Sciences (UNAS)'
    ],
    links: {
      linkedin: 'https://www.linkedin.com/in/dorothyokello/?originalSubdomain=ug',
      website: 'https://engineering.mak.ac.ug/'
    },
    isFeatured: false
  },
  {
    id: 5,
    name: 'Anne Namuli',
    title: 'Lead Back End Software Engineer',
    image: '/images/Anne-Namuli1.png',
    bio: 'Anne is a technology leader with an AI firm...',
    achievements: [
      'Lead Women in Machine Learning and Data Science',
      'Created Jenga Hub...',
      'Recognized by Forbes Africa...'
    ],
    links: {
      github: 'https://github.com/AnneNamuli',  // Fixed duplicate https
      linkedin: 'https://www.linkedin.com/in/annenamuli',
      twitter: 'https://twitter.com/annenamuli'
    },
    isFeatured: false
  },
  {
    id: 3,
    name: 'Viola Nuwaha',
    title: 'FinTech, DS, STEM Mentor, (ICT4D) expert',
    image: '/images/vnuwaha.jpeg',
    bio: 'Viola has inspired many young ladies in Tech in Uganda and East Africa...',
    achievements: [
      'Trained 1000+ women in AI fundamentals',
      'Developed localized AI curriculum...',
      'Google AI Impact Challenge Winner'
    ],
    links: {
      github: 'https://github.com/ViolaNuwaha',  // Fixed duplicate https
      linkedin: 'https://de.linkedin.com/in/viola-nuwaha',
      website: 'https://wageindicator.org/images/event-speakers/viola-nuwaha.jpeg/view'
    },
    isFeatured: false
  },
  {
    id: 7,
    name: 'Joane Kirunga',
    title: 'Risk Data Scientist',
    image: '/images/Joane_Kirunga.jpeg',
    bio: 'Joane specializes in big data frameworks. She is currently in the banking sector.',
    achievements: [
      'Lead author of Uganda\'s National AI Ethics Guidelines',
      'UN Digital Policy Fellow 2023',
      'Founder of Digital Rights East Africa initiative'
    ],
    links: {
      linkedin: 'https://ug.linkedin.com/in/joan-kirunga',
      twitter: 'https://twitter.com/joanekirunga'
    },
    isFeatured: false
  },
  {
    id: 8,
    name: 'Martha Mulerwa, PhD Fellow',
    title: 'Biomedical Engineer & eHealth Solutions Architect',
    image: '/images/Martha-Mulerwa1.png',
    bio: 'Martha develops localized health solutions...',
    achievements: [
      'Supporting the development of the Kinyarwanda NLP toolkit',
      'EU-African e-Infrastructure to develop innovative and collaborative health solutions',
      'Research Work covering human prosthetic limnbs'
    ],
    links: {
      github: 'https://github.com/marthamulerwa',
      linkedin: 'https://www.linkedin.com/in/marthamulerwa'
    },
    isFeatured: false
  },
  {
    id: 9,
    name: 'Charity Delmus Alupo, PhD Fellow',
    title: 'Machine Learning application in Energy - ML Labs',
    image: '/images/Charity-Delmus-Alupo.png',
    bio: 'This position recognizes future women innovators...',
    achievements: [
      'Opportunity for emerging talent',
      'Mentorship program available',
      'Research grants accessible'
    ],
    links: {
      github: 'https://github.com',
      linkedin: 'https://ie.linkedin.com/in/charity-delmus-115198104'
    },
    isFeatured: false
  }
];

export default function Innovators() {
  // Manually group the innovators in the desired order
  const innovatorGroups = [
    [innovators[0]],    // Evelyn (Featured - row 1)
    [innovators[2], innovators[3]],  // Bonita & Dorothy (row 2)
    [innovators[1]],    // Amina (Featured - row 3)
    [innovators[4], innovators[5]],  // Anne & Viola (row 4)
    [innovators[6]],    // Joane (row 5 - single to maintain pattern)
    [innovators[7], innovators[8]]   // Martha & Position Available (row 6)
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-primary mb-4">
            Spotlight
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrating the brilliant women leading AI innovation and research in Uganda.
            These trailblazers are shaping the future of artificial intelligence, Machine Learning & Data Science.
          </p>
        </motion.div>

        {innovatorGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-12">
            {group.length === 1 ? (
              <FeaturedInnovator innovator={group[0]} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {group.map((innovator) => (
                  <InnovatorSpotlight 
                    key={innovator.id} 
                    innovator={innovator}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}