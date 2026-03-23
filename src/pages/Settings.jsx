import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSettings, updateUser } from '../store/authSlice';
import { setTheme } from '../store/themeSlice';
import { setLocale } from '../store/localeSlice';
import { useTranslation } from '../hooks/useTranslation';
import { Bell, Palette, User, Package, MapPin, CreditCard, Camera } from 'lucide-react';
import './Settings.css';

const Settings = () => {
  const { settings, user } = useSelector(state => state.auth);
  const { theme } = useSelector(state => state.theme);
  const { locale } = useSelector(state => state.locale);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [editAccount, setEditAccount] = useState(false);
  const [accountForm, setAccountForm] = useState({ name: user?.name || '', email: user?.email || '', password: '' });

  const handleToggle = (key) => {
    dispatch(updateSettings({ [key]: !settings[key] }));
  };

  const handleThemeChange = (e) => {
    dispatch(setTheme(e.target.value));
  };

  const handleLocaleChange = (e) => {
    dispatch(setLocale(e.target.value));
  };

  const handleSaveAccount = (e) => {
    e.preventDefault();
    dispatch(updateUser({ name: accountForm.name, email: accountForm.email }));
    setEditAccount(false);
  };

  return (
    <div className="settings-page container animate-fade-in">
      <div className="settings-header">
        <h1 className="settings-title">{t('settings_title')}</h1>
        <p className="settings-subtitle">{t('settings_subtitle')}</p>
      </div>

      <div className="settings-dashboard">
        
        {/* ACCOUNT INFO */}
        <div className="settings-card glass-panel">
          <div className="settings-card-header">
            <h2><User size={20} className="text-accent" /> {t('account_info')}</h2>
          </div>
          
          <div className="avatar-upload">
            <div className="avatar-circle">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <button className="avatar-btn"><Camera size={14} style={{display:'inline', marginRight:'4px'}}/> {t('upload_pic')}</button>
              <p className="text-secondary mt-1" style={{fontSize: '11px'}}>{t('upload_desc')}</p>
            </div>
          </div>

          {!editAccount ? (
            <div className="settings-row">
              <div className="settings-group">
                <div className="settings-info">
                  <h3>{t('full_name')}</h3>
                  <p>{user?.name || 'Guest User'}</p>
                </div>
              </div>
              <div className="settings-group">
                <div className="settings-info">
                  <h3>{t('email_address')}</h3>
                  <p>{user?.email || 'guest@example.com'}</p>
                </div>
              </div>
              <div className="settings-group">
                <div className="settings-info">
                  <h3>{t('password')}</h3>
                  <p>********</p>
                </div>
              </div>
              <button 
                className="btn btn-outline" 
                style={{width: 'fit-content'}}
                onClick={() => setEditAccount(true)}
              >
                {t('edit_account_btn')}
              </button>
            </div>
          ) : (
            <form className="settings-row" onSubmit={handleSaveAccount}>
              <div className="input-group">
                <label>{t('full_name')}</label>
                <input type="text" className="input-field" value={accountForm.name} onChange={e => setAccountForm({...accountForm, name: e.target.value})} required />
              </div>
              <div className="input-group">
                <label>{t('email_address')}</label>
                <input type="email" className="input-field" value={accountForm.email} onChange={e => setAccountForm({...accountForm, email: e.target.value})} required />
              </div>
              <div className="input-group">
                <label>{t('new_password')}</label>
                <input type="password" className="input-field" value={accountForm.password} onChange={e => setAccountForm({...accountForm, password: e.target.value})} />
              </div>
              <div style={{display:'flex', gap:'8px'}}>
                <button type="submit" className="btn btn-primary">{t('save_changes')}</button>
                <button type="button" className="btn btn-outline" onClick={() => setEditAccount(false)}>{t('cancel')}</button>
              </div>
            </form>
          )}
        </div>

        {/* ORDER MANAGEMENT */}
        <div className="settings-card glass-panel">
          <div className="settings-card-header">
            <h2><Package size={20} className="text-accent" /> {t('order_management')}</h2>
          </div>
          <div className="settings-empty-state">
            <Package size={32} className="text-secondary" />
            <p>{t('no_orders')}</p>
            <button className="btn btn-outline">{t('track_order')}</button>
          </div>
        </div>

        {/* ADDRESS MANAGEMENT */}
        <div className="settings-card glass-panel">
          <div className="settings-card-header">
            <h2><MapPin size={20} className="text-accent" /> {t('address_management')}</h2>
          </div>
          <div className="settings-empty-state">
            <p>{t('no_addresses')}</p>
            <button className="btn btn-primary">{t('add_address')}</button>
          </div>
        </div>

        {/* PAYMENT SETTINGS */}
        <div className="settings-card glass-panel">
          <div className="settings-card-header">
            <h2><CreditCard size={20} className="text-accent" /> {t('payment_methods')}</h2>
          </div>
          <div className="settings-empty-state">
            <p>{t('no_payments')}</p>
            <button className="btn btn-outline">{t('add_payment')}</button>
          </div>
        </div>

        {/* NOTIFICATIONS */}
        <div className="settings-card glass-panel">
          <div className="settings-card-header">
            <h2><Bell size={20} className="text-accent" /> {t('notifications')}</h2>
          </div>
          <div className="settings-row">
            <div className="settings-group">
              <div className="settings-info">
                <h3>{t('order_updates')}</h3>
                <p>{t('order_updates_desc')}</p>
              </div>
              <div className="settings-action">
                <label className="toggle-switch">
                  <input type="checkbox" checked={settings.notifications} onChange={() => handleToggle('notifications')} />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
            <div className="settings-group">
              <div className="settings-info">
                <h3>{t('newsletter_toggle')}</h3>
                <p>{t('newsletter_toggle_desc')}</p>
              </div>
              <div className="settings-action">
                <label className="toggle-switch">
                  <input type="checkbox" checked={settings.newsletter} onChange={() => handleToggle('newsletter')} />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* PREFERENCES */}
        <div className="settings-card glass-panel">
          <div className="settings-card-header">
            <h2><Palette size={20} className="text-accent" /> {t('appearance')}</h2>
          </div>
          <div className="settings-row">
            <div className="settings-group">
              <div className="settings-info">
                <h3>{t('website_theme')}</h3>
                <p>{t('theme_desc')}</p>
              </div>
              <div className="settings-action">
                <select className="input-field settings-select" value={theme} onChange={handleThemeChange}>
                  <option value="light">Light Mode (Soft Cream)</option>
                  <option value="dark">Dark Mode (Midnight)</option>
                </select>
              </div>
            </div>
            <div className="settings-group">
              <div className="settings-info">
                <h3>{t('language')}</h3>
                <p>{t('language_desc')}</p>
              </div>
              <div className="settings-action">
                <select className="input-field settings-select" value={locale} onChange={handleLocaleChange}>
                  <option value="en">English (EN)</option>
                  <option value="fr">Français (FR)</option>
                  <option value="ar">العربية (AR)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;
