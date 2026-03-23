import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice';
import authReducer from './authSlice';
import themeReducer from './themeSlice';
import localeReducer from './localeSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    auth: authReducer,
    theme: themeReducer,
    locale: localeReducer
  }
});
