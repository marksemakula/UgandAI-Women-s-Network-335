import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function TalentPoolForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profileLink: '',
    expertise: '',
    bio: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.profileLink) newErrors.profileLink = 'Profile link is required';
    
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
      
      // Generate public link (in a real app, this would come from the backend)
      const publicLink = `uwaitalent/${formData.name.toLowerCase().replace(/\s+/g, '-')}`;
      
      // In a real app, you would redirect to the profile after creation
      setSubmitSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          profileLink: '',
          expertise: '',
          bio: ''
        });
        setSubmitSuccess(false);
        // Navigate to the new profile
        navigate(`/talent/${publicLink}`);
      }, 3000);
    } catch (error) {
      setErrors({ submit: 'Failed to submit form. Please try again.' });
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
      <h3 className="text-2xl font-bold text-primary mb-6">Join Our Talent Pool</h3>
      <p className="text-gray-600 mb-6">
        Be part of Uganda&apos;s growing network of women in AI. Create your public profile 
        and connect with opportunities. Your profile will be visible at: 
        <span className="font-medium"> uwaitalent.org/talent/your-name</span>
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="profileLink" className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn Profile or Portfolio URL *
          </label>
          <input
            type="url"
            id="profileLink"
            name="profileLink"
            value={formData.profileLink}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md ${errors.profileLink ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="https://linkedin.com/in/your-profile"
          />
          {errors.profileLink && <p className="mt-1 text-sm text-red-600">{errors.profileLink}</p>}
        </div>

        <div>
          <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 mb-1">
            Areas of Expertise
          </label>
          <input
            type="text"
            id="expertise"
            name="expertise"
            value={formData.expertise}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Machine Learning, Data Science, NLP, etc."
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
            Short Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Tell us about your background, experience, and interests..."
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
              ${isSubmitting ? 'bg-gray-400' : 'bg-accent hover:bg-accent-light'} 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition`}
          >
            {isSubmitting ? 'Creating Profile...' : 'Create My Profile'}
          </button>
        </div>

        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-4 bg-green-50 text-green-700 rounded-md text-center"
          >
            Profile created successfully! Redirecting to your new profile...
          </motion.div>
        )}

        {errors.submit && (
          <p className="mt-4 text-sm text-red-600 text-center">{errors.submit}</p>
        )}
      </form>
    </motion.div>
  );
}

TalentPoolForm.propTypes = {
  // Add any props that the component receives here
  // Example:
  // initialData: PropTypes.object
};