import React from 'react';

// Simplified particle effect - CSS only, no JS animations
const ParticleEffect = ({ count = 15 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-alchemy-gold opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animation: `float ${10 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.1; }
          50% { transform: translateY(-30px) translateX(10px); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};

export default ParticleEffect;
