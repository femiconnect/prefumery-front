import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { Helmet, Header, Footer } from '../../components/layout';
import './redirect.css';

const Redirect = () => {
   const [count, setCount] = useState(5);

   const navigate = useNavigate();

   useEffect(() => {
      const interval = setInterval(() => {
         setCount((currentCount) => --currentCount);
      }, 1000);

      if (count === 0) navigate('/');

      //cleanup functon
      return () => clearInterval(interval);
   }, [count, navigate]);

   //after the count of 5 an unauthorised user will be redirected to the login page
   return (
      <>
         <Header />
         <Helmet title='Redirect'>
            <section>
               <Container>
                  <Row>
                     <Col className='d-flex justify-content-center align-items-center load__redirect'>
                        <div className='a'>
                           <h2>Permission Denied!!!</h2>
                           <br></br>
                           <p>This page can only be viewed by an admin</p>
                           <p>Redirecting you in {count} seconds.....</p>
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

export default Redirect;
