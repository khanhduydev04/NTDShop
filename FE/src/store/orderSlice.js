import { createSlice } from '@reduxjs/toolkit';

// Trạng thái khởi tạo của đơn hàng
const initialState = {
  order: null,
  loading: false,
  error: null,
};

// Tạo slice với các reducers (actions)
const orderSlice = createSlice({
  name: 'order', // tên slice
  initialState,
  reducers: {
    setOrderLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setOrderSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    setOrderError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export các action (để dispatch trong component)
export const { setOrderLoading, setOrderSuccess, setOrderError } = orderSlice.actions;

// Export reducer để đưa vào store
export default orderSlice.reducer;