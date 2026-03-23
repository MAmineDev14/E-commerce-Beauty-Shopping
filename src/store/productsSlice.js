import { createSlice } from '@reduxjs/toolkit';

const initialProducts = [
  { 
    id: 1, 
    name: 'prod_rose_cream_name', 
    description: 'prod_rose_cream_desc',
    price: 45, 
    category: 'category_moisturizers', 
    image: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&q=80&w=600', 
    rating: 4.8 
  },
  { 
    id: 2, 
    name: 'prod_night_serum_name', 
    description: 'prod_night_serum_desc',
    price: 65, 
    category: 'category_serums', 
    image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=600', 
    rating: 4.9 
  },
  { 
    id: 3, 
    name: 'prod_firming_moist_name', 
    description: 'prod_firming_moist_desc',
    price: 55, 
    category: 'category_moisturizers', 
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=600', 
    rating: 4.7 
  },
  { 
    id: 4, 
    name: 'prod_vitamin_drops_name', 
    description: 'prod_vitamin_drops_desc',
    price: 40, 
    category: 'category_serums', 
    image: 'https://images.unsplash.com/photo-1608248593842-8021c60ad1e3?auto=format&fit=crop&q=80&w=600', 
    rating: 4.6 
  },
  { 
    id: 5, 
    name: 'prod_aloe_gel_name', 
    description: 'prod_aloe_gel_desc',
    price: 25, 
    category: 'category_cleansers', 
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600', 
    rating: 4.5 
  },
  { 
    id: 6, 
    name: 'prod_clay_mask_name', 
    description: 'prod_clay_mask_desc',
    price: 35, 
    category: 'category_masks', 
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=600', 
    rating: 4.8 
  }
];

const initialState = {
  items: initialProducts,
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
  }
});

export const { setSearchQuery, setActiveCategory, clearSearch } = productsSlice.actions;
export default productsSlice.reducer;
