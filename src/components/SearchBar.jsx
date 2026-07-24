/** Controlled search input. State lives in the Products page. */
export default function SearchBar({ value, onChange, resultCount }) {
  return (
    <div className="search">
      <svg className="search__icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="7" fill="none" strokeWidth="2" />
        <path d="m20 20-3.5-3.5" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        id="product-search"
        className="search__input"
        type="search"
        placeholder="Search by name or category"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search products"
      />
      {value && (
        <button className="search__clear" onClick={() => onChange('')} aria-label="Clear search">
          ×
        </button>
      )}
      {value && (
        <span className="search__count">
          {resultCount} {resultCount === 1 ? 'match' : 'matches'}
        </span>
      )}
    </div>
  );
}
