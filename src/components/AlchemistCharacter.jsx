import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';

const AlchemistCharacter = ({ small = false }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    // Try to load Lottie animation
    fetch('/animations/alchemist.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(() => {
        // Fallback - will use emoji character
        console.log('Using fallback character');
      });
  }, []);

  const size = small ? 'w-24 h-24' : 'w-64 h-64 md:w-80 md:h-80';

  return (
    <div className={`${size} relative`}>
      {animationData ? (
        // Lottie Animation
        <Lottie
          animationData={animationData}
          loop={true}
          className="w-full h-full"
        />
      ) : (
        // Fallback Character (Emoji + Effects)
        <div className="w-full h-full flex items-center justify-center relative">
          {/* Glow Behind Character */}
          <div
            className="absolute inset-0 rounded-full opacity-50"
            style={{
              background: 'radial-gradient(circle, rgba(74,26,92,0.6) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
          />

          {/* Character */}
          <div className="relative z-10 text-center">
            <div className="text-8xl md:text-9xl">🧙‍♂️</div>

            {/* Speech Bubble */}
            {!small && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute -left-8 top-8 bg-alchemy-parchment px-6 py-4 rounded-2xl shadow-2xl max-w-xs"
                style={{
                  border: '3px solid #8B4513',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
                }}
              >
                
                {/* Speech bubble pointer */}
                <div className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-alchemy-parchment"
                    style={{ borderLeftColor: '#F4E4C1' }} />
              </motion.div>
            )}

            {/* Magic Wand */}
            <div className="absolute -right-4 top-8 text-4xl">🪄</div>

            {/* Floating Book */}
            <div className="absolute -left-6 top-12 text-3xl">📖</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlchemistCharacter;
