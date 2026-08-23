// Friendly fallback page for unknown frontend routes.
import { Link } from 'react-router-dom';function NotFound(){return <main className="auth-message"><i className="bi bi-compass-fill"/><h1>Page Not Found</h1><p>The requested page does not exist.</p><Link className="btn btn-primary" to="/login">Return to Login</Link></main>}export default NotFound;
