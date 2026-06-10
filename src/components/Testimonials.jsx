import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Testimonials.module.css';

export default function Testimonials({ t, lang }) {
  const [filter, setFilter] = useState('all');
  const [width, setWidth] = useState(0);
  const carouselRef = useRef();

  const testimonials = [
    { q: t.test1_quote, a: "N", name: "Natalia", role: t.test1_role, category: "marketing" },
    { q: t.test2_quote, a: "A", name: "Agustina", role: t.test2_role, category: "web" },
    { q: t.test3_quote, a: "J", name: "Jazmín", role: t.test3_role, category: "marketing" },
    { q: t.test4_quote, a: "D", name: "Damián", role: t.test4_role, category: "web" },
    { q: t.test5_quote, a: "T", name: "Tomas", role: t.test5_role, category: "web" },
    { q: t.test6_quote, a: "C", name: "Camila", role: t.test6_role, category: "web" },
  ];

  const filtered = filter === 'all' ? testimonials : testimonials.filter(item => item.category === filter);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, [filtered]);

  const slideRef = useRef();

  const scroll = (dir) => {
    if (carouselRef.current) {
      const scrollAmount = 350 * dir;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonials" className="section">
      <div className="container">
        
        <div className={styles.headerFlex}>
          <div className="section-header" style={{ textAlign: 'left', marginBottom: 0 }}>
            <h2>{t.test_title}</h2>
            <p>{t.test_subtitle}</p>
          </div>

          <div className={styles.controls}>
            {/* Filter buttons */}
            <div className={styles.filters}>
              <button 
                onClick={() => setFilter('all')} 
                className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
              >
                {lang === 'es' ? 'Todos' : 'All'}
              </button>
              <button 
                onClick={() => setFilter('web')} 
                className={`${styles.filterBtn} ${filter === 'web' ? styles.active : ''}`}
              >
                {lang === 'es' ? 'Web / Código' : 'Web / Code'}
              </button>
              <button 
                onClick={() => setFilter('marketing')} 
                className={`${styles.filterBtn} ${filter === 'marketing' ? styles.active : ''}`}
              >
                {lang === 'es' ? 'Social Media / Mkt' : 'Social Media / Mkt'}
              </button>
            </div>

            {/* Navigation buttons */}
            <div className={styles.navButtons}>
              <button onClick={() => scroll(-1)} className={styles.navBtn} aria-label="Previous">
                <ChevronLeft size={20} />
              </button>
              <button onClick={() => scroll(1)} className={styles.navBtn} aria-label="Next">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Draggable track viewport */}
        <div className={styles.carouselContainer}>
          <motion.div 
            ref={carouselRef} 
            className={styles.carouselViewport}
            whileTap={{ cursor: "grabbing" }}
          >
            <motion.div 
              drag="x" 
              dragConstraints={{ right: 0, left: -width }} 
              className={styles.innerCarousel}
              layout
            >
              {filtered.map((test, idx) => (
                <motion.div 
                  key={idx} 
                  className={styles.testimonialCard}
                  whileHover={{ y: -5 }}
                  layout
                >
                  <div className={styles.testContent}>
                    <span className={styles.quoteIcon}>"</span>
                    <p className={styles.quote}>{test.q}</p>
                  </div>
                  <div className={styles.testAuthor}>
                    <div className={styles.authorAvatar}>{test.a}</div>
                    <div className={styles.authorInfo}>
                      <h4>{test.name}</h4>
                      <span>{test.role}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
