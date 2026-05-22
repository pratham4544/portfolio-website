import React from 'react';
import MatrixRain from './components/MatrixRain';
import TerminalCursor from './components/TerminalCursor';
import TerminalNav from './components/TerminalNav';
import TerminalHero from './components/TerminalHero';
import TerminalSkills from './components/TerminalSkills';
import TerminalProjects from './components/TerminalProjects';
import TerminalContact from './components/TerminalContact';

function App() {
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', position: 'relative' }}>
      {/* Subtle matrix rain background */}
      <MatrixRain />

      {/* Custom terminal cursor */}
      <TerminalCursor />

      {/* Sticky navigation */}
      <TerminalNav />

      {/* Page sections */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        <TerminalHero />

        {/* Section divider */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ borderTop: '1px solid rgba(0,255,65,0.08)' }} />
        </div>

        <TerminalSkills />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ borderTop: '1px solid rgba(0,255,65,0.08)' }} />
        </div>

        <TerminalProjects />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ borderTop: '1px solid rgba(0,255,65,0.08)' }} />
        </div>

        <TerminalContact />
      </main>
    </div>
  );
}

export default App;
