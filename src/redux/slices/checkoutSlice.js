import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   shippingAddress: {},
   billingAddress: {},
};

const checkoutSlice = createSlice({
   name: 'checkout',
   initialState,
   reducers: {
      saveShippingAddress: (state, action) => {
         console.log(['shippingAddress Action.payload', action.payload]);
         state.shippingAddress = action.payload;
      },

      saveBillingAddress: (state, action) => {
         console.log(['billingAddress Action.payload', action.payload]);
         state.billingAddress = action.payload;
      },
   },
});

export const { saveShippingAddress, saveBillingAddress } =
   checkoutSlice.actions;
export const selectShippingAddress = (state) => state.checkout.shippingAddress;
export const selectBillingAddress = (state) => state.checkout.billingAddress;
export default checkoutSlice.reducer;
