import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLocale } from './store/localeSlice';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AboutUs from './pages/AboutUs';
import Settings from './pages/Settings';
import Account from './pages/Account';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Bootstrap initial language
    const currentLocale = localStorage.getItem('locale') || 'en';
    dispatch(setLocale(currentLocale));
  }, [dispatch]);

  return (
    <div className="app-container">
      <Navbar />
      <Sidebar />
      <CartDrawer />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/about" element={<AboutUs />} />
          
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          
          <Route path="/settings" element={<Settings />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
