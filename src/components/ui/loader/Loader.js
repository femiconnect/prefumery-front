import React from 'react';
import ReactDOM from 'react-dom';
import styles from './loader.module.css';

const Loader = () => {
   return ReactDOM.createPortal(
      <div className={styles.wrapper}>
         <div className={styles.spinner}></div>
      </div>,
      document.getElementById('loader')
   );
};

export default Loader;
