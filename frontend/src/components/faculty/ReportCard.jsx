// Compact report metric with a Bootstrap progress indicator.
function ReportCard({title,value,detail,color='bg-primary'}){return <article className="report-card"><div><h3>{title}</h3><strong>{value}%</strong></div><p>{detail}</p><div className="progress"><div className={`progress-bar ${color}`} style={{width:`${value}%`}}/></div></article>};export default ReportCard;
