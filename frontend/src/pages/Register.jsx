// Registration page that creates a real account through the backend API.
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/authService';

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'Student',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();

    setError('');

    if (form.password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    setLoading(true);

    const result = await register(form);

    setLoading(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate('/login', {
      state: {
        message: 'Registration successful. Please sign in.',
      },
    });
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-brand">
          <div className="login-logo">
            <i className="bi bi-person-plus-fill" />
          </div>

          <p>Campus Capstone</p>

          <h1>Create your account</h1>

          <p className="login-subtitle">
            Register before accessing the platform.
          </p>
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={submit}>
          <input
            className="form-control mb-3"
            placeholder="Full name"
            required
            value={form.fullName}
            onChange={(e) =>
              setForm({
                ...form,
                fullName: e.target.value,
              })
            }
          />

          <input
            className="form-control mb-3"
            type="email"
            placeholder="Email address"
            required
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          <input
            className="form-control mb-3"
            type="password"
            placeholder="Password (minimum 6 characters)"
            required
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value,
              })
            }
          />

          <select
            className="form-select mb-4"
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
          >
            <option>Student</option>
            <option>Project Lead</option>
            <option>Faculty Advisor</option>
            <option>Admin</option>
          </select>

          <button
            type="submit"
            className="btn login-button w-100"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="demo-note">
          Already registered? <Link to="/login">Sign in</Link>
        </p>
      </section>
    </main>
  );
}

export default Register;
