import React from "react";
import styles from "./styles.module.css";

export default function ReviewList({ reviews }) {
  return (
    <div className={styles.reviewList}>
      <h2 className={styles.reviewTitle}>Reseñas</h2>
      <div className={styles.reviewContainer}>
        {reviews.length === 0 ? (
          <p>No hay reseñas todavía.</p>
        ) : (
          reviews.map((r, i) => (
            <div key={i} className={styles.reviewItem}>
              <div className={styles.stars}>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</div>
              <p>{r.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
