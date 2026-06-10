import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import styles from './Navbar.module.css';

export default function Navbar({ t, lang, toggleLang }) {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  // Scroll Progress logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll Spy logic
  useEffect(() => {
    const sections = ['inicio', 'servicios', 'portfolio', 'sobre-mi', 'contacto'];
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // detects viewport center
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);

    const observeSections = () => {
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) intersectionObserver.observe(el);
      });
    };

    observeSections();

    // Observe body for dynamically added lazy-loaded components
    const mutationObserver = new MutationObserver(() => {
      observeSections();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const navLinks = [
    { href: '#inicio', label: t.nav_home },
    { href: '#servicios', label: t.nav_services },
    { href: '#portfolio', label: t.nav_portfolio },
    { href: '#sobre-mi', label: t.nav_about },
    { href: '#contacto', label: t.nav_contact },
  ];

  return (
    <>
      {/* Top scroll progress indicator */}
      <motion.div className={styles.progressBar} style={{ scaleX }} />

      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.navContainer}`}>
          <a href="#inicio" className={styles.logo} onClick={closeMenu}>
            H.FRANCINI<span className={styles.dot}>.</span>
          </a>

          <div className={`${styles.navLinks} ${menuOpen ? styles.menuOpen : ''}`}>
            {navLinks.map((link, idx) => (
              <motion.a 
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${activeSection === link.href.slice(1) ? styles.active : ''}`}
                onClick={closeMenu}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {link.label}
              </motion.a>
            ))}
            
          </div>

          <div className={styles.navActions}>
            <button className={styles.themeSwitch} onClick={toggleTheme} aria-label="Toggle theme" style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className={styles.langSwitch} onClick={toggleLang}>
              {lang === 'es' ? 'EN' : 'ES'}
            </button>
            <button 
              className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`} 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

