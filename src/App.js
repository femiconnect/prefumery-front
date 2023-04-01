import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './firebase/config';
import { removeActiveUser, setActiveUser } from './redux/slices/authSlice';
import AdminOnlyRoute from './components/adminOnlyRoute/AdminOnlyRoute';
import ProtectedRoutes from './components/protectedRoutes/ProtectedRoutes';
import CheckoutSuccess from './pages/checkout/checkout-success/CheckoutSuccess';
import CheckoutCancelled from './pages/checkout/checkout-cancelled/CheckoutCancelled';
import {
   Home,
   Shop,
   ProductDetails,
   Cart,
   Login,
   Register,
   ContactUs,
   MyOrders,
   ResetPassword,
   PageNotFound,
   Admin,
   Redirect,
} from './pages/index';
import BackToTop from './components/ui/backToTop/BackToTop';
import './App.css';

function App() {
   const dispatch = useDispatch();

   //get the currently logged in user from firebase - push to redux and then localStorage
   useEffect(() => {
      onAuthStateChanged(auth, (user) => {
         if (user) {
            let setUser = {};
            setUser.email = user.email;
            setUser.userName = user.displayName;
            setUser.userID = user.uid;
            setUser.userPhoto = user.photoURL;

            dispatch(setActiveUser(setUser));
         } else {
            dispatch(removeActiveUser());
         }
      });
   }, [dispatch]);

   return (
      <div className='app'>
         <ToastContainer
            position='top-right'
            autoClose={3000}
            theme='colored'
         />

         <BackToTop />

         <Routes>
            {/* Public routes */}
            <Route path='/' element={<Home />} />
            {/* <Route path='/' element={<Home2 />} /> */}
            <Route path='/shop' element={<Shop />} />
            <Route path='/shop/:id' element={<ProductDetails />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/contact-us' element={<ContactUs />} />
            <Route path='/redirect' element={<Redirect />} />
            <Route path='/orders' element={<MyOrders />} />

            {/* Protected routes - user must be logged in */}
            <Route element={<ProtectedRoutes />}>
               <Route path='/reset-password' element={<ResetPassword />} />

               {/* Route for admin only */}
               <Route
                  path='/admin/*'
                  element={
                     <AdminOnlyRoute>
                        <Admin />
                     </AdminOnlyRoute>
                  }
               />
            </Route>

            {/* Redirect from stripe */}
            <Route path='/checkout-successful' element={<CheckoutSuccess />} />
            <Route path='/checkout-cancelled' element={<CheckoutCancelled />} />

            {/* catch undefined routes */}
            <Route path='*' element={<PageNotFound />} />
         </Routes>
      </div>
   );
}

export default App;
