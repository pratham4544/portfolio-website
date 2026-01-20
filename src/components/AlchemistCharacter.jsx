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
    <motion.div
      className={`${size} relative`}
      animate={{
        y: [0, -15, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
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
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(74,26,92,0.6) 0%, transparent 70%)',
              filter: 'blur(20px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />

          {/* Character */}
          <div className="relative z-10 text-center">
            <motion.div
              className="text-8xl md:text-9xl"
              animate={{
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              🧙‍♂️
            </motion.div>
            
            {/* Magic Wand */}
            <motion.div
              className="absolute -right-4 top-8 text-4xl"
              animate={{
                rotate: [0, 15, -15, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              🪄
            </motion.div>

            {/* Floating Book */}
            <motion.div
              className="absolute -left-6 top-12 text-3xl"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              📖
            </motion.div>

            {/* Sparkles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-xl"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 20}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              >
                ✨
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AlchemistCharacter;