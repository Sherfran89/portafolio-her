import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider } from './components/ThemeProvider';
import { translations } from './data';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';

function AppContent() {
  const [lang, setLang] = useState('es');
  const [activeFaq, setActiveFaq] = useState(null);

  const t = translations[lang];

  const toggleLang = () => {
    setLang(prev => prev === 'es' ? 'en' : 'es');
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const renderHTML = (htmlString) => {
    return { __html: htmlString };
  };

  return (
    <div>
      <Navbar t={t} lang={lang} toggleLang={toggleLang} />
      <Hero t={t} />
      
      {/* Marquee */}
      <div className="marquee">
        <div className="marquee-content">
          <span>HTML5</span><span>CSS3</span><span>JavaScript</span><span>React</span><span>Figma</span><span>Meta Ads</span><span>ChatGPT</span><span>Gemini</span><span>Nano Banana Pro</span><span>Canva</span><span>CapCut</span><span>Antigravity</span><span>Sora2</span><span>Veo3</span>
          <span>HTML5</span><span>CSS3</span><span>JavaScript</span><span>React</span><span>Figma</span><span>Meta Ads</span><span>ChatGPT</span><span>Gemini</span><span>Nano Banana Pro</span><span>Canva</span><span>CapCut</span><span>Antigravity</span><span>Sora2</span><span>Veo3</span>
        </div>
      </div>

      <Services t={t} />
      <Portfolio t={t} lang={lang} />

      {/* Value Prop Section (Kept simple inline for now) */}
      <section className="value-prop section dark-bg">
        <div className="container value-flex">
          <div className="value-text">
            <h2 dangerouslySetInnerHTML={renderHTML(t.value_title)}></h2>
            <p>{t.value_desc1}</p>
            <p>{t.value_desc2}</p>
          </div>
          <div className="value-stats">
            <div className="stat-box">
              <span className="stat-num">100%</span>
              <span className="stat-label">{t.stat1}</span>
            </div>
            <div className="stat-box">
              <span className="stat-num">3x</span>
              <span className="stat-label">{t.stat2}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="testimonials section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>{t.test_title}</h2>
            <p>{t.test_subtitle}</p>
          </motion.div>
          
          <motion.div 
            className="testimonial-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
          >
            {[
              { q: t.test1_quote, a: "N", name: "Natalia", role: t.test1_role },
              { q: t.test2_quote, a: "A", name: "Agustina", role: t.test2_role },
              { q: t.test3_quote, a: "J", name: "Jazmín", role: t.test3_role },
              { q: t.test4_quote, a: "D", name: "Damián", role: t.test4_role },
              { q: t.test5_quote, a: "T", name: "Tomas", role: t.test5_role },
              { q: t.test6_quote, a: "C", name: "Camila", role: t.test6_role },
            ].map((test, idx) => (
              <motion.div 
                key={idx} 
                className="testimonial-card"
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1, transition: { type: 'spring', damping: 20 } }
                }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="test-content">
                  <p className="quote">{test.q}</p>
                </div>
                <div className="test-author">
                  <div className="author-avatar">{test.a}</div>
                  <div className="author-info">
                    <h4>{test.name}</h4>
                    <span>{test.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="faq section">
        <div className="container faq-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>{t.faq_title}</h2>
            <p>{t.faq_subtitle}</p>
          </motion.div>
          <div className="faq-list">
            {[
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
            ].map((faq) => (
              <motion.div
                key={faq.id}
                className={`faq-item ${activeFaq === faq.id ? 'active' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: faq.id * 0.08 }}
              >
                <div className="faq-question" onClick={() => toggleFaq(faq.id)}>
                  <h4>{faq.q}</h4>
                  <span className="faq-icon">{activeFaq === faq.id ? '−' : '+'}</span>
                </div>
                <div className="faq-answer" style={{ maxHeight: activeFaq === faq.id ? '500px' : null }}>
                  <p>{faq.a}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Contact t={t} lang={lang} />

      {/* Footer */}
      <footer>
        <div className="container footer-content">
          <div className="footer-brand">
            <a href="#" className="logo">H.FRANCINI<span className="dot">.</span></a>
            <p>{t.footer_location}</p>
          </div>
          <div className="footer-legal">
            <p>{t.footer_rights}</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button Fixed Icon Size & Position */}
      <a href="https://wa.me/5493548632095" className="whatsapp-float fade-in visible" target="_blank" rel="noreferrer" aria-label="WhatsApp" style={{ transitionDelay: '1s' }}>
        <svg viewBox="0 0 32 32" width="30" height="30" fill="white">
          <path d="M16 2a13 13 0 0 0-11 20l-2 6 6.2-2a13 13 0 1 0 6.8-24zm0 24a10.8 10.8 0 0 1-5.6-1.5l-3.8 1.2 1.2-3.6A11 11 0 1 1 16 26zm6-8.2c-.3-.2-2-.9-2.3-1-.3-.1-.5-.2-.7.2-.2.3-.9 1-1.1 1.2-.2.3-.4.3-.7.1-.4-.2-1.4-.5-2.6-1.6-1-1-1.3-1.3-1.5-1.7-.2-.3 0-.5.2-.6.2-.1.3-.3.5-.5.2-.2.2-.3.3-.6.1-.2 0-.4-.1-.6-.1-.2-.9-2.2-1.2-3-.3-.8-.7-.7-1-.7h-.8c-.3 0-.8.1-1.2.5-.4.4-1.5 1.4-1.5 3.5s1.6 4 1.8 4.3c.2.3 3 4.5 7.2 6.3 1 .4 1.8.7 2.4.8.9.3 1.8.3 2.5.1s2-.8 2.3-1.6.3-1.6.2-1.8c-.1-.1-.3-.3-.6-.5z" />
        </svg>
      </a>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
