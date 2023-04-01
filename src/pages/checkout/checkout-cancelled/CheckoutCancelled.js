import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import { Helmet, Footer, Header } from '../../../components/layout';
import './checkoutCancelled.css';

const CheckoutCancelled = () => {
   return (
      <>
         <Header />
         <Helmet title='Cart'>
            <section>
               <Container>
                  <Row>
                     <Col lg='12'>
                        <div className='checkout__cancelled'>
                           <h1>Checkout Failed</h1>
                           <h4>Payment was not successful</h4>

                           <button className='buy__btn  mt-3'>
                              <Link to='/'>&larr; Home</Link>
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

export default CheckoutCancelled;
