import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../store/productsSlice';
import { Search, X } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import './SearchBar.css';

const SearchBar = ({ closeSearch }) => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state) => state.products);
  const { t } = useTranslation();

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="search-bar animate-slide-down">
      <div className="search-input-container">
        <Search className="search-icon" size={20} />
        <input 
          type="text" 
          className="search-input" 
          placeholder={t('search_placeholder')}
          value={searchQuery}
          onChange={handleSearch}
          autoFocus
        />
        <button className="icon-btn search-close" onClick={closeSearch}>
          <X size={20} />
        </button>
      </div>
      
      <div className="search-suggestions">
        <p className="suggestion-title">{t('trending_searches') || 'Trending Searches'}:</p>
        <div className="suggestion-tags">
          <span className="suggestion-tag" onClick={() => dispatch(setSearchQuery('Serum'))}>Serum</span>
          <span className="suggestion-tag" onClick={() => dispatch(setSearchQuery('Moisturizer'))}>Moisturizer</span>
          <span className="suggestion-tag" onClick={() => dispatch(setSearchQuery('Rose'))}>Rose Water</span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
