import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLink, FiMail, FiPhone, FiBriefcase } from 'react-icons/fi';

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
        Be part of Uganda's growing network of women in AI. Create your public profile 
        and connect with opportunities. Your profile will be visible at: 
        <span className="font-medium"> uwaitalent.org/talent/your-name</span>
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form fields remain the same as before */}
        
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