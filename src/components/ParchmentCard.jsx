import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { soundManager } from './SoundManager';

const ParchmentCard = ({ project, index, isLeft }) => {
  const [isUnrolled, setIsUnrolled] = useState(false);

  const handleHover = () => {
    setIsUnrolled(true);
    soundManager.play('scrollUnroll');
  };

  return (
    <motion.div
      className="relative"
      onHoverStart={handleHover}
      onHoverEnd={() => setIsUnrolled(false)}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative cursor-pointer"
        animate={{
          rotateY: isUnrolled ? 5 : 0,
          rotateX: isUnrolled ? -5 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Parchment Paper */}
        <div
          className="relative rounded-lg p-6 md:p-8 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #F4E4C1 0%, #E8D4A0 100%)',
            boxShadow: `
              0 10px 30px rgba(0,0,0,0.3),
              inset 0 1px 0 rgba(255,255,255,0.3),
              inset 0 -1px 0 rgba(0,0,0,0.1)
            `,
          }}
        >
          {/* Paper Texture Overlay */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  rgba(139,69,19,0.1) 2px,
                  rgba(139,69,19,0.1) 4px
                )
              `,
            }}
          />

          {/* Burn Marks on Edges */}
          <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-gradient-radial from-amber-900 to-transparent opacity-30" />
          <div className="absolute bottom-4 left-3 w-12 h-12 rounded-full bg-gradient-radial from-amber-900 to-transparent opacity-20" />

          {/* Wax Seal */}
          <motion.div
            className="absolute -top-6 -right-6 w-16 h-16 rounded-full z-10"
            style={{
              background: 'radial-gradient(circle, #8B0000 0%, #5C0000 100%)',
              boxShadow: '0 4px 10px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.2)',
            }}
            animate={{
              rotate: isUnrolled ? 15 : 0,
            }}
          >
            {/* Seal Pattern */}
            <div className="absolute inset-0 flex items-center justify-center text-alchemy-gold text-xl font-mystical">
              PS
            </div>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-alchemy-gold opacity-50"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.div>

          {/* Content */}
          <div className="relative z-5">
            {/* Alchemical Name */}
            <motion.p
              className="text-sm font-handwritten text-alchemy-purple mb-2 opacity-70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: index * 0.1 }}
            >
              {project.alchemicalName}
            </motion.p>

            {/* Project Title */}
            <motion.h3
              className="text-2xl md:text-3xl font-mystical font-bold mb-4"
              style={{
                color: '#2d1638',
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
              }}
            >
              {project.title}
            </motion.h3>

            {/* Decorative Line */}
            <div className="w-20 h-1 bg-gradient-to-r from-alchemy-gold to-transparent mb-4 rounded" />

            {/* Description */}
            <p className="text-sm md:text-base font-handwritten text-gray-800 mb-4 leading-relaxed">
              {project.description}
            </p>

            {/* Ingredients Label */}
            <p className="text-xs font-mystical text-alchemy-purple mb-2 opacity-80">
              ⚗️ Alchemical Ingredients:
            </p>

            {/* Tech Stack (Ingredients) */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.ingredients.map((ingredient, i) => (
                <motion.span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-handwritten"
                  style={{
                    background: 'linear-gradient(135deg, #4A1A5C 0%, #6B2A7C 100%)',
                    color: '#FFD700',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + i * 0.05 }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0 0 10px rgba(255,215,0,0.6)',
                  }}
                >
                  {ingredient}
                </motion.span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-mystical text-sm transition-all"
                style={{
                  background: 'linear-gradient(135deg, #2d1638 0%, #4A1A5C 100%)',
                  color: '#FFD700',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 6px 20px rgba(74,26,92,0.6)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub /> Grimoire
              </motion.a>

              {project.live && (
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-mystical text-sm transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                    color: '#2d1638',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0 6px 20px rgba(255,215,0,0.6)',
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaExternalLinkAlt /> Live Spell
                </motion.a>
              )}
            </div>
          </div>

          {/* Corner Decorations */}
          <div className="absolute top-3 left-3 text-alchemy-purple opacity-20 text-xl">
            ❧
          </div>
          <div className="absolute bottom-3 right-3 text-alchemy-purple opacity-20 text-xl transform rotate-180">
            ❧
          </div>
        </div>

        {/* Rolled Edge Effect (when not hovered) */}
        <AnimatePresence>
          {!isUnrolled && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              className={`absolute top-0 ${isLeft ? 'right-0' : 'left-0'} w-4 h-full rounded-r-full`}
              style={{
                background: 'linear-gradient(to right, rgba(139,69,19,0.3), transparent)',
                transformOrigin: isLeft ? 'right' : 'left',
              }}
            />
          )}
        </AnimatePresence>

        {/* 3D Shadow */}
        <div
          className="absolute -bottom-2 left-2 right-2 h-4 rounded-lg -z-10"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)',
            filter: 'blur(8px)',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default ParchmentCard;