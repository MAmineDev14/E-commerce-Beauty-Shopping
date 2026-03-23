import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <div className="container animate-fade-in page-section" style={{maxWidth: '800px'}}>
      
      <div className="text-center mb-5">
        <h1 className="mb-3">{t('nav_about')}</h1>
        <p className="text-secondary" style={{fontSize: '14px', lineHeight: '1.6'}}>
          {t('about_philosophy_1')}
        </p>
      </div>

      <div className="glass-panel" style={{padding: '32px', marginBottom: '32px', borderRadius: '8px'}}>
        <h2 className="mb-3">{t('about_philosophy_title')}</h2>
        <p style={{lineHeight: '1.6', color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '14px'}}>
          {t('about_philosophy_2')}
        </p>
        <p style={{lineHeight: '1.6', color: 'var(--text-secondary)', fontSize: '14px'}}>
          {t('about_philosophy_3')}
        </p>
      </div>

      <div className="grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
        <div className="glass-panel text-center" style={{padding: '16px', borderRadius: '8px'}}>
          <h3 className="mb-2">{t('about_sustainability_title')}</h3>
          <p style={{fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>
            {t('about_sustainability_desc')}
          </p>
        </div>
        <div className="glass-panel text-center" style={{padding: '16px', borderRadius: '8px'}}>
          <h3 className="mb-2">{t('about_commitment_title')}</h3>
          <p style={{fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6'}}>
            {t('about_commitment_desc')}
          </p>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;
