import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Code, Rocket } from 'lucide-react';
import styles from './Workflow.module.css';

export default function Workflow({ t, lang }) {
  const steps = [
    {
      icon: <Search size={24} />,
      title: t.workflow_s1_title,
      desc: t.workflow_s1_desc
    },
    {
      icon: <PenTool size={24} />,
      title: t.workflow_s2_title,
      desc: t.workflow_s2_desc
    },
    {
      icon: <Code size={24} />,
      title: t.workflow_s3_title,
      desc: t.workflow_s3_desc
    },
    {
      icon: <Rocket size={24} />,
      title: t.workflow_s4_title,
      desc: t.workflow_s4_desc
    }
  ];

  return (
    <section id="workflow" className={`section ${styles.workflow}`}>
      <div className="container">
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="subtitle">{t.workflow_subtitle}</p>
          <h2>{t.workflow_title}</h2>
        </motion.div>

        <div className={styles.timeline}>
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className={styles.step}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={styles.iconWrapper}>
                {step.icon}
              </div>
              <div className={styles.content}>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
