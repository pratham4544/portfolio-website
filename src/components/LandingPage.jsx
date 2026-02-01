import { useEffect } from 'react';
import { motion } from 'framer-motion';
import AlchemistCharacter from './AlchemistCharacter';
import MysteryChest from './MysteryChest';
import CrystalCursor from './CrystalCursor';
import ParticleEffect from './ParticleEffect';
import { soundManager } from './SoundManager';

const LandingPage = ({ onChestOpen }) => {
  useEffect(() => {
    // Initialize sound manager
    soundManager.init();
    
    // Start ambient sound after user interaction
    const startAmbience = () => {
      soundManager.playAmbience();
      document.removeEventListener('click', startAmbience);
    };
    document.addEventListener('click', startAmbience);

    return () => {
      document.removeEventListener('click', startAmbience);
    };
  }, []);

  const handleChestClick = () => {
    // Trigger smoke animation
    setTimeout(() => {
      onChestOpen();
    }, 800);

    // Auto scroll to experiment tree after smoke animation
    setTimeout(() => {
      const timelineSection = document.getElementById('timeline');
      if (timelineSection) {
        timelineSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 2500);
  };

  return (
    <>
      {/* Custom Cursor */}
      <CrystalCursor />

      <div className="min-h-screen relative overflow-hidden">
        {/* Mystical Background */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-alchemy-dark via-alchemy-purple to-alchemy-dark"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(74,26,92,0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(0,217,255,0.2) 0%, transparent 50%)
            `,
          }}
        />

        {/* Particle Effects - reduced count */}
        <ParticleEffect count={15} />

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
          
          {/* Alchemist Character */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              delay: 0.3, 
              duration: 1,
              type: "spring",
              stiffness: 100
            }}
            className="mb-8"
          >
            <AlchemistCharacter />
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-mystical font-bold text-center mb-4 px-4"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #00D9FF 50%, #FFD700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            The Alchemist's Laboratory
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-2xl md:text-3xl font-handwritten text-alchemy-parchment text-center mb-3 px-4"
          >
            Where Data Transforms into Digital Gold
          </motion.p>

                <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-lg md:text-xl text-alchemy-cyan text-center mb-12 px-4 font-mystical"
                >
                Prathamesh Shete - Master of AI Transmutation
                </motion.p>

                <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-2xl md:text-3xl text-alchemy-gold text-center mb-12 px-6 py-3 font-mystical font-bold"
                style={{
                  textShadow: '0 0 20px rgba(255,215,0,0.8), 2px 2px 8px rgba(0,0,0,1)',
                  background: 'rgba(0,0,0,0.5)',
                  borderRadius: '12px',
                  border: '2px solid rgba(255,215,0,0.4)',
                }}
                >
                ✨ Click the Mystery Box to Unfold the Secrets ✨
                </motion.p>

                {/* Mystery Chest */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 1.2, 
              duration: 1.2, 
              type: "spring",
              stiffness: 100
            }}
          >
            <MysteryChest onClick={handleChestClick} />
          </motion.div>

          
        </div>

      </div>
    </>
  );
};

export default LandingPage;