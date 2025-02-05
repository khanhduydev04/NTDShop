import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Tạo store với reducer cart
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});
