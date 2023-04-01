import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { motion } from 'framer-motion';
import serviceData from './serviceData';
import './services.css';

const Services = () => {
   return (
      <section className='services'>
         <Container>
            <Row>
               {serviceData.map((item, index) => (
                  <Col lg='3' md='6' sm='6' key={index}>
                     <motion.div
                        whileHover={{ scale: 1.1 }}
                        className='service__item'
                        style={{ background: `${item.bg}` }}
                     >
                        <span>
                           <i className={item.icon}></i>
                        </span>
                        <div>
                           <h3>{item.title}</h3>
                           {/* <p>{item.subtitle}</p> */}
                        </div>
                     </motion.div>
                  </Col>
               ))}
            </Row>
         </Container>
      </section>
   );
};

export default Services;
