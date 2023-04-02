import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../firebase/config';
import { Helmet, CommonSection, Header, Footer } from '../../components/layout';
import Loader from '../../components/ui/loader/Loader';
import {
   addItemToCart,
   decreaseItemInCart,
   calculateTotalCartItems,
   selectCartItems,
} from '../../redux/slices/cartSlice';
import { selectProducts } from '../../redux/slices/productSlice';
import { getFormattedPrice } from '../../utilFunctions/utilsFunctions';
import './productDetails.css';

const ProductDetails = () => {
   const { id } = useParams();
   const [product, setProduct] = useState(null);

   const cartItems = useSelector(selectCartItems);
   const dispatch = useDispatch();

   //check if the product has been added to cart
   const isProductAddedToCart = cartItems.findIndex((item) => {
      return item.id === id;
   });

   //get the product data in the cart since it is from it that we can get the total number of this particular product in the cart
   const productInCart = cartItems.find((item) => item.id === id);

   //function to fetch the product document from firebase firestore
   async function getProduct() {
      const docRef = doc(db, 'perfumes', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
         //console.log('Document data:', docSnap.data());
         const obj = {
            id: id,
            ...docSnap.data(),
         };
         setProduct(obj);
      } else {
         toast.error('Product not found');
      }
   }

   //This effect makes sure every time this page is opened to view a product, the page view will always be at the top
   useEffect(() => {
      window.scrollTo(0, 0);
   }, [product]);

   useEffect(() => {
      getProduct();
   }, []);

   const addToCart = (item) => {
      dispatch(addItemToCart(item));
      dispatch(calculateTotalCartItems());
   };

   const decreaseItem = (item) => {
      dispatch(decreaseItemInCart(item));
      dispatch(calculateTotalCartItems());
   };

   return (
      <>
         <Header />

         <Helmet title={product === null ? 'Product' : product.name}>
            <CommonSection
               title={product === null ? 'Product' : product.name}
            />

            {product === null ? (
               <>
                  <Loader />
                  <div className='blank__height'></div>
               </>
            ) : (
               <div>
                  <section className='pt-0'>
                     <Container className='container-flexible'>
                        <Row className='row-top'>
                           <Col lg='6' md='6'>
                              <div className='product__details-img'>
                                 <img src={product.imageURL} alt='' />
                              </div>
                           </Col>
                           <Col lg='6' md='6'>
                              <div className='product__details'>
                                 <h3>{product.name}</h3>
                                 <h5>{product.id}</h5>

                                 <span className='product__price'>
                                    ${getFormattedPrice(product.price)}
                                 </span>

                                 <p className='mt-3 product__details-text'>
                                    {product.desc}
                                 </p>

                                 <div className='qty__input'>
                                    {isProductAddedToCart < 0 ? null : (
                                       <>
                                          <button
                                             className='qtyBtn'
                                             onClick={() =>
                                                decreaseItem(product)
                                             }
                                             disabled={
                                                productInCart.cartQty === 1
                                             }
                                          >
                                             -
                                          </button>
                                          <span>{productInCart.cartQty}</span>
                                          <button
                                             className='qtyBtn'
                                             onClick={() => addToCart(product)}
                                          >
                                             +
                                          </button>
                                       </>
                                    )}

                                    <motion.button
                                       whileTap={{ scale: 1.2 }}
                                       className='buy__btn rmv-mrg'
                                       onClick={() => addToCart(product)}
                                    >
                                       Add to Cart
                                    </motion.button>
                                 </div>
                              </div>
                           </Col>
                        </Row>
                     </Container>
                  </section>
               </div>
            )}
         </Helmet>
         <Footer />
      </>
   );
};

export default ProductDetails;
