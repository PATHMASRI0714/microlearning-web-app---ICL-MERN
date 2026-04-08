import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Lock, User, UserPlus } from 'lucide-react';
import './Login.css'; // Reusing login styles for consistency

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register, authError, isAuthenticated, isLoading } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(username, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box glass-panel animate-fade-in">
        <div className="login-header">
          <h1>Create Account</h1>
          <p>Sign up to start your learning journey.</p>
        </div>

        {authError && (
          <div className="auth-error">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <User size={18} className="input-icon" />
            <input 
              type="text" 
              placeholder="Choose a Username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="input-group">
            <Lock size={18} className="input-icon" />
            <input 
              type="password" 
              placeholder="Choose a Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <button type="submit" className="login-btn pulse-button" disabled={isLoading} style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
            {isLoading ? 'Creating...' : <><UserPlus size={18}/> Sign Up</>}
          </button>
        </form>

        <div className="login-footer">
          <p>Already have an account? <Link to="/login" style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>Log In</Link></p>
        </div>
      </div>
    </div>
  );
}
