import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import styles from './AIChatbot.module.css';

export default function AIChatbot({ t, lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const initialMessage = lang === 'es' 
    ? '¡Hola! Soy el asistente virtual de Hernán. Pregúntame sobre sus servicios, precios, portafolio o cómo contactarlo.' 
    : 'Hi! I am Hernan\'s virtual assistant. Ask me about his services, prices, portfolio, or how to contact him.';

  useEffect(() => {
    setMessages([{ sender: 'ai', text: initialMessage }]);
  }, [lang, initialMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getRuleBasedResponse = (text) => {
    const lowerText = text.toLowerCase();
    const isEs = lang === 'es';

    // Pricing / Price
    if (lowerText.includes('precio') || lowerText.includes('costo') || lowerText.includes('price') || lowerText.includes('cost')) {
      return isEs 
        ? 'Los precios varían dependiendo del alcance de cada proyecto. Lo ideal es que le cuentes tu idea a Hernán por correo o WhatsApp para armar un presupuesto a medida.' 
        : 'Prices vary depending on the scope of each project. The best way is to tell Hernan your idea via email or WhatsApp to get a custom quote.';
    }
    // Services / Servicios
    if (lowerText.includes('servicio') || lowerText.includes('service') || lowerText.includes('hace') || lowerText.includes('do')) {
      return isEs 
        ? 'Hernán ofrece: Desarrollo de Software (Landing Pages y Frontend UI/UX), Marketing & Contenidos (Gestión de redes), e Innovación con Inteligencia Artificial. ¿Sobre cuál quieres saber más?' 
        : 'Hernan offers: Software Development (Landing Pages & Frontend UI/UX), Marketing & Content (Social media management), and A.I. Innovation. Which one would you like to know more about?';
    }
    // Contact / Email / Whatsapp
    if (lowerText.includes('contacto') || lowerText.includes('contact') || lowerText.includes('email') || lowerText.includes('correo') || lowerText.includes('whatsapp') || lowerText.includes('hablar')) {
      return isEs 
        ? 'Puedes escribirle directamente a hernanfrancini89@gmail.com, usar el formulario de contacto al final de la página, o presionar el botón verde de WhatsApp para chat directo.' 
        : 'You can write directly to hernanfrancini89@gmail.com, use the contact form at the bottom of the page, or click the green WhatsApp button for direct chat.';
    }
    // Portfolio / Projects
    if (lowerText.includes('portafolio') || lowerText.includes('portfolio') || lowerText.includes('proyecto') || lowerText.includes('project') || lowerText.includes('trabajo') || lowerText.includes('work')) {
      return isEs 
        ? '¡Claro! En la sección "Proyectos Destacados" puedes ver varios casos de éxito reales divididos por categorías: Web, Redes Sociales y Multimedia.' 
        : 'Sure! In the "Featured Projects" section you can see several real success stories divided by categories: Web, Social Media, and Multimedia.';
    }
    // Greeting
    if (lowerText.includes('hola') || lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('buen') || lowerText.includes('good')) {
      return isEs 
        ? '¡Hola! ¿En qué puedo ayudarte a mejorar tu presencia digital hoy?' 
        : 'Hello! How can I help you improve your digital presence today?';
    }
    
    // Default Fallback
    return isEs 
      ? 'No estoy seguro de entender eso. Te recomiendo navegar por la página o escribirle directamente a Hernán por el botón de WhatsApp abajo a la derecha.' 
      : 'I am not sure I understand that. I recommend browsing the page or writing directly to Hernan via the WhatsApp button on the bottom right.';
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputValue('');
    setIsTyping(true);

    const responseText = getRuleBasedResponse(userText);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'ai', text: responseText }]);
    }, 1200 + Math.random() * 800); // Random delay between 1.2s and 2.0s
  };

  return (
    <>
      <button 
        className={styles.fab} 
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Assistant"
      >
        <MessageCircle size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.chatWindow}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className={styles.chatHeader}>
              <div className={styles.headerInfo}>
                <div className={styles.avatar}>I.A.</div>
                <span>{lang === 'es' ? 'Asistente Virtual' : 'Virtual Assistant'}</span>
              </div>
              <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>
                <X size={20} />
              </button>
            </div>

            <div className={styles.chatBody}>
              {messages.map((msg, i) => (
                <motion.div 
                  key={i} 
                  className={`${styles.messageWrapper} ${styles[msg.sender]}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className={styles.messageBubble}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className={`${styles.messageWrapper} ${styles.ai}`}>
                  <div className={styles.typingIndicator}>
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className={styles.chatFooter}>
              <input 
                type="text" 
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder={lang === 'es' ? 'Escribe tu mensaje...' : 'Type your message...'}
                className={styles.chatInput}
              />
              <button onClick={handleSend} className={styles.sendBtn}>
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

