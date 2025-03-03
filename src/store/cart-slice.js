import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { 
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    isChanged: false
   },
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items || [];
      state.totalQuantity = action.payload.totalQuantity;
      state.totalAmount = action.payload.totalAmount;
    },
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({ 
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title
        })
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
      state.totalQuantity++;
      state.totalAmount += newItem.price;
      state.isChanged = true;
    },
    removeFromCart(state, action) {
      const id = action.payload.id;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
      state.totalQuantity--;
      state.totalAmount -= existingItem.price;
      state.isChanged = true;
    }
  }
});

export const cartActions = cartSlice.actions;

export default cartSlice;