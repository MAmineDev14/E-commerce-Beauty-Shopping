import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer glass-panel">
      <div className="container footer-grid">
        
        <div className="footer-brand">
          <Link to="/" className="logo-text">Lumière</Link>
          <p className="footer-tagline text-secondary mt-3">
            {t('footer_desc')}
          </p>
          <div className="footer-social-vertical">
            <a href="#" className="social-link"><Instagram size={20} /></a>
            <a href="#" className="social-link"><Twitter size={20} /></a>
            <a href="#" className="social-link"><Facebook size={20} /></a>
          </div>
        </div>

        <div className="footer-links">
          <h3>{t('footer_shop')}</h3>
          <ul>
            <li><Link to="/shop">{t('category_cleansers')}</Link></li>
            <li><Link to="/shop">{t('category_serums')}</Link></li>
            <li><Link to="/shop">{t('category_moisturizers')}</Link></li>
            <li><Link to="/shop">{t('category_masks')}</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>{t('footer_info')}</h3>
          <ul>
            <li><Link to="/about">{t('nav_about')}</Link></li>
            <li><Link to="/settings">{t('nav_settings')}</Link></li>
            <li><Link to="/account">{t('nav_account')}</Link></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h3>{t('footer_stay_connected')}</h3>
          <p className="text-secondary mb-3">{t('footer_newsletter_desc')}</p>
          <form className="newsletter-form">
            <input type="email" placeholder={t('email_address')} className="input-field" />
            <button type="submit" className="btn btn-primary mt-2 w-100">{t('subscribe')}</button>
          </form>
        </div>

      </div>
      <div className="footer-bottom container text-center">
        <p className="text-secondary">&copy; 2026 {t('rights_reserved')}</p>
      </div>
    </footer>
  );
};

export default Footer;
