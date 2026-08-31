// Reusable summary card used for each dashboard statistic.
function StatCard({ title, value, icon, color, change }) { return <article className="stat-card"><div><p>{title}</p><h2>{value}</h2><span className="trend"><i className="bi bi-arrow-up" /> {change} <small>vs last month</small></span></div><div className={`stat-icon ${color}`}><i className={`bi ${icon}`} /></div></article>; }
export default StatCard;
