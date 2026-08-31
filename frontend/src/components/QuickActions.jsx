// Shortcut buttons for common actions.
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';

const roleActions = {
  Admin: [
    ['bi-person-plus-fill', 'Add Student', '/admin/users'],
    ['bi-folder-plus', 'Create Project', '/admin/projects'],
    ['bi-diagram-3-fill', 'Form Team', '/admin/teams'],
    ['bi-file-earmark-bar-graph-fill', 'View Reports', '/admin/reports'],
  ],
  'Project Lead': [
    ['bi-person-plus-fill', 'Review Applications', '/lead/applications'],
    ['bi-folder-plus', 'Create Project', '/lead/create-project'],
    ['bi-diagram-3-fill', 'Form Team', '/lead/team'],
    ['bi-file-earmark-bar-graph-fill', 'View Projects', '/lead/projects'],
  ],
  'Faculty Advisor': [
    ['bi-person-plus-fill', 'Student Progress', '/faculty/students'],
    ['bi-folder-plus', 'Review Projects', '/faculty/projects'],
    ['bi-diagram-3-fill', 'Evaluate Team', '/faculty/evaluation'],
    ['bi-file-earmark-bar-graph-fill', 'View Reports', '/faculty/reports'],
  ],
  Student: [
    ['bi-person-plus-fill', 'Update Profile', '/student/profile'],
    ['bi-folder-plus', 'Find Projects', '/student/projects'],
    ['bi-diagram-3-fill', 'My Team', '/student/team'],
    ['bi-file-earmark-bar-graph-fill', 'Dashboard', '/student/dashboard'],
  ],
};

function QuickActions() {
  const navigate = useNavigate();
  const actions = roleActions[getCurrentUser()?.role] || roleActions.Student;

  return <section className="content-card"><div className="card-heading"><div><h2>Quick Actions</h2><p>Manage your capstone workspace faster</p></div></div><div className="quick-actions">{actions.map(([icon, label, path]) => <button type="button" className="quick-action" key={label} onClick={() => navigate(path)}><i className={`bi ${icon}`} /><span>{label}</span><i className="bi bi-arrow-up-right" /></button>)}</div></section>;
}
export default QuickActions;
