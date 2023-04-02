import React from 'react';
import ProductCard from '../productCard/ProductCard';

const ProductList = ({ data }) => {
   if (data.length === 0) {
      return <p>No products found</p>;
   }

   return (
      <>
         {data?.map((item, index) => (
            <ProductCard item={item} key={index} />
         ))}
      </>
   );
};

export default ProductList;
