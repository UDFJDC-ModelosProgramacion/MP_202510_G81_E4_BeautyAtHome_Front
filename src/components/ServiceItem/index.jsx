import React from 'react';
import styles from './styles.module.css';

export default function ServiceItem({ name, description, price, images }) {
  return (
    <div className={styles.service}>
      <h3>{name} — ${price}</h3>
      <p>{description}</p>
      <div className={styles.images}>
        {images.length === 0
          ? <em>No hay imágenes</em>
          : images.map((url,i) => <img key={i} src={url} alt={name + i} />)
        }
      </div>
    </div>
  );
}
