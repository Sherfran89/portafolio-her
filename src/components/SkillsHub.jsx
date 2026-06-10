import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Video, Volume2, Cloud } from 'lucide-react';
import { SiHtml5, SiJavascript, SiTypescript, SiReact, SiNodedotjs, SiFigma, SiMeta, SiCanva, SiOpenai } from 'react-icons/si';
import styles from './SkillsHub.module.css';

export default function SkillsHub({ t, lang }) {
  const [activeSkill, setActiveSkill] = useState(null);

  const categories = [
    {
      title: lang === 'es' ? '💻 Código & Fullstack' : '💻 Code & Fullstack',
      skills: [
        { id: 'html', icon: <SiHtml5 size={24} color="#E34F26" />, titleKey: 'skill_html_title', descKey: 'skill_html_desc' },
        { id: 'js', icon: <SiJavascript size={24} color="#F7DF1E" />, titleKey: 'skill_js_title', descKey: 'skill_js_desc' },
        { id: 'ts', icon: <SiTypescript size={24} color="#3178C6" />, titleKey: 'skill_ts_title', descKey: 'skill_ts_desc' },
        { id: 'react', icon: <SiReact size={24} color="#61DAFB" />, titleKey: 'skill_react_title', descKey: 'skill_react_desc' },
        { id: 'node', icon: <SiNodedotjs size={24} color="#339933" />, titleKey: 'skill_node_title', descKey: 'skill_node_desc' },
        { id: 'api', icon: <Cloud size={24} />, titleKey: 'skill_api_title', descKey: 'skill_api_desc' },
      ]
    },
    {
      title: lang === 'es' ? '📈 Estrategia & Diseño' : '📈 Strategy & Design',
      skills: [
        { id: 'figma', icon: <SiFigma size={24} color="#F24E1E" />, titleKey: 'skill_figma_title', descKey: 'skill_figma_desc' },
        { id: 'meta', icon: <SiMeta size={24} color="#0668E1" />, titleKey: 'skill_meta_title', descKey: 'skill_meta_desc' },
        { id: 'canva', icon: <SiCanva size={24} color="#00C4CC" />, titleKey: 'skill_canva_title', descKey: 'skill_canva_desc' },
      ]
    },
    {
      title: lang === 'es' ? '🎬 Producción & I.A.' : '🎬 Production & A.I.',
      skills: [
        { id: 'ai', icon: <SiOpenai size={24} />, titleKey: 'skill_ai_title', descKey: 'skill_ai_desc' },
        { id: 'video', icon: <Video size={24} />, titleKey: 'skill_video_title', descKey: 'skill_video_desc' },
        { id: 'audio', icon: <Volume2 size={24} />, titleKey: 'skill_audio_title', descKey: 'skill_audio_desc' },
      ]
    }
  ];

  return (
    <section className={`section ${styles.skillsSection}`}>
      <div className="container">
        <div className="section-header">
          <p className="subtitle">{t.skills_subtitle}</p>
          <h2>{t.skills_title}</h2>
        </div>

        <div className={styles.categoriesGrid}>
          {categories.map((cat, catIdx) => (
            <div key={catIdx} className={styles.categoryColumn}>
              <h3>{cat.title}</h3>
              <div className={styles.skillsList}>
                {cat.skills.map((skill) => {
                  const isActive = activeSkill === skill.id;
                  return (
                    <motion.div
                      key={skill.id}
                      className={`${styles.skillCard} ${isActive ? styles.active : ''}`}
                      onMouseEnter={() => setActiveSkill(skill.id)}
                      onMouseLeave={() => setActiveSkill(null)}
                      onClick={() => setActiveSkill(activeSkill === skill.id ? null : skill.id)}
                      layout
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                      <div className={styles.cardHeader}>
                        <div className={styles.iconWrapper}>
                          {skill.icon}
                        </div>
                        <h4>{t[skill.titleKey]}</h4>
                      </div>
                      
                      {/* Description container */}
                      <motion.div 
                        className={styles.descWrapper}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: isActive ? 'auto' : 0, 
                          opacity: isActive ? 1 : 0,
                          marginTop: isActive ? 12 : 0
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className={styles.descText}>{t[skill.descKey]}</p>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
