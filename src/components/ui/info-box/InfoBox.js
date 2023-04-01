import React from 'react';
import styles from './infoBox.module.css';

const InfoBox = ({ bg, text }) => {
   return (
      <div className={styles.wrapper}>
         <div className={styles.img}>
            <img src={bg} alt='bg-img'></img>
         </div>

         <div className={styles.text}>
            <h3>Discover</h3>
            <h2>{text}</h2>
         </div>
      </div>
   );
};

export default InfoBox;
