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
          className={styles.aboutVisual}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.visualElements}>
            <div className={styles.circle1}></div>
            <div className={styles.circle2}></div>
          </div>
          <div className={styles.experienceBadge}>
            <span className={styles.years}>+5</span>
            <span className={styles.text}>{lang === 'es' ? 'Años de Experiencia' : 'Years of Experience'}</span>
          </div>
        </motion.div>

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
