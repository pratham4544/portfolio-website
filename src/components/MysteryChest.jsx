import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { soundManager } from './SoundManager';

const MysteryChest = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [lottieRef, setLottieRef] = useState(null);

  useEffect(() => {
    // Load treasure chest animation
    fetch('/animations/treasure-chest.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch((err) => {
        console.log('Treasure chest animation not found, using fallback');
      });
  }, []);

  const handleClick = () => {
    setIsOpening(true);
    soundManager.play('chestOpen');
    
    // Play Lottie animation
    if (lottieRef) {
      lottieRef.play();
    }

    setTimeout(() => {
      onClick();
    }, 800);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundManager.play('sparkle');
  };

  return (
    <motion.div
      className="relative cursor-pointer"
      onHoverStart={handleMouseEnter}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Mystical Aura */}
      <motion.div
        className="absolute inset-0 rounded-3xl blur-3xl -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(255,165,0,0.4) 0%, rgba(139,69,19,0.6) 50%, transparent 70%)',
        }}
        animate={{
          scale: isHovered ? [1, 1.3, 1] : [1, 1.15, 1],
          opacity: isHovered ? [0.6, 0.9, 0.6] : [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      />

      {/* Chest Container */}
      <div className="relative w-80 h-80 md:w-96 md:h-96">
        
        {animationData ? (
          // Lottie Animation
          <motion.div
            className="w-full h-full"
            animate={{
              scale: isHovered ? 1.05 : 1,
              y: isHovered ? -10 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <Lottie
              lottieRef={setLottieRef}
              animationData={animationData}
              loop={!isOpening}
              autoplay={true}
              speed={1.5}
              onComplete={() => {
                // Animation complete
              }}
              style={{
                filter: isHovered ? 'brightness(1.2)' : 'brightness(1)',
              }}
            />
          </motion.div>
        ) : (
          // Fallback - Simple Chest Emoji
          <motion.div
            className="w-full h-full flex items-center justify-center"
            animate={{
              scale: isHovered ? 1.1 : 1,
              y: isHovered ? -10 : 0,
              rotate: isHovered ? [0, -5, 5, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-9xl filter drop-shadow-2xl">📦</div>
          </motion.div>
        )}

        {/* Magical Particles Escaping */}
        <AnimatePresence>
          {(isHovered || isOpening) && (
            <>
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    left: '50%',
                    top: '40%',
                    background: i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#FF6B35' : '#FFA500',
                    boxShadow: `0 0 12px ${i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#FF6B35' : '#FFA500'}`,
                  }}
                  initial={{ 
                    x: 0, 
                    y: 0, 
                    opacity: 1, 
                    scale: 1 
                  }}
                  animate={{
                    x: Math.cos((i * 22.5) * Math.PI / 180) * (isOpening ? 200 : 100),
                    y: Math.sin((i * 22.5) * Math.PI / 180) * (isOpening ? 200 : 100) - 60,
                    opacity: 0,
                    scale: isOpening ? 2 : 0,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: isOpening ? 1.5 : 2.5,
                    repeat: isOpening ? 0 : Infinity,
                    delay: i * 0.08,
                    ease: "easeOut",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Sparkle Effects */}
        {isHovered && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute text-3xl"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${15 + (i % 3) * 25}%`,
                }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                ✨
              </motion.div>
            ))}
          </>
        )}

        {/* Light Beam (when opening) */}
        {isOpening && (
          <motion.div
            className="absolute left-1/2 top-1/3 transform -translate-x-1/2 w-40 h-96 -z-10"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,215,0,0.9) 0%, rgba(255,165,0,0.6) 50%, transparent 100%)',
              filter: 'blur(30px)',
            }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 1 }}
          />
        )}

        {/* Glowing Coins Bursting Out */}
        {isOpening && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`coin-${i}`}
                className="absolute text-4xl"
                style={{
                  left: '50%',
                  top: '40%',
                }}
                initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                animate={{
                  x: Math.cos((i * 30) * Math.PI / 180) * 180,
                  y: Math.sin((i * 30) * Math.PI / 180) * 180 - 100,
                  opacity: 0,
                  rotate: 720,
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.05,
                  ease: "easeOut",
                }}
              >
                💰
              </motion.div>
            ))}
          </>
        )}

        {/* 3D Shadow */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-6 -z-20 blur-2xl"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 70%)',
          }}
          animate={{
            scaleX: isHovered ? 1.3 : 1,
            opacity: isHovered ? 0.5 : 0.4,
          }}
        />
      </div>

      {/* Hover Instruction Text */}
      <motion.div
        className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap"
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        <p className="text-2xl md:text-3xl font-mystical font-bold glow-text mb-2">
          Click to Unfold Mystery
        </p>
        <p className="text-sm text-alchemy-parchment opacity-70">
          Discover the secrets of alchemical transmutation
        </p>
      </motion.div>
    </motion.div>
  );
};

export default MysteryChest;