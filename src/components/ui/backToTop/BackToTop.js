import React, { useState, useEffect } from 'react';
import scrollBtn from './arrow-up-s-line.png';
import styles from './backToTop.module.css';

const BackToTop = () => {
   const [visible, setVisible] = useState(false);

   useEffect(() => {
      window.addEventListener('scroll', () => {
         if (window.scrollY > 250) {
            setVisible(true);
         } else {
            setVisible(false);
         }
      });
   }, []);

   const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
   };

   return (
      <>
         {visible && (
            <div className={styles.wrapper} onClick={scrollToTop}>
               <img src={scrollBtn} alt='scroll-btn' />
            </div>
         )}
      </>
   );
};

export default BackToTop;
