import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../api/api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await loginAdmin({ username, password });
      if (res.data) {
        localStorage.setItem('admin', JSON.stringify(res.data));
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid username or password');
    }
    setLoading(false);
  };

  return (
    <div style={styles.wrapper}>
      {/* Left Panel */}
      <div style={styles.leftPanel}>
        <div style={styles.leftContent}>
          <div style={styles.logo}>🛍️</div>
          <h1 style={styles.brandName}>Shopping mall Admin</h1>
          <p style={styles.brandTagline}>
            Complete Mall Management Solution
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div style={styles.rightPanel}>
        <div style={styles.loginBox}>
          <div style={styles.loginHeader}>
            <h2 style={styles.loginTitle}>Welcome Back</h2>
            <p style={styles.loginSubtitle}>Sign in to your admin account</p>
          </div>

          {error && (
            <div style={styles.errorBox}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Username</label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>👤</span>
                <input
                  style={styles.input}
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <span style={styles.inputIcon}>🔒</span>
                <input
                  style={styles.input}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              style={loading ? styles.btnLoading : styles.btn}
              type="submit"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <p style={styles.footer}>
            Shopping mall Admin System © 2026
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    minHeight: '100vh',
  },
  leftPanel: {
    flex: 1,
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0f3460 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  leftContent: {
    color: 'white',
    textAlign: 'center',
  },
  logo: {
    fontSize: '80px',
    marginBottom: '20px',
  },
  brandName: {
    fontSize: '42px',
    fontWeight: '800',
    marginBottom: '10px',
    background: 'linear-gradient(90deg, #ff6b6b, #4ecdc4)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    filter: 'brightness(1.1)',
  },
  brandTagline: {
    fontSize: '16px',
    opacity: '0.8',
    marginBottom: '40px',
  },
  features: {
    textAlign: 'left',
    display: 'inline-block',
  },
  featureItem: {
    fontSize: '15px',
    padding: '8px 0',
    opacity: '0.9',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  rightPanel: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    padding: '40px',
  },
  loginBox: {
    backgroundColor: '#2a2a2a',
    padding: '50px',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
    width: '100%',
    maxWidth: '420px',
  },
  loginHeader: {
    marginBottom: '30px',
  },
  loginTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '8px',
  },
  loginSubtitle: {
    color: '#999',
    fontSize: '14px',
  },
  errorBox: {
    backgroundColor: '#fff5f5',
    border: '1px solid #feb2b2',
    color: '#c53030',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#e0e0e0',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    border: '2px solid #444',
    borderRadius: '10px',
    overflow: 'hidden',
    transition: 'border 0.3s',
  },
  inputIcon: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#333',
    borderRight: '2px solid #444',
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    border: 'none',
    outline: 'none',
    fontSize: '15px',
    color: '#ffffff',
    backgroundColor: '#1a1a1a',
  },
  btn: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'opacity 0.3s',
  },
  btnLoading: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#999',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    cursor: 'not-allowed',
    marginTop: '10px',
  },
  footer: {
    textAlign: 'center',
    marginTop: '30px',
    color: '#666',
    fontSize: '12px',
  },
};

export default Login;