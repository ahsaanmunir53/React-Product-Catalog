import { formatRating } from '../utils/format';

/** Five stars with a partial fill, plus the numeric score. */
export default function Rating({ value, reviews, size = 'sm' }) {
  const pct = (value / 5) * 100;
  return (
    <span className={`rating rating--${size}`}>
      <span className="rating__stars" aria-hidden="true">
        <span className="rating__base">★★★★★</span>
        <span className="rating__fill" style={{ width: `${pct}%` }}>★★★★★</span>
      </span>
      <span className="rating__value">{formatRating(value)}</span>
      {reviews != null && <span className="rating__count">({reviews})</span>}
    </span>
  );
}
