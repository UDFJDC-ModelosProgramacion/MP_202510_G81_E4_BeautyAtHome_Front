import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const ProfessionalCard = ({ id, name, photoUrl, summary, sponsor }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/professionals/${id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img src={photoUrl} alt={name} className={styles.image} />
      <h3>{name}</h3>
      <p>{summary}</p>
      {sponsor && <span className={styles.sponsor}>PATROCINADO</span>}
    </div>
  );
};

export default ProfessionalCard;


