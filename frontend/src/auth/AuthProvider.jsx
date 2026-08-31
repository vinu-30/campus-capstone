// Context provider handling fake login tokens, remembered sessions, and expiry.
import { useCallback, useMemo, useState } from 'react';
import AuthContext from './AuthContext';
import { getCurrentUser, logout as clearSession } from '../services/authService';

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser());
  const syncUser = useCallback(() => setUser(getCurrentUser()), []);
  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, isAuthenticated: Boolean(user), syncUser, logout }), [user, syncUser, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
