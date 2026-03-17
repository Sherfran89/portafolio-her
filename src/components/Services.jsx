import React from 'react';
import { motion } from 'framer-motion';

export default function Services({ t }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20, stiffness: 100 } }
  };

  const cardHover = {
    scale: 1.03,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  };

  return (
    <section id="services" className="services section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
        >
          <h2>{t.services_title}</h2>
          <p>{t.services_subtitle}</p>
        </motion.div>

        <motion.div 
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div className="service-card" variants={itemVariants} whileHover={cardHover}>
            <div className="card-icon">
              <img src="/assets/icon_frontend.png" alt="Desarrollo Web" />
            </div>
            <h3>{t.serv1_title}</h3>
            <p>{t.serv1_desc}</p>
          </motion.div>

          <motion.div className="service-card" variants={itemVariants} whileHover={cardHover}>
            <div className="card-icon">
              <img src="/assets/icon_marketing.png" alt="Estrategia Digital" />
            </div>
            <h3>{t.serv2_title}</h3>
            <p>{t.serv2_desc}</p>
          </motion.div>

          <motion.div className="service-card" variants={itemVariants} whileHover={cardHover}>
            <div className="card-icon">
              <img src="/assets/icon_ai.png" alt="Inteligencia Artificial" />
            </div>
            <h3>{t.serv3_title}</h3>
            <p>{t.serv3_desc}</p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
