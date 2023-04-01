import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import smImg from './images/smImg.jpg';
import mdImg from './images/mdImg.jpg';
import lgImg from './images/lgImg.jpg';
import Clock from '../clock/Clock';
import './parallaxSalesOffer.css';

const ParallaxSalesOffer = () => {
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

   return (
      <div
         className='parallax'
         style={{
            // backgroundImage: `url(${mdImg})`,
            backgroundImage:
               windowSize.innerWidth <= 640
                  ? `url(${smImg})`
                  : windowSize.innerWidth <= 1024
                  ? `url(${mdImg})`
                  : `url(${lgImg})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
         }}
      >
         <div className='info-box'>
            <div className='info'>
               <h4>Highest concentration of fragrance</h4>
               <h2>The scentury</h2>
               <p>
                  Incredibly fresh and extremely spicy and intense scent for the
                  man who loves to be in power
               </p>

               <div>
                  <Clock />
               </div>

               <motion.button
                  whileTap={{ scale: 1.2 }}
                  className='buy__btn mgTopBtm'
               >
                  <Link to='/shop'>SHOP NOW</Link>
               </motion.button>
            </div>
         </div>
      </div>
   );
};

export default ParallaxSalesOffer;
