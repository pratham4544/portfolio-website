import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CrystalCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Create particle trail
      if (Math.random() > 0.7) {
        const newParticle = {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
        };
        setParticles(prev => [...prev.slice(-10), newParticle]);
      }
    };

    const updateCursorType = (e) => {
      const target = e.target;
      setIsPointer(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.onclick !== null ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer'
      );
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', updateCursorType);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', updateCursorType);
    };
  }, []);

  return (
    <>
      {/* Particle Trail */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none z-40"
          style={{
            left: particle.x,
            top: particle.y,
          }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-1 h-1 rounded-full bg-alchemy-cyan" 
               style={{ boxShadow: '0 0 8px #00D9FF' }} />
        </motion.div>
      ))}

      {/* Main Crystal Wand */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isPointer ? 1.5 : 1,
          rotate: isPointer ? 15 : 0,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 28,
          rotate: { duration: 0.2 }
        }}
      >
        {/* Crystal Core */}
        <div className="relative w-4 h-4">
          {/* Inner Glow */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, #00D9FF 0%, #4A1A5C 70%)',
            }}
            animate={{
              opacity: isPointer ? [0.6, 1, 0.6] : [0.4, 0.7, 0.4],
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          
          {/* Outer Crystal */}
          <div 
            className="absolute inset-0 rounded-full border-2 border-alchemy-cyan"
            style={{
              boxShadow: '0 0 10px #00D9FF, 0 0 20px #4A1A5C',
            }}
          />

          {/* Sparkle Effect on Click */}
          {isPointer && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-alchemy-gold rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: [0, Math.cos(i * 60 * Math.PI / 180) * 20],
                    y: [0, Math.sin(i * 60 * Math.PI / 180) * 20],
                    opacity: [1, 0],
                    scale: [1, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </>
          )}
        </div>
      </motion.div>

      {/* Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-40"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isPointer ? 2 : 1,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 150, 
          damping: 15 
        }}
      >
        <div 
          className="w-8 h-8 rounded-full border border-alchemy-purple opacity-50"
          style={{ borderStyle: 'dashed' }}
        />
      </motion.div>
    </>
  );
};

export default CrystalCursor;