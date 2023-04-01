import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { toast } from 'react-toastify';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebase/config';
import { Helmet, Header, Footer } from '../../../components/layout';
import SubmitBtn from '../../../components/ui/submitBtn/SubmitBtn';
import './resetPassword.css';

const ResetPassword = () => {
   const [email, setEmail] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   const navigate = useNavigate();

   const resetPassword = (e) => {
      e.preventDefault();
      setIsLoading(true);

      sendPasswordResetEmail(auth, email)
         .then(() => {
            setIsLoading(false);
            toast.success('Check your email for a reset link');
            navigate('/');
         })
         .catch((error) => {
            setIsLoading(false);
            toast.error(error.message);
         });
   };

   return (
      <>
         <Header />
         <Helmet title='Reset Password'>
            <section>
               <Container className='content__height'>
                  <Row className='reset__container'>
                     <Col lg='4' className='reset__center'>
                        <h3 className='fw-bold fs-4 login__header'>
                           Reset Password
                        </h3>

                        <Form className='auth__form' onSubmit={resetPassword}>
                           <FormGroup className='form__group'>
                              <input
                                 className='input__field'
                                 type='email'
                                 placeholder='Enter your email'
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 required
                              />
                           </FormGroup>
                           {/* <button
                              type='submit'
                              className='buy__btn auth__btn w-100 reset__btn'
                           >
                              Reset Password
                           </button> */}
                           <SubmitBtn
                              txt='Reset Password'
                              isLoading={isLoading}
                           />
                        </Form>
                     </Col>
                  </Row>
               </Container>
            </section>
         </Helmet>
         <Footer />
      </>
   );
};

export default ResetPassword;
