import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const PROMPT = 'prathamesh@dev:~$';

const LINES = [
  { text: `${PROMPT} whoami`, type: 'command', charDelay: 42 },
  { text: 'prathamesh_shete', type: 'name', pause: 350 },
  { text: '', type: 'blank', pause: 80 },
  { text: `${PROMPT} cat bio.txt`, type: 'command', charDelay: 42 },
  { text: '> AI/ML Engineer & Full-Stack Developer', type: 'output', pause: 70 },
  { text: '> Building intelligent systems that solve real problems.', type: 'output', pause: 70 },
  { text: '> Specialized in LLMs · RAG Pipelines · Production AI.', type: 'output', pause: 70 },
  { text: '', type: 'blank', pause: 120 },
  { text: `${PROMPT} ls expertise/`, type: 'command', charDelay: 42 },
  { text: 'llm/  rag_systems/  langchain/  fastapi/  react/  docker/  aws/  python/', type: 'tags', pause: 80 },
  { text: '', type: 'blank', pause: 120 },
  { text: `${PROMPT} cat status.txt`, type: 'command', charDelay: 42 },
  { text: '[ OPEN TO OPPORTUNITIES ] — Full-time AI/ML Engineering roles', type: 'status', pause: 80 },
];

const TerminalHero = () => {
  const [revealed, setRevealed] = useState([]);
  const [typing, setTyping] = useState('');
  const [done, setDone] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    const cancelledRef = { current: false };
    const tids = [];
    let delay = 500;

    LINES.forEach((line) => {
      if (line.type === 'command') {
        const chars = line.text;
        for (let j = 0; j <= chars.length; j++) {
          const snapshot = j;
          const t = setTimeout(() => {
            if (!cancelledRef.current) setTyping(chars.slice(0, snapshot));
          }, delay + snapshot * line.charDelay);
          tids.push(t);
        }
        delay += chars.length * line.charDelay + 180;

        const t = setTimeout(() => {
          if (!cancelledRef.current) {
            setRevealed((prev) => [...prev, line]);
            setTyping('');
          }
        }, delay);
        tids.push(t);
        delay += 160;
      } else {
        const t = setTimeout(() => {
          if (!cancelledRef.current) setRevealed((prev) => [...prev, line]);
        }, delay);
        tids.push(t);
        delay += line.pause || 80;
      }
    });

    const t = setTimeout(() => {
      if (!cancelledRef.current) setDone(true);
    }, delay + 200);
    tids.push(t);

    return () => {
      cancelledRef.current = true;
      tids.forEach(clearTimeout);
    };
  }, []);

  // Auto-scroll terminal body
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [revealed, typing]);

  const renderLine = (line, i) => {
    if (line.type === 'blank') return <div key={i} style={{ height: '6px' }} />;

    if (line.type === 'command') {
      const promptEnd = line.text.indexOf('$') + 1;
      return (
        <div key={i} style={{ marginBottom: '2px' }}>
          <span style={{ color: '#4D4D4D' }}>{line.text.slice(0, promptEnd)}</span>
          <span style={{ color: '#00FF41' }}>{line.text.slice(promptEnd)}</span>
        </div>
      );
    }

    if (line.type === 'name') {
      return (
        <div
          key={i}
          className="glitch-hover"
          style={{
            fontSize: '1.6rem',
            fontWeight: 700,
            color: '#FFB700',
            letterSpacing: '0.04em',
            textShadow: '0 0 12px rgba(255,183,0,0.5)',
            marginBottom: '2px',
          }}
        >
          {line.text}
        </div>
      );
    }

    if (line.type === 'status') {
      return (
        <div
          key={i}
          style={{
            color: '#00FFFF',
            fontWeight: 600,
            marginBottom: '2px',
            letterSpacing: '0.02em',
          }}
        >
          {line.text}
        </div>
      );
    }

    if (line.type === 'tags') {
      const tags = line.text.split('  ').filter(Boolean);
      return (
        <div key={i} style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '2px' }}>
          {tags.map((tag, j) => (
            <span
              key={j}
              style={{
                color: '#00CC33',
                background: 'rgba(0,255,65,0.07)',
                border: '1px solid rgba(0,255,65,0.2)',
                padding: '1px 8px',
                borderRadius: '2px',
                fontSize: '12px',
              }}
            >
              {tag.trim()}
            </span>
          ))}
        </div>
      );
    }

    return (
      <div key={i} style={{ color: '#888888', marginBottom: '2px' }}>
        {line.text}
      </div>
    );
  };

  // Render the currently-typing command line
  const renderTyping = () => {
    if (!typing) return null;
    const promptEnd = typing.indexOf('$') + 1;
    return (
      <div>
        <span style={{ color: '#4D4D4D' }}>
          {typing.slice(0, promptEnd)}
        </span>
        <span style={{ color: '#00FF41' }}>
          {typing.slice(promptEnd)}
        </span>
        <span className="cursor-blink" />
      </div>
    );
  };

  return (
    <section
      id="about"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '90px 24px 60px',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ width: '100%', maxWidth: '780px' }}
      >
        {/* Terminal Window */}
        <div
          style={{
            background: '#0D0D0D',
            border: '1px solid #1A2A1A',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow:
              '0 0 40px rgba(0,255,65,0.08), 0 0 80px rgba(0,255,65,0.04), 0 20px 60px rgba(0,0,0,0.6)',
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 16px',
              background: '#111111',
              borderBottom: '1px solid #1A2A1A',
            }}
          >
            <div style={{ display: 'flex', gap: '7px', marginRight: '14px' }}>
              {['#FF5F57', '#FFBD2E', '#28C840'].map((c) => (
                <div
                  key={c}
                  style={{ width: '12px', height: '12px', borderRadius: '50%', background: c, opacity: 0.85 }}
                />
              ))}
            </div>
            <span
              style={{
                flex: 1,
                textAlign: 'center',
                color: '#4D4D4D',
                fontSize: '12px',
                letterSpacing: '0.03em',
              }}
            >
              bash — prathamesh@dev:~
            </span>
          </div>

          {/* Body */}
          <div
            ref={bodyRef}
            style={{
              padding: '24px 28px',
              minHeight: '380px',
              maxHeight: '65vh',
              overflowY: 'auto',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '14px',
              lineHeight: '1.85',
              scrollbarWidth: 'thin',
            }}
          >
            {revealed.map((line, i) => renderLine(line, i))}
            {renderTyping()}
            {done && !typing && (
              <div style={{ marginTop: '4px' }}>
                <span style={{ color: '#4D4D4D' }}>{PROMPT}</span>
                <span className="cursor-blink" />
              </div>
            )}
          </div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: done ? 1 : 0, y: done ? 0 : 10 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: 'flex', gap: '14px', marginTop: '28px', flexWrap: 'wrap' }}
        >
          {[
            {
              label: '$ ls projects/',
              href: '#projects',
              color: '#00FF41',
              onClick: (e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              },
            },
            {
              label: '$ resume --download',
              href: '/resume.pdf',
              download: true,
              color: '#FFB700',
            },
          ].map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              download={btn.download || undefined}
              onClick={btn.onClick}
              style={{
                padding: '11px 22px',
                background: 'transparent',
                border: `1px solid ${btn.color}`,
                color: btn.color,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '13px',
                textDecoration: 'none',
                borderRadius: '2px',
                transition: 'all 0.25s ease',
                cursor: 'none',
                letterSpacing: '0.02em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = btn.color;
                e.currentTarget.style.color = '#000';
                e.currentTarget.style.boxShadow = `0 0 16px ${btn.color}50`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = btn.color;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {btn.label}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TerminalHero;
