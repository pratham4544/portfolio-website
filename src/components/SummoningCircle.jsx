import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaDownload, FaWhatsapp } from 'react-icons/fa';
import { soundManager } from './SoundManager';

const ContactCandle = ({ contact, angle, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const x = Math.cos((angle * Math.PI) / 180) * 280;
  const y = Math.sin((angle * Math.PI) / 180) * 280;

  return (
    <motion.a
      href={contact.link}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute cursor-pointer"
      style={{
        left: '50%',
        top: '50%',
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      onHoverStart={() => {
        setIsHovered(true);
        soundManager.play('sparkle');
      }}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.15, y: -10 }}
    >
      {/* Candle */}
      <div className="relative">
        {/* Flame Glow */}
        <motion.div
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full blur-xl -z-10"
          style={{
            background: `radial-gradient(circle, ${contact.flameColor || '#FF6B35'}, transparent)`,
          }}
          animate={{
            opacity: [0.5, 0.9, 0.5],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />

        {/* Flame */}
        <motion.div
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-4xl"
          animate={{
            y: [-2, -8, -2],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          🔥
        </motion.div>

        {/* Candle Body */}
        <div
          className="w-16 h-24 rounded-b-lg relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${contact.color} 0%, ${contact.darkColor} 100%)`,
            boxShadow: '0 6px 15px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.2)',
          }}
        >
          {/* Wax Drips */}
          <div
            className="absolute top-0 left-2 w-3 h-10 rounded-b-full opacity-60"
            style={{ background: contact.color }}
          />

          {/* Icon on Candle */}
          <div className="absolute inset-0 flex items-center justify-center text-white text-2xl">
            <contact.icon />
          </div>
        </div>

        {/* Candle Holder */}
        <div
          className="w-20 h-3 -mt-1 rounded-full mx-auto"
          style={{
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            boxShadow: '0 3px 6px rgba(0,0,0,0.4)',
          }}
        />
      </div>

      {/* Label - Enhanced Visibility */}
      <motion.div
        className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-center min-w-max"
        animate={{
          opacity: isHovered ? 1 : 0.9,
          y: isHovered ? -8 : 0,
        }}
      >
        <p className="text-base font-mystical text-alchemy-gold font-bold mb-1"
           style={{ textShadow: '2px 2px 8px rgba(0,0,0,1), 0 0 15px rgba(255,215,0,0.8)' }}>
          {contact.label}
        </p>
        <p className="text-sm text-alchemy-parchment font-handwritten bg-black bg-opacity-60 px-3 py-1 rounded-lg"
           style={{ textShadow: '1px 1px 4px rgba(0,0,0,1)' }}>
          {contact.displayValue}
        </p>
      </motion.div>
    </motion.a>
  );
};

const SummoningCircle = () => {
  const contacts = [
    {
      icon: FaGithub,
      label: "GitHub",
      displayValue: "pratham4544",
      link: "https://github.com/pratham4544",
      color: "#6e5494",
      darkColor: "#4A3768",
      flameColor: "#9370DB",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      displayValue: "prathameshshete",
      link: "https://www.linkedin.com/in/prathameshshete",
      color: "#0077B5",
      darkColor: "#005885",
      flameColor: "#0095D5",
    },
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      displayValue: "+91 9970939341",
      link: "https://wa.me/919970939341",
      color: "#25D366",
      darkColor: "#1DA851",
      flameColor: "#39FF14",
    },
    {
      icon: FaEnvelope,
      label: "Email",
      displayValue: "Contact Me",
      link: "mailto:prathameshshete609@gmail.com",
      color: "#D14836",
      darkColor: "#A13528",
      flameColor: "#FF6B35",
    },
    {
      icon: FaPhone,
      label: "Phone",
      displayValue: "+91 9970939341",
      link: "tel:+919970939341",
      color: "#4285F4",
      darkColor: "#3367D6",
      flameColor: "#00D9FF",
    },
  ];

  return (
    <section id="contact" className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, #0A0612 0%, #1a0f25 50%, #0A0612 100%)',
        }}
      />

      {/* Mystical Stars */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-6xl md:text-7xl font-mystical font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #00D9FF 50%, #FFD700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.5))',
            }}
          >
            Summoning Circle
          </motion.h2>
          <p className="text-xl md:text-2xl font-handwritten text-alchemy-parchment"
             style={{ textShadow: '2px 2px 6px rgba(0,0,0,1)' }}>
            Invoke a Connection Through Ancient Channels
          </p>
        </motion.div>

        {/* Main Summoning Circle */}
        <div className="relative w-full max-w-3xl mx-auto aspect-square mb-20">
          {/* Outer Circle */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-alchemy-gold opacity-40"
            initial={{ scale: 0, rotate: 0 }}
            whileInView={{ scale: 1, rotate: 360 }}
            viewport={{ once: true }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            }}
            style={{
              boxShadow: '0 0 30px rgba(255,215,0,0.4)',
            }}
          >
            {/* Runes on Circle */}
            {['⚡', '✦', '◆', '⚛', '❖', '✧', '◇', '※'].map((rune, i) => (
              <div
                key={i}
                className="absolute text-3xl text-alchemy-cyan"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-${220}px) rotate(-${i * 45}deg)`,
                  filter: 'drop-shadow(0 0 10px rgba(0,217,255,0.8))',
                }}
              >
                {rune}
              </div>
            ))}
          </motion.div>

          {/* Middle Circle */}
          <motion.div
            className="absolute inset-12 rounded-full border-2 border-alchemy-purple opacity-50"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3 }}
            animate={{
              rotate: [360, 0],
            }}
            style={{
              boxShadow: '0 0 20px rgba(74,26,92,0.4)',
            }}
          />

          {/* Inner Circle */}
          <motion.div
            className="absolute inset-20 rounded-full border border-alchemy-cyan opacity-60"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            style={{
              boxShadow: '0 0 15px rgba(0,217,255,0.5)',
            }}
          />

          {/* Contact Candles - Arranged in Pentagon (5 points) */}
          {contacts.map((contact, index) => (
            <ContactCandle
              key={contact.label}
              contact={contact}
              angle={-18 + (index * 72)}  // Pentagon: 360/5 = 72 degrees
              index={index}
            />
          ))}

          {/* Center Portal - Resume Book */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.a
              href="/resume.pdf"
              download="Prathamesh_Shete_Resume.pdf"
              className="relative cursor-pointer"
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => soundManager.play('sparkle')}
            >
              {/* Portal Glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl blur-3xl -z-10"
                style={{
                  background: 'radial-gradient(circle, #FFD700, #FF6B35)',
                }}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.6, 0.9, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />

              {/* Ancient Book */}
              <div
                className="w-32 h-48 rounded-xl flex flex-col items-center justify-center relative"
                style={{
                  background: 'linear-gradient(135deg, #654321 0%, #4A2511 100%)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.7), inset 0 2px 6px rgba(255,255,255,0.15)',
                  border: '4px solid #FFD700',
                }}
              >
                {/* Book Spine Details */}
                <div className="absolute left-3 top-6 bottom-6 w-1 bg-alchemy-gold opacity-60" />
                <div className="absolute right-3 top-6 bottom-6 w-1 bg-alchemy-gold opacity-60" />
                <div className="absolute top-3 left-6 right-6 h-1 bg-alchemy-gold opacity-60" />
                <div className="absolute bottom-3 left-6 right-6 h-1 bg-alchemy-gold opacity-60" />

                {/* Download Icon */}
                <FaDownload className="text-3xl text-alchemy-gold mb-3" 
                            style={{ filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.8))' }} />
                
                {/* Book Title */}
                <p className="font-mystical text-sm text-alchemy-gold text-center px-3 mb-1"
                   style={{ textShadow: '2px 2px 6px rgba(0,0,0,1)' }}>
                  Chronicles of
                </p>
                <p className="font-mystical text-xl text-alchemy-gold font-bold text-center"
                   style={{ textShadow: '2px 2px 8px rgba(0,0,0,1)' }}>
                  Prathamesh
                </p>

                {/* Book Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(255,215,0,0.4)',
                      '0 0 50px rgba(255,215,0,0.8)',
                      '0 0 20px rgba(255,215,0,0.4)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </div>
            </motion.a>
          </motion.div>

          {/* Pentagram Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none">
            <motion.path
              d="M 50% 15%, 85% 85%, 8% 38%, 92% 38%, 15% 85%, 50% 15%"
              stroke="#FFD700"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 3, delay: 0.8 }}
            />
          </svg>
        </div>

        {/* Location Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div
            className="inline-block p-8 rounded-2xl"
            style={{
              background: 'rgba(10,6,18,0.8)',
              border: '3px solid rgba(255,215,0,0.5)',
              boxShadow: '0 0 30px rgba(255,215,0,0.3)',
            }}
          >
            <div className="flex items-center justify-center gap-4 text-alchemy-parchment">
              <FaMapMarkerAlt className="text-4xl text-alchemy-ember"
                              style={{ filter: 'drop-shadow(0 0 10px rgba(255,107,53,0.8))' }} />
              <div className="text-left">
                <p className="text-sm opacity-80 mb-1"
                   style={{ textShadow: '1px 1px 4px rgba(0,0,0,1)' }}>
                  Transmutation Laboratory Located in
                </p>
                <p className="text-3xl font-mystical text-alchemy-gold font-bold"
                   style={{ textShadow: '2px 2px 8px rgba(0,0,0,1)' }}>
                  Pune, Maharashtra, India
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-handwritten text-xl text-alchemy-parchment italic mb-4"
             style={{ textShadow: '2px 2px 6px rgba(0,0,0,1)' }}>
            "Light a candle to establish connection, or summon the chronicles for detailed study"
          </p>
          <p className="text-sm text-alchemy-cyan font-bold"
             style={{ textShadow: '1px 1px 4px rgba(0,0,0,1)' }}>
            © 2025 Prathamesh Shete - Master Alchemist of AI
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SummoningCircle;