import React, { useState } from "react";
import styles from "./styles.module.css";

export default function ReviewForm({ onSubmit }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [improvement, setImprovement] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullComment = rating === 1 && improvement
      ? `${comment}\n\nLo que se puede mejorar: ${improvement}`
      : comment;
    onSubmit({ rating, comment: fullComment });
    setComment("");
    setImprovement("");
    setRating(5);
  };

  const getMessage = () => {
    switch (rating) {
      case 5: return "¡Excelente trabajo!";
      case 4: return "Muy profesional.";
      case 3: return "Un buen servicio.";
      case 2: return "Podría mejorar.";
      case 1: return "No fue una buena experiencia.";
      default: return "";
    }
  };

  return (
    <div className={styles.reviewSection}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Calificación:
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[5, 4, 3, 2, 1].map((star) => (
              <option key={star} value={star}>
                {star}★
              </option>
            ))}
          </select>
        </label>

        <div className={styles.dynamicMessage}>
          <em>{getMessage()}</em>
        </div>

        {rating === 1 && (
          <textarea
            placeholder="¿Cuéntanos qué puede mejorar?"
            value={improvement}
            onChange={(e) => setImprovement(e.target.value)}
          />
        )}

        <textarea
          placeholder="Escribe tu reseña..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button type="submit">Agregar reseña</button>
      </form>
    </div>
  );
}


