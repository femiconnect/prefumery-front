import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterBySearch } from '../../../../redux/slices/filterSlice';
import { selectProducts } from '../../../../redux/slices/productSlice';
import './search.css';

const Search = ({ setFilterLoader }) => {
   const [search, setSearch] = useState('');

   const products = useSelector(selectProducts);
   const dispatch = useDispatch();

   //filter products by search
   useEffect(() => {
      window.scrollTo(0, 0);

      dispatch(
         filterBySearch({
            products,
            search,
            setFilterLoader,
         })
      );
   }, [products, search, setFilterLoader, dispatch]);

   const handleSetSearch = (e) => {
      setFilterLoader(true);
      setSearch(e.target.value);
   };

   return (
      <div className='search__box'>
         <input
            type='text'
            placeholder='Search By Name'
            value={search}
            onChange={(e) => handleSetSearch(e)}
         />
         <span>
            <i className='ri-search-line'></i>
         </span>
      </div>
   );
};

export default Search;
