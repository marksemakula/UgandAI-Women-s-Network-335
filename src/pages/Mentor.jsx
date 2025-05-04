import React from 'react';
import MentorshipForm from '../components/MentorshipForm';

const Mentor = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mentorship Program</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connect with experienced AI professionals or share your knowledge as a mentor.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Program Description */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>1-on-1 mentorship matching based on your goals</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Flexible meeting schedules</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>3-month program cycles</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Resources for both mentors and mentees</span>
              </li>
            </ul>
          </div>
          
          {/* Mentorship Form */}
          <MentorshipForm />
        </div>
      </div>
    </div>
  );
};

export default Mentor;