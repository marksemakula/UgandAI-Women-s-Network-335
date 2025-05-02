import { motion } from 'framer-motion';
import TalentPoolForm from '../components/TalentPoolForm';

export default function TalentPool() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-primary mb-4"
          >
            UWAI Talent Pool
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Join our network of talented women in AI, including members from inzozi.co and other 
            communities of practice. Connect with opportunities and showcase your skills.
          </motion.p>
        </div>

        <TalentPoolForm />
      </div>
    </div>
  );
}