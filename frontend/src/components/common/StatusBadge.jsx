// Standard colored status label.
function StatusBadge({status}){const tone=String(status).toLowerCase().includes('active')||String(status).toLowerCase().includes('approved')?'success':String(status).toLowerCase().includes('pending')?'warning':'secondary';return <span className={`badge text-bg-${tone}`}>{status}</span>}export default StatusBadge;
