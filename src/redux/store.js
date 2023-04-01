import {
   configureStore,
   combineReducers,
   getDefaultMiddleware,
} from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import productReducer from './slices/productSlice';
import filterReducer from './slices/filterSlice';
import cartReducer from './slices/cartSlice';
import checkoutReducer from './slices/checkoutSlice';

const rootReducer = combineReducers({
   auth: authReducer,
   product: productReducer,
   filter: filterReducer,
   cart: cartReducer,
   checkout: checkoutReducer,
});

const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
});

export default store;
