import React, { useRef, useEffect, useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { Container, Row } from 'reactstrap';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { auth } from '../../../firebase/config';
import { removeActiveUser, selectUser } from '../../../redux/slices/authSlice';
import ShowOnLogin from '../../showHideLink/ShowHideLink';
import AdminOnlyLink from '../../adminOnlyLink/AdminOnlyLink';
import { capitalizeWord } from '../../../utilFunctions/utilsFunctions';
import {
   calculateTotalCartItems,
   clearCart,
   selectTotalCartItems,
} from '../../../redux/slices/cartSlice';
import logo from '../../../assets/images/logo.png';
import userIcon from '../../../assets/images/z-others/user-icon.png';
import HeaderSearchLg from '../../ui/headerSearchLarge/HeaderSearchLg';
import { filterBySearch } from '../../../redux/slices/filterSlice';
import { selectProducts } from '../../../redux/slices/productSlice';
//HeaderSearchLgchLg
import './header.css';

const Header = () => {
   const [scrollPage, setScrollPage] = useState(false); //show/hide sticky header
   const [search, setSearch] = useState('');
   // const [filterLoader, setFilterLoader] = useState(false);

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const user = useSelector(selectUser);
   const totalCartQty = useSelector(selectTotalCartItems);
   // const products = useSelector(selectProducts);

   const menuRef = useRef(null); //mobile menu dom element selector
   const profileActionsRef = useRef(null); //profile__action dom element selector

   //automatically update totalCartQty in the header every time it changes
   useEffect(() => {
      dispatch(calculateTotalCartItems());
   }, [dispatch]);

   //implement functionality to make header stick at scroll height of 80
   const makeHeaderStickyFunc = () => {
      if (window.scrollY > 70) {
         setScrollPage(true);
      } else {
         setScrollPage(false);
      }
   };
   window.addEventListener('scroll', makeHeaderStickyFunc);

   //function to toggle mobile menu
   const toggleMobileMenu = () =>
      menuRef.current.classList.toggle('active__menu');

   //function to toggle profileAction div
   const toggleProfileAction = () =>
      profileActionsRef.current.classList.toggle('show__profileActions');

   //function to logout currently logged in user
   const logout = () => {
      signOut(auth)
         .then(() => {
            dispatch(removeActiveUser(user));
            if (totalCartQty > 0) {
               dispatch(clearCart());
            }
            navigate('/');
         })
         .catch((error) => {
            toast.error(error.message);
         });
   };

   //function to process search input
   // const handleSearch = () => {
   //    setFilterLoader(true);
   //    dispatch(
   //       filterBySearch({
   //          products,
   //          search,
   //          setFilterLoader,
   //       })
   //    );
   //    navigate('/shop');
   // };

   const navigateToHome = () => {
      navigate('/');
   };

   const navigateToCartPage = () => {
      navigate('/cart');
   };

   const navigateToAdminDashboard = () => {
      navigate('/admin/dashboard');
   };

   return (
      <header className={scrollPage ? 'header fixed' : 'header'}>
         <Container>
            <Row>
               <div className='nav__wrapper'>
                  <div className='logo' onClick={navigateToHome}>
                     <img src={logo} alt='Logo' />
                     <div>
                        <h1>Perfumery</h1>
                     </div>
                  </div>

                  <div
                     className='navigation'
                     ref={menuRef}
                     onClick={toggleMobileMenu}
                  >
                     <ul className='menu'>
                        {/* Link will show only if user is admin */}
                        <AdminOnlyLink>
                           <li className='nav__item'>
                              <button
                                 className='admin__btn'
                                 onClick={navigateToAdminDashboard}
                              >
                                 Admin
                              </button>
                           </li>
                        </AdminOnlyLink>

                        <li className='nav__item'>
                           <NavLink
                              to='/'
                              className={({ isActive }) =>
                                 isActive ? 'nav__active' : ''
                              }
                           >
                              Home
                           </NavLink>
                        </li>

                        <li className='nav__item'>
                           <NavLink
                              to='/shop'
                              className={({ isActive }) =>
                                 isActive ? 'nav__active' : ''
                              }
                              //every NavLink object has an 'isActive' boolean property to confirm if the NavLink is active.
                           >
                              Shop
                           </NavLink>
                        </li>

                        <li className='nav__item'>
                           <NavLink
                              to='/cart'
                              className={({ isActive }) =>
                                 isActive ? 'nav__active' : ''
                              }
                           >
                              Cart
                           </NavLink>
                        </li>

                        <li className='nav__item'>
                           <NavLink
                              to='/contact-us'
                              className={({ isActive }) =>
                                 isActive ? 'nav__active' : ''
                              }
                           >
                              Contact
                           </NavLink>
                        </li>

                        {/* Link will show only if user is logged in */}
                        {/* <ShowOnLogin>
                           <li className='nav__item'>
                              <NavLink
                                 to='/my-orders'
                                 className={({ isActive }) =>
                                    isActive ? 'nav__active' : ''
                                 }
                              >
                                 My Orders
                              </NavLink>
                           </li>
                        </ShowOnLogin> */}

                        {user?.userName ? (
                           <li className='nav__item'>
                              <span onClick={logout}>Logout</span>
                           </li>
                        ) : (
                           <li className='nav__item'>
                              <Link to='/login'>Login/Register</Link>
                           </li>
                        )}
                     </ul>
                  </div>

                  <div className='nav__icons'>
                     {/* <div className='nav__search-box'>
                        <input
                           type='text'
                           placeholder='Search By Name'
                           value={search}
                           onChange={(e) => setSearch(e.target.value)}
                        />
                        <span onClick={handleSearch}>
                           <i className='ri-search-line'></i>
                        </span>
                     </div> */}

                     {user?.userName ? (
                        <>
                           <div className='profile'>
                              <motion.img
                                 whileTap={{ scale: 1.2 }}
                                 src={userIcon}
                                 alt=''
                                 onClick={toggleProfileAction}
                              />
                           </div>
                           <span className='fav__icon'>
                              Hi, {capitalizeWord(user.userName.split(' ')[0])}
                           </span>
                        </>
                     ) : (
                        <span></span>
                     )}

                     <span className='cart__icon' onClick={navigateToCartPage}>
                        <i className='ri-shopping-bag-line'></i>
                        {totalCartQty === 0 ? null : (
                           <span className='badge'>{totalCartQty}</span>
                        )}
                     </span>

                     <div className='mobile__menu'>
                        <span onClick={toggleMobileMenu}>
                           <i className='ri-menu-line'></i>
                        </span>
                     </div>
                  </div>
               </div>
            </Row>
         </Container>
      </header>
   );
};

export default Header;
