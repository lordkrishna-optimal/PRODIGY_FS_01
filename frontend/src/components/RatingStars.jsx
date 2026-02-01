import React, { useState } from 'react';

export default function RatingStars({ value=0, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map((s) => (
        <button
          key={s}
          type="button"
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange?.(s)}
          className="text-2xl"
          aria-label={`Rate ${s}`}
        >
          <span style={{color: s <= (hover || value) ? '#f59e0b' : '#cbd5e1'}}>
            { s <= (hover || value) ? '★' : '☆' }
          </span>
        </button>
      ))}
    </div>
  );
}
