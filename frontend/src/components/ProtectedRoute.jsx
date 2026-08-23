// Protects a route by checking the locally stored demo session and user role.
import { Navigate, useLocation } from 'react-router-dom';
import { getCurrentUser, getRoleDashboard } from '../services/authService';

function ProtectedRoute({ allowedRole, children }) {
  const location = useLocation();
  const user = getCurrentUser();
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  if (allowedRole && user.role !== allowedRole) return <Navigate to={getRoleDashboard(user.role)} replace />;
  return children;
}

export default ProtectedRoute;
