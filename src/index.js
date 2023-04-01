import React from 'react';
import ReactDOM from 'react-dom/client';
import 'remixicon/fonts/remixicon.css';
import 'bootstrap/dist/css/bootstrap.css';
import store from './redux/store';
import { Provider } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>
      <BrowserRouter>
         <Elements stripe={stripePromise}>
            <App />
         </Elements>
      </BrowserRouter>
   </Provider>
);
