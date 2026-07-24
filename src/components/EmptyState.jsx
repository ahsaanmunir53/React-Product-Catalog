export default function EmptyState({ title, body, actionLabel, onAction }) {
  return (
    <div className="empty">
      <div className="empty__mark" aria-hidden="true">◍</div>
      <h3 className="empty__title">{title}</h3>
      <p className="empty__body">{body}</p>
      {actionLabel && onAction && (
        <button className="btn" onClick={onAction}>{actionLabel}</button>
      )}
    </div>
  );
}
