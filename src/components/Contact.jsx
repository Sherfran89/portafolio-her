import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, MapPin, Send, Instagram, Linkedin, Github, Facebook } from 'lucide-react';
import styles from './Contact.module.css';

export default function Contact({ t, lang }) {
  const form = useRef();
  const [formData, setFormData] = useState({ user_name: '', user_email: '', message: '' });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [shake, setShake] = useState(false);

  const validate = (name, value) => {
    let err = '';
    if (name === 'user_name') {
      if (!value.trim()) {
        err = lang === 'es' ? 'El nombre es requerido' : 'Name is required';
      } else if (value.trim().length < 3) {
        err = lang === 'es' ? 'El nombre debe tener al menos 3 caracteres' : 'Name must be at least 3 characters';
      }
    }
    if (name === 'user_email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        err = lang === 'es' ? 'El correo electrónico es requerido' : 'Email is required';
      } else if (!emailRegex.test(value)) {
        err = lang === 'es' ? 'Formato de correo no válido' : 'Invalid email format';
      }
    }
    if (name === 'message') {
      if (!value.trim()) {
        err = lang === 'es' ? 'El mensaje es requerido' : 'Message is required';
      } else if (value.trim().length < 10) {
        err = lang === 'es' ? 'El mensaje debe tener al menos 10 caracteres' : 'Message must be at least 10 characters';
      }
    }
    return err;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const err = validate(name, value);
    setErrors(prev => ({ ...prev, [name]: err }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const err = validate(name, value);
    setErrors(prev => ({ ...prev, [name]: err }));
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const err = validate(key, formData[key]);
      if (err) newErrors[key] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Mark all as touched to show errors
      setTouched({ user_name: true, user_email: true, message: true });
      // Trigger shake animation
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setIsSubmitting(true);
    
    emailjs
      .sendForm('service_6cbjcir', 'template_1gweasj', form.current, {
        publicKey: 'c-nzcguDaEbg19jQ2',
      })
      .then(
        () => {
          setSubmitStatus('success');
          setIsSubmitting(false);
          setFormData({ user_name: '', user_email: '', message: '' });
          setTouched({});
          setErrors({});
          setTimeout(() => setSubmitStatus(null), 5000);
        },
        (error) => {
          console.error('FAILED...', error.text);
          setSubmitStatus('error');
          setIsSubmitting(false);
          setTimeout(() => setSubmitStatus(null), 5000);
        },
      );
  };

  const getInputClass = (name) => {
    if (!touched[name]) return styles.formControl;
    return errors[name] 
      ? `${styles.formControl} ${styles.errorInput}` 
      : `${styles.formControl} ${styles.successInput}`;
  };

  return (
    <section id="contacto" className="section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="subtitle">{t.contact_subtitle}</p>
          <h2>{t.contact_title}</h2>
        </motion.div>

        <div className={styles.contactGrid}>
          <motion.div 
            className={styles.contactInfo}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3>{t.contact_info_title}</h3>
            <p>{t.contact_info_desc}</p>
            
            <div className={styles.infoItems}>
              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <Mail size={24} />
                </div>
                <div className={styles.infoContent}>
                  <h4>Email</h4>
                  <p>hernanfrancini89@gmail.com</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.iconWrapper}>
                  <MapPin size={24} />
                </div>
                <div className={styles.infoContent}>
                  <h4>{t.contact_location}</h4>
                  <p>Córdoba, Argentina</p>
                </div>
              </div>
            </div>

            <div className={styles.socialLinks}>
              <a href="https://www.linkedin.com/in/hernan-francini-a75032231/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://github.com/Sherfran89" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://www.instagram.com/her.francini/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/hernan.francini.941728" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
                <Facebook size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div 
            className={`${styles.contactFormWrapper} ${shake ? styles.shake : ''}`}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form ref={form} onSubmit={sendEmail} className={styles.contactForm} noValidate>
              <div className={styles.formGroup}>
                <label htmlFor="user_name">{t.form_name}</label>
                <input 
                  type="text" 
                  name="user_name" 
                  id="user_name" 
                  value={formData.user_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass('user_name')} 
                  required 
                  placeholder={lang === 'es' ? 'Tu nombre' : 'Your name'}
                />
                {touched.user_name && errors.user_name && (
                  <span className={styles.helperText}>{errors.user_name}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="user_email">{t.form_email}</label>
                <input 
                  type="email" 
                  name="user_email" 
                  id="user_email" 
                  value={formData.user_email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass('user_email')} 
                  required 
                  placeholder={lang === 'es' ? 'tu@email.com' : 'you@email.com'}
                />
                {touched.user_email && errors.user_email && (
                  <span className={styles.helperText}>{errors.user_email}</span>
                )}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">{t.form_message}</label>
                <textarea 
                  name="message" 
                  id="message" 
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputClass('message')} 
                  required 
                  placeholder={lang === 'es' ? '¿En qué te puedo ayudar?' : 'How can I help you?'}
                ></textarea>
                {touched.message && errors.message && (
                  <span className={styles.helperText}>{errors.message}</span>
                )}
              </div>
              
              <button type="submit" className={`btn btn-primary ${styles.btnSubmit}`} style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center' }} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    {lang === 'es' ? 'Enviando...' : 'Sending...'}
                  </>
                ) : (
                  <>
                    {t.form_submit} <Send size={18} />
                  </>
                )}
              </button>
              
              {submitStatus === 'success' && (
                <div className={`${styles.formStatus} ${styles.statusSuccess}`}>
                  {t.form_success}
                </div>
              )}
              {submitStatus === 'error' && (
                <div className={`${styles.formStatus} ${styles.statusError}`} style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'stretch' }}>
                  <p style={{ margin: 0 }}>{t.form_error}</p>
                  <a 
                    href="https://wa.me/5493548632095" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary"
                    style={{ fontSize: '0.9rem', padding: '10px', width: '100%', justifyContent: 'center' }}
                  >
                    {lang === 'es' ? 'Enviar por WhatsApp' : 'Send via WhatsApp'}
                  </a>
                  <button 
                    type="button" 
                    onClick={() => {
                      navigator.clipboard.writeText("hernanfrancini89@gmail.com");
                      alert(lang === 'es' ? "¡Email copiado al portapapeles!" : "Email copied to clipboard!");
                    }} 
                    className="btn btn-secondary" 
                    style={{ fontSize: '0.9rem', padding: '10px', width: '100%', justifyContent: 'center' }}
                  >
                    {lang === 'es' ? 'Copiar Correo' : 'Copy Email'}
                  </button>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
