// Redirects visitors to Login unless a valid local demo session exists.
import { Navigate,useLocation } from 'react-router-dom';import useAuth from './useAuth';function ProtectedRoute({children}){const{isAuthenticated}=useAuth(),location=useLocation();return isAuthenticated?children:<Navigate to="/login" replace state={{from:location}}/>}export default ProtectedRoute;
