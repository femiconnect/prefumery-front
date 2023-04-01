import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   filteredProducts: [],
};

const filterSlice = createSlice({
   name: 'filter',
   initialState,
   reducers: {
      filterBySearch: (state, action) => {
         //console.log(action.payload);

         const { products, search, setFilterLoader } = action.payload;

         const tempProducts = products.filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
         );

         state.filteredProducts = tempProducts;

         setFilterLoader(false);
      },

      sortProducts: (state, action) => {
         //console.log(action.payload);
         const { products, sort, setFilterLoader } = action.payload;

         let tempProducts = [];

         if (sort === 'latest') {
            tempProducts = products;
         }

         if (sort === 'lowest-price') {
            tempProducts = products.slice().sort((a, b) => {
               return a.price - b.price;
            });
         }

         if (sort === 'highest-price') {
            tempProducts = products.slice().sort((a, b) => {
               return b.price - a.price;
            });
         }

         if (sort === 'a-z') {
            tempProducts = products.slice().sort((a, b) => {
               return a.name.localeCompare(b.name);
            });
         }

         if (sort === 'z-a') {
            tempProducts = products.slice().sort((a, b) => {
               return b.name.localeCompare(a.name);
            });
         }

         state.filteredProducts = tempProducts;

         setFilterLoader(false);
      },

      filterByCheckedList: (state, action) => {
         //console.log(action.payload);
         const { products, checkedList, setFilterLoader } = action.payload;

         let tempProducts = [];

         if (checkedList.length === 0) {
            tempProducts = products;
         } else {
            let existInCheckedList = false;

            products.map((product) => {
               // Check if value of product.sex is in checkedList array
               if (checkedList.indexOf(product.sex) !== -1) {
                  existInCheckedList = true;
               } else {
                  existInCheckedList = false;
               }

               if (existInCheckedList) {
                  tempProducts.push(product);
               }
            });
         }

         state.filteredProducts = tempProducts;

         setFilterLoader(false);
      },

      filterByGender: (state, action) => {
         //console.log(action.payload);
         const { products, selectedRadio, setFilterLoader } = action.payload;

         setFilterLoader(true);
         let tempProducts = [];

         if (selectedRadio === 'All') {
            tempProducts = products;
         } else {
            tempProducts = products.filter(
               (product) => product.sex === selectedRadio
            );
         }

         state.filteredProducts = tempProducts;

         setFilterLoader(false);
      },

      filterByBrand: (state, action) => {
         //console.log(action.payload);
         const { products, brand, setFilterLoader } = action.payload;

         let tempProducts = [];

         if (brand === 'All') {
            tempProducts = products;
         } else {
            tempProducts = products.filter(
               (product) => product.brand === brand
            );
         }

         state.filteredProducts = tempProducts;

         setFilterLoader(false);
      },

      filterByPrice: (state, action) => {
         //console.log(action.payload);
         const { products, price, setFilterLoader } = action.payload;

         let tempProducts = [];

         tempProducts = products.filter((product) => product.price <= price);

         state.filteredProducts = tempProducts;

         setFilterLoader(false);
      },
   },
});

export const {
   filterBySearch,
   sortProducts,
   filterByCheckedList,
   filterByGender,
   filterByBrand,
   filterByPrice,
} = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts;

export default filterSlice.reducer;
