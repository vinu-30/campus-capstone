// Reusable selectable card used to display a possible user role.
function RoleCard({ role, icon, description, selected, onSelect }) {
  return (
    <button
      type="button"
      className={`role-card ${selected ? 'selected' : ''}`}
      onClick={() => onSelect(role)}
      aria-pressed={selected}
    >
      <i className={`bi ${icon}`} />
      <span><strong>{role}</strong><small>{description}</small></span>
      {selected && <i className="bi bi-check-circle-fill role-check" />}
    </button>
  );
}

export default RoleCard;
