import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import {
   createUserWithEmailAndPassword,
   updateProfile,
   AuthErrorCodes,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../../../firebase/config';
import { Helmet, Footer } from '../../../components/layout';
import SubmitBtn from '../../../components/ui/submitBtn/SubmitBtn';
import './register.css';

const Register = () => {
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   const navigate = useNavigate();

   const registerUser = async (e) => {
      e.preventDefault();
      setIsLoading(true);

      if (password !== confirmPassword) {
         setIsLoading(false);
         toast.error('Passwords do not match');
      } else {
         createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
               //console.log(userCredential.user);
               const user = userCredential.user;
               return updateProfile(user, {
                  displayName: username,
                  photoURL: 'https://example.com/jane-q-user/profile.jpg',
                  //photoURL link will be a link of a photo uploaded to cloudinary
               });
            })
            .then((res) => {
               setIsLoading(false);
               toast.success('Registration successful...');
               navigate('/login');
            })
            .catch((error) => {
               setIsLoading(false);
               if (error.code === 'auth/email-already-in-use') {
                  toast.error('Email already in use, try another email');
               } else if (error.code === AuthErrorCodes.WEAK_PASSWORD) {
                  toast.error('Password must have at least 6 characters');
               } else {
                  console.log(error.message);
                  toast.error('Something went wrong');
               }
            });
      }
   };

   return (
      <>
         <Helmet title='Register'>
            <section>
               <Container className='content__height'>
                  <Row>
                     <Col
                        lg='4'
                        className='m-auto text-align-center register__content'
                     >
                        <h3 className='fw-bold fs-4 login__header'>Register</h3>

                        <Form className='auth__form' onSubmit={registerUser}>
                           <FormGroup className='form__group'>
                              <input
                                 className='input__field'
                                 type='text'
                                 placeholder='Username'
                                 value={username}
                                 onChange={(e) => setUsername(e.target.value)}
                                 required
                              />
                           </FormGroup>

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

                           <FormGroup className='form__group password__input-group'>
                              <input
                                 className='input__field'
                                 type='password'
                                 placeholder='Enter your password'
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 required
                              />
                              <i className='ri-eye-line'></i>
                           </FormGroup>

                           <FormGroup className='form__group password__input-group'>
                              <input
                                 className='input__field'
                                 type='password'
                                 placeholder='Confirm your password'
                                 value={confirmPassword}
                                 onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                 }
                                 required
                              />
                              <i className='ri-eye-line'></i>
                           </FormGroup>

                           <SubmitBtn txt='Register' isLoading={isLoading} />

                           <p className='no__account'>
                              Already have an account?{' '}
                              <Link to='/login'>Login</Link>
                           </p>

                           <p className='no__account'>
                              <Link to='/'>Back to home page</Link>
                           </p>
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

export default Register;
