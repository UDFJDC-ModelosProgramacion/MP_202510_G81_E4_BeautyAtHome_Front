import React from 'react';

export default function ReviewStars({ rating }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span>
      {'★'.repeat(full)}
      {half && '☆'}
      {'☆'.repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
}
