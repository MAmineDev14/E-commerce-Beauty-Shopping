import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../store/authSlice';
import { useTranslation } from '../hooks/useTranslation';
import './AuthForm.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ name: 'Guest User', email }));
    navigate('/account');
  };

  return (
    <div className="auth-page container animate-fade-in">
      <div className="auth-card glass-panel">
        <h1 className="auth-title">{t('nav_signin')}</h1>
        <p className="auth-subtitle text-secondary">Welcome back to Lumière</p>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>{t('email_address')}</label>
            <input 
              type="email" 
              className="input-field" 
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="input-group">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <label style={{marginBottom: 0}}>Password</label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
            <input 
              type="password" 
              className="input-field" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-100 mt-3" style={{padding: '12px', fontSize: '14px'}}>
            {t('nav_signin')}
          </button>
        </form>
        
        <p className="text-center mt-4" style={{fontSize: '14px'}}>
          Don't have an account? <Link to="/signup" className="auth-link">{t('nav_signup')}</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
