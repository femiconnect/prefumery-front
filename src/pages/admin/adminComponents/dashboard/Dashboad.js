import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import useFetchCollection from '../../../../customHooks/useFetchCollection';
import {
   selectProducts,
   storeProducts,
} from '../../../../redux/slices/productSlice';
import './dashboard.css';

const Dashboad = () => {
   const products = useSelector(selectProducts);

   console.log(['Printing total products from Admin', products]);

   const dispatch = useDispatch();

   //fetch all products from fireStore
   const { data, isLoading } = useFetchCollection('perfumes');

   //push the fetched data(perfumes) from firestore to the redux store
   useEffect(() => {
      dispatch(
         storeProducts({
            products: data,
         })
      );
   }, [data, dispatch]);

   return (
      <>
         <section>
            <Container className='content__height'>
               <Row className='dashboard'>
                  <Col className='lg-3'>
                     <div className='revenue__box'>
                        <h5>Total Sales</h5>
                        <span>$4500</span>
                     </div>
                  </Col>
                  <Col className='lg-3'>
                     <div className='order__box'>
                        <h5>Orders</h5>
                        <span>500</span>
                     </div>
                  </Col>
                  <Col className='lg-3'>
                     <div className='products__box'>
                        <h5>Total Products</h5>
                        <span>{products?.length}</span>
                     </div>
                  </Col>
                  <Col className='lg-3'>
                     <div className='users__box'>
                        <h5>Total Users</h5>
                        <span>100</span>
                     </div>
                  </Col>
               </Row>
            </Container>
         </section>
      </>
   );
};

export default Dashboad;
