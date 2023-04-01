import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByPrice } from '../../../../redux/slices/filterSlice';
import {
   selectMaxPrice,
   selectMinPrice,
   selectProducts,
} from '../../../../redux/slices/productSlice';

const PriceFilter = ({ setFilterLoader }) => {
   const [price, setPrice] = useState(200); //set it to a value above the max price

   const products = useSelector(selectProducts);
   const minPrice = useSelector(selectMinPrice);
   const maxPrice = useSelector(selectMaxPrice);

   const dispatch = useDispatch();

   //filter products by price
   useEffect(() => {
      window.scrollTo(0, 0);

      dispatch(
         filterByPrice({
            products,
            price,
            setFilterLoader,
         })
      );
   }, [products, price, setFilterLoader, dispatch]);

   const handleSetPrice = (e) => {
      setFilterLoader(true);
      setPrice(e.target.value);
   };

   return (
      <>
         <span>{`$${price}`}</span>
         <div className='price'>
            <input
               type='range'
               value={price}
               min={minPrice}
               max={maxPrice}
               onChange={(e) => handleSetPrice(e)}
            />
         </div>
      </>
   );
};

export default PriceFilter;
