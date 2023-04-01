import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useStripe } from '@stripe/react-stripe-js';
import {
   fetchFromAPI,
   shortenText,
} from '../../../utilFunctions/utilsFunctions';
import { selectCartItems } from '../../../redux/slices/cartSlice';
import { selectUser } from '../../../redux/slices/authSlice';
import { toast } from 'react-toastify';

const ProcessCheckoutBtn = () => {
   const [buttonClicked, setButtonClicked] = useState(false);
   const cartItems = useSelector(selectCartItems);
   const user = useSelector(selectUser);
   const stripe = useStripe();

   const handleCheckout = async () => {
      //console.log(cartItems);
      setButtonClicked(true);
      const line_items = cartItems.map((item) => {
         return {
            quantity: item.cartQty,
            price_data: {
               currency: 'usd',
               unit_amount: Math.trunc(item.price * 100), //stripe uses the lowest denomination; therefore, amount is in cents
               product_data: {
                  name: item.name,
                  description: shortenText(item.desc, 30),
                  images: [item.imageURL],
               },
            },
         };
      });

      console.log('line items', line_items);

      const response = await fetchFromAPI('create-checkout-session', {
         body: { line_items, customer_email: user.email },
      });

      const { sessionId } = response;
      console.log('sessionId is', sessionId);
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
         console.log(error);
         toast.error('Something went wrong', {
            position: 'top-right',
            autoClose: 3000,
            theme: 'colored',
         });
      }
   };

   return (
      <>
         <button className='buy__btn w-100 mt-3' onClick={handleCheckout}>
            {buttonClicked ? 'Please wait...' : 'Checkout'}
         </button>
      </>
   );
};

export default ProcessCheckoutBtn;
