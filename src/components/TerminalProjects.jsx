import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../data/projects';

const PROMPT = 'prathamesh@dev:~$';

// Remove alchemy flavor suffixes from tech stack names
const cleanIngredient = (ing) =>
  ing
    .replace(
      / (Essence|Elixir|Crystal|Grimoire|Binding|Powder|Reagent|Catalyst|Formula|Potion|Tome|Stone|Base|Core|Spell|Dust|Proxy|Philosopher's Stone)$/i,
      ''
    )
    .trim();

const ProjectCard = ({ project, index }) => {
  const stack = project.ingredients.map(cleanIngredient);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 3) * 0.08, duration: 0.45 }}
      whileHover={{ borderColor: '#00FF41' }}
      style={{
        background: '#0D0D0D',
        border: '1px solid #1A2A1A',
        borderRadius: '4px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,65,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = '#1A2A1A';
      }}
    >
      {/* File tab */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '9px 14px',
          background: '#0A150A',
          borderBottom: '1px solid #1A2A1A',
        }}
      >
        <span style={{ color: '#4D4D4D', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}>
          project_{String(index + 1).padStart(2, '0')}.json
        </span>
        <span style={{ color: '#FFB700', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}>
          {project.year}
          {project.month !== 'Ongoing' ? '' : ' · ongoing'}
        </span>
      </div>

      {/* JSON body */}
      <div
        style={{
          padding: '16px 18px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '12px',
          lineHeight: '1.85',
          flex: 1,
        }}
      >
        <div style={{ color: '#4D4D4D' }}>{'{'}</div>

        <div style={{ paddingLeft: '14px' }}>
          {/* name */}
          <div>
            <span style={{ color: '#00CC33' }}>"name"</span>
            <span style={{ color: '#4D4D4D' }}>: </span>
            <span style={{ color: '#FFB700', fontWeight: 600 }}>"{project.title}"</span>
            <span style={{ color: '#4D4D4D' }}>,</span>
          </div>

          {/* period */}
          <div>
            <span style={{ color: '#00CC33' }}>"period"</span>
            <span style={{ color: '#4D4D4D' }}>: </span>
            <span style={{ color: '#888' }}>"{project.month} {project.year}"</span>
            <span style={{ color: '#4D4D4D' }}>,</span>
          </div>

          {/* stack */}
          <div>
            <span style={{ color: '#00CC33' }}>"stack"</span>
            <span style={{ color: '#4D4D4D' }}>: [</span>
          </div>
          <div style={{ paddingLeft: '14px', display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '2px' }}>
            {stack.map((tech, j) => (
              <span key={j}>
                <span style={{ color: '#00FFFF' }}>"{tech}"</span>
                {j < stack.length - 1 && <span style={{ color: '#4D4D4D' }}>, </span>}
              </span>
            ))}
          </div>
          <div style={{ color: '#4D4D4D' }}>],</div>

          {/* status */}
          <div>
            <span style={{ color: '#00CC33' }}>"status"</span>
            <span style={{ color: '#4D4D4D' }}>: </span>
            <span style={{ color: project.live ? '#00FF41' : '#4D4D4D' }}>
              "{project.live ? 'deployed' : project.github ? 'open-source' : 'private'}"
            </span>
          </div>
        </div>

        <div style={{ color: '#4D4D4D' }}>{'}'}</div>
      </div>

      {/* Links footer */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          padding: '11px 18px',
          borderTop: '1px solid #1A2A1A',
          flexWrap: 'wrap',
        }}
      >
        {project.github && (
          <LinkButton
            href={project.github}
            icon={<FaGithub size={11} />}
            label="github"
            color="#00CC33"
            hoverBg="rgba(0,255,65,0.1)"
          />
        )}
        {project.live && (
          <LinkButton
            href={project.live}
            icon={<FaExternalLinkAlt size={10} />}
            label="live"
            color="#FFB700"
            hoverBg="rgba(255,183,0,0.1)"
          />
        )}
        {!project.github && !project.live && (
          <span style={{ color: '#333', fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}>
            # private repo
          </span>
        )}
      </div>
    </motion.div>
  );
};

const LinkButton = ({ href, icon, label, color, hoverBg }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '5px',
      color,
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '11px',
      textDecoration: 'none',
      border: `1px solid ${color}40`,
      padding: '3px 10px',
      borderRadius: '2px',
      transition: 'all 0.2s ease',
      cursor: 'none',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = hoverBg;
      e.currentTarget.style.borderColor = color;
      e.currentTarget.style.boxShadow = `0 0 8px ${color}40`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'transparent';
      e.currentTarget.style.borderColor = `${color}40`;
      e.currentTarget.style.boxShadow = 'none';
    }}
  >
    {icon}
    {label}
  </a>
);

const TerminalProjects = () => {
  return (
    <section id="projects" style={{ padding: '80px 24px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
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
            # section: projects &amp; work
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '15px',
              marginBottom: '4px',
            }}
          >
            <span style={{ color: '#4D4D4D' }}>{PROMPT}</span>
            <span style={{ color: '#00FF41' }}> ls -la projects/</span>
          </div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              color: '#4D4D4D',
            }}
          >
            {projects.length} directories found
          </div>
        </motion.div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '20px',
          }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TerminalProjects;
