// Updated to use UWIAI branding
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/projects", text: "Projects" },
    { to: "/innovators", text: "Innovators" },
    { to: "/talent-pool", text: "Talent Pool" },
    { to: "/membership", text: "Join Us", highlight: true }
  ];

  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-display font-bold text-primary">UWIAI</h1>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`${
                    link.highlight
                      ? 'bg-accent text-white px-4 py-2 rounded-md hover:bg-accent-light'
                      : 'text-primary hover:text-accent'
                  } transition`}
                >
                  {link.text}
                </Link>
              ))}
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-primary hover:text-accent transition"
              >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-3 py-2 rounded-md ${
                    link.highlight
                      ? 'bg-accent text-white'
                      : 'text-primary hover:text-accent'
                  } transition`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
      <div className="bg-black text-white text-center py-2 text-sm">
        UWIAI / Inzozi / 1705
      </div>
    </>
  );
}