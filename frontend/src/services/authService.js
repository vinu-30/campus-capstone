// Frontend-only registration and authentication service using LocalStorage.
const USERS_KEY = 'campusCapstoneRegisteredUsers';

export function register(user) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  if (users.some((item) => item.email === user.email)) return { success: false, message: 'This email is already registered.' };
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
  return { success: true };
}

export function login({ email, password, role, rememberMe }) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const user = users.find((item) => item.email === email && item.password === password);
  if (!user) return { success: false, message: 'Account not found. Please register before signing in.' };

  // The selected user information persists in localStorage for this frontend demo.
  localStorage.setItem('campusCapstoneUser', JSON.stringify({ ...user, role: user.role || role, rememberMe }));
  return { success: true };
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('campusCapstoneUser') || 'null');
}

export function isAuthenticated() { return Boolean(getCurrentUser()); }

export function logout() { localStorage.removeItem('campusCapstoneUser'); }

export function getRoleDashboard(role) {
  return { Student: '/student/dashboard', 'Project Lead': '/lead/dashboard', 'Faculty Advisor': '/faculty/dashboard', Admin: '/admin/dashboard' }[role] || '/dashboard';
}
