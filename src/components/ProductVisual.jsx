import { useState } from 'react';

/**
 * Shows the product picture.
 *
 * - If the product has an `image` value in products.json, that photo is shown.
 * - If it doesn't (or the photo fails to load), a drawn schematic is shown
 *   instead, tinted with the product's own `swatch` colour.
 *
 * That means the catalogue always renders something, with or without photos.
 */
export default function ProductVisual({ category, swatch, sku, image, name }) {
  const [broken, setBroken] = useState(false);

  // ---- Photo path: used as soon as `image` has a value ----
  if (image && !broken) {
    return (
      <div className="visual visual--photo" style={{ '--swatch': swatch }}>
        <img
          src={image}
          alt={name || category}
          loading="lazy"
          onError={() => setBroken(true)}  // fall back to the drawing
        />
        <span className="visual__sku">{sku}</span>
      </div>
    );
  }

  // ---- Fallback path: a simple schematic per category ----
  const shapes = {
    Audio: (
      <>
        <circle cx="60" cy="70" r="26" />
        <circle cx="140" cy="70" r="26" />
        <path d="M60 44 A50 50 0 0 1 140 44" fill="none" strokeWidth="7" />
      </>
    ),
    Desk: (
      <>
        <rect x="34" y="46" width="132" height="42" rx="7" />
        <rect x="46" y="96" width="108" height="8" rx="4" opacity=".5" />
        <rect x="70" y="58" width="60" height="18" rx="4" opacity=".35" fill="#fff" />
      </>
    ),
    Carry: (
      <>
        <path d="M62 52h76a14 14 0 0 1 14 14v40a14 14 0 0 1-14 14H62a14 14 0 0 1-14-14V66a14 14 0 0 1 14-14Z" />
        <path d="M78 52a22 22 0 0 1 44 0" fill="none" strokeWidth="7" />
        <rect x="78" y="84" width="44" height="10" rx="5" opacity=".4" fill="#fff" />
      </>
    ),
    Power: (
      <>
        <rect x="58" y="40" width="84" height="76" rx="14" />
        <rect x="84" y="20" width="10" height="24" rx="4" />
        <rect x="106" y="20" width="10" height="24" rx="4" />
        <rect x="76" y="66" width="48" height="10" rx="5" opacity=".45" fill="#fff" />
      </>
    ),
    Wearables: (
      <>
        <rect x="70" y="44" width="60" height="68" rx="16" />
        <rect x="84" y="18" width="32" height="30" rx="10" opacity=".55" />
        <rect x="84" y="108" width="32" height="30" rx="10" opacity=".55" />
        <circle cx="100" cy="78" r="13" opacity=".4" fill="#fff" />
      </>
    ),
  };

  return (
    <div className="visual" style={{ '--swatch': swatch }}>
      <svg viewBox="0 0 200 150" role="img" aria-label={`${category} product illustration`}>
        <g fill={swatch} stroke={swatch} strokeLinecap="round">
          {shapes[category] || shapes.Desk}
        </g>
      </svg>
      <span className="visual__sku">{sku}</span>
    </div>
  );
}
