import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { potions } from '../data/skills';
import { soundManager } from './SoundManager';

const PotionBottle = ({ potion, index, shelfIndex }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: shelfIndex * 0.2 + index * 0.1 }}
      onHoverStart={() => {
        setIsHovered(true);
        soundManager.play('potionBubble');
      }}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Bottle Container */}
      <motion.div
        className="relative w-20 h-32 mx-auto"
        animate={{
          y: isHovered ? -10 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-xl -z-10"
          style={{
            background: `radial-gradient(circle, ${potion.color}, transparent)`,
          }}
          animate={{
            opacity: isHovered ? 0.8 : 0.4,
            scale: isHovered ? 1.3 : 1,
          }}
        />

        {/* Bottle Cork */}
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-4 rounded-t-lg"
          style={{
            background: 'linear-gradient(135deg, #8B4513 0%, #654321 100%)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }}
        />

        {/* Bottle Neck */}
        <div
          className="absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-8"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
            borderRadius: '4px 4px 0 0',
          }}
        />

        {/* Main Bottle Body */}
        <div
          className="absolute top-12 left-1/2 transform -translate-x-1/2 w-16 h-20 rounded-b-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3), 0 4px 10px rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {/* Liquid Inside */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 rounded-b-3xl"
            style={{
              background: `linear-gradient(to top, ${potion.color}, ${potion.color}dd)`,
              height: `${potion.potency}%`,
              boxShadow: `0 0 20px ${potion.color}`,
            }}
            initial={{ height: 0 }}
            whileInView={{ height: `${potion.potency}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: shelfIndex * 0.2 + index * 0.1 + 0.3 }}
          >
            {/* Bubbles */}
            {[...Array(potion.bubbles)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white opacity-30"
                style={{
                  width: `${Math.random() * 6 + 3}px`,
                  height: `${Math.random() * 6 + 3}px`,
                  left: `${Math.random() * 80 + 10}%`,
                  bottom: `${Math.random() * 20}%`,
                }}
                animate={{
                  y: [0, -60],
                  opacity: [0.3, 0],
                  scale: [1, 0.5],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}

            {/* Shine Effect */}
            <div
              className="absolute top-2 left-2 w-4 h-8 rounded-full opacity-40"
              style={{
                background: 'linear-gradient(135deg, white, transparent)',
              }}
            />
          </motion.div>

          {/* Glass Reflection */}
          <div
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
            }}
          />
        </div>

        {/* Bottle Label */}
        <motion.div
          className="absolute top-16 left-1/2 transform -translate-x-1/2 w-14 h-10 flex items-center justify-center"
          style={{
            background: 'rgba(244,228,193,0.9)',
            border: '1px solid #8B4513',
            borderRadius: '2px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
          animate={{
            rotateZ: isHovered ? 5 : 0,
          }}
        >
          <p className="text-xs font-handwritten text-center text-alchemy-dark px-1">
            {potion.shortName}
          </p>
        </motion.div>
      </motion.div>

      {/* Potion Name */}
      <motion.p
        className="text-center text-sm font-mystical text-alchemy-parchment mt-2"
        animate={{
          opacity: isHovered ? 1 : 0.7,
        }}
      >
        {potion.name}
      </motion.p>

      {/* Potency Percentage */}
      <motion.p
        className="text-center text-xs text-alchemy-gold mt-1"
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
      >
        {potion.potency}% Potency
      </motion.p>

      {/* Tooltip on Hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-48 p-3 rounded-lg z-50"
          style={{
            background: 'rgba(244,228,193,0.95)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            border: '2px solid #FFD700',
          }}
        >
          <p className="text-xs font-handwritten text-alchemy-dark text-center">
            {potion.description}
          </p>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-alchemy-parchment" />
        </motion.div>
      )}
    </motion.div>
  );
};

const PotionSkills = () => {
  return (
    <section id="skills" className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #0A0612 0%, #1a0f25 50%, #0A0612 100%)',
        }}
      />

      {/* Magical Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-alchemy-cyan"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 4px #00D9FF',
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-6xl md:text-7xl font-mystical font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #00D9FF 50%, #FFD700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Alchemical Arsenal
          </motion.h2>
          <p className="text-xl md:text-2xl font-handwritten text-alchemy-parchment">
            Potions & Elixirs Mastered Through Years of Study
          </p>

          {/* Decorative Cauldron */}
          <motion.div
            className="mt-6 text-6xl"
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            🧪
          </motion.div>
        </motion.div>

        {/* Potion Shelves */}
        <div className="space-y-20">
          {potions.map((shelf, shelfIndex) => (
            <motion.div
              key={shelf.shelf}
              initial={{ opacity: 0, x: shelfIndex % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: shelfIndex * 0.2 }}
            >
              {/* Shelf Title */}
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-4xl font-mystical text-alchemy-gold mb-2">
                  {shelf.shelf}
                </h3>
                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-alchemy-gold to-transparent mx-auto" />
              </div>

              {/* Wooden Shelf */}
              <div className="relative">
                {/* Shelf Wood Plank */}
                <motion.div
                  className="w-full h-4 rounded-lg mb-4"
                  style={{
                    background: 'linear-gradient(to bottom, #654321, #4A2511)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.4), inset 0 2px 4px rgba(0,0,0,0.2)',
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: shelfIndex * 0.2 }}
                >
                  {/* Wood Grain */}
                  <div
                    className="absolute inset-0 rounded-lg opacity-20"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 11px)',
                    }}
                  />
                </motion.div>

                {/* Bottles on Shelf */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                  {shelf.bottles.map((bottle, index) => (
                    <PotionBottle
                      key={bottle.name}
                      potion={bottle}
                      index={index}
                      shelfIndex={shelfIndex}
                    />
                  ))}
                </div>

                {/* Shelf Support Brackets */}
                <div className="absolute -bottom-6 left-8 w-6 h-8 bg-gradient-to-b from-alchemy-silver to-gray-600 rounded-sm opacity-60" />
                <div className="absolute -bottom-6 right-8 w-6 h-8 bg-gradient-to-b from-alchemy-silver to-gray-600 rounded-sm opacity-60" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Alchemical Note */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div
            className="inline-block p-6 rounded-lg"
            style={{
              background: 'rgba(244,228,193,0.1)',
              border: '2px solid rgba(255,215,0,0.3)',
            }}
          >
            <p className="font-handwritten text-lg text-alchemy-parchment italic">
              "Through dedication and experimentation, these elixirs have been perfected.
              <br />
              Each potion represents countless hours of study and practice."
            </p>
            <p className="text-alchemy-gold mt-2">- Master Prathamesh</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PotionSkills;