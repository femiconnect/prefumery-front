import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './footer.css';

const Footer = () => {
   const year = new Date().getFullYear();

   return (
      <footer className='footer'>
         <Container>
            <Row>
               <Col lg='12' className='text-center'>
                  <p className='footer__copyright'>
                     &copy; {year} Copyright. Developed by Femi Ologunwa. All
                     rights reserved.
                  </p>
               </Col>
            </Row>
         </Container>
      </footer>
   );
};

export default Footer;
