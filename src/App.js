import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import MysticalTree from './components/MysticalTree';
import PotionSkills from './components/PotionSkills';
import LiveLabDemos from './components/LiveLabDemos';
import ContactCards from './components/ContactCards';
import SmokeTransition from './components/SmokeTransition';

function App() {
  const [showContent, setShowContent] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);

  const handleChestOpen = () => {
    setShowSmoke(true);
  };

  const handleSmokeComplete = () => {
    setShowSmoke(false);
    setShowContent(true);
  };

  return (
    <div className="App">
      {/* Landing Page */}
      <LandingPage onChestOpen={handleChestOpen} />
      
      {/* Smoke Transition */}
      <SmokeTransition show={showSmoke} onComplete={handleSmokeComplete} />
      
      {/* All Content Sections (shown after smoke clears) */}
      {showContent && (
        <>
          <MysticalTree />
          <PotionSkills />
          <LiveLabDemos />
          <ContactCards />
        </>
      )}
    </div>
  );
}

export default App;