import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import styles from './FAQ.module.css';

export default function FAQ({ t }) {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      id: 1,
      q: '¿Cuánto tiempo tarda un proyecto promedio?',
      a: 'Depende de la complejidad, pero una Landing Page completa y optimizada suele demorar entre 7 y 14 días desde la etapa de diseño hasta el lanzamiento.'
    },
    {
      id: 2,
      q: '¿Ofreces mantenimiento después del desarrollo?',
      a: 'Sí, ofrezco planes de mantenimiento mensual que incluyen actualizaciones de contenido, monitoreo de seguridad y mejoras continuas de SEO.'
    },
    {
      id: 3,
      q: '¿Trabajas con clientes fuera de Argentina?',
      a: '¡Absolutamente! Gran parte de mis clientes son internacionales. La comunicación es 100% remota y asíncrona, adaptándome a tu zona horaria.'
    },
    {
      id: 4,
      q: '¿Necesito saber de programación para trabajar contigo?',
      a: 'Para nada. Mi trabajo es justamente que vos no tengas que preocuparte por lo técnico. Me encargo de todo y te entrego el proyecto listo para usar, con una breve explicación de cómo gestionar el contenido si fuera necesario.'
    },
    {
      id: 5,
      q: '¿Cómo son los métodos de pago?',
      a: 'Trabajo con transferencia bancaria, PayPal, y criptomonedas. Generalmente se solicita un 50% de adelanto para comenzar el proyecto y el 50% restante al momento de la entrega final.'
    },
  ];

  return (
    <section id="faq" className="section">
      <div className={`container ${styles.faqContainer}`}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>{t.faq_title}</h2>
          <p>{t.faq_subtitle}</p>
        </motion.div>
        
        <div className={styles.faqList}>
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              className={`${styles.faqItem} ${activeFaq === faq.id ? styles.active : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: faq.id * 0.1 }}
            >
              <div className={styles.faqQuestion} onClick={() => toggleFaq(faq.id)}>
                <h4>{faq.q}</h4>
                <Plus className={styles.faqIcon} size={24} />
              </div>
              <div 
                className={styles.faqAnswer} 
                style={{ maxHeight: activeFaq === faq.id ? '200px' : '0' }}
              >
                <p>{faq.a}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
