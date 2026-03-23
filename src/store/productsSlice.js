import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('/products.json');
    const data = await response.json();
    return data;
  }
);

// initialProducts was removed and moved to public/products.json

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  searchQuery: '',
  activeCategory: 'All'
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    clearSearch(state) {
      state.searchQuery = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setSearchQuery, setActiveCategory, clearSearch } = productsSlice.actions;
export default productsSlice.reducer;
