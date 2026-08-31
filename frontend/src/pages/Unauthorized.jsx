// Friendly screen for users without permission to open a route.
import { Link } from 'react-router-dom';function Unauthorized(){return <main className="auth-message"><i className="bi bi-shield-lock-fill"/><h1>Unauthorized Access</h1><p>You do not have permission to open this page.</p><Link className="btn btn-primary" to="/login">Return to Login</Link></main>}export default Unauthorized;
