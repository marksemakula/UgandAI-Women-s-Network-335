import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

import RegistrationForm from '../components/RegistrationForm';

export default function Membership() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-primary mb-4"
          >
            Join Our Community
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Be part of Uganda&apos;s growing community of women in AI. Connect, learn, and grow with fellow innovators.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              title: 'Network',
              description: 'Connect with like-minded professionals and mentors in the AI field'
            },
            {
              title: 'Learn',
              description: 'Access exclusive workshops, training sessions, and resources'
            },
            {
              title: 'Grow',
              description: 'Develop your skills and advance your career in AI'
            }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-lg p-6 shadow-md text-center"
            >
              <h3 className="text-xl font-bold text-primary mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <RegistrationForm />
      </div>
    </div>
  );
}

// Add PropTypes validation if this component receives any props in the future
Membership.propTypes = {
  // Example if props are added later:
  // someProp: PropTypes.string
};