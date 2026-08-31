// Reusable summary card for Project Lead dashboard statistics.
function StatsCard({ label, value, icon, color }) { return <article className="lead-stat"><div><p>{label}</p><h2>{value}</h2></div><i className={`bi ${icon} ${color}`} /></article>; }
export default StatsCard;
