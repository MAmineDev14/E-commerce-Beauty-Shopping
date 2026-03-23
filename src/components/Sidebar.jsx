import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  X, Home, ShoppingBag, Info, User, Settings, 
  LogOut, Moon, Sun, Instagram, Twitter, Facebook 
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../store/themeSlice';
import { logout } from '../store/authSlice';
import { useTranslation } from '../hooks/useTranslation';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useSelector(state => state.theme);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const handleToggle = () => setIsOpen(!isOpen);
    document.addEventListener('toggle-sidebar', handleToggle);
    return () => document.removeEventListener('toggle-sidebar', handleToggle);
  }, [isOpen]);

  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={closeSidebar}></div>
      <aside className={`sidebar glass-panel ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="logo-text" onClick={closeSidebar}>Lumière</Link>
          <button className="icon-btn" onClick={closeSidebar} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} onClick={closeSidebar}>
            <Home size={20} />
            <span>{t('nav_home')}</span>
          </NavLink>
          <NavLink to="/shop" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} onClick={closeSidebar}>
            <ShoppingBag size={20} />
            <span>{t('nav_shop')}</span>
          </NavLink>
          <NavLink to="/about" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} onClick={closeSidebar}>
            <Info size={20} />
            <span>{t('nav_about')}</span>
          </NavLink>
          
          <div className="nav-divider"></div>
          
          <NavLink to="/account" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} onClick={closeSidebar}>
            <User size={20} />
            <span>{t('nav_account')}</span>
          </NavLink>
          <NavLink to="/settings" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} onClick={closeSidebar}>
            <Settings size={20} />
            <span>{t('nav_settings')}</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          {user ? (
            <button className="nav-item logout-btn" onClick={() => { dispatch(logout()); closeSidebar(); }}>
              <LogOut size={20} />
              <span>{t('nav_disconnect')}</span>
            </button>
          ) : (
            <Link to="/signin" className="nav-item" onClick={closeSidebar}>
              <User size={20} />
              <span>{t('nav_signin')}</span>
            </Link>
          )}

          <button className="theme-toggle-btn" onClick={() => dispatch(toggleTheme())}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </button>

          <div className="social-links">
            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
