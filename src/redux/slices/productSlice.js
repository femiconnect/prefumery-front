import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   products: [],
   minPrice: null,
   maxPrice: null,
};

const productSlice = createSlice({
   name: 'product',
   initialState,
   reducers: {
      storeProducts: (state, action) => {
         console.log('Products in productSlice is ', action.payload);
         state.products = action.payload.products;
      },

      getPriceRange: (state, action) => {
         //console.log(action.payload);
         const { products } = action.payload;
         const productsPriceArray = [];
         products.map((product) => {
            const price = product.price;
            return productsPriceArray.push(price);
         });
         const productsMaxPrice = Math.max(...productsPriceArray);
         const productsMinPrice = Math.min(...productsPriceArray);

         state.minPrice = productsMinPrice;
         state.maxPrice = productsMaxPrice;
      },
   },
});

export const { storeProducts, getPriceRange } = productSlice.actions;

export const selectProducts = (state) => state.product.products;
export const selectMinPrice = (state) => state.product.minPrice;
export const selectMaxPrice = (state) => state.product.maxPrice;

export default productSlice.reducer;
