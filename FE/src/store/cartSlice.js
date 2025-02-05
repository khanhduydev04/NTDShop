import { createSlice } from '@reduxjs/toolkit';

// Trạng thái khởi tạo của giỏ hàng
const initialState = {
  items: JSON.parse(localStorage.getItem('cart')) || [],
};

// Tạo slice với các reducers (actions)
const cartSlice = createSlice({
  name: 'cart', // tên slice
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProductIndex = state.items.findIndex(item => item.id === product.id && item.variantId === product.variantId);
      if (existingProductIndex >= 0) {
        state.items[existingProductIndex].quantity += product.quantity;
      } else {
        state.items.push(product);
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      const { id, variantId } = action.payload;
      state.items = state.items.filter(item => !(item.id === id && item.variantId === variantId));
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateCart: (state, action) => {
      const { id, variantId, quantity } = action.payload;
      const productIndex = state.items.findIndex(item => item.id === id && item.variantId === variantId);
      if (productIndex >= 0) {
        state.items[productIndex].quantity = quantity;
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    setCart: (state, action) => {
      state.items = action.payload;
      localStorage.setItem('cart', JSON.stringify(state.items));
    }
  }
});

// Export các action (để dispatch trong component)
export const { addToCart, removeFromCart, updateCart, clearCart, setCart } = cartSlice.actions;

// Export reducer để đưa vào store
export default cartSlice.reducer;