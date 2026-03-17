import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';

export default function GalleryModal({ images = [], videos = [], title, onClose }) {
  const items = useMemo(() => [
    ...videos.map(id => ({ type: 'video', src: id })),
    ...images.map(url => ({ type: 'image', src: url })),
  ], [videos, images]);

  const [current, setCurrent] = useState(0);
  const [animState, setAnimState] = useState('idle');
  const isAnimating = useRef(false);
  const currentRef = useRef(0);

  // Keep ref in sync with state
  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  // Preload adjacent images
  useEffect(() => {
    const len = items.length;
    if (!len) return;
    const preload = (index) => {
      if (items[index] && items[index].type === 'image') {
        new Image().src = items[index].src;
      }
    };
    preload((current + 1) % len);
    preload((current - 1 + len) % len);
  }, [current, items]);

  const navigate = useCallback((dir) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    const len = items.length;
    const next = (currentRef.current + dir + len) % len;

    setAnimState(dir > 0 ? 'exit-left' : 'exit-right');

    setTimeout(() => {
      setCurrent(next);
      setAnimState(dir > 0 ? 'enter-right' : 'enter-left');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimState('idle');
          isAnimating.current = false;
        });
      });
    }, 200);
  }, [items.length]);

  const goTo = useCallback((index) => {
    if (isAnimating.current || index === currentRef.current) return;
    isAnimating.current = true;
    const dir = index > currentRef.current ? 1 : -1;

    setAnimState(dir > 0 ? 'exit-left' : 'exit-right');

    setTimeout(() => {
      setCurrent(index);
      setAnimState(dir > 0 ? 'enter-right' : 'enter-left');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimState('idle');
          isAnimating.current = false;
        });
      });
    }, 200);
  }, []);

  const prev = useCallback(() => navigate(-1), [navigate]);
  const next = useCallback(() => navigate(1), [navigate]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  const getSlideStyle = () => {
    const base = { transition: 'transform 200ms ease, opacity 200ms ease', willChange: 'transform, opacity' };
    switch (animState) {
      case 'exit-left':   return { ...base, transform: 'translateX(-50px)', opacity: 0 };
      case 'exit-right':  return { ...base, transform: 'translateX(50px)',  opacity: 0 };
      case 'enter-right': return { transition: 'none', transform: 'translateX(50px)',  opacity: 0, willChange: 'transform, opacity' };
      case 'enter-left':  return { transition: 'none', transform: 'translateX(-50px)', opacity: 0, willChange: 'transform, opacity' };
      default:            return { ...base, transform: 'translateX(0)',      opacity: 1 };
    }
  };

  if (!items.length) return null;

  return (
    <div className="gallery-overlay" style={{ animation: 'fadeIn 180ms ease both' }} onClick={onClose}>
      <div className="gallery-modal" style={{ animation: 'scaleIn 200ms ease both' }} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="gallery-header">
          <h3 className="gallery-title">{title}</h3>
          <span className="gallery-counter">{current + 1} / {items.length}</span>
          <button className="gallery-close" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>

        {/* Viewport */}
        <div className="gallery-viewport">
          <div className="gallery-item-container" style={getSlideStyle()}>
            {items[current].type === 'video' ? (
              <iframe
                className="gallery-video"
                src={`https://www.youtube.com/embed/${items[current].src}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <img
                src={items[current].src}
                alt={`${title} - imagen ${current + 1}`}
                className="gallery-img"
                draggable={false}
                loading="eager"
              />
            )}
          </div>

          {items.length > 1 && (
            <>
              <button className="gallery-nav gallery-nav-prev" onClick={prev} aria-label="Anterior">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              <button className="gallery-nav gallery-nav-next" onClick={next} aria-label="Siguiente">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {items.length > 1 && (
          <div className="gallery-dots">
            {items.map((_, i) => (
              <button
                key={i}
                className={`gallery-dot ${i === current ? 'active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Elemento ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
