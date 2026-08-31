// Controlled login form with Bootstrap validation feedback and dummy login handling.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRoleDashboard, login } from '../services/authService';

function LoginForm({ selectedRole }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setValidated(true);

    if (!form.checkValidity()) return;
    const response = login({ ...formData, role: selectedRole });

    if (!response.success) {
      setError(response.message);
      return;
    }

    navigate(getRoleDashboard(selectedRole));
  };

  return (
    <form className={`needs-validation ${validated ? 'was-validated' : ''}`} noValidate onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger d-flex gap-2 align-items-center" role="alert"><i className="bi bi-exclamation-circle-fill" />{error}</div>}
      <div className="mb-3">
        <label className="form-label" htmlFor="email">Email address</label>
        <div className="input-group">
          <span className="input-group-text"><i className="bi bi-envelope" /></span>
          <input className="form-control" id="email" name="email" type="email" placeholder="name@gmail.com" value={formData.email} onChange={handleChange} required />
          <div className="invalid-feedback">Please enter a valid email address.</div>
        </div>
      </div>
      <div className="mb-3">
        <div className="d-flex justify-content-between"><label className="form-label" htmlFor="password">Password</label><button type="button" className="forgot-link">Forgot Password?</button></div>
        <div className="input-group">
          <span className="input-group-text"><i className="bi bi-lock" /></span>
          <input className="form-control" id="password" name="password" type="password" placeholder="Enter your password" minLength="6" value={formData.password} onChange={handleChange} required />
          <div className="invalid-feedback">Password must contain at least 6 characters.</div>
        </div>
      </div>
      <div className="form-check mb-4"><input className="form-check-input" id="rememberMe" name="rememberMe" type="checkbox" checked={formData.rememberMe} onChange={handleChange} /><label className="form-check-label" htmlFor="rememberMe">Remember me</label></div>
      <button className="btn login-button w-100" type="submit">Login <i className="bi bi-arrow-right" /></button>
      <p className="demo-note"><i className="bi bi-info-circle" /> Please register first before signing in.</p>
    </form>
  );
}

export default LoginForm;
