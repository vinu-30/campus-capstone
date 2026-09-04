import api from './api';
export async function register({ fullName, email, password, role }) { try { const { data } = await api.post('/users/register', { full_name: fullName, email, password, role }); return { success: true, user: data.data }; } catch (error) { return { success: false, message: error.response?.data?.message || 'Unable to register. Please try again.' }; } }
export async function login({ email, password, rememberMe }) { try { const { data } = await api.post('/users/login', { email, password }); const user = data.data; localStorage.setItem('campusCapstoneUser', JSON.stringify({ ...user, rememberMe })); return { success: true, user }; } catch (error) { return { success: false, message: error.response?.data?.message || 'Unable to sign in. Please check the backend server.' }; } }
export function getCurrentUser() { return JSON.parse(localStorage.getItem('campusCapstoneUser') || 'null'); }
export function isAuthenticated() { return Boolean(getCurrentUser()); }
export function logout() { localStorage.removeItem('campusCapstoneUser'); }
export function getRoleDashboard(role) { return { Student: '/student/dashboard', 'Project Lead': '/lead/dashboard', 'Faculty Advisor': '/faculty/dashboard', Admin: '/admin/dashboard' }[role] || '/dashboard'; }
