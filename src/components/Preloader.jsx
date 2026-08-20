import React from 'react';
import { motion } from 'framer-motion';
import styles from './Preloader.module.css';

export default function Preloader() {
  return (
    <motion.div 
      className={styles.preloader}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className={styles.textWrapper}>
        <motion.span 
          className={styles.logoText}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          H.FRANCINI
          <motion.span 
            className={styles.dot}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.8, type: "spring", stiffness: 200 }}
          >
            .
          </motion.span>
        </motion.span>
      </div>
    </motion.div>
  );
}
