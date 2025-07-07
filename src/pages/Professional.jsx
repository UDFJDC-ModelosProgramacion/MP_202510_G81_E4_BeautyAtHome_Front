import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getProfessionalById,
  getServicesByProfessional,
  getReviewsByProfessional,
  getAgendaByProfessional
} from '@/services/ProfessionalService';

import ServiceItem from '@/components/ServiceItem';
import ReviewStars from '@/components/ReviewStars';
import ReviewForm from '@/components/ReviewForm';
import Calendar from '@/components/Calendar';

export default function Professional() {
  const { id } = useParams();
  const nav = useNavigate();

  const [pro, setPro] = useState(null);
  const [services, setServices] = useState([]);
  const [reviews, setReviews]   = useState([]);
  const [agenda, setAgenda]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    Promise.all([
      getProfessionalById(id),
      getServicesByProfessional(id),
      getReviewsByProfessional(id),
      getAgendaByProfessional(id)
    ])
      .then(([p, sv, rv, ag]) => {
        setPro(p);
        setServices(sv);
        setReviews(rv);
        setAgenda(ag);
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando detalle…</p>;
  if (error)   return <p>Error: {JSON.stringify(error)}</p>;
  if (!pro)    return <p>No se encontró el profesional.</p>;

  return (
    <article className="container">
      <button onClick={() => nav(-1)} className="back-btn">&larr; Volver</button>
      <h1>{pro.name}</h1>
      <img src={pro.photoUrl} alt={pro.name} className="detail-photo" />
      <p className='profile-summary'>{pro.summary}</p>

      <section>
        <h2 className='section-title'>Servicios</h2>
        {services.length === 0
          ? <p> No ofrece servicios.</p>
          : services.map(s => <ServiceItem key={s.id} {...s} />)
        }
      </section>

      <section>
  <h2 className="section-title">Reseñas</h2>

  {/* Reseñas previas */}
  <div style={{ marginBottom: '2rem' }}>
    <h3>Reseñas anteriores</h3>
    {reviews.length === 0 ? (
      <p>Sé el primero en opinar.</p>
    ) : (
      reviews.map((r) => (
        <div key={r.id} style={{ marginBottom: '0.8rem' }}>
          <ReviewStars rating={r.rating} />
          <p>{r.comment}</p>
        </div>
      ))
    )}
  </div>

  {/* Formulario de reseña */}
  <div>
    <h3>Escribir una reseña</h3>
    <ReviewForm
      onSubmit={(newRev) => {
        // Aquí es donde les digo que metan lo de las reseñas para el backend si hace falta
        // Si no, simplemente mejoren la alerta
        alert("Gracias por tu reseña: " + JSON.stringify(newRev));
      }}
    />
  </div>
</section>

      <section>
        <h2 className='section-title'>Agenda</h2>
        <Calendar availability={agenda} />
      </section>
    </article>
  );
}