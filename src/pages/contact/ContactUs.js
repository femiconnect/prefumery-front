import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Container, Row, Col } from 'reactstrap';
import { toast } from 'react-toastify';
import { Helmet, CommonSection, Header, Footer } from '../../components/layout';
import SubmitBtn from '../../components/ui/submitBtn/SubmitBtn';
import customerSupportImg from '../../assets/images/z-others/cutomer-support.jpg';
import './contactUs.css';

const ContactUs = () => {
   const [isLoading, setIsLoading] = useState(false);
   const form = useRef();
   console.log(['form is, ', form]);

   const sendEmail = (e) => {
      e.preventDefault();
      setIsLoading(true);

      emailjs
         .sendForm(
            'service_aykzuks',
            'template_lmy615p',
            form.current,
            '7NPAivHgKFKzZvHvi'
         )
         .then(
            (result) => {
               console.log(result.text);
               toast.success('Message sent successfully', {
                  position: 'top-right',
                  autoClose: 3000,
                  theme: 'colored',
               });
               setIsLoading(false);
            },
            (error) => {
               console.log(error.text);
               toast.error(error.text, {
                  position: 'top-right',
                  autoClose: 3000,
                  theme: 'colored',
               });
               setIsLoading(false);
            }
         );

      e.target.reset();
   };

   return (
      <>
         <Header />
         <Helmet title='Contact Us'>
            <CommonSection title='Contact Us' />
            <section>
               <Container className='contact container-flexible'>
                  <Row className='contact-info'>
                     <Col lg='3' md='6' sm='6'>
                        <span>
                           <i className='ri-phone-fill'></i>
                        </span>
                        <span className='title'>Phone No.</span>
                        <span className='text'>+234-811-083-6326</span>
                     </Col>

                     <Col lg='3' md='6' sm='6'>
                        <span>
                           <i className='ri-mail-open-fill'></i>
                        </span>
                        <span className='title'>E-mail</span>
                        <span className='text'>support@perfumery.com</span>
                     </Col>

                     <Col lg='3' md='6' sm='6'>
                        <span>
                           <i className='ri-map-pin-fill'></i>
                        </span>
                        <span className='title'>Address</span>
                        <span className='text'>
                           238, Ribadu Rd, Victoria Island, Lagos, Nigeria
                        </span>
                     </Col>

                     <Col lg='3' md='6' sm='6'>
                        <span>
                           <i className='ri-time-fill'></i>
                        </span>
                        <span className='title'>Opening Hours</span>
                        <span className='text'>
                           Monday - Friday (9:00AM to 5:00PM)
                        </span>
                     </Col>
                  </Row>

                  <Row className='contact-form mb-5'>
                     <Col lg='6'>
                        <form ref={form} onSubmit={sendEmail}>
                           <div className='inputBox'>
                              <input
                                 type='text'
                                 placeholder='First Name'
                                 name='user_name'
                                 required
                                 autoComplete='off'
                              />

                              <input
                                 type='text'
                                 placeholder='Last Name'
                                 name='last_name'
                                 required
                                 autoComplete='off'
                              />
                           </div>

                           <div className='inputBox'>
                              <input
                                 type='email'
                                 placeholder='E-mail'
                                 name='user_email'
                                 required
                                 autoComplete='off'
                              />

                              <input
                                 type='text'
                                 placeholder='Phone'
                                 name='phone'
                                 required
                                 autoComplete='off'
                              />
                           </div>

                           <div className='inputBox'>
                              <input
                                 type='text'
                                 placeholder='Subject'
                                 name='subject'
                                 required
                                 autoComplete='off'
                              />
                           </div>

                           <div className='inputBox'>
                              <textarea
                                 name='message'
                                 placeholder='Enter Your Message'
                                 required
                                 cols='30'
                                 rows='10'
                              ></textarea>
                           </div>

                           <SubmitBtn
                              txt='Send Message'
                              isLoading={isLoading}
                           />
                        </form>
                     </Col>

                     <Col lg='6'>
                        <div className='contact-img'>
                           <img src={customerSupportImg} alt='' />
                        </div>
                     </Col>
                  </Row>
               </Container>

               <div className='map'>
                  <iframe
                     src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15858.908894700426!2d3.40784666106183!3d6.429078867731753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf53280e7648d%3A0x4d01e5de6b847fe5!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1676252150732!5m2!1sen!2sng'
                     width='100%'
                     height='450'
                     style={{ border: '0' }}
                     allowFullScreen=''
                     loading='lazy'
                     referrerPolicy='no-referrer-when-downgrade'
                  ></iframe>
               </div>
            </section>
         </Helmet>
         <Footer />
      </>
   );
};

export default ContactUs;
