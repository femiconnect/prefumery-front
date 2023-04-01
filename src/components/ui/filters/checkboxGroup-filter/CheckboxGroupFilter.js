import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByCheckedList } from '../../../../redux/slices/filterSlice';
import { selectProducts } from '../../../../redux/slices/productSlice';
import { capitalizeWord } from '../../../../utilFunctions/utilsFunctions';

const CheckboxGroupFilter = ({ setFilterLoader }) => {
   const [checkedList, setCheckedList] = useState([]);

   const products = useSelector(selectProducts);
   const dispatch = useDispatch();

   //get all unique gender from the product list
   const allGender = [
      // 'All',
      ...new Set(products.map((product) => product.sex)),
   ];

   const handleCheckedGroup = (e, index) => {
      setFilterLoader(true);

      //returns true or false for every checked box clicked
      const activeData = document.getElementById(index).checked;

      if (activeData === true) {
         setCheckedList((oldData) => [...oldData, e.target.value]);
      } else {
         setCheckedList(
            checkedList.filter((values) => values !== e.target.value)
         );
      }
   };

   //Filter products by the checked List
   useEffect(() => {
      window.scrollTo(0, 0);

      dispatch(filterByCheckedList({ products, checkedList, setFilterLoader }));
   }, [products, checkedList, dispatch, setFilterLoader]);

   return (
      <div>
         {allGender &&
            allGender.map((gender, index) => (
               <label key={index} className='shop-checkbox' htmlFor={index}>
                  <input
                     id={index}
                     type='checkbox'
                     value={gender}
                     onChange={(e) => handleCheckedGroup(e, index)}
                     className='shop-checkbox-input'
                  />
                  <div className='shop-checkbox-box'></div>
                  <span>{capitalizeWord(gender)}</span>
               </label>
            ))}
      </div>
   );
};

export default CheckboxGroupFilter;
