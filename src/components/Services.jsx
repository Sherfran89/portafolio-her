import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Megaphone, Bot, ArrowRight } from 'lucide-react';
import styles from './Services.module.css';

export default function Services({ t, lang }) {
  const services = [
    {
      id: 1,
      icon: <Code2 size={32} />,
      title: t.serv1_title,
      desc: t.serv1_desc
    },
    {
      id: 2,
      icon: <Megaphone size={32} />,
      title: t.serv2_title,
      desc: t.serv2_desc
    },
    {
      id: 3,
      icon: <Bot size={32} />,
      title: t.serv3_title,
      desc: t.serv3_desc
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="servicios" className="section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="subtitle">{t.services_subtitle}</p>
          <h2>{t.services_title}</h2>
        </motion.div>
        
        <motion.div 
          className={styles.servicesGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service) => (
            <motion.div 
              key={service.id} 
              className={styles.serviceCard}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className={styles.cardIcon}>
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <a href="#contacto" className={styles.learnMoreBtn}>
                {lang === 'es' ? 'Saber más' : 'Learn more'} <ArrowRight size={16} />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
