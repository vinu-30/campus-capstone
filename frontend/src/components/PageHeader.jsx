// Reusable page heading for future pages that need a consistent title area.
function PageHeader({ title, description, action }) { return <div className="shared-page-header"><div><h1>{title}</h1>{description && <p>{description}</p>}</div>{action}</div>; }
export default PageHeader;
