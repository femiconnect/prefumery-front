import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByBrand } from '../../../../redux/slices/filterSlice';
import { selectProducts } from '../../../../redux/slices/productSlice';

const FilterByBrand = ({ setFilterLoader }) => {
   const [brand, setBrand] = useState('All');

   const products = useSelector(selectProducts);
   const dispatch = useDispatch();

   //get all unique brands from the product list
   const allBrand = [
      'All',
      ...new Set(products.map((product) => product.brand)),
   ];

   //filter products by brand
   useEffect(() => {
      window.scrollTo(0, 0);

      dispatch(
         filterByBrand({
            products,
            brand,
            setFilterLoader,
         })
      );
   }, [products, brand, setFilterLoader, dispatch]);

   const handleSetBrand = (e) => {
      setFilterLoader(true);
      setBrand(e.target.value);
   };

   return (
      <div className='filter__widget'>
         <label>Brand Name: </label>{' '}
         <select value={brand} onChange={(e) => handleSetBrand(e)}>
            {allBrand &&
               allBrand.map((brand, index) => {
                  return (
                     <option key={index} value={brand}>
                        {brand}
                     </option>
                  );
               })}
         </select>
      </div>
   );
};

export default FilterByBrand;
