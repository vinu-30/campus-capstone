// Generates simple breadcrumb navigation from the active URL path.
import { Link, useLocation } from 'react-router-dom';

function Breadcrumbs() {
  const { pathname } = useLocation();
  const labels = pathname.split('/').filter(Boolean).map((part) => part.replaceAll('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()));
  if (pathname === '/dashboard' || pathname === '/student/dashboard' || pathname === '/lead/dashboard' || pathname === '/faculty/dashboard' || pathname === '/admin/dashboard') return null;
  return <nav className="app-breadcrumb" aria-label="Breadcrumb"><Link to="/dashboard">Home</Link>{labels.map((label, index) => <span key={`${label}-${index}`}><i className="bi bi-chevron-right" />{label}</span>)}</nav>;
}

export default Breadcrumbs;
