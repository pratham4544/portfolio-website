import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFlask, FaCode, FaBrain, FaRobot } from 'react-icons/fa';

const LiveLabDemos = () => {
  const [activeDemo, setActiveDemo] = useState(null);

  const demos = [
    {
      id: 1,
      title: "RAG System Tester",
      icon: FaBrain,
      description: "Test retrieval-augmented generation with your own queries",
      color: "from-purple-600 to-purple-800",
      demoUrl: null, // Add your deployed demo URL
      placeholder: "Coming Soon: Try asking questions and see RAG responses in real-time"
    },
    {
      id: 2,
      title: "AI Interview Sample",
      icon: FaRobot,
      description: "Experience the AIETA interview system in action",
      color: "from-blue-600 to-blue-800",
      demoUrl: null,
      placeholder: "Coming Soon: Interactive demo of AI-powered technical interviews"
    },
    {
      id: 3,
      title: "Code Execution Sandbox",
      icon: FaCode,
      description: "Run Python code snippets with AI evaluation",
      color: "from-green-600 to-green-800",
      demoUrl: null,
      placeholder: "Coming Soon: Live code execution with instant feedback"
    },
  ];

  return (
    <section id="demos" className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-alchemy-dark via-alchemy-purple to-alchemy-dark" />

      {/* Floating Potions */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-6xl opacity-20"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          🧪
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-block mb-6"
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            <FaFlask className="text-8xl text-alchemy-gold mx-auto" 
                     style={{ filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.6))' }} />
          </motion.div>

          <h2 className="text-7xl md:text-8xl font-mystical font-bold mb-6 text-alchemy-gold"
              style={{ textShadow: '0 0 30px rgba(255,215,0,0.5)' }}>
            Live Alchemy Lab
          </h2>
          
          <p className="text-3xl md:text-4xl font-handwritten text-alchemy-parchment mb-4"
             style={{ textShadow: '2px 2px 8px rgba(0,0,0,1)' }}>
            Don't Just Read About My Work—Experience It
          </p>

          <p className="text-xl text-alchemy-cyan max-w-3xl mx-auto"
             style={{ textShadow: '1px 1px 4px rgba(0,0,0,1)' }}>
            Interactive demonstrations of AI systems I've built. 
            Click to explore live experiments and test real implementations.
          </p>
        </motion.div>

        {/* Demo Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demos.map((demo, index) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => setActiveDemo(demo.id)}
              className={`relative p-8 rounded-3xl bg-gradient-to-br ${demo.color} cursor-pointer group`}
              style={{
                boxShadow: '0 15px 40px rgba(0,0,0,0.6)',
                minHeight: '350px',
              }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-white opacity-0 group-hover:opacity-10 transition-opacity"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(255,255,255,0.2)',
                    '0 0 40px rgba(255,255,255,0.4)',
                    '0 0 20px rgba(255,255,255,0.2)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <demo.icon className="text-8xl text-white" 
                           style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))' }} />
              </div>

              {/* Title */}
              <h3 className="text-3xl font-mystical text-white text-center mb-4 font-bold"
                  style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}>
                {demo.title}
              </h3>

              {/* Description */}
              <p className="text-lg text-white text-center opacity-90 mb-6"
                 style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
                {demo.description}
              </p>

              {/* Status Badge */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <span className="px-4 py-2 bg-alchemy-gold text-alchemy-dark rounded-full text-sm font-bold">
                  {demo.demoUrl ? 'Try Now →' : 'Coming Soon'}
                </span>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-4 right-4 text-3xl opacity-50">✨</div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-block p-6 bg-black bg-opacity-50 rounded-2xl border-2 border-alchemy-gold">
            <p className="text-2xl font-handwritten text-alchemy-parchment mb-2"
               style={{ textShadow: '2px 2px 6px rgba(0,0,0,1)' }}>
              Want to see a specific demo?
            </p>
            <p className="text-lg text-alchemy-cyan"
               style={{ textShadow: '1px 1px 4px rgba(0,0,0,1)' }}>
              Contact me to discuss custom implementations
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveLabDemos;