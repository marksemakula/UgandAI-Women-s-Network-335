import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import FeatureStory from '../components/FeatureStory';
import EventsCalendar from '../components/EventsCalendar';

const featuredStories = [
  {
    title: "Breaking Barriers in AI Research",
    author: "Viola Nuwaha",
    date: "March 15, 2024",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    excerpt: "How a team of Ugandan women researchers are revolutionizing healthcare with AI, in collaboration with communities like inzozi.co and other women-led AI initiatives."
  },
  {
    title: "African Women in AI: Pivots, Perseverances and Pleasures",
    author: "Sarah Nalubega",
    date: "August 01, 2022",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    excerpt: "Transforming tech education through innovative AI-powered learning platforms and community-driven initiatives."
  }
];

const upcomingEvents = [
  {
    title: "AI in Healthcare Workshop",
    date: "2024-04-15",
    time: "14:00 - 17:00",
    location: "Kampala Innovation Hub",
    type: "Workshop",
    description: "Hands-on workshop exploring AI applications in healthcare diagnostics and patient care."
  },
  {
    title: "Google Developer Group Meet",
    date: "2024-08-15",
    time: "17:00 - 19:00 EAT",
    location: "Brunswick",
    type: "Conference",
    description: "Community interation focused on Canva, Perplexity & Napkin AI for fashion, digital art and documentaries."
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-primary mb-4"
            >
              Featured Stories
            </motion.h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover inspiring stories from our community of women in AI.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredStories.map((story, index) => (
              <FeatureStory key={index} story={story} />
            ))}
          </div>
        </div>
      </section>
      
      <EventsCalendar events={upcomingEvents} />
    </div>
  );
}