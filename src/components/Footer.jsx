import { motion } from 'framer-motion';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  const socialLinks = [
    { icon: FiFacebook, url: 'https://facebook.com/uwiai', label: 'Facebook' },
    { icon: FiTwitter, url: 'https://twitter.com/uwiai', label: 'Twitter' },
    { icon: FiInstagram, url: 'https://instagram.com/uwiai', label: 'Instagram' },
    { icon: FiLinkedin, url: 'https://linkedin.com/company/uwiai', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Logo at the top center - Significantly larger */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-12" // Increased margin-bottom
        >
          <div className="mb-8 flex justify-center">
            <img 
              src="/images/UWAI_Logo.png" 
              alt="UWIAI Logo" 
              className="h-20 w-auto max-w-full" // Significantly larger - h-60 (15rem)
              style={{ minHeight: '240px' }} // Additional minimum height
            />
          </div>
          <p className="text-primary font-medium text-2xl mt-4"> {/* Increased text size */}
            Ugandan Women in AI
          </p>
        </motion.div>

        {/* Contact Information - Centered */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center mb-8"
        >
          <h3 className="text-lg font-semibold text-primary mb-4">Contact Us</h3>
          <div className="space-y-3 text-center text-gray-600">
            <div className="flex items-center justify-center">
              <FiMail className="mr-2" />
              <span>admin@uwiai.org</span>
            </div>
            <div className="flex items-center justify-center">
              <FiPhone className="mr-2" />
              <span>+256 789 893 903</span>
            </div>
            <div className="flex items-center justify-center">
              <FiMapPin className="mr-2" />
              <span>Kampala, Uganda</span>
            </div>
          </div>
        </motion.div>

        {/* Social Media Links - Centered */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center mb-8"
        >
          <h3 className="text-lg font-semibold text-primary mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white rounded-full shadow-sm hover:bg-accent hover:text-white transition"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-gray-500 max-w-2xl mx-auto mb-8"
        >
          <p>Empowering Ugandan women to lead and innovate in the field of Artificial Intelligence through education, mentorship, and community building.</p>
        </motion.div>
      </div>

      {/* Bottom Banner */}
      <div className="bg-primary py-4 text-center text-white">
        <p className="text-sm">&#169; UWIAI</p>
      </div>
    </footer>
  );
}