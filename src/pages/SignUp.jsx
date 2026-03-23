import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../store/authSlice';
import { useTranslation } from '../hooks/useTranslation';
import './AuthForm.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ name, email }));
    navigate('/account');
  };

  return (
    <div className="auth-page container animate-fade-in">
      <div className="auth-card glass-panel">
        <h1 className="auth-title">{t('nav_signup')}</h1>
        <p className="auth-subtitle text-secondary">{t('signup_subtitle') || 'Join Lumière and elevate your skincare.'}</p>
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>{t('full_name')}</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="Emma Watson"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
          
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
            <label>{t('password')}</label>
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
            {t('nav_signup')}
          </button>
        </form>
        
        <p className="text-center mt-4" style={{fontSize: '14px'}}>
          {t('already_have_account') || 'Already have an account?'} <Link to="/signin" className="auth-link">{t('nav_signin')}</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
