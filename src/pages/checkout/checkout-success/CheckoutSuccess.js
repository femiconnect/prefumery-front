import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { Helmet, Footer, Header } from '../../../components/layout';
import { clearCart } from '../../../redux/slices/cartSlice';
import './checkoutSuccess.css';

const CheckoutSuccess = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(clearCart());
   }, [dispatch]);

   return (
      <>
         <Header />
         <Helmet title='Cart'>
            <section>
               <Container>
                  <Row>
                     <Col lg='12'>
                        <div className='checkout__success'>
                           <h1>Checkout Successful</h1>
                           <h4>Thank you for your order</h4>
                           <h4>
                              We are currently processing your order and will
                              send you a confirmation email shortly
                           </h4>
                           <p>
                              In case of any enquiries, contact us at{' '}
                              <span>support@perfumery.com</span>
                           </p>
                           <button className='buy__btn  mt-3'>
                              <Link to='/shop'>&larr; continue Shopping</Link>
                           </button>
                        </div>
                     </Col>
                  </Row>
               </Container>
            </section>
         </Helmet>
         <Footer />
      </>
   );
};

export default CheckoutSuccess;
