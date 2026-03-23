import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Eye } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addItem(product));
    
    // Trigger cart drawer
    const event = new Event('toggle-cart');
    document.dispatchEvent(event);
  };

  return (
    <div className="product-card glass-panel animate-scale-in">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img src={product.image} alt={t(product.name)} className="product-image" />
          <div className="product-overlay">
            <button className="quick-view-btn">
              <Eye size={18} />
            </button>
          </div>
          <button 
            className="quick-add-btn" 
            onClick={handleAddToCart}
            aria-label={t('quick_add')}
          >
            <ShoppingBag size={18} />
          </button>
        </div>
        
        <div className="product-info">
          <div className="product-meta">
            <span className="product-category">{t(product.category)}</span>
            <div className="product-rating">
              <Star size={12} fill="var(--accent)" color="var(--accent)" />
              <span>{product.rating}</span>
            </div>
          </div>
          <h3 className="product-name">{t(product.name)}</h3>
          <p className="product-price">${product.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
