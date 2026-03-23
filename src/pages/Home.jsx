import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Star, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useTranslation } from '../hooks/useTranslation';
import './Home.css';

const Home = () => {
  const { items: allProducts } = useSelector(state => state.products);
  const { t } = useTranslation();

  // Get top 4 rated products for featured section
  const featuredProducts = [...allProducts]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <div className="home-page animate-fade-in">
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1 className="hero-title">{t('hero_title')}</h1>
          <p className="hero-subtitle">
            {t('hero_subtitle')}
          </p>
          <Link to="/shop" className="btn btn-primary hero-btn">
            {t('explore_collection')} <Sparkles size={16} style={{marginLeft: '8px', marginRight: document.dir === 'rtl' ? '8px' : '0'}} />
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <div className="benefits-grid">
            <div className="benefit-card glass-panel text-center">
              <Star size={32} className="text-accent mb-3" style={{margin: '0 auto'}} />
              <h3>{t('benefit_1_title')}</h3>
              <p className="text-secondary mt-2">{t('benefit_1_desc')}</p>
            </div>
            <div className="benefit-card glass-panel text-center">
              <ShieldCheck size={32} className="text-accent mb-3" style={{margin: '0 auto'}} />
              <h3>{t('benefit_2_title')}</h3>
              <p className="text-secondary mt-2">{t('benefit_2_desc')}</p>
            </div>
            <div className="benefit-card glass-panel text-center">
              <Heart size={32} className="text-accent mb-3" style={{margin: '0 auto'}} />
              <h3>{t('benefit_3_title')}</h3>
              <p className="text-secondary mt-2">{t('benefit_3_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section container" style={{paddingTop: '64px', paddingBottom: '64px'}}>
        <div className="text-center mb-5">
          <h2 className="section-title">{t('featured_title')}</h2>
          <p className="section-desc">{t('featured_desc')}</p>
        </div>

        <div className="product-grid">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-5">
          <Link to="/shop" className="btn btn-outline">{t('view_all')}</Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
