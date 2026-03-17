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
              borderRadius: 'var(--radius)', 
              border: '1px solid var(--border-light)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
            }}
          >
            <h3 style={{ marginBottom: '20px', fontSize: '1.5rem', textAlign: 'center' }}>
              {lang === 'es' ? '📋 Solicitar Cotización' : '📋 Request a Quote'}
            </h3>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>{lang === 'es' ? 'Nombre' : 'Name'}</label>
              <input type="text" name="user_name" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-dark)', color: 'var(--text-light)', fontFamily: 'inherit' }} />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Email</label>
              <input type="email" name="user_email" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-dark)', color: 'var(--text-light)', fontFamily: 'inherit' }} />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>{lang === 'es' ? 'Mensaje/Proyecto' : 'Message/Project'}</label>
              <textarea name="message" rows="4" required style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-dark)', color: 'var(--text-light)', fontFamily: 'inherit', resize: 'vertical' }} />
            </div>

            <motion.button 
              type="submit" 
              className="btn btn-secondary" 
              style={{ width: '100%', padding: '15px', border: 'none', cursor: 'pointer' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? (lang === 'es' ? 'Enviando...' : 'Sending...') : (lang === 'es' ? 'Enviar Mensaje' : 'Send Message')}
            </motion.button>
            
            {status === 'success' && <p style={{ color: '#4ade80', marginTop: '15px', textAlign: 'center' }}>{lang === 'es' ? '¡Mensaje enviado con éxito!' : 'Message sent successfully!'}</p>}
            {status === 'error' && <p style={{ color: 'var(--accent-red)', marginTop: '15px', textAlign: 'center' }}>{lang === 'es' ? 'Hubo un error. Intenta por WhatsApp.' : 'Error sending. Try WhatsApp.'}</p>}

          </motion.form>
        </div>
      </div>
    </section>
  );
}
