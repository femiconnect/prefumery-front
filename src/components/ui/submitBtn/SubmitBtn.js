import React from 'react';
import loaderImg from './loader.png';
import './submitBtn.css';

const SubmitBtn = (props) => {
   const { txt, isLoading } = props;

   return (
      <button
         type='submit'
         className={isLoading === true ? 'uiBtn disabled' : 'uiBtn'}
         disabled={isLoading === true ? true : false}
      >
         {isLoading === true ? (
            <img src={loaderImg} alt='' />
         ) : (
            <span className='txt'>{txt}</span>
         )}
      </button>
   );
};

export default SubmitBtn;
