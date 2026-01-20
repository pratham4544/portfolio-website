import React from 'react';
import { motion } from 'framer-motion';
import ParchmentCard from './ParchmentCard';
import { projects } from '../data/projects';
import AlchemistCharacter from './AlchemistCharacter';

const MysticalTree = () => {
  return (
    <section id="timeline" className="min-h-screen relative py-20 px-4 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #0A0612 0%, #1a0f25 50%, #0A0612 100%)',
        }}
      />

      {/* Mystical Fog Effect */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(74,26,92,0.4) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />

      {/* Fireflies */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`firefly-${i}`}
          className="absolute w-2 h-2 rounded-full bg-alchemy-gold"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: '0 0 10px #FFD700',
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Small Alchemist Character - Bottom Left Corner */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed left-4 md:left-8 bottom-8 z-30 hidden lg:block"
      >
        <div className="relative">
          <AlchemistCharacter small={true} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-2"
          >
            <p className="text-alchemy-gold font-mystical text-sm font-bold">
              Prathamesh
            </p>
            <p className="text-alchemy-parchment text-xs opacity-70">
              The Alchemist
            </p>
          </motion.div>
          
          {/* Speech Bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute -right-4 top-8 bg-alchemy-parchment text-alchemy-dark px-3 py-2 rounded-lg text-xs font-handwritten whitespace-nowrap"
            style={{
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            }}
          >
            Behold my experiments!
            <div className="absolute left-0 top-1/2 transform -translate-x-2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-8 border-transparent border-r-alchemy-parchment" />
          </motion.div>
        </div>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative text-center mb-20 z-10"
      >
        <motion.h2
          className="text-6xl md:text-8xl font-mystical font-bold mb-4"
          style={{
            background: 'linear-gradient(135deg, #FFD700 0%, #00D9FF 50%, #FFD700 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 40px rgba(255,215,0,0.3)',
          }}
        >
          The Experiment Tree
        </motion.h2>
        <p className="text-xl md:text-2xl font-handwritten text-alchemy-parchment">
          A chronicle of alchemical transmutations through time
        </p>
        
        {/* Decorative Runes */}
        <div className="flex justify-center gap-4 mt-4 text-3xl">
          {['⚗️', '✦', '⚗️'].map((rune, i) => (
            <motion.span
              key={i}
              className="text-alchemy-cyan"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              {rune}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Tree Timeline Container */}
      <div className="relative max-w-7xl mx-auto">
        
        {/* Main Tree Trunk (Vertical Line) */}
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 w-2 md:w-3 rounded-full"
          style={{
            background: 'linear-gradient(to bottom, #8B4789 0%, #4A1A5C 50%, #2d1638 100%)',
            boxShadow: '0 0 20px rgba(74,26,92,0.6), inset 0 0 10px rgba(0,0,0,0.5)',
            top: 0,
            height: '100%',
          }}
          initial={{ height: 0 }}
          animate={{ height: '100%' }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          {/* Glowing Energy Veins */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, #00D9FF 50%, transparent 100%)',
              opacity: 0.3,
            }}
            animate={{
              y: ['-100%', '100%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>

        {/* Tree Roots (at bottom) */}
        <motion.div
          className="absolute left-1/2 bottom-0 transform -translate-x-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <svg width="200" height="100" viewBox="0 0 200 100" className="opacity-40">
            <path
              d="M100,0 Q50,50 20,100 M100,0 Q100,50 100,100 M100,0 Q150,50 180,100"
              stroke="#4A1A5C"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <p className="text-center text-alchemy-parchment font-handwritten text-sm mt-2">
            The Journey Begins
          </p>
        </motion.div>

        {/* Projects Timeline */}
        <div className="space-y-32 pb-32">
          {projects.map((project, index) => {
            const isLeft = index % 2 === 0;
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100
                }}
                className="relative"
              >
                {/* Branch extending from trunk */}
                <motion.div
                  className={`absolute top-1/2 ${isLeft ? 'right-1/2' : 'left-1/2'} w-24 md:w-40 h-1`}
                  style={{
                    background: `linear-gradient(${isLeft ? 'to left' : 'to right'}, #4A1A5C, #8B4789)`,
                    boxShadow: '0 0 10px rgba(74,26,92,0.4)',
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: isLeft ? '6rem' : '6rem' }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
                >
                  {/* Leaves on branch */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-xl"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: i % 2 === 0 ? '-10px' : '0px',
                      }}
                      animate={{
                        rotate: [0, 10, -10, 0],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    >
                      🍃
                    </motion.div>
                  ))}
                </motion.div>

                {/* Glowing Node on Trunk */}
                <motion.div
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.5, duration: 0.5 }}
                >
                  <div 
                    className="w-8 h-8 rounded-full relative"
                    style={{
                      background: `radial-gradient(circle, ${project.potionColor}, #4A1A5C)`,
                      boxShadow: `0 0 20px ${project.potionColor}`,
                    }}
                  >
                    {/* Pulse Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `radial-gradient(circle, ${project.potionColor}, transparent)`,
                      }}
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.6, 0, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                    
                    {/* Project Rune in Center */}
                    <div className="absolute inset-0 flex items-center justify-center text-lg">
                      {project.rune}
                    </div>
                  </div>
                </motion.div>

                {/* Hanging Lantern with Rune */}
                <motion.div
                  className={`absolute ${isLeft ? 'right-0 mr-28 md:mr-44' : 'left-0 ml-28 md:ml-44'} top-0`}
                  initial={{ y: -20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.4 }}
                >
                  {/* Lantern Chain */}
                  <div className="w-0.5 h-8 bg-alchemy-silver mx-auto opacity-50" />
                  
                  {/* Lantern */}
                  <motion.div
                    className="w-12 h-16 rounded-lg relative"
                    style={{
                      background: 'linear-gradient(135deg, #2d1638 0%, #4A1A5C 100%)',
                      boxShadow: `0 0 20px ${project.potionColor}`,
                      border: '2px solid #FFD700',
                    }}
                    animate={{
                      y: [0, -5, 0],
                      rotate: [-2, 2, -2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  >
                    {/* Inner Glow */}
                    <div 
                      className="absolute inset-2 rounded"
                      style={{
                        background: `radial-gradient(circle, ${project.potionColor}, transparent)`,
                        opacity: 0.6,
                      }}
                    />
                    
                    {/* Rune Symbol */}
                    <div className="absolute inset-0 flex items-center justify-center text-2xl">
                      {project.rune}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Project Card Container */}
                <div className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-full md:w-5/12 ${isLeft ? 'pr-4 md:pr-8' : 'pl-4 md:pl-8'}`}>
                    <ParchmentCard project={project} index={index} isLeft={isLeft} />
                  </div>
                </div>

                {/* Year Label on opposite side */}
                <div className={`absolute top-0 ${isLeft ? 'left-1/2 ml-28 md:ml-44' : 'right-1/2 mr-28 md:mr-44'}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.6 }}
                    className="text-center"
                  >
                    <p className="text-5xl md:text-6xl font-mystical font-bold text-alchemy-gold mb-1"
                       style={{ textShadow: '0 0 20px rgba(255,215,0,0.5)' }}>
                      {project.year}
                    </p>
                    <p className="text-sm text-alchemy-parchment opacity-70 font-handwritten">
                      {project.month}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tree Top - Mystical Crown */}
        <motion.div
          className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-20"
          initial={{ opacity: 0, scale: 0, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="text-6xl">✨</div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer Message */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-32 relative z-10"
      >
        <p className="text-3xl font-handwritten text-alchemy-parchment mb-4">
          More experiments brewing in the cauldron...
        </p>
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="text-5xl"
        >
          ⚗️
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MysticalTree;