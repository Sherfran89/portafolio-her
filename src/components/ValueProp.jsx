import React from 'react';
import { motion } from 'framer-motion';
import styles from './ValueProp.module.css';

export default function ValueProp({ t }) {
  const renderHTML = (htmlString) => {
    return { __html: htmlString };
  };

  return (
    <section className={`section ${styles.valueProp}`}>
      <div className={`container ${styles.valueFlex}`}>
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
    </section>
  );
}
