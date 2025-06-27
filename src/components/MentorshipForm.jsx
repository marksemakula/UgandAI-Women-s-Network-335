// src/components/MentorshipForm.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { FiUser, FiMail, FiPhone, FiAward, FiHelpCircle } from 'react-icons/fi';

export default function MentorshipForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    expertise: '',
    mentorType: [],
    commitment: '',
    goals: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const mentorTypes = [
    'Career Guidance',
    'Technical Skills',
    'Project Feedback',
    'Research Collaboration',
    'Entrepreneurship'
  ];

  const commitmentLevels = [
    '1-2 hours/month',
    '3-5 hours/month',
    '5+ hours/month',
    'One-time session'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const newTypes = checked
        ? [...formData.mentorType, value]
        : formData.mentorType.filter(type => type !== value);
      
      setFormData(prev => ({
        ...prev,
        mentorType: newTypes
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['fullName', 'email', 'expertise', 'commitment'];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    if (formData.mentorType.length === 0) {
      newErrors.mentorType = 'Please select at least one mentorship type';
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          expertise: '',
          mentorType: [],
          commitment: '',
          goals: ''
        });
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      setErrors({ submit: 'Submission failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8"
    >
      <div className="flex items-center mb-6">
        <FiHelpCircle className="h-8 w-8 text-accent mr-3" />
        <h3 className="text-2xl font-bold text-primary">Mentorship Program</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Section */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900 border-b pb-2">Your Information</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-accent">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-accent focus:border-accent sm:text-sm
                  ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
              />
            </div>
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-accent">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-accent focus:border-accent sm:text-sm
                  ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiPhone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent sm:text-sm"
              />
            </div>
          </div>
        </div>

        {/* Mentorship Preferences Section */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-900 border-b pb-2">Mentorship Preferences</h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              I would like to: <span className="text-accent">*</span>
            </label>
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="mentorType"
                  value="be_mentored"
                  checked={formData.mentorType.includes('be_mentored')}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-accent focus:ring-accent"
                />
                <span className="text-sm text-gray-700">Be mentored</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="mentorType"
                  value="mentor_others"
                  checked={formData.mentorType.includes('mentor_others')}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-accent focus:ring-accent"
                />
                <span className="text-sm text-gray-700">Mentor others</span>
              </label>
            </div>
            {errors.mentorType && (
              <p className="mt-1 text-sm text-red-600">{errors.mentorType}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Areas of Expertise <span className="text-accent">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiAward className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                placeholder="E.g. Machine Learning, Data Visualization"
                className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-accent focus:border-accent sm:text-sm
                  ${errors.expertise ? 'border-red-500' : 'border-gray-300'}`}
              />
            </div>
            {errors.expertise && (
              <p className="mt-1 text-sm text-red-600">{errors.expertise}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preferred Mentorship Types
            </label>
            <div className="grid grid-cols-2 gap-3">
              {mentorTypes.map(type => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={type}
                    checked={formData.mentorType.includes(type)}
                    onChange={handleChange}
                    className="rounded border-gray-300 text-accent focus:ring-accent"
                  />
                  <span className="text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Commitment <span className="text-accent">*</span>
            </label>
            <select
              name="commitment"
              value={formData.commitment}
              onChange={handleChange}
              className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-accent focus:border-accent sm:text-sm
                ${errors.commitment ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select your availability</option>
              {commitmentLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            {errors.commitment && (
              <p className="mt-1 text-sm text-red-600">{errors.commitment}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Goals
            </label>
            <textarea
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              rows={3}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent sm:text-sm"
              placeholder="What do you hope to gain from this mentorship?"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
              ${isSubmitting ? 'bg-gray-400' : 'bg-accent hover:bg-accent-light'} 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition`}
          >
            {isSubmitting ? 'Submitting...' : 'Join Mentorship Program'}
          </button>
        </div>

        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-4 bg-green-50 text-green-700 rounded-md text-center"
          >
            Thank you! We&apos;ll match you with suitable mentors/mentees soon.
          </motion.div>
        )}

        {errors.submit && (
          <p className="mt-4 text-sm text-red-600 text-center">{errors.submit}</p>
        )}
      </form>
    </motion.div>
  );
}

// Add prop validation if this component receives any props
MentorshipForm.propTypes = {
  // Example if props were being passed:
  // onSubmit: PropTypes.func,
  // initialData: PropTypes.object,
};