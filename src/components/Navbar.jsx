import React, { useState } from 'react';
import { Menu, Search, ShoppingBag, Globe } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { setLocale } from '../store/localeSlice';
import { useTranslation } from '../hooks/useTranslation';
import './Navbar.css';

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { totalQuantity } = useSelector(state => state.cart);
  const { locale } = useSelector(state => state.locale);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleLangChange = (e) => {
    dispatch(setLocale(e.target.value));
  };

  return (
    <>
      <nav className="navbar glass-panel">
        <div className="container nav-content">
          <button 
            className="icon-btn" 
            onClick={() => {
              const event = new Event('toggle-sidebar');
              document.dispatchEvent(event);
            }}
            aria-label={t('nav_menu') || 'Menu'}
          >
            <Menu size={24} />
          </button>

          <Link to="/" className="logo-text">Lumière</Link>

          <div className="nav-actions">
            <div className="lang-switcher">
              <Globe size={16} />
              <select className="lang-select" value={locale} onChange={handleLangChange}>
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="ar">AR</option>
              </select>
            </div>
          
            <button 
              className="icon-btn" 
              onClick={() => setShowSearch(!showSearch)}
              aria-label={t('search_label') || 'Search'}
            >
              <Search size={24} />
            </button>
            <button 
              className="icon-btn cart-btn" 
              onClick={() => {
                const event = new Event('toggle-cart');
                document.dispatchEvent(event);
              }}
              aria-label={t('your_cart') || 'Cart'}
            >
              <ShoppingBag size={24} />
              {totalQuantity > 0 && (
                <span className="cart-badge">{totalQuantity}</span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {showSearch && (
        <div className="search-overlay glass-panel animate-fade-in">
          <div className="container">
            <SearchBar closeSearch={() => setShowSearch(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
