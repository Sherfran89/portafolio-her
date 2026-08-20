import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import CVModal from './CVModal';
import styles from './About.module.css';

export default function About({ t, lang }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState({ url: '', title: '' });

  const openCv = (url, title) => {
    setSelectedPdf({ url, title });
    setModalOpen(true);
  };

  // Parsing bold text if needed
  const renderHTML = (htmlString) => {
    return { __html: htmlString };
  };

  return (
    <section id="sobre-mi" className={`section ${styles.about}`}>
      <div className={`container ${styles.aboutGrid}`}>
        
        <motion.div 
          className={styles.aboutText}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-header" style={{ textAlign: 'left', marginBottom: '32px' }}>
            <p className="subtitle">{t.about_subtitle}</p>
            <h2>{t.about_title}</h2>
          </div>
          
          <p dangerouslySetInnerHTML={renderHTML(t.about_p1)}></p>
          <p dangerouslySetInnerHTML={renderHTML(t.about_p2)}></p>
          <p dangerouslySetInnerHTML={renderHTML(t.about_p3)}></p>
          
          <div className={styles.highlightText}>
            "{lang === 'es' ? 'La tecnología es la herramienta, pero la estrategia es lo que genera resultados.' : 'Technology is the tool, but strategy is what drives results.'}"
          </div>

          <div className={styles.cvButtons}>
            <motion.button 
              onClick={() => openCv("/assets/CV_Programador.pdf", t.about_cv_dev)}
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye size={18} />
              {t.about_cv_dev}
            </motion.button>
            <motion.button 
              onClick={() => openCv("/assets/CV_CommunityManager.pdf", t.about_cv_cm)}
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye size={18} />
              {t.about_cv_cm}
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          className={styles.timelineWrapper}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className={styles.timelineHeader}>
            {lang === 'es' ? 'Trayectoria Profesional' : 'Career Timeline'}
          </h3>

          <div className={styles.timelineList}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineLine} />
              <div className={styles.timelineBody}>
                <span className={styles.timelineDate}>Nov 2024 — {lang === 'es' ? 'Abr' : 'Apr'} 2025</span>
                <h4>{lang === 'es' ? 'Desarrollador Web & Community Manager' : 'Web Developer & Community Manager'}</h4>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', display: 'block', marginBottom: '6px' }}>Estudio Jurídico & La Bitácora Viajera</span>
                <p>{lang === 'es' ? 'Desarrollo integral de plataforma web responsiva, optimización UX e implementación de herramientas IA para gestión de contenidos.' : 'Full web platform development, UX optimization, and implementation of AI tools for content management.'}</p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineLine} />
              <div className={styles.timelineBody}>
                <span className={styles.timelineDate}>{lang === 'es' ? 'Ene' : 'Jan'} 2024 — {lang === 'es' ? 'Abr' : 'Apr'} 2024</span>
                <h4>Community Manager</h4>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', display: 'block', marginBottom: '6px' }}>Femmina Lab</span>
                <p>{lang === 'es' ? 'Estrategia de contenidos en redes sociales, consistencia estética y análisis de métricas clave para campañas.' : 'Social media content strategy, visual consistency, and key metrics analysis for campaigns.'}</p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineLine} />
              <div className={styles.timelineBody}>
                <span className={styles.timelineDate}>Feb 2023 — Jun 2023</span>
                <h4>{lang === 'es' ? 'Desarrollador Web' : 'Web Developer'} (WordPress)</h4>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', display: 'block', marginBottom: '6px' }}>Centro de Yoga</span>
                <p>{lang === 'es' ? 'Reestructuración completa de plataforma web, corrección de errores de código (bug fixing) y optimización de rendimiento.' : 'Complete web platform restructure, bug fixing, and performance optimization.'}</p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              <div className={styles.timelineBody}>
                <span className={styles.timelineDate}>Jun 2022 — Dic 2022</span>
                <h4>Community Manager</h4>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', display: 'block', marginBottom: '6px' }}>AEIT-TECH & Forrajería</span>
                <p>{lang === 'es' ? 'Estrategia digital en entornos de alta exigencia, desarrollo de calendarios editoriales y optimización de tácticas.' : 'Digital strategy in high-demand environments, editorial calendar development, and tactics optimization.'}</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      <div className={`container ${styles.valuePropContainer}`}>
        <motion.div 
          className={styles.valueText}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.valueTitle} dangerouslySetInnerHTML={renderHTML(t.value_title)}></h2>
          <p>{t.value_desc1}</p>
          <p>{t.value_desc2}</p>
        </motion.div>
        
        <div className={styles.valueStats}>
          <motion.div 
            className={styles.statBox}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className={styles.statNum}>100%</span>
            <span className={styles.statLabel}>{t.stat1}</span>
          </motion.div>
          <motion.div 
            className={styles.statBox}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <span className={styles.statNum}>3x</span>
            <span className={styles.statLabel}>{t.stat2}</span>
          </motion.div>
        </div>
      </div>

      <CVModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        pdfUrl={selectedPdf.url} 
        title={selectedPdf.title} 
        lang={lang} 
      />
    </section>
  );
}
