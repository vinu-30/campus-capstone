// Compact analytics card using a Bootstrap progress bar.
function AnalyticsCard({title,value,detail}){return <article className="analytics-card"><div><h3>{title}</h3><strong>{value}%</strong></div><p>{detail}</p><div className="progress"><div className="progress-bar" style={{width:`${value}%`}}/></div></article>};export default AnalyticsCard;
