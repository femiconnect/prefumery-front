import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
   signInWithEmailAndPassword,
   signInWithPopup,
   GoogleAuthProvider,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { auth } from '../../../firebase/config';
import { Helmet, Footer } from '../../../components/layout';
import SubmitBtn from '../../../components/ui/submitBtn/SubmitBtn';
import { selectpreviousURL } from '../../../redux/slices/cartSlice';
import { setActiveUser } from '../../../redux/slices/authSlice';
import './login.css';

const Login = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   const previousURL = useSelector(selectpreviousURL);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   //redirect user who got to this page from the cart page
   const backToCartPage = () => {
      if (previousURL.includes('cart')) {
         return navigate('/cart');
      } else {
         navigate('/');
      }
   };

   //login user with email and password
   const loginUser = (e) => {
      e.preventDefault();
      setIsLoading(true);

      //Login with email and password
      signInWithEmailAndPassword(auth, email, password)
         .then((userCredential) => {
            const tempUser = userCredential.user;
            let user = {};
            user.email = tempUser.email;
            user.userName = tempUser.displayName;
            user.userID = tempUser.uid;
            user.userPhoto = tempUser.photoURL;

            dispatch(setActiveUser(user));
            setIsLoading(false);

            backToCartPage();
         })
         .catch((error) => {
            setIsLoading(false);
            toast.error(error.message, {
               position: 'top-right',
               autoClose: 3000,
               theme: 'colored',
            });
         });
   };

   //Login with google account
   const provider = new GoogleAuthProvider();
   const loginWithGoogle = (e) => {
      signInWithPopup(auth, provider)
         .then((result) => {
            const tempUser = result.user;
            let user = {};
            user.email = tempUser.email;
            user.userName = tempUser.displayName;
            user.userID = tempUser.uid;
            user.userPhoto = tempUser.photoURL;

            dispatch(setActiveUser(user));
            setIsLoading(false);
            backToCartPage();
         })
         .catch((error) => {
            toast.error(error.message, {
               position: 'top-right',
               autoClose: 3000,
               theme: 'colored',
            });
         });
   };

   return (
      <>
         <Helmet title='Login'>
            <section>
               <Container className='content__height'>
                  <Row>
                     <Col
                        lg='4'
                        className='m-auto text-align-center login__content'
                     >
                        <h3 className='fw-bold fs-4 login__header'>Login</h3>

                        <Form className='auth__form' onSubmit={loginUser}>
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
                              {/* <i className='ri-eye-off-line'></i> */}
                           </FormGroup>

                           <Link to='/reset-password' className='reset__link'>
                              Forgot password?
                           </Link>

                           <SubmitBtn txt='Login' isLoading={isLoading} />

                           <p className='no__account'>
                              Don't have an account?{' '}
                              <Link to='/register'>Register</Link>
                           </p>
                        </Form>

                        <div className='auth__form'>
                           <div className='divider'></div>

                           <div className='google__login'>
                              <button
                                 type='submit'
                                 className='buy__btn auth__btn w-100 mb-2'
                                 onClick={loginWithGoogle}
                              >
                                 <i className='ri-google-fill'></i>
                                 Sign in with Google
                              </button>
                           </div>
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

export default Login;

/*
font-size: 1rem;
    margin-top: 40px;
    display: flex;
    justify-content: center;
    column-gap: 30px;
}


*/
