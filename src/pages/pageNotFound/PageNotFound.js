import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet, Header, Footer } from '../../components/layout';
import './pageNotFound.css';

const PageNotFound = () => {
   return (
      <>
         <Header />
         <Helmet title={'Page Not Found'}>
            <div className='not__found'>
               <h1>Oops!</h1>
               <h3>404 - Page Not Found</h3>
               <p>
                  We can't seem to find the page you are looking for. It might
                  have been removed, had it's name changed or is temporarily
                  unavailable.
               </p>
               <Link to='/'>Home</Link>
            </div>
         </Helmet>

         <Footer />
      </>
   );
};

export default PageNotFound;
