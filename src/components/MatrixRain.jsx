import { useEffect, useRef } from 'react';

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]/\\|;:';

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let lastTime = 0;
    const FONT_SIZE = 14;
    const INTERVAL = 50;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const cols = Math.floor(canvas.width / FONT_SIZE);
      return Array(cols).fill(1);
    };

    let drops = init();

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${FONT_SIZE}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const y = drops[i] * FONT_SIZE;
        // Leading character is bright white, rest are green
        ctx.fillStyle = y < FONT_SIZE * 3 ? '#CCFFCC' : '#00FF41';
        ctx.globalAlpha = y < FONT_SIZE * 3 ? 0.9 : 0.6;
        ctx.fillText(char, i * FONT_SIZE, y);
        ctx.globalAlpha = 1;

        if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const animate = (timestamp) => {
      if (timestamp - lastTime >= INTERVAL) {
        draw();
        lastTime = timestamp;
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    const onResize = () => {
      drops = init();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        opacity: 0.07,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default MatrixRain;
