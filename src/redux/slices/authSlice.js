import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   user: localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null,
};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setActiveUser: (state, action) => {
         state.isLoggedIn = true;
         state.user = action.payload;

         //save user to localStorage
         localStorage.setItem('user', JSON.stringify(state.user));
      },

      removeActiveUser: (state, action) => {
         state.user = null;

         //remove user from localStorage
         localStorage.removeItem('user');
      },
   },
});

export const { setActiveUser, removeActiveUser } = authSlice.actions;

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
