import React, { useState, useEffect } from 'react';

const productFilter = () => {
   const [showMobileAside, setShowMobileAside] = useState(false);

   return (
      <div className={showMobileAside ? 'shop-aside show' : 'shop-aside'}>
         <div className='check-block'>
            <p>Categories</p>

            {allFragrance &&
               allFragrance.map((fragrance, index) => (
                  <label key={index} className='shop-checkbox' htmlFor={index}>
                     <input
                        id={index}
                        type='checkbox'
                        value={fragrance}
                        onChange={(e) => handleCheckedGroup(e, index)}
                        className='shop-checkbox-input'
                     />
                     <div className='shop-checkbox-box'></div>
                     <span>{fragrance}</span>
                  </label>
               ))}
         </div>

         <div className='radio-block'>
            <p>Gender</p>
            <label className='radio' htmlFor='myRadioIdAll'>
               <input
                  type='radio'
                  name='genderRadioFormField'
                  id='myRadioIdAll'
                  className='radio__input'
                  checked={selectedRadio === 'All'}
                  value='All'
                  onChange={(e) => handleSelectedRadio(e)}
               />
               <div className='radio__radio'></div>

               <span>All</span>
            </label>

            <label className='radio' htmlFor='myRadioIdMale'>
               <input
                  type='radio'
                  name='genderRadioFormField'
                  id='myRadioIdMale'
                  className='radio__input'
                  checked={selectedRadio === 'Male'}
                  value='Male'
                  onChange={(e) => handleSelectedRadio(e)}
               />
               <div className='radio__radio'></div>

               <span>Male</span>
            </label>

            <label className='radio' htmlFor='myRadioIdFemale'>
               <input
                  type='radio'
                  name='genderRadioFormField'
                  id='myRadioIdFemale'
                  className='radio__input'
                  checked={selectedRadio === 'Female'}
                  value='Female'
                  onChange={(e) => handleSelectedRadio(e)}
               />
               <div className='radio__radio'></div>

               <span>Female</span>
            </label>

            <label className='radio' htmlFor='myRadioIdUnisex'>
               <input
                  type='radio'
                  name='genderRadioFormField'
                  id='myRadioIdUnisex'
                  className='radio__input'
                  checked={selectedRadio === 'Unisex'}
                  value='Unisex'
                  onChange={(e) => handleSelectedRadio(e)}
               />
               <div className='radio__radio'></div>

               <span>Unisex</span>
            </label>
         </div>

         <div className='price-range'>
            <p>Price</p>
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
         </div>

         <p>clear filter</p>

         {/* --- This div will show on small screens only --- */}
         <div className='topFilter-mobile'>
            <Search value={search} onChange={(e) => handleSetSearch(e)} />

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
         </div>
      </div>
   );
};

export default productFilter;
