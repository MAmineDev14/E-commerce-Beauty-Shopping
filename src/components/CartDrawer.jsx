import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../store/cartSlice';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import './CartDrawer.css';

const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, totalPrice } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const handleToggle = () => setIsOpen(!isOpen);
    document.addEventListener('toggle-cart', handleToggle);
    return () => document.removeEventListener('toggle-cart', handleToggle);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCheckout = () => {
    alert(t('checkout_validation') || "Checking out...");
  };

  return (
    <>
      <div 
        className={`cart-drawer-overlay ${isOpen ? 'active' : ''}`} 
        onClick={handleClose}
      ></div>
      <div className={`cart-drawer glass-panel ${isOpen ? 'open' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <div className="flex items-center gap-2" style={{display: 'flex', alignItems: 'center'}}>
            <ShoppingBag size={20} className="text-accent" />
            <h2 style={{fontSize: '18px', margin: 0}}>{t('your_cart')}</h2>
          </div>
          <button className="icon-btn" onClick={handleClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} className="text-secondary mb-3" />
              <p>{t('cart_empty')}</p>
              <button className="btn btn-outline mt-4" onClick={handleClose}>{t('continue_shopping')}</button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={t(item.name)} className="cart-item-img" />
                <div className="cart-item-info">
                  <h4 className="cart-item-name">{t(item.name)}</h4>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                  <div className="cart-item-actions">
                    <div className="quantity-control">
                      <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}>
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <button className="delete-item" onClick={() => dispatch(removeItem(item.id))}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="summary-row" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
                <span>{t('subtotal')}</span>
                <span className="total-price" style={{fontWeight: '600'}}>${totalPrice.toFixed(2)}</span>
              </div>
              <p className="tax-note" style={{fontSize: '11px', color: 'var(--text-secondary)'}}>{t('taxes_note')}</p>
            </div>
            <button className="btn btn-primary w-100" onClick={handleCheckout} style={{marginTop: '16px'}}>
              {t('proceed_checkout')}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
