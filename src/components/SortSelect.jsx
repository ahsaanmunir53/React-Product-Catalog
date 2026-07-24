import { SORT_OPTIONS } from '../utils/filterProducts';

export default function SortSelect({ value, onChange }) {
  return (
    <label className="sort">
      <span className="sort__label">Sort</span>
      <select
        className="sort__select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Sort products"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}
