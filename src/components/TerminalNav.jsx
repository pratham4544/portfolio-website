import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: '~/about', href: '#about' },
  { label: '~/skills', href: '#skills' },
  { label: '~/projects', href: '#projects' },
  { label: '~/contact', href: '#contact' },
];

const TerminalNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = ['about', 'skills', 'projects', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActive(`#${id}`);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        fontFamily: "'JetBrains Mono', monospace",
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(0,255,65,0.15)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'inherit',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.02em',
            cursor: 'none',
          }}
        >
          <span style={{ color: '#4D4D4D' }}>[</span>
          <span style={{ color: '#00FF41' }}>prathamesh</span>
          <span style={{ color: '#4D4D4D' }}>@</span>
          <span style={{ color: '#FFB700' }}>dev</span>
          <span style={{ color: '#4D4D4D' }}>:~]$</span>
        </button>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'inherit',
                fontSize: '13px',
                color: active === link.href ? '#00FF41' : '#4D4D4D',
                cursor: 'none',
                padding: '4px 0',
                borderBottom: active === link.href ? '1px solid #00FF41' : '1px solid transparent',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#00FF41'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = active === link.href ? '#00FF41' : '#4D4D4D'; }}
              className="hidden md:block"
            >
              {link.label}
            </button>
          ))}

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: '1px solid rgba(0,255,65,0.4)',
              color: '#00FF41',
              fontFamily: 'inherit',
              fontSize: '12px',
              padding: '4px 10px',
              cursor: 'none',
              borderRadius: '2px',
              transition: 'all 0.2s',
            }}
            className="block md:hidden"
          >
            {menuOpen ? '[×]' : '[≡]'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'rgba(10,10,10,0.97)',
              borderTop: '1px solid rgba(0,255,65,0.15)',
              overflow: 'hidden',
            }}
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid rgba(0,255,65,0.05)',
                  color: active === link.href ? '#00FF41' : '#4D4D4D',
                  fontFamily: 'inherit',
                  fontSize: '14px',
                  padding: '14px 24px',
                  cursor: 'none',
                  transition: 'color 0.2s, background 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#00FF41';
                  e.currentTarget.style.background = 'rgba(0,255,65,0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = active === link.href ? '#00FF41' : '#4D4D4D';
                  e.currentTarget.style.background = 'none';
                }}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default TerminalNav;
