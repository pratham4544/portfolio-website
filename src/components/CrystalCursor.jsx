import React, { useEffect, useRef } from 'react';

const CrystalCursor = () => {
  const wandRef = useRef(null);
  const glowRef = useRef(null);
  const isPointerRef = useRef(false);

  useEffect(() => {
    const wand = wandRef.current;
    const glow = glowRef.current;
    if (!wand || !glow) return;

    let animationId;
    let targetX = 0;
    let targetY = 0;

    const updateCursor = () => {
      // Direct transform - no lag
      wand.style.transform = `translate(${targetX}px, ${targetY}px) rotate(-45deg)`;
      glow.style.transform = `translate(${targetX}px, ${targetY}px)`;
      animationId = requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.onclick !== null ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';

      if (isClickable !== isPointerRef.current) {
        isPointerRef.current = isClickable;
        wand.style.filter = isClickable
          ? 'drop-shadow(0 0 12px #FFD700) drop-shadow(0 0 20px #00D9FF)'
          : 'drop-shadow(0 0 8px #00D9FF)';
        glow.style.opacity = isClickable ? '0.8' : '0.4';
        glow.style.transform = `translate(${targetX}px, ${targetY}px) scale(${isClickable ? 1.5 : 1})`;
      }
    };

    animationId = requestAnimationFrame(updateCursor);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Magical Glow */}
      <div
        ref={glowRef}
        className="fixed pointer-events-none z-40"
        style={{
          width: 24,
          height: 24,
          marginLeft: -12,
          marginTop: -12,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,217,255,0.6) 0%, rgba(74,26,92,0.3) 50%, transparent 70%)',
          opacity: 0.4,
          transition: 'opacity 0.2s, filter 0.2s',
        }}
      />

      {/* Wizard Wand */}
      <svg
        ref={wandRef}
        className="fixed pointer-events-none z-50"
        style={{
          width: 40,
          height: 40,
          marginLeft: -4,
          marginTop: -36,
          filter: 'drop-shadow(0 0 8px #00D9FF)',
          transition: 'filter 0.2s',
        }}
        viewBox="0 0 40 40"
        fill="none"
      >
        {/* Wand Stick */}
        <rect
          x="18"
          y="12"
          width="4"
          height="26"
          rx="1"
          fill="url(#wandGradient)"
        />

        {/* Wand Handle Rings */}
        <rect x="17" y="30" width="6" height="2" rx="1" fill="#8B4513" />
        <rect x="17" y="34" width="6" height="2" rx="1" fill="#8B4513" />

        {/* Crystal Tip */}
        <polygon
          points="20,2 24,12 20,10 16,12"
          fill="url(#crystalGradient)"
        />

        {/* Crystal Glow */}
        <circle cx="20" cy="8" r="3" fill="url(#glowGradient)" opacity="0.8" />

        {/* Gradients */}
        <defs>
          <linearGradient id="wandGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4A1A5C" />
            <stop offset="50%" stopColor="#2D1B4E" />
            <stop offset="100%" stopColor="#1a0a2e" />
          </linearGradient>
          <linearGradient id="crystalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00D9FF" />
            <stop offset="100%" stopColor="#4A1A5C" />
          </linearGradient>
          <radialGradient id="glowGradient">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#00D9FF" />
            <stop offset="100%" stopColor="#4A1A5C" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </>
  );
};

export default CrystalCursor;