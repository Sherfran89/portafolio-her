import React, { useState } from 'react';
import styles from './LazyImage.module.css';

export default function LazyImage({ src, alt, className = '', ...props }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`${styles.imageWrapper} ${loaded ? styles.loaded : ''} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`${styles.image} ${loaded ? styles.loaded : ''}`}
        {...props}
      />
    </div>
  );
}
