import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaDownload } from 'react-icons/fa';

const PROMPT = 'prathamesh@dev:~$';

const CONTACTS = [
  {
    flag: '--github',
    value: 'github.com/pratham4544',
    display: 'https://github.com/pratham4544',
    link: 'https://github.com/pratham4544',
    icon: FaGithub,
    copyText: 'https://github.com/pratham4544',
  },
  {
    flag: '--linkedin',
    value: 'linkedin.com/in/prathameshshete',
    display: 'https://linkedin.com/in/prathameshshete',
    link: 'https://www.linkedin.com/in/prathameshshete',
    icon: FaLinkedin,
    copyText: 'https://www.linkedin.com/in/prathameshshete',
  },
  {
    flag: '--email',
    value: 'prathameshshete609@gmail.com',
    display: 'prathameshshete609@gmail.com',
    link: 'mailto:prathameshshete609@gmail.com',
    icon: FaEnvelope,
    copyText: 'prathameshshete609@gmail.com',
  },
  {
    flag: '--whatsapp',
    value: '+91 9970939341',
    display: '+91 9970939341',
    link: 'https://wa.me/919970939341',
    icon: FaWhatsapp,
    copyText: '+91 9970939341',
  },
  {
    flag: '--location',
    value: 'Pune, Maharashtra, India',
    display: 'Pune, Maharashtra, India',
    link: null,
    icon: FaMapMarkerAlt,
    copyText: null,
  },
];

const TerminalContact = () => {
  const [copied, setCopied] = useState('');

  const copy = (text, key) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <section id="contact" style={{ padding: '80px 24px 60px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '48px' }}
        >
          <div style={{ color: '#4D4D4D', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', marginBottom: '6px' }}>
            # section: get in touch
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '15px', marginBottom: '4px' }}>
            <span style={{ color: '#4D4D4D' }}>{PROMPT}</span>
            <span style={{ color: '#00FF41' }}> contact --help</span>
          </div>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{
            background: '#0D0D0D',
            border: '1px solid #1A2A1A',
            borderRadius: '6px',
            overflow: 'hidden',
            boxShadow: '0 0 40px rgba(0,255,65,0.07)',
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
                <div key={c} style={{ width: '12px', height: '12px', borderRadius: '50%', background: c, opacity: 0.85 }} />
              ))}
            </div>
            <span style={{ flex: 1, textAlign: 'center', color: '#4D4D4D', fontSize: '12px', fontFamily: "'JetBrains Mono', monospace" }}>
              bash — contact --help
            </span>
          </div>

          {/* Body */}
          <div style={{ padding: '24px 28px', fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', lineHeight: '2' }}>
            <div style={{ color: '#4D4D4D', marginBottom: '18px' }}>
              Available channels:
            </div>

            {CONTACTS.map((c, i) => (
              <motion.div
                key={c.flag}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '7px 0',
                  borderBottom: '1px solid rgba(0,255,65,0.05)',
                  flexWrap: 'wrap',
                }}
              >
                {/* Flag */}
                <span style={{ color: '#00CC33', minWidth: '120px', flexShrink: 0 }}>
                  {c.flag}
                </span>

                {/* Icon */}
                <c.icon size={13} style={{ color: '#4D4D4D', flexShrink: 0 }} />

                {/* Value */}
                {c.link ? (
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#888',
                      textDecoration: 'none',
                      cursor: 'none',
                      flex: 1,
                      transition: 'color 0.2s',
                      wordBreak: 'break-all',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#00FF41'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#888'; }}
                  >
                    {c.display}
                  </a>
                ) : (
                  <span style={{ color: '#888', flex: 1 }}>{c.display}</span>
                )}

                {/* Copy button */}
                {c.copyText && (
                  <button
                    onClick={() => copy(c.copyText, c.flag)}
                    style={{
                      background: 'none',
                      border: `1px solid ${copied === c.flag ? '#00FF41' : 'rgba(0,255,65,0.2)'}`,
                      color: copied === c.flag ? '#00FF41' : '#4D4D4D',
                      fontFamily: 'inherit',
                      fontSize: '10px',
                      padding: '2px 8px',
                      cursor: 'none',
                      borderRadius: '2px',
                      transition: 'all 0.2s',
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#00FF41';
                      e.currentTarget.style.color = '#00FF41';
                    }}
                    onMouseLeave={(e) => {
                      if (copied !== c.flag) {
                        e.currentTarget.style.borderColor = 'rgba(0,255,65,0.2)';
                        e.currentTarget.style.color = '#4D4D4D';
                      }
                    }}
                  >
                    {copied === c.flag ? '✓ copied' : 'copy'}
                  </button>
                )}
              </motion.div>
            ))}

            {/* Resume download */}
            <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(0,255,65,0.1)' }}>
              <div style={{ color: '#4D4D4D', marginBottom: '12px', fontSize: '12px' }}>
                {PROMPT} resume --download
              </div>
              <a
                href="/resume.pdf"
                download="Prathamesh_Shete_Resume.pdf"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'transparent',
                  border: '1px solid #FFB700',
                  color: '#FFB700',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '13px',
                  textDecoration: 'none',
                  borderRadius: '2px',
                  transition: 'all 0.25s ease',
                  cursor: 'none',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FFB700';
                  e.currentTarget.style.color = '#000';
                  e.currentTarget.style.boxShadow = '0 0 16px rgba(255,183,0,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#FFB700';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <FaDownload size={12} />
                Prathamesh_Shete_Resume.pdf
              </a>
            </div>

            {/* Idle prompt */}
            <div style={{ marginTop: '20px' }}>
              <span style={{ color: '#4D4D4D' }}>{PROMPT} </span>
              <span className="cursor-blink" />
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{
            textAlign: 'center',
            marginTop: '52px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: '#333',
            letterSpacing: '0.04em',
          }}
        >
          © 2025 Prathamesh Shete — Built with React + Framer Motion
        </motion.div>
      </div>
    </section>
  );
};

export default TerminalContact;
