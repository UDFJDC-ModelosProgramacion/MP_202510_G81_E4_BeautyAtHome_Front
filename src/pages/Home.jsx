import React, { useEffect, useState } from 'react';
import ProfessionalCard from '@/components/ProfessionalCard';
import { getProfessionals } from '@/services/ProfessionalService';

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProfessionals()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando profesionales…</p>;
  if (error)   return <p>Error: {error}</p>;
  if (data.length === 0) return <p>No hay profesionales.</p>;

  return (
    <main className="container">
      <h1>Beauty at Home</h1>
      <p>Servicios de belleza especializados desde la
comodidad del hogar</p>
      <div className="grid">
        {data.map(p => <ProfessionalCard key={p.id} {...p} />)}
      </div>
    </main>
  );
}
