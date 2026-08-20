import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import styles from './Hero.module.css';
import MagneticButton from './MagneticButton';

export default function Hero({ t }) {
  // Parsing bold text if needed (the original code had <span> for bold)
  const renderTitle = () => {
    return { __html: t.hero_title.replace('Hernán', '<span class="gradient-text">Hernán</span>') };
  };

  return (
    <section id="inicio" className={styles.hero}>
      <div className={styles.heroBg}>
        <div className={styles.blob1}></div>
        <div className={styles.blob2}></div>
        <div className={styles.blob3}></div>
        <div className={styles.glassOverlay}></div>
      </div>
      <div className={`container ${styles.heroContainer}`}>
        
        <motion.div 
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t.hero_subtitle}
          </motion.div>
          
          <h1 className={styles.title} dangerouslySetInnerHTML={renderTitle()} />
          
          <p className={styles.description}>
            {t.hero_desc}
          </p>
          
          <div className={styles.heroButtons}>
            <MagneticButton 
              href="#contacto" 
              className="btn btn-primary"
            >
              {t.hero_cta}
              <ArrowRight size={18} />
            </MagneticButton>
            <MagneticButton 
              href="#servicios" 
              className="btn btn-secondary"
            >
              {t.hero_sec_cta}
            </MagneticButton>
          </div>
        </motion.div>

        <motion.div 
          className={styles.heroVisual}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.imageWrapper}>
            <div className={styles.glowRing}></div>
            <img 
              src="/assets/profile_photo.webp" 
              alt="Hernán Francini" 
              className={styles.profileImage}
              width="450"
              height="562"
              loading="eager"
              fetchpriority="high"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
