import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Container, Row, Col, Table } from 'reactstrap';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import Notiflix from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { db, storage } from '../../../../firebase/config';
import Helmet from '../../../../components/layout/helmet/Helmet';
import Loader from '../../../../components/ui/loader/Loader';
import Search from '../../../../components/ui/filters/search-filter/Search';
import { thousands_separators } from '../../../../utilFunctions/utilsFunctions';
import useFetchCollection from '../../../../customHooks/useFetchCollection';
import {
   selectProducts,
   storeProducts,
} from '../../../../redux/slices/productSlice';
import { selectFilteredProducts } from '../../../../redux/slices/filterSlice';
import './allProducts.css';
import Pagination from '../../../../components/ui/filters/pagination/Pagination';

const AllProducts = () => {
   const { data, isPending, error } = useFetchCollection('perfumes');
   const [isLoading, setIsLoading] = useState(true);

   const [filterLoader, setFilterLoader] = useState(false);

   //states for pagination
   const [currentPage, setCurrentPage] = useState(1);
   const [productsPerPage] = useState(10);

   const products = useSelector(selectProducts);
   const filteredProducts = useSelector(selectFilteredProducts);

   const dispatch = useDispatch();

   //process pagination - generate the current products for a page
   const indexOfLastProductOnPage = currentPage * productsPerPage;
   const indexOfFirstProductOnPage = indexOfLastProductOnPage - productsPerPage;
   const currentProducts = filteredProducts.slice(
      indexOfFirstProductOnPage,
      indexOfLastProductOnPage
   );

   //push the fetched data(perfumes) to the redux store
   useEffect(() => {
      dispatch(
         storeProducts({
            products: data,
         })
      );
      setIsLoading(false);
   }, [dispatch, data]);

   const confirmDelete = (id, imageURL) => {
      Notiflix.Confirm.show(
         'Delete Product!!!',
         'Are you sure you want to delete this product?',
         'Delete',
         'Cancel',
         function okCb() {
            deleteProduct(id, imageURL);
         },
         function cancelCb() {
            console.log('...');
         },
         {
            width: '320px',
            borderRadius: '0px',
            titleColor: '#0a1d37',
            okButtonBackground: '#0a1d37',
            cssAnimationStyle: 'zoom',
         }
      );
   };

   const deleteProduct = async (id, imageURL) => {
      try {
         //1. delete product document from firebase firestore
         await deleteDoc(doc(db, 'perfumes', id));

         //2. delete product image file from firebase storage

         //2a. create a refrence to the image file to be deleted
         const storageRef = ref(storage, imageURL);

         //2b. delete the image file
         await deleteObject(storageRef);

         toast.success('Product deleted successfully...');
      } catch (error) {
         toast.error('Something went wrong...');
         console.log(['Error msg from deleteProduct()', error.message]);
      }
   };

   return (
      <Helmet title={'All Products'}>
         <section>
            <Container className='container-flexible'>
               {error && <div>{error}</div>}
               {isPending && <Loader />}
               {isLoading && <Loader />}
               {products && (
                  <Row>
                     <Col lg='12' className='content__height'>
                        {isLoading && <Loader />}

                        {currentProducts.length === 0 ? (
                           <h4>No products found</h4>
                        ) : (
                           <>
                              <div className='all-products-heading'>
                                 <h2> All Products</h2>

                                 <div>
                                    <p>
                                       <span>{filteredProducts.length}</span>{' '}
                                       product(s) found
                                    </p>
                                    <Search setFilterLoader={setFilterLoader} />
                                 </div>
                              </div>
                              <Table responsive>
                                 <thead>
                                    <tr>
                                       <th>#</th>
                                       <th>Name</th>
                                       <th>Image</th>
                                       <th>Sex</th>
                                       <th>Price</th>
                                       <th>Action</th>
                                    </tr>
                                 </thead>
                                 <tbody>
                                    {currentProducts.map((product, index) => {
                                       const {
                                          id,
                                          name,
                                          imageURL,
                                          sex,
                                          price,
                                       } = product;

                                       return (
                                          <tr key={id}>
                                             <td>{index + 1}</td>
                                             <td>{name}</td>
                                             <td>
                                                <img src={imageURL} alt='' />
                                             </td>
                                             <td>{sex}</td>
                                             <td>
                                                $
                                                {thousands_separators(
                                                   price.toFixed(2)
                                                )}
                                             </td>
                                             <td className='actions'>
                                                <span>
                                                   <Link
                                                      to={`/admin/add-product/${id}`}
                                                   >
                                                      <i className='ri-file-edit-line edit'></i>
                                                   </Link>
                                                </span>
                                                <span
                                                   onClick={() =>
                                                      confirmDelete(
                                                         id,
                                                         imageURL
                                                      )
                                                   }
                                                >
                                                   <i className='ri-delete-bin-2-line delete'></i>
                                                </span>
                                             </td>
                                          </tr>
                                       );
                                    })}
                                 </tbody>
                              </Table>

                              {currentProducts.length === 0 ? null : (
                                 <Pagination
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    productsPerPage={productsPerPage}
                                    totalProducts={filteredProducts.length}
                                    setFilterLoader={setFilterLoader}
                                 />
                              )}
                           </>
                        )}
                     </Col>
                  </Row>
               )}
            </Container>
         </section>
      </Helmet>
   );
};

export default AllProducts;
