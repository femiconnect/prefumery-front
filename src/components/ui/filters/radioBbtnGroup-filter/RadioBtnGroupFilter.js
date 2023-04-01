import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByGender } from '../../../../redux/slices/filterSlice';
import { selectProducts } from '../../../../redux/slices/productSlice';
import { capitalizeWord } from '../../../../utilFunctions/utilsFunctions';

const RadioBtnGroupFilter = ({ setFilterLoader }) => {
   const [selectedRadio, setSelectedRadio] = useState('All');

   const products = useSelector(selectProducts);
   const dispatch = useDispatch();

   //get all unique gender from the product list
   const allGender = [
      'All',
      ...new Set(products.map((product) => product.sex)),
   ];

   //filter products by gender
   useEffect(() => {
      window.scrollTo(0, 0);

      dispatch(
         filterByGender({
            products,
            selectedRadio,
            setFilterLoader,
         })
      );
   }, [products, selectedRadio, setFilterLoader, dispatch]);

   const handleRadioClick = (e) => {
      setFilterLoader(true);
      setSelectedRadio(e.target.value);
   };

   return (
      <>
         {allGender &&
            allGender.map((gender, index) => {
               return (
                  <label
                     className='radio'
                     htmlFor={`radioId-${gender}`}
                     key={index}
                  >
                     <input
                        type='radio'
                        name='radio-btn'
                        value={gender}
                        checked={selectedRadio === gender} //return true/false
                        onChange={handleRadioClick}
                        id={`radioId-${gender}`}
                        className='radio__input'
                     />
                     <div className='radio__radio'></div>

                     <span>{capitalizeWord(gender)}</span>
                  </label>
               );
            })}
      </>
   );
};

export default RadioBtnGroupFilter;
