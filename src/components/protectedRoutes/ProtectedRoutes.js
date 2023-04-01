import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { auth } from '../../firebase/config';
import {
   selectEmail,
   selectUser,
   selectUserName,
} from '../../redux/slices/authSlice';

const ProtectedRoutes = () => {
   const user = useSelector(selectUser);
   const location = useLocation();

   if (user?.email) {
      return <Outlet />;
   } else {
      return <Navigate to='/login' state={{ from: location }} replace />;
   }
};

export default ProtectedRoutes;

/*
//Oulet represents the children routes (v6)

<Navigate to='/login' state={{ from: location }} replace /> - takes you exactly back to the link you were trying to access rather than just taking you back to the home page


*/
