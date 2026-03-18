import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

export default function Contact({ t, lang }) {
  const form = useRef();
  const [status, setStatus] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    // Make sure user sets these in their EmailJS account later
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
      .then((result) => {
          setStatus('success');
          form.current.reset();
          setTimeout(() => setStatus(null), 5000);
      }, (error) => {
          setStatus('error');
          setTimeout(() => setStatus(null), 5000);
      });
  };

  return (
    <section id="contact" className="cta-section">
      <div className="container cta-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>{t.cta_title}</h2>
          <p>{t.cta_subtitle}</p>
        </motion.div>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginTop: '40px', textAlign: 'left' }}>
          
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>{lang === 'es' ? 'Contáctame Directamente' : 'Contact me Directy'}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
              {lang === 'es' ? 'Llena el formulario para cotizaciones detalladas, o envíame un mensaje por WhatsApp para una respuesta inmediata.' : 'Fill the form for detailed project quotes, or hit me on WhatsApp for quick answers.'}
            </p>
            <div className="cta-actions" style={{ justifyContent: 'flex-start' }}>
              <motion.a 
                href="https://wa.me/5493548632095" 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-primary btn-large"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ width: '100%', textAlign: 'center' }}
              >
                {t.cta_btn}
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/hernan-francini-a75032231/" 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-secondary btn-large"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ width: '100%', textAlign: 'center' }}
              >
                LinkedIn
              </motion.a>
            </div>
          </motion.div>

            {/* EmailJS Form */}
          <motion.form 
            ref={form} 
            onSubmit={sendEmail} 
            className="contact-form"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ 
              background: 'var(--bg-card)', 
              padding: '30px', 
              borderRadius: 'var(--radius-md)', 
              border: '1px solid var(--border-light)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <h3 style={{ marginBottom: '25px', fontSize: '1.6rem', textAlign: 'center', color: 'var(--text-main)' }}>
              {lang === 'es' ? '🚀 Solicitar Cotización' : '🚀 Request a Quote'}
            </h3>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: '500' }}>{lang === 'es' ? 'Nombre Completo' : 'Full Name'}</label>
              <input type="text" name="user_name" placeholder={lang === 'es' ? 'Tu nombre...' : 'Your name...'} required style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'rgba(255,255,255,0.05)', color: 'var(--text-main)', fontFamily: 'inherit', outline: 'none' }} />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: '500' }}>Email</label>
              <input type="email" name="user_email" placeholder="email@ejemplo.com" required style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'rgba(255,255,255,0.05)', color: 'var(--text-main)', fontFamily: 'inherit', outline: 'none' }} />
            </div>
            
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontWeight: '500' }}>{lang === 'es' ? 'Cuéntame sobre tu proyecto' : 'Tell me about your project'}</label>
              <textarea name="message" rows="4" placeholder={lang === 'es' ? '¿En qué puedo ayudarte?' : 'How can I help you?'} required style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'rgba(255,255,255,0.05)', color: 'var(--text-main)', fontFamily: 'inherit', resize: 'none', outline: 'none' }} />
            </div>

            <motion.button 
              type="submit" 
              className={`btn ${status === 'sending' ? 'btn-secondary' : 'btn-primary'}`} 
              style={{ width: '100%', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? (
                <>
                  <span className="loader-mini"></span>
                  {lang === 'es' ? 'Enviando...' : 'Sending...'}
                </>
              ) : (
                lang === 'es' ? '🚀 Enviar Cotización' : '🚀 Send Quote Request'
              )}
            </motion.button>
            
            {status === 'success' && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: '#4ade80', marginTop: '20px', textAlign: 'center', fontWeight: 'bold' }}
              >
                {lang === 'es' ? '✅ ¡Mensaje enviado! Te responderé pronto.' : '✅ Message sent! I will reply soon.'}
              </motion.p>
            )}
            
            {status === 'error' && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ color: 'var(--accent-red)', marginTop: '20px', textAlign: 'center', fontWeight: 'bold' }}
              >
                {lang === 'es' ? '❌ Error. Por favor usa WhatsApp.' : '❌ Error. Please use WhatsApp instead.'}
              </motion.p>
            )}

            {/* Config Note for the User */}
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '15px', opacity: 0.5 }}>
              Ref: EmailJS integration. Needs Service/Template ID & Public Key.
            </p>

          </motion.form>
        </div>
      </div>
    </section>
  );
}
