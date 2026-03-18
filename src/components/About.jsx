import React from 'react';
import { motion } from 'framer-motion';

export default function About({ t }) {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="about-grid">
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title">{t.about_title}</h2>
            <div className="about-text">
              <p>{t.about_p1}</p>
              <p>{t.about_p2}</p>
              <p className="highlight-text">{t.about_highlight}</p>
            </div>
            
            <div className="cv-buttons">
              <motion.a 
                href="/assets/CV_Programador.pdf" 
                download="Hernan_Francini_CV_Programador.pdf"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-download"></i> {t.about_cv_dev}
              </motion.a>
              <motion.a 
                href="/assets/CV_CommunityManager.pdf" 
                download="Hernan_Francini_CV_CommunityManager.pdf"
                className="btn btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-download"></i> {t.about_cv_cm}
              </motion.a>
            </div>
          </motion.div>

          <motion.div 
            className="about-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="experience-badge">
              <span className="years">5+</span>
              <span className="text">Años de <br/>Experiencia</span>
            </div>
            <div className="visual-elements">
              <div className="element circle-1"></div>
              <div className="element circle-2"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
