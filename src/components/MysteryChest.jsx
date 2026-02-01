import { useState, useEffect } from 'react';
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
      .catch(() => {
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
      <div
        className="absolute inset-0 rounded-3xl blur-3xl -z-10 transition-all duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(255,165,0,0.4) 0%, rgba(139,69,19,0.6) 50%, transparent 70%)',
          transform: isHovered ? 'scale(1.2)' : 'scale(1)',
          opacity: isHovered ? 0.8 : 0.5,
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

        {/* Magical Particles - only on opening */}
        <AnimatePresence>
          {isOpening && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    left: '50%',
                    top: '40%',
                    background: i % 2 === 0 ? '#FFD700' : '#FFA500',
                    boxShadow: `0 0 12px ${i % 2 === 0 ? '#FFD700' : '#FFA500'}`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: Math.cos((i * 45) * Math.PI / 180) * 150,
                    y: Math.sin((i * 45) * Math.PI / 180) * 150 - 60,
                    opacity: 0,
                    scale: 1.5,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, delay: i * 0.05, ease: "easeOut" }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

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

        {/* 3D Shadow */}
        <div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-6 -z-20 blur-2xl transition-all duration-300"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 70%)',
            transform: `translateX(-50%) scaleX(${isHovered ? 1.3 : 1})`,
            opacity: isHovered ? 0.5 : 0.4,
          }}
        />
      </div>

      
    </motion.div>
  );
};

export default MysteryChest;