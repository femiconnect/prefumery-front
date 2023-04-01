import React from 'react';
import './helmet.css';

const Helmet = (props) => {
   document.title = `Perfumery - ${props.title}`;
   return <div className='w-100 helmet'>{props.children}</div>;
};

export default Helmet;
