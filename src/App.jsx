import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider } from './components/ThemeProvider';
import { translations } from './data';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';

// Lazy loaded components (they already exist as separate files)
const About = React.lazy(() => import('./components/About'));
const Contact = React.lazy(() => import('./components/Contact'));

// Helper components that are currently in App.jsx (ValueProp, Testimonials, FAQ)
// To keep it simple and safe, I'll keep them here but properly structured.

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

      <main>
        <Services t={t} />
        <Portfolio t={t} lang={lang} />
        
        <Suspense fallback={<div className="section-loader"></div>}>
          <About t={t} lang={lang} />
        </Suspense>

        {/* Value Prop Section */}
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

        <Suspense fallback={<div className="section-loader"></div>}>
          <Contact t={t} lang={lang} />
        </Suspense>
      </main>

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

      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/5493548632095" className="whatsapp-float fade-in visible" target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <svg viewBox="0 0 448 512" width="30" height="30" fill="white">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.4-8.6-44.6-27.5-16.5-14.7-27.6-32.8-30.8-38.4-3.2-5.6-.3-8.6 2.5-11.4 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.2 3.7-5.5 5.5-9.2 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.8 23.5 9.2 31.6 11.8 13.3 4.2 25.4 3.6 35 2.2 10.7-1.5 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.7z" />
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
