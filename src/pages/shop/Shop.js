import React, { useEffect, useState } from 'react';
import { Container, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import ProductList from '../../components/ui/productList/ProductList';
import { Helmet, CommonSection, Header, Footer } from '../../components/layout';
import Loader from '../../components/ui/loader/Loader';
import Spinner from '../../components/ui/spinner/Spinner';
import {
   Search,
   Sort,
   FilterByBrand,
   CheckboxGroupFilter,
   PriceFilter,
   Pagination,
} from '../../components/ui/filters/';
import useFetchCollection from '../../customHooks/useFetchCollection';
import { storeProducts, getPriceRange } from '../../redux/slices/productSlice';
import { selectFilteredProducts } from '../../redux/slices/filterSlice';
import './shop.css';

const Shop = () => {
   //fetch all products from fireStore
   const { data, isPending, error } = useFetchCollection('perfumes');
   const [isLoading, setIsLoading] = useState(true);

   const [filterLoader, setFilterLoader] = useState(false);
   const [showMobileAside, setShowMobileAside] = useState(false);

   //states for pagination
   const [currentPage, setCurrentPage] = useState(1);
   const [productsPerPage] = useState(12);

   //variables for getting data from redux store
   const filteredProducts = useSelector(selectFilteredProducts);

   const dispatch = useDispatch();

   // //generate the current products for a page
   const indexOfLastProductOnPage = currentPage * productsPerPage;
   const indexOfFirstProductOnPage = indexOfLastProductOnPage - productsPerPage;
   const currentProducts = filteredProducts.slice(
      indexOfFirstProductOnPage,
      indexOfLastProductOnPage
   );

   //automatically display page from top
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   //push the fetched data(perfumes) from firestore to the redux store
   useEffect(() => {
      dispatch(
         storeProducts({
            products: data,
         })
      );

      dispatch(
         getPriceRange({
            products: data,
         })
      );

      setIsLoading(false);
   }, [data, dispatch]);

   return (
      <>
         <Header />
         <Helmet title='Shop'>
            <CommonSection title='Products' />
            {error && <div>{error}</div>}
            {isPending && <Loader />}
            {isLoading && <Loader />}
            <section className='pt-0 shop__section'>
               <Container className='container-flexible'>
                  <Row>
                     <div className='shop'>
                        <div
                           className={
                              showMobileAside ? 'shop-aside show' : 'shop-aside'
                           }
                        >
                           <div className='check-block'>
                              <p>Categories</p>
                              <CheckboxGroupFilter
                                 setFilterLoader={setFilterLoader}
                              />
                           </div>

                           <div className='price-range'>
                              <p>Price</p>
                              <PriceFilter setFilterLoader={setFilterLoader} />
                           </div>
                        </div>

                        <div className='content'>
                           <div className='topFilter'>
                              <div className='filter__widget products__found'>
                                 {filteredProducts.length} products found
                              </div>

                              <div className='brand-filter'>
                                 <FilterByBrand
                                    setFilterLoader={setFilterLoader}
                                 />
                              </div>

                              <div className='sort-filter'>
                                 <Sort setFilterLoader={setFilterLoader} />
                              </div>

                              <div className='search-filter'>
                                 <Search setFilterLoader={setFilterLoader} />
                              </div>
                           </div>
                           <div
                              className={
                                 isLoading || filterLoader
                                    ? 'shop-content'
                                    : 'shop-product-listing'
                              }
                           >
                              {isLoading || filterLoader ? (
                                 <Spinner />
                              ) : (
                                 <ProductList data={currentProducts} />
                              )}
                           </div>

                           {currentProducts.length === 0 ? null : (
                              <Pagination
                                 currentPage={currentPage}
                                 setCurrentPage={setCurrentPage}
                                 productsPerPage={productsPerPage}
                                 totalProducts={filteredProducts.length}
                                 setFilterLoader={setFilterLoader}
                              />
                           )}
                        </div>
                     </div>
                  </Row>
               </Container>
            </section>
         </Helmet>
         <Footer />
      </>
   );
};

export default Shop;
