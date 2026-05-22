import { useEffect, useState, useRef } from 'react';

const TerminalCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const rafRef = useRef(null);
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    const checkHover = (e) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const tag = el.tagName.toLowerCase();
        setIsHovering(['a', 'button'].includes(tag) || el.closest('a, button') !== null);
      }
    };

    const tick = () => {
      setPos({ x: targetRef.current.x, y: targetRef.current.y });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousemove', checkHover);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousemove', checkHover);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
    };
  }, []);

  const size = isClicking ? 12 : isHovering ? 28 : 20;

  return (
    <div
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        width: size,
        height: size,
        pointerEvents: 'none',
        zIndex: 99999,
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.15s ease, height 0.15s ease',
        mixBlendMode: 'screen',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          border: `1px solid ${isHovering ? '#FFB700' : '#00FF41'}`,
          borderRadius: '50%',
          opacity: isHovering ? 0.9 : 0.7,
          boxShadow: isHovering
            ? '0 0 8px rgba(255,183,0,0.6)'
            : '0 0 6px rgba(0,255,65,0.5)',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: isClicking ? 6 : 3,
          height: isClicking ? 6 : 3,
          background: isHovering ? '#FFB700' : '#00FF41',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: isHovering
            ? '0 0 8px #FFB700'
            : '0 0 6px #00FF41',
          transition: 'all 0.15s ease',
        }}
      />
    </div>
  );
};

export default TerminalCursor;
