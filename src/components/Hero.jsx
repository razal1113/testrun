import React, { useEffect, useState } from 'react';
import heroBg from '../assets/hero-bg.jpg';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="hero-section" id="etusivu">
      <div className={`hero-background ${loaded ? 'animate' : ''}`} style={{ backgroundImage: `url(${heroBg})` }}></div>
      <div className="hero-overlay"></div>

      <div className={`hero-content ${loaded ? 'animate' : ''}`}>
        <h1>Alkolukko – rauhallisesti ja selkeästi, askel kerrallaan</h1>
        <p>Tämä sivu auttaa sinua ymmärtämään alkolukkoon liittyvän prosessin Suomessa.<br />
          Käymme asiat läpi selkeästi ja ilman kiirettä.</p>

        <a href="#ota-yhteytta" className="cta-button">Ota yhteyttä</a>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transform: scale(0.98);
          opacity: 0;
          transition: transform 1.5s ease-out, opacity 1.2s ease-out; /* Slower, calmer */
          will-change: transform, opacity;
          z-index: 0;
        }

        .hero-background.animate {
          transform: scale(1);
          opacity: 1;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(20, 20, 20, 0.65); /* Slightly darker for better contrast */
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 800px;
          padding: 0 20px;
          opacity: 0;
          transform: translateY(12px); /* Subtle slide up */
          transition: opacity 1.2s ease-out 0.5s, transform 1.2s ease-out 0.5s;
        }

        .hero-content.animate {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-content h1 {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }

        .hero-content p {
          font-size: 1.25rem;
          font-weight: 300;
          margin-bottom: 40px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
        }

        .cta-button {
          display: inline-block;
          background-color: var(--color-accent-orange);
          color: white;
          padding: 16px 40px;
          border-radius: 16px; /* Increased radius */
          font-weight: 500;
          font-size: 1.1rem;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1); /* Subtle depth */
          transition: transform 0.25s ease-out, filter 0.25s ease-out;
        }

        .cta-button:hover {
          filter: brightness(1.08); /* Slight brightness increase */
          transform: translateY(-1px); /* Micro lift */
          /* No pulsing or glowing */
        }
        
        @media (max-width: 768px) {
           .hero-content h1 {
             font-size: 2.2rem;
           }
           .hero-content p {
             font-size: 1.1rem;
           }
        }
      `}</style>
    </div>
  );
};

export default Hero;
