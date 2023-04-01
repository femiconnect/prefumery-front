import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import sliderData from './slider-data.json';
import arrowPrev from './arrow-left.png';
import arrowNext from './arrow-right.png';
import './heroSlider.css';

const PrevBtn = (props) => {
   //console.log(props);
   const { className, onClick } = props;

   return (
      <div className={className} onClick={onClick}>
         <img src={arrowPrev} alt='' />
      </div>
   );
};

const NextBtn = (props) => {
   //console.log(props);
   const { className, onClick } = props;

   return (
      <div className={className} onClick={onClick}>
         <img src={arrowNext} alt='' />
      </div>
   );
};

const HeroSlider = () => {
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

   //slider setting
   const settings = {
      autoplay: true,
      autoplaySpeed: 5000,
      infinite: true,
      swipeToSlide: true,
      pauseOnHover: false,
      prevArrow: <PrevBtn />,
      nextArrow: <NextBtn />,
   };

   return (
      <div className='basic-carousel'>
         <Slider {...settings}>
            {sliderData.map((slide) => (
               <div className='basic-slide' key={slide.id}>
                  <img
                     src={
                        windowSize.innerWidth <= 640
                           ? slide.smImgUrl
                           : windowSize.innerWidth <= 1024
                           ? slide.mdImgUrl
                           : slide.lgImgUrl
                     }
                     alt=''
                  />
                  <div className='info-container'>
                     <div className='info'>
                        <h2>{slide.title}</h2>
                        <p>{slide.desc}</p>

                        <div className='separator'></div>

                        <motion.button
                           whileTap={{ scale: 1.2 }}
                           className='buy__btn mgTopBtm'
                        >
                           <Link to='/shop'>SHOP NOW</Link>
                        </motion.button>
                     </div>
                  </div>
               </div>
            ))}
         </Slider>
      </div>
   );
};

export default HeroSlider;
