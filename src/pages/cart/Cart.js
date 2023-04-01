import React, { useEffect } from 'react';
import { Container, Row, Col, Table } from 'reactstrap';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet, CommonSection, Footer, Header } from '../../components/layout';
import ProcessCheckoutBtn from '../checkout/process-checkout-btn/ProcessCheckoutBtn';
import { selectIsLoggedIn, selectUser } from '../../redux/slices/authSlice';
import {
   addItemToCart,
   decreaseItemInCart,
   removeItemFromCart,
   clearCart,
   calculateSubtotal,
   calculateTotalCartItems,
   selectCartItems,
   selectCartTotalAmount,
   selectTotalCartItems,
   saveURL,
} from '../../redux/slices/cartSlice';
import {
   getFormattedPrice,
   thousands_separators,
} from '../../utilFunctions/utilsFunctions';
import './cart.css';

const Cart = () => {
   const cartItems = useSelector(selectCartItems);
   const cartTotalAmount = useSelector(selectCartTotalAmount);
   const totalCartItems = useSelector(selectTotalCartItems);
   const user = useSelector(selectUser);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      //when page is mounted, scroll position should start at 0.
      window.scrollTo(0, 0);
   }, []);

   useEffect(() => {
      dispatch(calculateSubtotal());
      dispatch(calculateTotalCartItems());
      dispatch(saveURL(''));
   }, [dispatch, cartItems]);

   const increaseCartItem = (itemInCart) => {
      dispatch(addItemToCart(itemInCart));
   };

   const decreaseCartItem = (itemInCart) => {
      dispatch(decreaseItemInCart(itemInCart));
   };

   const removeCartItem = (itemInCart) => {
      dispatch(removeItemFromCart(itemInCart));
   };

   const clearTheCart = () => {
      dispatch(clearCart());
   };

   //we will use the window.location object to track how a user gets to this page
   const url = window.location.href;
   //console.log(url);

   const loginToCheckout = () => {
      dispatch(saveURL(url));
      navigate('/login');
   };

   return (
      <>
         <Header />
         <Helmet title='Cart'>
            <CommonSection title='Shopping Cart' />
            <section>
               <Container className='container-flexible '>
                  <Row className='content__height'>
                     <Col lg={totalCartItems === 0 ? '12' : '9'}>
                        {cartItems.length === 0 ? (
                           <div className='mt-5 mb-5'>
                              <h2 className='fs-4 text-center'>
                                 Your cart is currently empty.
                              </h2>
                              <div className='text-center'>
                                 <button className='buy__btn  mt-3'>
                                    <Link to='/shop'>
                                       &larr; Continue Shopping
                                    </Link>
                                 </button>
                              </div>
                           </div>
                        ) : (
                           <>
                              <Table responsive>
                                 <thead>
                                    <tr>
                                       <th>#</th>
                                       <th>Image</th>
                                       <th>Product</th>
                                       <th>Price</th>
                                       <th>Qty</th>
                                       <th>Total</th>
                                       <th>Action</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {cartItems.map((item, index) => (
                                       <tr key={index}>
                                          <th scope='row'>{index + 1}</th>
                                          <td>
                                             <img src={item.imageURL} alt='' />
                                          </td>
                                          <td>{item.name}</td>
                                          <td>{item.price}</td>
                                          <td>
                                             <div className='count'>
                                                <p
                                                   className='sign'
                                                   onClick={() =>
                                                      decreaseCartItem(item)
                                                   }
                                                >
                                                   -
                                                </p>
                                                <p>
                                                   <b>{item.cartQty}</b>
                                                </p>
                                                <p
                                                   className='sign'
                                                   onClick={() =>
                                                      increaseCartItem(item)
                                                   }
                                                >
                                                   +
                                                </p>
                                             </div>
                                          </td>
                                          <td>
                                             $
                                             {thousands_separators(
                                                getFormattedPrice(
                                                   item.price * item.cartQty
                                                )
                                             )}
                                          </td>
                                          <td>
                                             <motion.i
                                                whileTap={{ scale: 1.2 }}
                                                className='ri-delete-bin-line cart-delete-btn'
                                                onClick={() =>
                                                   removeCartItem(item)
                                                }
                                             ></motion.i>
                                          </td>
                                       </tr>
                                    ))}
                                 </tbody>
                              </Table>

                              <button
                                 className='buy__btn  mt-3'
                                 onClick={clearTheCart}
                              >
                                 Clear The Cart
                              </button>
                           </>
                        )}
                     </Col>
                     {totalCartItems === 0 ? (
                        ''
                     ) : (
                        <Col lg='3' className='cart-aside'>
                           <div className='subtotal'>
                              <div>
                                 <h6 className='fs-4 d-flex align-items-center justify-content-between'>
                                    Subtotal:
                                    <span className='fs-4 fw-bold'>
                                       $
                                       {thousands_separators(
                                          cartTotalAmount.toFixed(2)
                                       )}
                                    </span>
                                 </h6>
                              </div>
                              <h6 className='d-flex align-items-center justify-content-between fs-6 mt-2'>
                                 Cart Item(s):
                                 <span className='fs-6 fw-bold'>
                                    {totalCartItems}
                                 </span>
                              </h6>
                              <p className='fs-6 mt-2 tax-info'>
                                 Taxes and shipping will be calculated in
                                 checkout
                              </p>
                              <div>
                                 <button className='buy__btn w-100'>
                                    <Link to='/shop'>
                                       &larr; Continue Shopping
                                    </Link>
                                 </button>

                                 {user ? (
                                    <ProcessCheckoutBtn />
                                 ) : (
                                    <button
                                       // className='buy__btn w-100 mt-3'
                                       className='cart__login w-100 mt-3'
                                       onClick={loginToCheckout}
                                    >
                                       Login to Checkout
                                    </button>
                                 )}
                              </div>
                           </div>
                        </Col>
                     )}
                  </Row>
               </Container>
            </section>
         </Helmet>
         <Footer />
      </>
   );
};

export default Cart;
