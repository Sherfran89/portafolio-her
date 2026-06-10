import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { projects } from '../data';
import GalleryModal from './GalleryModal';
import LazyImage from './LazyImage';
import styles from './Portfolio.module.css';

export default function Portfolio({ t, lang }) {
  const [filter, setFilter] = useState('all');
  const [gallery, setGallery] = useState(null); // { images, videos, title }

  const categories = [
    { id: 'all', label: t.filter_all },
    { id: 'dev', label: t.filter_dev },
    { id: 'social', label: t.filter_social },
    { id: 'media', label: t.filter_media },
    { id: 'utilities', label: t.filter_utilities }
  ];

  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  const handleCardClick = (proj) => {
    if (proj.link === 'gallery') {
      setGallery({ 
        images: proj.galleryImages || [], 
        videos: proj.youtubeIds || [],
        title: proj.title[lang] 
      });
    } else if (proj.link && proj.link !== '#') {
      window.open(proj.link, '_blank', 'noopener,noreferrer');
    }
  };

  const getButtonLabel = (proj) => {
    if (proj.link === 'gallery') return lang === 'es' ? 'Ver Trabajos' : 'View Work';
    return t.port_view;
  };

  return (
    <>
      <section id="portfolio" className="section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="subtitle">{t.port_subtitle}</p>
            <h2>{t.port_title}</h2>
          </motion.div>

          <div className={styles.portfolioFilters}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`${styles.filterBtn} ${filter === cat.id ? styles.active : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <motion.div layout className={styles.portfolioGrid}>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((proj, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={proj.title[lang] + idx}
                  className={styles.portCard}
                  onClick={() => handleCardClick(proj)}
                >
                  <div className={styles.portImg}>
                    <LazyImage 
                      src={proj.image} 
                      alt={proj.title[lang]} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div className={styles.portOverlay} onClick={(e) => e.stopPropagation()}>
                      {proj.link === 'gallery' ? (
                        <div className={styles.overlayInner}>
                          <span className={styles.mediaCount}>
                            {proj.galleryImages ? `${proj.galleryImages.length} ${lang === 'es' ? 'Fotos' : 'Photos'}` : ''}
                            {proj.youtubeIds ? `${proj.youtubeIds.length} ${lang === 'es' ? 'Videos' : 'Videos'}` : ''}
                          </span>
                          <button 
                            className="btn btn-primary"
                            onClick={() => handleCardClick(proj)}
                          >
                            {getButtonLabel(proj)}
                          </button>
                        </div>
                      ) : proj.link && proj.link !== '#' ? (
                        <a 
                          href={proj.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-primary"
                        >
                          {t.port_view} <ExternalLink size={16} />
                        </a>
                      ) : (
                        <span className="btn btn-primary btn-disabled">
                          {lang === 'es' ? 'Próximamente' : 'Coming Soon'}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={styles.portInfo}>
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
