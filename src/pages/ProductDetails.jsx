import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeft, Star, Heart, Share2, Plus, Minus, ShoppingBag, ShieldCheck, Leaf } from 'lucide-react';
import { addItem } from '../store/cartSlice';
import { useTranslation } from '../hooks/useTranslation';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);
  const { t } = useTranslation();
  
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // For real scenario, fetch by ID. Here we mock finding it.
  const product = items.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>{t('no_products')}</h2>
        <Link to="/shop" className="btn btn-primary mt-3">{t('back_to_shop')}</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addItem({ ...product, quantity }));
    setIsAdded(true);
    
    // Trigger cart drawer
    const event = new Event('toggle-cart');
    document.dispatchEvent(event);
    
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="product-details-page container animate-fade-in">
      <Link to="/shop" className="back-link">
        <ArrowLeft size={16} /> {t('back_to_collection')}
      </Link>

      <div className="product-details-grid">
        
        {/* Image Gallery */}
        <div className="product-gallery glass-panel">
          <img src={product.image} alt={t(product.name)} className="main-image" />
        </div>

        {/* Product Info */}
        <div className="product-info-block">
          <div className="product-header">
            <span className="product-tag">{t(product.category)}</span>
            <div className="product-actions-top">
              <button className="icon-btn tooltip" data-tooltip={t('save_to_wishlist') || 'Save to Wishlist'}><Heart size={20} /></button>
              <button className="icon-btn tooltip" data-tooltip={t('share') || 'Share'}><Share2 size={20} /></button>
            </div>
          </div>
          
          <h1 className="detail-title">{t(product.name)}</h1>
          
          <div className="detail-meta">
            <div className="detail-rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < Math.floor(product.rating) ? 'var(--accent)' : 'none'} color={i < Math.floor(product.rating) ? 'var(--accent)' : 'var(--border)'} />
              ))}
              <span className="rating-text">{product.rating} &bull; {t('reviews_count', { count: 128 })}</span>
            </div>
          </div>

          <p className="detail-price">${product.price.toFixed(2)}</p>
          
          <div className="detail-description">
            <p>{t(product.description)}</p>
          </div>

          <div className="detail-ingredients">
            <p className="text-secondary" style={{fontSize: '13px', marginTop: '16px'}}>
              <strong>{t('key_ingredients')}:</strong> {t('ingredients_list')}
            </p>
          </div>

          <hr className="detail-divider" />

          {/* Add to Cart Area */}
          <div className="purchase-area">
            <div className="quantity-selector">
              <button className="icon-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus size={16} />
              </button>
              <span className="qty-value">{quantity}</span>
              <button className="icon-btn" onClick={() => setQuantity(Math.min(10, quantity + 1))}>
                <Plus size={16} />
              </button>
            </div>
            
            <button 
              className={`btn btn-primary add-to-cart-btn ${isAdded ? 'added' : ''}`}
              onClick={handleAddToCart}
            >
              <ShoppingBag size={18} style={{marginRight: '8px', marginLeft: document.dir === 'rtl' ? '8px' : '0'}} />
              {isAdded ? t('added_to_bag') : t('add_to_bag')}
            </button>
          </div>

          {/* Trust Badges */}
          <div className="trust-badges mt-4 pt-4" style={{borderTop: '1px solid var(--border)'}}>
            <div className="trust-badge">
              <ShieldCheck size={20} className="text-accent" />
              <span>{t('dermatologist_tested')}</span>
            </div>
            <div className="trust-badge">
              <Leaf size={20} className="text-accent" />
              <span>{t('clean_ingredients')}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
