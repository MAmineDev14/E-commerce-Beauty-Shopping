import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null, // { name, email }
  settings: {
    notifications: true,
    newsletter: false
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    updateUser(state, action) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    updateSettings(state, action) {
      state.settings = { ...state.settings, ...action.payload };
    }
  }
});

export const { login, logout, updateUser, updateSettings } = authSlice.actions;
export default authSlice.reducer;
