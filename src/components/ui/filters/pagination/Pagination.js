import React, { useState } from 'react';
import './pagination.css';

const Pagination = ({
   currentPage,
   setCurrentPage,
   productsPerPage,
   totalProducts,
   setFilterLoader,
}) => {
   // Limit the page Numbers shown
   const [pageNumberLimit] = useState(5);
   const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
   const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

   const pageNumbers = [];
   const totalPages = totalProducts / productsPerPage;

   //populate pageNumbers array
   for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
      pageNumbers.push(i);
   }
   // console.log(pageNumbers);

   //function to select a particular page (number)
   const paginate = (pageNumber) => {
      window.scrollTo(0, 0);
      setFilterLoader(true);

      setCurrentPage(pageNumber);

      setTimeout(() => {
         setFilterLoader(false);
      }, 1000);
   };

   // function to go to next page
   const paginateNext = () => {
      window.scrollTo(0, 0);
      setFilterLoader(true);

      setCurrentPage(currentPage + 1);
      // Show next set of pageNumbers
      if (currentPage + 1 > maxPageNumberLimit) {
         setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
         setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
      }

      setTimeout(() => {
         setFilterLoader(false);
      }, 1000);
   };

   // function to go to prev page
   const paginatePrev = () => {
      window.scrollTo(0, 0);
      setFilterLoader(true);

      setCurrentPage(currentPage - 1);
      // Show prev set of pageNumbers
      if ((currentPage - 1) % pageNumberLimit === 0) {
         setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
         setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      }

      setTimeout(() => {
         setFilterLoader(false);
      }, 1000);
   };

   return (
      <>
         <ul className='pagination'>
            <li
               onClick={paginatePrev}
               className={currentPage === pageNumbers[0] ? 'hidden' : null}
            >
               Prev
            </li>

            {pageNumbers.map((number) => {
               if (
                  number < maxPageNumberLimit + 1 &&
                  number > minPageNumberLimit
               ) {
                  return (
                     <li
                        key={number}
                        onClick={() => paginate(number)}
                        className={currentPage === number ? 'active' : null}
                     >
                        {number}
                     </li>
                  );
               }
            })}

            <li
               onClick={paginateNext}
               className={
                  currentPage === pageNumbers[pageNumbers.length - 1]
                     ? 'hidden'
                     : null
               }
            >
               Next
            </li>
         </ul>

         <div className='page-count'>
            <b className='page'>{`page ${currentPage}`}</b>
            <span>{` of `}</span>
            <b>{`${Math.ceil(totalPages)}`}</b>
         </div>
      </>
   );
};

export default Pagination;
