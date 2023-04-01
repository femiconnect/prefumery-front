import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sortProducts } from '../../../../redux/slices/filterSlice';
import { selectProducts } from '../../../../redux/slices/productSlice';

const Sort = ({ setFilterLoader }) => {
   const [sort, setSort] = useState('latest');

   const products = useSelector(selectProducts);
   const dispatch = useDispatch();

   //sort products by given criteria
   useEffect(() => {
      window.scrollTo(0, 0);

      dispatch(
         sortProducts({
            products,
            sort,
            setFilterLoader,
         })
      );
   }, [products, sort, setFilterLoader, dispatch]);

   const handleSetSort = (e) => {
      setFilterLoader(true);
      setSort(e.target.value);
   };

   return (
      <div className='filter__widget'>
         <label>Sort By: </label>{' '}
         <select value={sort} onChange={(e) => handleSetSort(e)}>
            <option value='latest'>Latest</option>
            <option value='lowest-price'>Lowest Price</option>
            <option value='highest-price'>Highest Price</option>
            <option value='a-z'>A - Z</option>
            <option value='z-a'>Z - A</option>
         </select>
      </div>
   );
};

export default Sort;
