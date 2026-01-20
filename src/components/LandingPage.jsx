import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AlchemistCharacter from './AlchemistCharacter';
import MysteryChest from './MysteryChest';
import CrystalCursor from './CrystalCursor';
import ParticleEffect from './ParticleEffect';
import { soundManager } from './SoundManager';

const LandingPage = ({ onChestOpen }) => {
  const [isChestOpened, setIsChestOpened] = useState(false);

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
    setIsChestOpened(true);
    setTimeout(() => {
      onChestOpen();
      // Scroll to timeline section
      document.getElementById('timeline')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 1000);
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

        {/* Particle Effects */}
        <ParticleEffect count={40} />

        {/* Floating Candles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <div className="text-4xl">🕯️</div>
            {/* Flame Glow */}
            <div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full blur-lg"
              style={{
                background: 'radial-gradient(circle, rgba(255,165,0,0.6) 0%, transparent 70%)',
              }}
            />
          </motion.div>
        ))}

        {/* Floating Books */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`book-${i}`}
            className="absolute text-5xl opacity-20"
            style={{
              left: `${15 + i * 25}%`,
              top: `${15 + i * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          >
            📖
          </motion.div>
        ))}

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
            className="text-5xl md:text-7xl font-mystical font-bold text-center mb-4 px-4"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #00D9FF 50%, #FFD700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 200%',
              animation: 'shimmer 3s ease-in-out infinite',
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

          {/* Name */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-lg md:text-xl text-alchemy-cyan text-center mb-12 px-4"
          >
            Prathamesh Shete - Master of AI Transmutation
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

          {/* Alchemical Symbols Floating Around */}
          {['⚗️', '🔮', '📜', '⚡', '✨'].map((symbol, i) => (
            <motion.div
              key={`symbol-${i}`}
              className="absolute text-4xl md:text-6xl opacity-20"
              style={{
                left: `${10 + i * 20}%`,
                bottom: `${10 + (i % 2) * 15}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              {symbol}
            </motion.div>
          ))}

          {/* Scroll Indicator (appears after chest opens) */}
          <AnimatePresence>
            {isChestOpened && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-10"
              >
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity 
                  }}
                  className="text-alchemy-gold text-5xl"
                >
                  ↓
                </motion.div>
                <p className="text-alchemy-parchment text-center mt-2">
                  Scroll to explore experiments
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Add shimmer animation to global styles */}
        <style jsx>{`
          @keyframes shimmer {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}</style>
      </div>
    </>
  );
};

export default LandingPage;