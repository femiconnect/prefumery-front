import React, { useEffect, useState } from 'react';
import { Col } from 'reactstrap';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './productCard.css';
import { useDispatch } from 'react-redux';
import {
   addItemToCart,
   calculateTotalCartItems,
} from '../../../redux/slices/cartSlice';
import { shortenText } from '../../../utilFunctions/utilsFunctions';

const ProductCard = ({ item }) => {
   const [windowSize, setWindowSize] = useState(getWindowSize());

   //Get window Width and Height on resize in React
   useEffect(() => {
      function handleWindowResize() {
         setWindowSize(getWindowSize());
      }

      window.addEventListener('resize', handleWindowResize);

      return () => {
         window.removeEventListener('resize', handleWindowResize);
      };
   }, []);

   function getWindowSize() {
      const { innerWidth, innerHeight } = window;
      return { innerWidth, innerHeight };
   }

   const dispatch = useDispatch();

   const addToCart = (product) => {
      dispatch(addItemToCart(product));
      dispatch(calculateTotalCartItems());
   };

   return (
      <Col>
         <div className='product__item'>
            <Link to={`/shop/${item.id}`}>
               <div className='product__img'>
                  <motion.img
                     whileHover={{ scale: 1.1 }}
                     src={item.imageURL}
                     alt=''
                  />
               </div>
            </Link>

            <div className='product__info'>
               <Link to={`/shop/${item.id}`}>
                  {item.name && windowSize.innerWidth <= 450
                     ? shortenText(item.name, 10)
                     : shortenText(item.name, 20)}
               </Link>
               <span
                  className={
                     item.sex === 'men'
                        ? 'sex men'
                        : item.sex === 'women'
                        ? 'sex women'
                        : 'sex unisex'
                  }
               >
                  {item.sex}
               </span>

               <span className='price'>${item.price.toFixed(2)}</span>

               <motion.span
                  whileTap={{ scale: 1.2 }}
                  className='to-cart'
                  onClick={() => addToCart(item)}
               >
                  Add to cart
               </motion.span>
            </div>
         </div>
      </Col>
   );
};

export default ProductCard;
