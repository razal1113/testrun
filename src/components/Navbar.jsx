import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-content">
        <div className="logo-container">
          <img src={logo} alt="Alkolukko-palvelu" className="nav-logo" />
        </div>
        <div className="nav-links">
          <a href="#etusivu" className="nav-item active">Etusivu</a>
          <a href="#ohjattu-prosessi" className="nav-item">Ohjattu prosessi</a>
          <a href="#mika-on-alkolukko" className="nav-item">Mikä on alkolukko</a>
          <a href="#tarkeaa-tietaa" className="nav-item">Tärkeää tietää</a>
          <a href="#ota-yhteytta" className="nav-item contact-btn">Ota yhteyttä</a>
        </div>
      </div>
      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--nav-height);
          background: rgba(20, 20, 20, 0.7);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--color-glass-border);
          z-index: 1000;
          transition: all 0.4s ease-out;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .navbar.scrolled {
          top: 20px;
          width: 90%;
          left: 5%;
          border-radius: 50px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(26, 26, 26, 0.85);
        }

        .navbar-content {
          width: 100%;
          max-width: 1200px;
          padding: 0 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo {
          height: 32px; /* Adjustable based on logo aspect ratio */
          width: auto;
          display: block;
        }
        
        .logo-container {
           display: flex;
           align-items: center;
        }

        .nav-links {
          display: flex;
          gap: 32px;
          align-items: center;
        }

        .nav-item {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.8);
          transition: all 0.3s ease;
          font-weight: 400;
          position: relative;
        }

        .nav-item:hover {
          color: var(--color-text-white);
          transform: translateY(-1px);
        }
        
        .nav-item.active {
          color: var(--color-text-white);
        }
        
        /* Active indicator dot for non-buttons */
        .nav-item.active::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          background-color: var(--color-accent-orange);
          border-radius: 50%;
        }

        .nav-item.contact-btn {
          background-color: var(--color-accent-orange);
          color: white;
          padding: 10px 24px;
          border-radius: 16px; /* Match Hero CTA radius */
          font-weight: 500;
          border: none;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          transition: transform 0.25s ease-out, filter 0.25s ease-out;
        }
        
        .nav-item.contact-btn:hover {
          background: var(--color-accent-orange-hover);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 0, 0.4);
        }

        .nav-item.contact-btn.active::after {
          display: none;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none; /* Mobile menu would go here */
          }
           /* Temp mobile fix */
          .navbar-content::after {
            content: 'Menu';
            display: block;
            margin-left: auto;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
