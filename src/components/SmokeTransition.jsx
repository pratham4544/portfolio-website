import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';

const SmokeTransition = ({ show, onComplete }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/animations/smoke.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(() => {
        console.log('Smoke animation not found');
      });
  }, []);

  useEffect(() => {
    if (show && onComplete) {
      const timer = setTimeout(onComplete, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(74,26,92,0.4) 0%, rgba(10,6,18,0.9) 70%)',
          }}
        >
          {/* Left smoke */}
          <div className="absolute left-0 top-0 w-1/2 h-full">
            {animationData ? (
              <Lottie
                animationData={animationData}
                loop={false}
                className="w-full h-full opacity-80"
              />
            ) : (
              // CSS Fallback smoke
              <motion.div
                className="w-full h-full"
                style={{
                  background: 'radial-gradient(ellipse at left, rgba(139,69,19,0.6) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
                animate={{
                  x: [0, 100],
                  opacity: [0, 0.8, 0],
                }}
                transition={{ duration: 2 }}
              />
            )}
          </div>

          {/* Right smoke */}
          <div className="absolute right-0 top-0 w-1/2 h-full">
            {animationData ? (
              <Lottie
                animationData={animationData}
                loop={false}
                className="w-full h-full opacity-80 transform scale-x-[-1]"
              />
            ) : (
              // CSS Fallback smoke
              <motion.div
                className="w-full h-full"
                style={{
                  background: 'radial-gradient(ellipse at right, rgba(139,69,19,0.6) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
                animate={{
                  x: [0, -100],
                  opacity: [0, 0.8, 0],
                }}
                transition={{ duration: 2 }}
              />
            )}
          </div>

          {/* Center smoke particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-gray-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(8px)',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 2, 0],
                y: [0, -100 - Math.random() * 100],
              }}
              transition={{
                duration: 2,
                delay: i * 0.05,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SmokeTransition;