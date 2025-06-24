import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiBook, FiBriefcase } from 'react-icons/fi';

const formFields = [
  {
    name: 'fullName',
    label: 'Full Name',
    type: 'text',
    icon: FiUser,
    required: true
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    icon: FiMail,
    required: true
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    icon: FiPhone,
    required: true
  },
  {
    name: 'education',
    label: 'Educational Background',
    type: 'text',
    icon: FiBook,
    required: true
  },
  {
    name: 'occupation',
    label: 'Current Occupation',
    type: 'text',
    icon: FiBriefcase,
    required: true
  }
];

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    education: '',
    occupation: '',
    interests: [],
    experience: 'beginner'
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const interests = [
    'Machine Learning',
    'Computer Vision',
    'Natural Language Processing',
    'Robotics',
    'Data Science'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const newInterests = checked
        ? [...formData.interests, value]
        : formData.interests.filter(interest => interest !== value);
      
      setFormData(prev => ({
        ...prev,
        interests: newInterests
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    formFields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    if (formData.interests.length === 0) {
      newErrors.interests = 'Please select at least one area of interest';
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
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          education: '',
          occupation: '',
          interests: [],
          experience: 'beginner'
        });
        setSubmitSuccess(false);
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
      <h3 className="text-2xl font-bold text-primary mb-6">Membership Registration</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {formFields.map(({ name, label, type, icon: Icon, required }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label} {required && <span className="text-accent">*</span>}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:ring-accent focus:border-accent sm:text-sm
                  ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
              />
            </div>
            {errors[name] && (
              <p className="mt-1 text-sm text-red-600">{errors[name]}</p>
            )}
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Areas of Interest <span className="text-accent">*</span>
          </label>
          <div className="grid grid-cols-2 gap-4">
            {interests.map(interest => (
              <label key={interest} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={interest}
                  checked={formData.interests.includes(interest)}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-accent focus:ring-accent"
                />
                <span className="text-sm text-gray-700">{interest}</span>
              </label>
            ))}
          </div>
          {errors.interests && (
            <p className="mt-1 text-sm text-red-600">{errors.interests}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            AI Experience Level
          </label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent sm:text-sm"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
              ${isSubmitting ? 'bg-gray-400' : 'bg-accent hover:bg-accent-light'} 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition`}
          >
            {isSubmitting ? 'Submitting...' : 'Register Now'}
          </button>
        </div>

        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-4 bg-green-50 text-green-700 rounded-md text-center"
          >
            Registration successful! Welcome to UWAI.
          </motion.div>
        )}

        {errors.submit && (
          <p className="mt-4 text-sm text-red-600 text-center">{errors.submit}</p>
        )}
      </form>
    </motion.div>
  );
}