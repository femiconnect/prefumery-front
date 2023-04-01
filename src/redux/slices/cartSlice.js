import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
   cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
   cartTotalAmount: 0, //the value of everything in the cart
   totalCartItems: 0,
   previousURL: '',
};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItemToCart: (state, action) => {
         //find the index of the product if it already exist in the cart
         const productIndex = state.cartItems.findIndex(
            (item) => item.id === action.payload.id
         );

         if (productIndex >= 0) {
            //item already exist in the cart
            //increase cart qty of the item
            state.cartItems[productIndex].cartQty += 1;
            toast.success(`${action.payload.name} increased by 1`, {
               position: 'top-right',
               autoClose: 3000,
               theme: 'colored',
            });
         } else {
            //item does not exist in the cart
            //add item to the cart
            const tempProduct = { ...action.payload, cartQty: 1 };
            state.cartItems.push(tempProduct);
            toast.success(`${tempProduct.name} added to cart`, {
               position: 'top-right',
               autoClose: 3000,
               theme: 'colored',
            });
         }

         //save cart to localStorage
         localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      },

      decreaseItemInCart: (state, action) => {
         //find the index of the product if it already exist in the cart
         const productIndex = state.cartItems.findIndex(
            (item) => item.id === action.payload.id
         );

         if (state.cartItems[productIndex].cartQty > 1) {
            state.cartItems[productIndex].cartQty -= 1;
            toast.success(`${action.payload.name} decreased by 1`, {
               position: 'top-right',
               autoClose: 3000,
               theme: 'colored',
            });
         } else if (state.cartItems[productIndex].cartQty === 1) {
            //filter out the item from the cart
            const newCartItems = state.cartItems.filter(
               (item) => item.id !== action.payload.id
            );
            state.cartItems = newCartItems;
            toast.error(`${action.payload.name} removed from cart`, {
               position: 'top-right',
               autoClose: 3000,
               theme: 'colored',
            });
         }

         //save cart to localStorage
         localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      },

      removeItemFromCart: (state, action) => {
         //filter out the item from the cart
         const newCartItems = state.cartItems.filter(
            (item) => item.id !== action.payload.id
         );

         state.cartItems = newCartItems;

         toast.error(`${action.payload.name} removed from cart`, {
            position: 'top-right',
            autoClose: 3000,
            theme: 'colored',
         });

         //save cart to localStorage
         localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      },

      clearCart: (state, action) => {
         state.cartItems = [];

         state.totalCartItems = 0;

         toast.success(`Cart cleared`, {
            position: 'top-right',
            autoClose: 3000,
            theme: 'colored',
         });

         //save cart to localStorage
         localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      },

      calculateSubtotal: (state, action) => {
         const arr = [];
         state.cartItems.map((item) => {
            const { price, cartQty } = item;
            const cartItemAmount = price * cartQty;
            return arr.push(cartItemAmount);
         });

         const totalAmount = arr.reduce((a, b) => {
            return a + b;
         }, 0);

         state.cartTotalAmount = totalAmount;
      },

      calculateTotalCartItems: (state, action) => {
         const arr = [];
         state.cartItems.map((item) => {
            const { cartQty } = item;
            return arr.push(cartQty);
         });

         const totalQty = arr.reduce((a, b) => {
            return a + b;
         }, 0);

         state.totalCartItems = totalQty;
      },

      saveURL: (state, action) => {
         state.previousURL = action.payload;
      },
   },
});

export const {
   addItemToCart,
   decreaseItemInCart,
   removeItemFromCart,
   clearCart,
   calculateSubtotal,
   calculateTotalCartItems,
   saveURL,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectTotalCartItems = (state) => state.cart.totalCartItems;
export const selectpreviousURL = (state) => state.cart.previousURL;

export default cartSlice.reducer;
