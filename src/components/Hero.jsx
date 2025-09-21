import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const LogoShuffle = () => {
  const [currentLogo, setCurrentLogo] = useState(0);
  const [direction, setDirection] = useState('right');

  const logos = [
    {
      src: "/images/SHE+IS+AI-Logo-white-trans+(500+x+140+px).png",
      alt: "SHE+IS+AI Logo",
      className: "h-16 w-auto" // Maintain aspect ratio for wide logo
    },
    {
      src: "/images/UWAI_Logo.png",
      alt: "UWIAI Logo",
      className: "h-32 w-auto" // Different sizing for square logo
    }
  ];

  // Directions for entrance animation
  const directions = ['top', 'right', 'bottom', 'left'];
  
  // Variants for animation
  const logoVariants = {
    hidden: (direction) => {
      switch(direction) {
        case 'top':
          return { y: -200, opacity: 0, scale: 0.8 };
        case 'right':
          return { x: 200, opacity: 0, scale: 0.8 };
        case 'bottom':
          return { y: 200, opacity: 0, scale: 0.8 };
        case 'left':
          return { x: -200, opacity: 0, scale: 0.8 };
        default:
          return { x: 200, opacity: 0, scale: 0.8 };
      }
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        mass: 0.5
      }
    },
    exit: (direction) => {
      switch(direction) {
        case 'top':
          return { y: -200, opacity: 0, scale: 0.8, transition: { duration: 0.5 } };
        case 'right':
          return { x: 200, opacity: 0, scale: 0.8, transition: { duration: 0.5 } };
        case 'bottom':
          return { y: 200, opacity: 0, scale: 0.8, transition: { duration: 0.5 } };
        case 'left':
          return { x: -200, opacity: 0, scale: 0.8, transition: { duration: 0.5 } };
        default:
          return { x: 200, opacity: 0, scale: 0.8, transition: { duration: 0.5 } };
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Choose a random direction for the next logo
      const randomDirection = directions[Math.floor(Math.random() * directions.length)];
      setDirection(randomDirection);
      
      // Switch to the next logo
      setCurrentLogo((prev) => (prev + 1) % logos.length);
    }, 2000); // Change logo every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-72 w-72 mx-auto lg:mx-0 lg:ml-auto flex items-center justify-center">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentLogo}
          custom={direction}
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute flex items-center justify-center"
          style={{ width: '100%', height: '100%' }}
        >
          <img 
            src={logos[currentLogo].src} 
            alt={logos[currentLogo].alt} 
            className={logos[currentLogo].className}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default function Hero() {
  return (
    <div className="relative bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-7xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="flex flex-col lg:flex-row items-center">
              {/* Text Content */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="sm:text-center lg:text-left lg:w-1/2"
              >
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Uganda Women in</span>
                  <span className="block text-accent-light">Artificial Intelligence</span>
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Empowering women in Uganda through artificial intelligence education, research, and innovation.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#join-us"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent hover:bg-accent-light transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                    >
                      Join Us
                    </a>
                  </div>
                </div>
              </motion.div>
              
              {/* Logo Shuffle Animation */}
              <motion.div 
                className="mt-10 lg:mt-0 lg:w-1/2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <LogoShuffle />
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}