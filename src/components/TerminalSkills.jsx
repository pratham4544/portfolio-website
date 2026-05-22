import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { potions } from '../data/skills';

const PROMPT = 'prathamesh@dev:~$';

// Strip alchemy flavor suffixes from skill names
const cleanName = (name) =>
  name
    .replace(
      / (Essence|Elixir|Crystal|Grimoire|Binding|Powder|Reagent|Catalyst|Formula|Potion|Tome|Stone|Base|Core|Spell|Dust)$/i,
      ''
    )
    .trim();

// Shorten category names
const cleanCategory = (shelf) =>
  shelf
    .replace(' Transmutation Elixirs', '')
    .replace(' Reagents', '')
    .replace(" Philosopher's Stones", '')
    .trim();

const SkillBar = ({ skill, animate, delay }) => {
  return (
    <div style={{ marginBottom: '14px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '5px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: '#333333' }}>-rw-r--r--</span>
          <span style={{ color: '#00FF41' }}>
            {cleanName(skill.name).toLowerCase().replace(/\s+/g, '_')}
          </span>
        </div>
        <span style={{ color: '#4D4D4D', minWidth: '36px', textAlign: 'right' }}>
          {skill.potency}%
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: '3px',
          background: 'rgba(0,255,65,0.08)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: animate ? `${skill.potency}%` : 0 }}
          transition={{ duration: 1.3, delay, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${skill.color || '#00CC33'} 0%, #00FF41 100%)`,
            boxShadow: `0 0 6px ${skill.color || '#00FF41'}80`,
            borderRadius: '2px',
          }}
        />
      </div>
    </div>
  );
};

const TerminalSkills = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isInView) setAnimate(true);
  }, [isInView]);

  const totalPkgs = potions.reduce((acc, shelf) => acc + shelf.bottles.length, 0);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{ padding: '80px 24px', position: 'relative', zIndex: 1 }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '48px' }}
        >
          <div
            style={{
              color: '#4D4D4D',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              marginBottom: '6px',
            }}
          >
            # section: skills &amp; proficiency
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '15px',
              marginBottom: '4px',
            }}
          >
            <span style={{ color: '#4D4D4D' }}>{PROMPT}</span>
            <span style={{ color: '#00FF41' }}> ls -la skills/</span>
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              color: '#4D4D4D',
            }}
          >
            total {totalPkgs} packages — 3 categories
          </div>
        </motion.div>

        {/* Skills grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
          }}
        >
          {potions.map((shelf, si) => (
            <motion.div
              key={shelf.shelf}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: si * 0.12, duration: 0.5 }}
            >
              {/* Category label */}
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px',
                  color: '#FFB700',
                  marginBottom: '18px',
                  paddingBottom: '10px',
                  borderBottom: '1px solid rgba(0,255,65,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span style={{ color: '#333' }}>drwxr-xr-x</span>
                <span style={{ color: '#FFB700' }}>{cleanCategory(shelf.shelf)}/</span>
              </div>

              {/* Skill rows */}
              {shelf.bottles.map((skill, bi) => (
                <SkillBar
                  key={skill.name}
                  skill={skill}
                  animate={animate}
                  delay={si * 0.12 + bi * 0.08}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Bottom prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          style={{
            marginTop: '48px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '13px',
          }}
        >
          <span style={{ color: '#4D4D4D' }}>{PROMPT} </span>
          <span className="cursor-blink" />
        </motion.div>
      </div>
    </section>
  );
};

export default TerminalSkills;
