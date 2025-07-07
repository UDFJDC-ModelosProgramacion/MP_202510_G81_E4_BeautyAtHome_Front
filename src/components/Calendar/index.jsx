import React from 'react';
import styles from './styles.module.css';

export default function Calendar({ availability }) {
  if (availability.length === 0) return <p>No hay fechas disponibles.</p>;
  return (
    <div className={styles.calendar}>
      {availability.map(({ date, slots }) => (
        <div key={date} className={styles.day}>
          <strong>{new Date(date).toLocaleDateString()}</strong>
          <div className={styles.slots}>
            {slots.map((h,i) => (
              <span key={i} className={styles.slot}>{h}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
