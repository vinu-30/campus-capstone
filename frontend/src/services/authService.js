// Handles authentication through the backend REST API.
import api from './api';

// Register a new user through the backend.
export async function register(user) {
  try {
    const response = await api.post('/auth/register', {
      full_name: user.fullName,
      email: user.email,
      password: user.password,
      role: user.role,
    });

    return {
      success: true,
      message: response.data.message,
      userId: response.data.userId,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        'Registration failed. Please try again.',
    };
  }
}

// Login through the backend.
export async function login({ email, password, role, rememberMe }) {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });

    const { token, user } = response.data;

    // Store the JWT token.
    localStorage.setItem('campusCapstoneToken', token);

    // Store the authenticated user.
    localStorage.setItem(
      'campusCapstoneUser',
      JSON.stringify({
        ...user,
        role: user.role || role,
        rememberMe,
      })
    );

    return {
      success: true,
      user,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        'Login failed. Please check your email and password.',
    };
  }
}

// Get the currently logged-in user.
export function getCurrentUser() {
  return JSON.parse(
    localStorage.getItem('campusCapstoneUser') || 'null'
  );
}

// Check whether a user is authenticated.
export function isAuthenticated() {
  return Boolean(
    localStorage.getItem('campusCapstoneToken') &&
    getCurrentUser()
  );
}

// Logout the current user.
export function logout() {
  localStorage.removeItem('campusCapstoneToken');
  localStorage.removeItem('campusCapstoneUser');
}

// Get the dashboard URL based on the user's role.
export function getRoleDashboard(role) {
  return {
    Student: '/student/dashboard',
    'Project Lead': '/lead/dashboard',
    'Faculty Advisor': '/faculty/dashboard',
    Admin: '/admin/dashboard',
  }[role] || '/dashboard';
}