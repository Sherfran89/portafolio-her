import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ t, lang, toggleLang }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#" className="logo">H.FRANCINI<span className="dot">.</span></a>
        
        <AnimatePresence>
          {/* Desktop Links (always in DOM theoretically, controlled by CSS, but to animate mobile we rely on CSS mostly for now to keep refactor simple, or we enhance it) */}
          <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <a href="#services" onClick={closeMobileMenu}>{t.nav_services}</a>
            <a href="#portfolio" onClick={closeMobileMenu}>{t.nav_portfolio}</a>
            <a href="#testimonials" onClick={closeMobileMenu}>{t.nav_testimonials}</a>
            <a href="#about" onClick={closeMobileMenu}>{t.nav_about}</a>
          </div>
        </AnimatePresence>

        <div className="nav-actions">
          {/* Theme Toggle Button */}
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme} 
            className="theme-switch"
            aria-label="Toggle Theme"
            style={{ background: 'transparent', border: 'none', color: 'var(--text-light)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>

          <button className="lang-switch" onClick={toggleLang}>
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <a href="#contact" className="btn btn-primary">{t.nav_contact}</a>
          <button className="hamburger" onClick={toggleMobileMenu}>
            <span style={{ transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
            <span style={{ opacity: isMobileMenuOpen ? '0' : '1' }}></span>
            <span style={{ transform: isMobileMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }}></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
