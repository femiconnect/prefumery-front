import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/config';

const useFetchCollection = (collectionName) => {
   const [data, setData] = useState([]);
   const [isPending, setIsPending] = useState(true);
   const [error, setError] = useState(null);

   const getCollection = () => {
      try {
         //create a reference to the collection in firebase database (firestore)
         const docRef = collection(db, collectionName);

         //q = query for fetching and describing how we fetch the data from the database, that is, fetch products by the time they were created in descending order - last created product will be at the top of the list
         const q = query(docRef, orderBy('createdAt', 'desc'));

         //onSnapshot - function to give realtime update on the fetched products - delete, edit of a product etc
         onSnapshot(q, (snapshot) => {
            //console.log(['Printing #snapshot from onSnapshot', snapshot.docs]);
            const allData = snapshot.docs.map((doc) => ({
               id: doc.id,
               ...doc.data(),
            }));

            setData(allData);
            setIsPending(false);
            setError(null);
         });
      } catch (err) {
         // toast.error('Something went wrong...');
         // console.log(['Error msg from firebase is: ', error.message]);
         setIsPending(false);
         setError(`The error message received is ${err.message}`);
      }
   };

   useEffect(() => {
      getCollection();
   }, []);

   return { data, isPending, error };
};

export default useFetchCollection;
