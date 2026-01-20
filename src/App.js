import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import MysticalTree from './components/MysticalTree';
import PotionSkills from './components/PotionSkills';
// import SummoningCircle from './components/SummoningCircle';
import ContactCards from './components/ContactCards';    
function App() {
  const [showContent, setShowContent] = useState(false);

  return (
    <div className="App">
      {/* Landing Page */}
      <LandingPage onChestOpen={() => setShowContent(true)} />
      
      {/* All Content Sections (shown after chest opens) */}
      {showContent && (
        <>
          <MysticalTree />
          <PotionSkills />
          {/* <SummoningCircle /> */}
          <ContactCards /> 
        </>
      )}
    </div>
  );
}

export default App;