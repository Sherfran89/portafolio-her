import React from 'react';
import { motion } from 'framer-motion';

export default function Hero({ t }) {
  const renderHTML = (htmlString) => ({ __html: htmlString });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 100 } }
  };

  return (
    <header className="hero">
      <div className="hero-bg">
        <img src="/assets/hero_bg.png" alt="" role="presentation" fetchpriority="high" />
        <div className="overlay"></div>
      </div>

      <div className="hero-container">
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="subtitle" variants={itemVariants}>{t.hero_subtitle}</motion.p>
          <motion.h1 
            variants={itemVariants} 
            dangerouslySetInnerHTML={renderHTML(t.hero_title)}
          ></motion.h1>
          <motion.p className="description" variants={itemVariants}>{t.hero_desc}</motion.p>
          
          <motion.div className="hero-buttons" variants={itemVariants}>
            <motion.a 
              href="#contact" 
              className="btn btn-primary btn-large"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >{t.hero_cta}
            </motion.a>
            <motion.a 
              href="#services" 
              className="btn btn-secondary btn-large"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >{t.hero_sec_cta}
            </motion.a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="hero-image-wrapper"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <div className="glow-ring"></div>
          <img src="/assets/profile_photo.png" alt="Hernán Francini" className="profile-photo" loading="eager" fetchpriority="high" />
        </motion.div>
      </div>
    </header>
  );
}
