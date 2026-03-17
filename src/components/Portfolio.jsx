import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data';
import GalleryModal from './GalleryModal';

export default function Portfolio({ t, lang }) {
  const [filter, setFilter] = useState('all');
  const [gallery, setGallery] = useState(null); // { images, title }

  const filteredProjects = projects.filter(p => filter === 'all' || p.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: 'spring', damping: 20 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  const handleCardAction = (proj) => {
    if (proj.link === 'gallery') {
      setGallery({ 
        images: proj.galleryImages || [], 
        videos: proj.youtubeIds || [],
        title: proj.title[lang] 
      });
    }
  };

  const getButtonLabel = (proj) => {
    if (proj.link === 'gallery') return lang === 'es' ? 'Ver Trabajos' : 'View Work';
    return t.port_view;
  };

  return (
    <>
      <section id="portfolio" className="portfolio section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>{t.port_title}</h2>
            <p>{t.port_subtitle}</p>
          </motion.div>

          <motion.div 
            className="portfolio-filters"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {['all', 'dev', 'social', 'extra'].map((cat) => (
              <motion.button 
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`filter-btn ${filter === cat ? 'active' : ''}`} 
                onClick={() => setFilter(cat)}
              >
                {t[`filter_${cat}`]}
              </motion.button>
            ))}
          </motion.div>

          <motion.div 
            className="portfolio-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((proj, idx) => (
                <motion.div 
                  key={proj.title[lang] + idx} 
                  className="port-card" 
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                >
                  <div className="port-img" style={{ backgroundImage: `url('${proj.image}')` }}>
                    <div className="port-overlay">
                      {proj.link === 'gallery' ? (
                        <motion.button
                          className="btn btn-primary"
                          whileHover={{ scale: 1.1 }}
                          onClick={() => handleCardAction(proj)}
                        >
                          {getButtonLabel(proj)}
                        </motion.button>
                      ) : proj.link && proj.link !== '#' ? (
                        <motion.a 
                          href={proj.link} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="btn btn-primary"
                          whileHover={{ scale: 1.1 }}
                        >
                          {t.port_view}
                        </motion.a>
                      ) : (
                        <motion.span className="btn btn-primary btn-disabled" whileHover={{ scale: 1.05 }}>
                          {lang === 'es' ? 'Próximamente' : 'Coming Soon'}
                        </motion.span>
                      )}
                    </div>
                  </div>
                  <div className="port-info">
                    <h3>{proj.title[lang]}</h3>
                    <p>{proj.desc[lang]}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Gallery Modal */}
      {gallery && (
        <GalleryModal
          images={gallery.images}
          videos={gallery.videos}
          title={gallery.title}
          onClose={() => setGallery(null)}
        />
      )}
    </>
  );
}
