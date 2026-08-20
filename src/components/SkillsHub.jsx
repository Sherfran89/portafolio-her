import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Server, 
  Wrench,
  Palette, 
  Sparkles, 
  Megaphone, 
  Cloud, 
  Layers, 
  Cpu, 
  Video, 
  Volume2,
  Zap,
  Gauge,
  Database,
  PenTool
} from 'lucide-react';
import { 
  SiHtml5, 
  SiJavascript, 
  SiTypescript, 
  SiReact, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiFramer,
  SiNodedotjs, 
  SiSupabase, 
  SiStripe,
  SiGit,
  SiVercel,
  SiVite,
  SiFigma, 
  SiCanva, 
  SiMeta, 
  SiOpenai,
  SiGoogle 
} from 'react-icons/si';
import styles from './SkillsHub.module.css';

export default function SkillsHub({ t, lang }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    {
      id: 'frontend',
      title: t.skills_cat_frontend,
      desc: t.skills_cat_frontend_desc,
      icon: <Code2 size={24} />,
      accent: '#61DAFB',
      glow: 'rgba(97, 218, 251, 0.15)',
      skills: [
        { id: 'react', icon: <SiReact size={24} color="#61DAFB" />, title: t.skill_react_title, desc: t.skill_react_desc, tag: 'Core' },
        { id: 'next', icon: <SiNextdotjs size={24} color="#FFFFFF" />, title: t.skill_next_title, desc: t.skill_next_desc, tag: 'Fullstack' },
        { id: 'ts', icon: <SiTypescript size={24} color="#3178C6" />, title: t.skill_ts_title, desc: t.skill_ts_desc, tag: 'Tipado' },
        { id: 'js', icon: <SiJavascript size={24} color="#F7DF1E" />, title: t.skill_js_title, desc: t.skill_js_desc, tag: 'Lenguaje' },
        { id: 'tailwind', icon: <SiTailwindcss size={24} color="#06B6D4" />, title: t.skill_tailwind_title, desc: t.skill_tailwind_desc, tag: 'UI / CSS' },
        { id: 'framer', icon: <SiFramer size={24} color="#0055FF" />, title: t.skill_framer_title, desc: t.skill_framer_desc, tag: 'Animación' },
        { id: 'html', icon: <SiHtml5 size={24} color="#E34F26" />, title: t.skill_html_title, desc: t.skill_html_desc, tag: 'Semántica' },
      ]
    },
    {
      id: 'backend',
      title: t.skills_cat_backend,
      desc: t.skills_cat_backend_desc,
      icon: <Server size={24} />,
      accent: '#10B981',
      glow: 'rgba(16, 185, 129, 0.15)',
      skills: [
        { id: 'node', icon: <SiNodedotjs size={24} color="#339933" />, title: t.skill_node_title, desc: t.skill_node_desc, tag: 'Runtime' },
        { id: 'api', icon: <Cloud size={24} color="#8B5CF6" />, title: t.skill_api_title, desc: t.skill_api_desc, tag: 'Integración' },
        { id: 'supabase', icon: <SiSupabase size={24} color="#3ECF8E" />, title: t.skill_supabase_title, desc: t.skill_supabase_desc, tag: 'BaaS / SQL' },
        { id: 'state', icon: <Layers size={24} color="#F59E0B" />, title: t.skill_state_title, desc: t.skill_state_desc, tag: 'Global State' },
        { id: 'dexie', icon: <Database size={24} color="#3B82F6" />, title: t.skill_dexie_title, desc: t.skill_dexie_desc, tag: 'Offline DB' },
        { id: 'stripe', icon: <SiStripe size={24} color="#635BFF" />, title: t.skill_stripe_title, desc: t.skill_stripe_desc, tag: 'Pagos / CRO' },
      ]
    },
    {
      id: 'tools',
      title: t.skills_cat_tools,
      desc: t.skills_cat_tools_desc,
      icon: <Wrench size={24} />,
      accent: '#F59E0B',
      glow: 'rgba(245, 158, 11, 0.15)',
      skills: [
        { id: 'git', icon: <SiGit size={24} color="#F05032" />, title: t.skill_git_title, desc: t.skill_git_desc, tag: 'Control' },
        { id: 'vercel', icon: <SiVercel size={24} color="#FFFFFF" />, title: t.skill_vercel_title, desc: t.skill_vercel_desc, tag: 'CI / CD' },
        { id: 'vite', icon: <SiVite size={24} color="#646CFF" />, title: t.skill_vite_title, desc: t.skill_vite_desc, tag: 'Bundler' },
        { id: 'seo', icon: <Gauge size={24} color="#10B981" />, title: t.skill_seo_title, desc: t.skill_seo_desc, tag: 'Velocidad' },
      ]
    },
    {
      id: 'ai',
      title: t.skills_cat_ai,
      desc: t.skills_cat_ai_desc,
      icon: <Sparkles size={24} />,
      accent: '#A855F7',
      glow: 'rgba(168, 85, 247, 0.15)',
      skills: [
        { id: 'ai_models', icon: <SiOpenai size={24} color="#10A37F" />, title: t.skill_ai_title, desc: t.skill_ai_desc, tag: 'LLMs & APIs' },
        { id: 'workflow', icon: <Cpu size={24} color="#EC4899" />, title: t.skill_workflow_title, desc: t.skill_workflow_desc, tag: 'Workflows' },
      ]
    },
    {
      id: 'design',
      title: t.skills_cat_design,
      desc: t.skills_cat_design_desc,
      icon: <Palette size={24} />,
      accent: '#F43F5E',
      glow: 'rgba(244, 63, 94, 0.15)',
      skills: [
        { id: 'figma', icon: <SiFigma size={24} color="#F24E1E" />, title: t.skill_figma_title, desc: t.skill_figma_desc, tag: 'UI / UX' },
        { id: 'canva', icon: <SiCanva size={24} color="#00C4CC" />, title: t.skill_canva_title, desc: t.skill_canva_desc, tag: 'Branding' },
      ]
    },
    {
      id: 'marketing',
      title: t.skills_cat_marketing,
      desc: t.skills_cat_marketing_desc,
      icon: <Megaphone size={24} />,
      accent: '#0668E1',
      glow: 'rgba(6, 104, 225, 0.15)',
      skills: [
        { id: 'meta', icon: <SiMeta size={24} color="#0668E1" />, title: t.skill_meta_title, desc: t.skill_meta_desc, tag: 'Meta Ads' },
        { id: 'video', icon: <Video size={24} color="#EF4444" />, title: t.skill_video_title, desc: t.skill_video_desc, tag: 'Edición' },
        { id: 'audio', icon: <Volume2 size={24} color="#F59E0B" />, title: t.skill_audio_title, desc: t.skill_audio_desc, tag: 'Voz / Audio' },
        { id: 'copy', icon: <PenTool size={24} color="#8B5CF6" />, title: t.skill_copy_title, desc: t.skill_copy_desc, tag: 'Conversión' },
      ]
    }
  ];

  const filterTabs = [
    { id: 'all', label: lang === 'es' ? 'Todas las Habilidades' : 'All Skills', count: '25+' },
    { id: 'frontend', label: 'Frontend', count: '7' },
    { id: 'backend', label: 'Backend & Data', count: '6' },
    { id: 'tools', label: 'Cloud & Tooling', count: '4' },
    { id: 'ai', label: 'I.A. & Automation', count: '2' },
    { id: 'design', label: 'UI/UX Design', count: '2' },
    { id: 'marketing', label: 'Marketing & Media', count: '4' },
  ];

  const visibleCategories = selectedCategory === 'all' 
    ? categories 
    : categories.filter(c => c.id === selectedCategory);

  return (
    <section id="habilidades" className={`section ${styles.skillsSection}`}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="subtitle">{t.skills_subtitle}</p>
          <h2>{t.skills_title}</h2>
        </motion.div>

        {/* Category Filters */}
        <div className={styles.filterTabs}>
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`${styles.tabBtn} ${selectedCategory === tab.id ? styles.activeTab : ''}`}
            >
              <span>{tab.label}</span>
              <span className={styles.tabCount}>{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className={styles.categoriesGrid}>
          <AnimatePresence mode="popLayout">
            {visibleCategories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                className={styles.categoryCard}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                style={{
                  '--cat-accent': cat.accent,
                  '--cat-glow': cat.glow
                }}
              >
                {/* Category Card Header with Gradient Accent */}
                <div className={styles.categoryHeader}>
                  <div 
                    className={styles.categoryIcon}
                    style={{ background: `${cat.accent}18`, color: cat.accent, borderColor: `${cat.accent}35` }}
                  >
                    {cat.icon}
                  </div>
                  <div className={styles.categoryInfo}>
                    <div className={styles.categoryTitleRow}>
                      <h3>{cat.title}</h3>
                      <span className={styles.skillCountBadge}>
                        {cat.skills.length} {lang === 'es' ? 'tecnologías' : 'skills'}
                      </span>
                    </div>
                    <p className={styles.categoryDesc}>{cat.desc}</p>
                  </div>
                </div>

                {/* Skills Grid inside Category */}
                <div className={styles.skillsList}>
                  {cat.skills.map(skill => (
                    <div key={skill.id} className={styles.skillItem}>
                      <div className={styles.skillIconWrapper}>
                        {skill.icon}
                      </div>
                      <div className={styles.skillContent}>
                        <div className={styles.skillTitle}>
                          <span className={styles.skillName}>{skill.title}</span>
                          <span className={styles.skillTag}>{skill.tag}</span>
                        </div>
                        <p className={styles.skillDesc}>{skill.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
