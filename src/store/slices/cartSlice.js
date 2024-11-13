import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    addToCart: (state, action) => {
      const { activityId, quantity, date, price, totalPrice, activity } = action.payload;
      const existingItem = state.items.find(item => 
        item.activityId === activityId && item.date === date
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice = existingItem.quantity * price;
      } else {
        state.items.push({
          activityId,
          quantity,
          date,
          price,
          totalPrice,
          activity
        });
      }
    },
    removeFromCart: (state, action) => {
      const { activityId, date } = action.payload;
      state.items = state.items.filter(item => 
        !(item.activityId === activityId && item.date === date)
      );
    },
    updateQuantity: (state, action) => {
      const { activityId, date, quantity } = action.payload;
      const item = state.items.find(item => 
        item.activityId === activityId && item.date === date
      );
      if (item) {
        item.quantity = quantity;
        item.totalPrice = quantity * item.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 