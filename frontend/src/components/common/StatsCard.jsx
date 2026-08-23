// Reusable metric card for future dashboards.
function StatsCard({label,value,icon='bi-bar-chart-fill'}){return <article className="ui-stat"><i className={`bi ${icon}`}/><p>{label}</p><strong>{value}</strong></article>}export default StatsCard;
