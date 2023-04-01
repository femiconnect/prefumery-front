import React, { useState, useEffect, useCallback } from 'react';
import { addLeadingZeros } from '../../../utilFunctions/utilsFunctions';
import './clock.css';

const Clock = () => {
   const [days, setDays] = useState();
   const [hours, setHours] = useState();
   const [minutes, setMinutes] = useState();
   const [seconds, setSeconds] = useState();

   const countDown = useCallback(() => {
      const destination = new Date('Apr 11, 2023').getTime();
      let interval;
      interval = setInterval(() => {
         const now = new Date().getTime();
         const difference = destination - now;
         const days = Math.floor(difference / (1000 * 60 * 60 * 24));
         const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
         );
         const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
         );
         const seconds = Math.floor((difference % (1000 * 60)) / 1000);

         if (destination < 0) clearInterval(interval.current);
         else {
            setDays(days);
            setHours(hours);
            setMinutes(minutes);
            setSeconds(seconds);
         }
      });
   }, []);

   useEffect(() => {
      countDown();

      //useEffect React warning - read about it
      //The ‘functionName’ function makes the dependencies of useEffect Hook (at line X) change on every render. Move it inside the useEffect callback. Alternatively, wrap the definition of ‘functionName’ in its own useCallback() Hook. (react-hooks/exhaustive-deps)
      //https://typeofnan.dev/fix-function-makes-the-dependencies-of-useEffect-hook-change-on-every-render-warning-in-react/
   }, [countDown]);

   return (
      <div className='clock__wrapper'>
         <div className='clock__data'>
            <div className='value'>
               <h1>{addLeadingZeros(days, 2)}</h1>
            </div>

            <h5 className='text-white fs-6'>Days</h5>
         </div>

         <div>
            <span className='text-white fs-3'>:</span>
         </div>

         <div className='clock__data'>
            <div className='value'>
               <h1>{addLeadingZeros(hours, 2)}</h1>
            </div>

            <h5 className='text-white fs-6'>Hours</h5>
         </div>

         <div>
            <span className='text-white fs-3'>:</span>
         </div>

         <div className='clock__data'>
            <div className='value'>
               <h1>{addLeadingZeros(minutes, 2)}</h1>
            </div>

            <h5 className='text-white fs-6'>Minutes</h5>
         </div>

         <div>
            <span className='text-white fs-3'>:</span>
         </div>

         <div className='clock__data'>
            <div className='value'>
               <h1>{addLeadingZeros(seconds, 2)}</h1>
            </div>

            <h5 className='text-white fs-6'>Seconds</h5>
         </div>
      </div>
   );
};

export default Clock;
