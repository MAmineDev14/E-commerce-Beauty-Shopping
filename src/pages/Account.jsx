import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { useTranslation } from '../hooks/useTranslation';
import Modal from '../components/Modal';
import { ShieldAlert, Trash2, LogOut, FileText, User } from 'lucide-react';

const Account = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleDeleteAccount = () => {
    dispatch(logout());
    setShowDeleteModal(false);
    navigate('/');
    alert(t('account_deleted_msg') || "Account successfully deleted.");
  };

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <h2>{t('please_signin_desc') || "Please sign in to view your account."}</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/signin')}>{t('nav_signin')}</button>
      </div>
    );
  }

  return (
    <div className="account-page container animate-fade-in" style={{paddingTop: '32px', paddingBottom: '64px'}}>
      
      <div className="mb-4">
        <h1>{t('my_account')}</h1>
        <p className="text-secondary">{t('my_account_desc')}</p>
      </div>

      <div className="account-dashboard">
        
        {/* Personal Details Panel */}
        <div className="glass-panel" style={{padding: '24px', marginBottom: '24px'}}>
          <h2 style={{fontSize: '18px', borderBottom: '1px solid var(--border)', paddingBottom: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'}}>
            <User size={18} className="text-accent"/> {t('personal_identity')}
          </h2>
          
          <div className="account-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px'}}>
            <div>
              <p className="text-secondary" style={{fontSize: '12px', marginBottom: '4px'}}>{t('full_name')}</p>
              <p style={{fontWeight: '500'}}>{user.name}</p>
            </div>
            <div>
              <p className="text-secondary" style={{fontSize: '12px', marginBottom: '4px'}}>{t('email_address')}</p>
              <p style={{fontWeight: '500'}}>{user.email}</p>
            </div>
            <div>
              <p className="text-secondary" style={{fontSize: '12px', marginBottom: '4px'}}>{t('member_since')}</p>
              <p style={{fontWeight: '500'}}>March 2026</p>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="glass-panel danger-zone" style={{padding: '24px', border: '1px solid rgba(229, 115, 115, 0.3)', backgroundColor: 'rgba(229, 115, 115, 0.05)'}}>
          <h2 style={{fontSize: '18px', color: 'var(--error)', borderBottom: '1px solid rgba(229, 115, 115, 0.3)', paddingBottom: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px'}}>
            <ShieldAlert size={18} /> {t('delete_account')}
          </h2>
          
          <p className="text-secondary mb-4" style={{fontSize: '13px'}}>{t('delete_account_desc')}</p>
          
          <div style={{display: 'flex', gap: '12px'}}>
            <button 
              className="btn btn-outline" 
              onClick={() => setShowDeleteModal(true)}
              style={{color: 'var(--error)', borderColor: 'var(--error)'}}
            >
              <Trash2 size={16} /> {t('delete_account')}
            </button>
            <button className="btn btn-primary" onClick={handleLogout}>
              <LogOut size={16} /> {t('nav_disconnect')}
            </button>
          </div>
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)}
        title={t('delete_account')}
      >
        <div className="py-2">
          <div className="mb-4 text-error text-center">
            <ShieldAlert size={48} style={{margin: '0 auto'}} />
          </div>
          <p className="mb-4 text-center" style={{fontSize: '14px', lineHeight: '1.6'}}>
            {t('delete_account_warning')}
          </p>
          <div style={{display: 'flex', gap: '12px'}}>
            <button className="btn btn-outline flex-1" onClick={() => setShowDeleteModal(false)}>{t('cancel')}</button>
            <button className="btn flex-1" onClick={handleDeleteAccount} style={{background: 'var(--error)', color: 'white', border: 'none'}}>
              {t('yes_delete')}
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default Account;
