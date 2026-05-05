import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

// Mock credentials
const USERS = [
  { username: 'devotee', password: 'ram123', role: 'user', name: 'Rama Devotee' },
  { username: 'admin', password: 'hanuman@admin', role: 'admin', name: 'Temple Admin' },
];

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = USERS.find(
      (u) => u.username === form.username && u.password === form.password
    );
    if (found) {
      login(found);
      navigate(found.role === 'admin' ? '/admin' : '/dashboard');
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="login-page animate-fade-in">
      <div className="login-card glass-card">
        <div className="login-header">
          <span className="login-om">🕉️</span>
          <h2>Welcome Back</h2>
          <p>Sign in to your devotee account</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full">Sign In</button>
        </form>

        <div className="login-hint glass-card">
          <p>🧑‍💻 <strong>Demo Credentials:</strong></p>
          <p>User: <code>devotee</code> / <code>ram123</code></p>
          <p>Admin: <code>admin</code> / <code>hanuman@admin</code></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
