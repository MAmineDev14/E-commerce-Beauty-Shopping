import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearSearch, setActiveCategory } from '../store/productsSlice';
import { Search, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useTranslation } from '../hooks/useTranslation';
import './Shop.css';

const Shop = () => {
  const { items, searchQuery, activeCategory } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const categories = [
    { key: 'All', label: 'category_all' },
    { key: 'Cleansers', label: 'category_cleansers' },
    { key: 'Serums', label: 'category_serums' },
    { key: 'Moisturizers', label: 'category_moisturizers' },
    { key: 'Masks', label: 'category_masks' },
    { key: 'Oils', label: 'category_oils' }
  ];

  // Filter items
  const filteredProducts = items.filter(product => {
    // Note: product.category still uses English for internal logic
    const matchCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchSearch = t(product.name).toLowerCase().includes(searchQuery.toLowerCase()) || 
                        t(product.description).toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="shop-page container animate-fade-in pb-5">
      <div className="shop-header">
        <h1 className="shop-title">{t('shop_title')}</h1>
        <p className="shop-subtitle text-secondary">{t('shop_subtitle')}</p>
      </div>

      <div className="shop-layout">
        
        {/* Sidebar Filters */}
        <aside className="shop-sidebar glass-panel">
          <div className="filter-group">
            <h3 className="filter-title">{t('categories_label')}</h3>
            <ul className="category-list">
              {categories.map(cat => (
                <li key={cat.key}>
                  <button 
                    className={`category-btn ${activeCategory === cat.key ? 'active' : ''}`}
                    onClick={() => dispatch(setActiveCategory(cat.key))}
                  >
                    {t(cat.label)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="shop-main">
          
          <div className="shop-results-meta mb-4">
            <span>{t('results_showing', { count: filteredProducts.length })}</span>
            
            {searchQuery && (
              <button 
                className="icon-btn clear-search-btn"
                onClick={() => dispatch(clearSearch())}
              >
                <X size={14} /> {t('clear_search')}: "{searchQuery}"
              </button>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state text-center glass-panel">
              <Search size={48} className="text-secondary mb-3" style={{margin: '0 auto'}} />
              <h3>{t('no_products')}</h3>
              <p className="text-secondary mt-2">Try adjusting your filters or search query.</p>
              <div className="mt-4" style={{display: 'flex', gap: '12px', justifyContent: 'center'}}>
                <button 
                  className="btn btn-outline"
                  onClick={() => dispatch(clearSearch())}
                >
                  {t('clear_search')}
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => dispatch(setActiveCategory('All'))}
                >
                  {t('clear_filters')}
                </button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default Shop;
