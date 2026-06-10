import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink } from 'lucide-react';
import styles from './CVModal.module.css';

export default function CVModal({ isOpen, onClose, pdfUrl, title, lang }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className={styles.overlay} onClick={onClose}>
        <motion.div 
          className={styles.modal} 
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className={styles.header}>
            <h3>{title}</h3>
            <div className={styles.actions}>
              <a href={pdfUrl} download className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
                <Download size={16} />
                {lang === 'es' ? 'Descargar' : 'Download'}
              </a>
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
                <ExternalLink size={16} />
                {lang === 'es' ? 'Nueva Pestaña' : 'New Tab'}
              </a>
              <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Iframe Viewport */}
          <div className={styles.viewport}>
            <iframe 
              src={`${pdfUrl}#toolbar=0`} 
              title={title}
              className={styles.iframe}
            />
            {/* Mobile fallback */}
            <div className={styles.mobileFallback}>
              <p>{lang === 'es' ? 'En dispositivos móviles, te recomendamos visualizar o descargar el documento directamente:' : 'On mobile devices, we recommend viewing or downloading the document directly:'}</p>
              <div className={styles.fallbackButtons}>
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <ExternalLink size={18} />
                  {lang === 'es' ? 'Ver Documento' : 'View Document'}
                </a>
                <a href={pdfUrl} download className="btn btn-secondary">
                  <Download size={18} />
                  {lang === 'es' ? 'Descargar PDF' : 'Download PDF'}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
