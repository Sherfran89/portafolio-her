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
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, pointerEvents: 'none' }}
        >
          {/* Default placeholder cinematic coding video */}
          <source src="https://cdn.pixabay.com/video/2021/08/04/83861-584758925_large.mp4" type="video/mp4" />
        </video>
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
              src="/assets/profile_photo.png" 
              alt="Hernán Francini" 
              className={styles.profileImage}
              loading="eager"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
