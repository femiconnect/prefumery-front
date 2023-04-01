import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { filterBySearch } from '../../../redux/slices/filterSlice';
import { selectProducts } from '../../../redux/slices/productSlice';

const HeaderSearchLg = () => {
   const [search, setSearch] = useState('');
   const [filterLoader, setFilterLoader] = useState(false);

   const products = useSelector(selectProducts);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleSearch = () => {
      setFilterLoader(true);
      dispatch(
         filterBySearch({
            products,
            search,
            setFilterLoader,
         })
      );
      navigate('/shop');
   };

   return (
      <div className='s'>
         <input
            type='text'
            placeholder='Search By Name'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
         />
         <span onClick={handleSearch}>
            <i className='ri-search-line'></i>
         </span>
      </div>
   );
};

export default HeaderSearchLg;
