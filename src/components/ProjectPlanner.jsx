import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import styles from './ProjectPlanner.module.css';

export default function ProjectPlanner({ t, lang }) {
  const [selectedServices, setSelectedServices] = useState({});

  const plannerConfig = {
    web: {
      title: lang === 'es' ? '🌐 Desarrollo Web' : '🌐 Web Development',
      options: [
        { id: 'landing', label: lang === 'es' ? 'Landing Page' : 'Landing Page' },
        { id: 'corporate', label: lang === 'es' ? 'Sitio Web Corporativo' : 'Corporate Website' },
        { id: 'ecommerce', label: lang === 'es' ? 'Tienda Online E-commerce' : 'Online E-commerce Store' },
      ]
    },
    design: {
      title: lang === 'es' ? '🎨 Diseño & Social' : '🎨 Design & Social',
      options: [
        { id: 'logos', label: lang === 'es' ? 'Diseño de Identidad / Logos' : 'Branding & Logo Design' },
        { id: 'flyers', label: lang === 'es' ? 'Flyers & Contenido Redes' : 'Social Media Content & Flyers' },
        { id: 'photos', label: lang === 'es' ? 'Fotos de Productos / Modelos' : 'Product / Model Photography' },
      ]
    },
    media: {
      title: lang === 'es' ? '🎬 Producción Audiovisual' : '🎬 Audiovisual Production',
      options: [
        { id: 'video', label: lang === 'es' ? 'Edición de Video (Reels/TikTok)' : 'Video Editing (Reels/TikTok)' },
        { id: 'music', label: lang === 'es' ? 'Producción Musical / Jingle' : 'Music Production / Jingles' },
        { id: 'voice', label: lang === 'es' ? 'Locución & Voz en Off' : 'Voice Over & Narrations' },
      ]
    }
  };

  const toggleOption = (category, optionId, optionLabel) => {
    setSelectedServices(prev => {
      const copy = { ...prev };
      if (!copy[category]) copy[category] = [];
      
      const exists = copy[category].find(opt => opt.id === optionId);
      if (exists) {
        copy[category] = copy[category].filter(opt => opt.id !== optionId);
        if (copy[category].length === 0) delete copy[category];
      } else {
        copy[category].push({ id: optionId, label: optionLabel });
      }
      return copy;
    });
  };

  const isSelected = (category, optionId) => {
    return selectedServices[category]?.some(opt => opt.id === optionId) || false;
  };

  const getSelectedCount = () => {
    return Object.values(selectedServices).reduce((acc, curr) => acc + curr.length, 0);
  };

  const getWhatsAppLink = () => {
    const phone = "5493548632095";
    let message = lang === 'es' 
      ? "Hola Hernán! Armé mi propuesta de plan en tu web:\n\n"
      : "Hi Hernán! I configured my project plan on your website:\n\n";

    Object.entries(selectedServices).forEach(([catKey, opts]) => {
      const catTitle = plannerConfig[catKey].title;
      message += `*${catTitle}*:\n`;
      opts.forEach(opt => {
        message += `  - ${opt.label}\n`;
      });
      message += "\n";
    });

    message += lang === 'es'
      ? "¿Me podrías pasar un presupuesto aproximado para esto? ¡Gracias!"
      : "Could you send me an approximate quote for this? Thanks!";

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="planificador" className="section">
      <div className="container">
        <div className="section-header">
          <p className="subtitle">{lang === 'es' ? 'Diseña tu Proyecto' : 'Design your Project'}</p>
          <h2>{lang === 'es' ? 'Planificador de Proyectos ⚡' : 'Project Planner ⚡'}</h2>
          <p style={{ maxWidth: '600px', margin: '16px auto 0', fontSize: '1rem', color: 'var(--text-muted)' }}>
            {lang === 'es' 
              ? 'Selecciona los servicios que necesitas para tu negocio y envíame tu plan para recibir una cotización a medida directamente en WhatsApp.' 
              : 'Select the services you need for your business and send me your plan to get a custom quote directly on WhatsApp.'}
          </p>
        </div>

        <div className={styles.plannerGrid}>
          {Object.entries(plannerConfig).map(([catKey, cat]) => (
            <div key={catKey} className={styles.categoryCard}>
              <h3>{cat.title}</h3>
              <div className={styles.optionsList}>
                {cat.options.map(opt => {
                  const selected = isSelected(catKey, opt.id);
                  return (
                    <button
                      key={opt.id}
                      onClick={() => toggleOption(catKey, opt.id, opt.label)}
                      className={`${styles.optionBtn} ${selected ? styles.selected : ''}`}
                    >
                      <span className={styles.checkbox}>
                        {selected && <CheckCircle2 size={16} className={styles.checkIcon} />}
                      </span>
                      <span className={styles.optionLabel}>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sticky Summary / CTA */}
        <AnimatePresence>
          {getSelectedCount() > 0 && (
            <div className={styles.summaryWrapper}>
              <motion.div 
                className={styles.summaryBar}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: 'spring', damping: 20 }}
              >
                <div className={styles.summaryContent}>
                  <div className={styles.summaryText}>
                    <h4>{lang === 'es' ? 'Plan Personalizado' : 'Custom Plan'}</h4>
                    <p>
                      {lang === 'es' 
                        ? `${getSelectedCount()} servicio(s) seleccionado(s) listo(s) para cotizar.`
                        : `${getSelectedCount()} service(s) selected and ready for quote.`}
                    </p>
                  </div>
                  <a 
                    href={getWhatsAppLink()} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary"
                    style={{ gap: '10px' }}
                  >
                    {lang === 'es' ? 'Consultar Presupuesto' : 'Request Estimate'}
                    <Send size={18} />
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
