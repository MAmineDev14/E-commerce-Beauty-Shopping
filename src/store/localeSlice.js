import { createSlice } from '@reduxjs/toolkit';

const initialLocale = localStorage.getItem('locale') || 'en';

const initialState = {
  locale: initialLocale // 'en', 'fr', 'ar'
};

const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLocale(state, action) {
      state.locale = action.payload;
      localStorage.setItem('locale', action.payload);
      document.documentElement.setAttribute('dir', action.payload === 'ar' ? 'rtl' : 'ltr');
      document.documentElement.lang = action.payload;
    }
  }
});

export const { setLocale } = localeSlice.actions;
export default localeSlice.reducer;
