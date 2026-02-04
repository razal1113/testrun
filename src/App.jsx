import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GuidedProcess from './components/GuidedProcess';
import WhatIsInterlock from './components/WhatIsInterlock';
import ImportantInfo from './components/ImportantInfo';
import ContactSection from './components/ContactSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Add native smooth scroll
    document.documentElement.style.scrollBehavior = 'smooth';

    // Smooth scroll to anchor links
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      e.preventDefault();
      const targetId = target.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      document.documentElement.style.scrollBehavior = 'auto';
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <GuidedProcess />
      <WhatIsInterlock />
      <ImportantInfo />
      <ContactSection />

      {/* Footer */}
      <footer style={{ padding: '40px', textAlign: 'center', opacity: 0.6, fontSize: '0.9rem', backgroundColor: '#0a0a0a' }}>
        <p>&copy; 2026 Breatech Finland Oy. Kaikki oikeudet pidätetään.</p>
      </footer>
    </div>
  );
}

export default App;
