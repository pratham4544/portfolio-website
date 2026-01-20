import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaWhatsapp, FaMapMarkerAlt, FaDownload } from 'react-icons/fa';
import { soundManager } from './SoundManager';

const ContactCards = () => {
  const contacts = [
    {
      icon: FaGithub,
      label: "GitHub",
      value: "pratham4544",
      link: "https://github.com/pratham4544",
      gradient: "from-purple-600 to-purple-800",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      value: "prathameshshete",
      link: "https://www.linkedin.com/in/prathameshshete",
      gradient: "from-blue-600 to-blue-800",
    },
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      value: "+91 9970939341",
      link: "https://wa.me/919970939341",
      gradient: "from-green-600 to-green-800",
    },
    {
      icon: FaEnvelope,
      label: "Email",
      value: "prathameshshete609@gmail.com",
      link: "mailto:prathameshshete609@gmail.com",
      gradient: "from-red-600 to-red-800",
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: "+91 9970939341",
      link: "tel:+919970939341",
      gradient: "from-cyan-600 to-cyan-800",
    },
  ];

  return (
    <section id="contact" className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-alchemy-dark via-alchemy-purple to-alchemy-dark" />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-alchemy-gold rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
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
          className="text-center mb-16"
        >
          <h2 className="text-6xl md:text-7xl font-mystical font-bold mb-4 text-alchemy-gold">
            Let's Connect
          </h2>
          <p className="text-xl md:text-2xl font-handwritten text-alchemy-parchment">
            Choose Your Channel of Communication
          </p>
        </motion.div>

        {/* Contact Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {contacts.map((contact, index) => (
            <motion.a
              key={contact.label}
              href={contact.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
              onHoverStart={() => soundManager.play('sparkle')}
              className={`relative p-8 rounded-2xl bg-gradient-to-br ${contact.gradient} cursor-pointer group`}
              style={{
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white opacity-0 group-hover:opacity-10 transition-opacity" />

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <contact.icon className="text-6xl text-white" />
              </div>

              {/* Label */}
              <h3 className="text-2xl font-mystical text-white text-center mb-2 font-bold">
                {contact.label}
              </h3>

              {/* Value */}
              <p className="text-sm text-white text-center opacity-90 font-handwritten">
                {contact.value}
              </p>

              {/* Decorative Corner */}
              <div className="absolute top-3 right-3 text-alchemy-gold opacity-50 text-xl">✨</div>
            </motion.a>
          ))}

          {/* Resume Download Card */}
          <motion.a
            href="/resume.pdf"
            download="Prathamesh_Shete_Resume.pdf"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05, y: -10 }}
            onHoverStart={() => soundManager.play('sparkle')}
            className="relative p-8 rounded-2xl bg-gradient-to-br from-alchemy-gold to-amber-600 cursor-pointer group"
            style={{
              boxShadow: '0 10px 30px rgba(255,215,0,0.4)',
            }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white opacity-0 group-hover:opacity-20 transition-opacity" />

            <div className="flex justify-center mb-4">
              <FaDownload className="text-6xl text-alchemy-dark" />
            </div>

            <h3 className="text-2xl font-mystical text-alchemy-dark text-center mb-2 font-bold">
              Download Resume
            </h3>

            <p className="text-sm text-alchemy-dark text-center opacity-90 font-handwritten">
              Chronicles of Prathamesh
            </p>

            <div className="absolute top-3 right-3 text-alchemy-dark opacity-50 text-xl">📜</div>
          </motion.a>
        </div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-block p-6 rounded-2xl bg-black bg-opacity-40 border-2 border-alchemy-gold">
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-4xl text-alchemy-ember" />
              <div className="text-left">
                <p className="text-sm text-alchemy-parchment opacity-70">Based in</p>
                <p className="text-2xl font-mystical text-alchemy-gold font-bold">
                  Pune, Maharashtra, India
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-alchemy-cyan text-sm">
            © 2025 Prathamesh Shete - Master Alchemist of AI
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCards;