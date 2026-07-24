/** Formats a number as Pakistani Rupees, e.g. 24999 -> "Rs 24,999". */
export function formatPrice(value) {
  return 'Rs ' + Number(value).toLocaleString('en-PK');
}

/** Turns 4.65 into "4.7" so ratings line up in the grid. */
export function formatRating(value) {
  return Number(value).toFixed(1);
}
