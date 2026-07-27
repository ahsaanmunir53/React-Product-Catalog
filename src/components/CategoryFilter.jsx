export default function CategoryFilter({ categories, active, onChange, counts }) {
  return (
    <div className="chips" role="group" aria-label="Filter by category">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`chip${cat === active ? ' chip--on' : ''}`}
          onClick={() => onChange(cat)}
          aria-pressed={cat === active}
        >
          {cat}
          {counts && <span className="chip__n">{counts[cat] ?? 0}</span>}
        </button>
      ))}
    </div>
  );
}
