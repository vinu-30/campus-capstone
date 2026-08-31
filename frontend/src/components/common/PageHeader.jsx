// Consistent page title and optional action area.
function PageHeader({title,description,action}){return <div className="ui-page-header"><div><h1>{title}</h1><p>{description}</p></div>{action}</div>}export default PageHeader;
