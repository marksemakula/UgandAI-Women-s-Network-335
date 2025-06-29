import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.profileLink.trim()) newErrors.profileLink = 'Profile link is required';
    else if (!/^https?:\/\/.+\..+/.test(formData.profileLink)) {
      newErrors.profileLink = 'Please enter a valid URL';
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
      
      // Generate public link (in a real app, this would come from the backend)
      const publicLink = `uwaitalent/${formData.name.toLowerCase().replace(/\s+/g, '-')}`;
      
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
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600">
              {errors.name}
            </p>
          )}
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
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600">
              {errors.email}
            </p>
          )}
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
            aria-invalid={!!errors.profileLink}
            aria-describedby={errors.profileLink ? 'profileLink-error' : undefined}
          />
          {errors.profileLink && (
            <p id="profileLink-error" className="mt-1 text-sm text-red-600">
              {errors.profileLink}
            </p>
          )}
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
              ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-accent hover:bg-accent-light'} 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Profile...
              </span>
            ) : 'Create My Profile'}
          </button>
        </div>

        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-4 bg-green-50 text-green-700 rounded-md text-center"
            role="alert"
          >
            Profile created successfully! Redirecting to your new profile...
          </motion.div>
        )}

        {errors.submit && (
          <p className="mt-4 text-sm text-red-600 text-center">
            {errors.submit}
          </p>
        )}
      </form>
    </motion.div>
  );
}

TalentPoolForm.propTypes = {
  // Add any props that the component receives here
  // Example:
  // initialData: PropTypes.shape({
  //   name: PropTypes.string,
  //   email: PropTypes.string,
  //   phone: PropTypes.string,
  //   profileLink: PropTypes.string,
  //   expertise: PropTypes.string,
  //   bio: PropTypes.string
  // })
};