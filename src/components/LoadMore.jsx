export default function LoadMore({ shown, total, onLoadMore, step }) {
  if (shown >= total) {
    return total > 0 ? (
      <p className="loadmore__done">All {total} products shown.</p>
    ) : null;
  }

  const remaining = total - shown;
  return (
    <div className="loadmore">
      <p className="loadmore__meta">
        Showing {shown} of {total}
      </p>
      <button className="btn btn--outline" onClick={onLoadMore}>
        Load {Math.min(step, remaining)} more
      </button>
    </div>
  );
}
