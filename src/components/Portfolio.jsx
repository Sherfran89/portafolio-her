import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../data';
import GalleryModal from './GalleryModal';
import LazyImage from './LazyImage';
import styles from './Portfolio.module.css';

export default function Portfolio({ t, lang }) {
  const [filter, setFilter] = useState('all');
  const [gallery, setGallery] = useState(null);

  const categories = [
    { id: 'all', label: t.filter_all },
    { id: 'dev', label: t.filter_dev },
    { id: 'social', label: t.filter_social },
    { id: 'media', label: t.filter_media }
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
    if (proj.link === 'gallery') return lang === 'es' ? 'Ver Galería' : 'View Gallery';
    return t.port_view;
  };

  const getCategoryTag = (cat) => {
    switch (cat) {
      case 'dev': return 'Web App';
      case 'social': return 'Design & Social';
      case 'media': return 'Multimedia';
      default: return 'Project';
    }
  };

  return (
    <>
      <section id="portfolio" className="section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
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

          <div className={styles.portfolioGrid}>
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((proj, idx) => (
                <motion.div
                  key={proj.title[lang] + idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
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
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <a 
                            href={proj.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn btn-primary"
                            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                          >
                            <ExternalLink size={16} /> {t.port_view}
                          </a>
                          {proj.category === 'dev' && (
                            <a 
                              href={proj.github || '#'} 
                              target={proj.github && proj.github !== '#' ? "_blank" : "_self"}
                              rel="noopener noreferrer"
                              title="Ver código en GitHub"
                              className="btn btn-primary"
                              style={{ padding: '8px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
                              onClick={(e) => {
                                if (!proj.github || proj.github === '#') {
                                  e.preventDefault();
                                  alert(lang === 'es' ? 'Repositorio de GitHub próximamente.' : 'GitHub repository coming soon.');
                                }
                              }}
                            >
                              <Github size={18} />
                            </a>
                          )}
                        </div>
                      ) : (
                        <span className="btn btn-primary btn-disabled">
                          {lang === 'es' ? 'Próximamente' : 'Coming Soon'}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={styles.portInfo}>
                    <div>
                      <h3>{proj.title[lang]}</h3>
                      <p>{proj.desc[lang]}</p>
                    </div>
                    <div className={styles.tags}>
                      <span className={styles.tag}>{getCategoryTag(proj.category)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
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
