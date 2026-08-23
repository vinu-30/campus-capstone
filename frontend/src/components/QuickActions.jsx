// Shortcut buttons for common actions; functionality can be added later.
const actions = [['bi-person-plus-fill', 'Add Student'], ['bi-folder-plus', 'Create Project'], ['bi-diagram-3-fill', 'Form Team'], ['bi-file-earmark-bar-graph-fill', 'View Reports']];
function QuickActions() { return <section className="content-card"><div className="card-heading"><div><h2>Quick Actions</h2><p>Manage your capstone workspace faster</p></div></div><div className="quick-actions">{actions.map(([icon, label]) => <button type="button" className="quick-action" key={label}><i className={`bi ${icon}`} /><span>{label}</span><i className="bi bi-arrow-up-right" /></button>)}</div></section>; }
export default QuickActions;
