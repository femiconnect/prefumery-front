import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

//app's Firebase configuration
export const firebaseConfig = {
   apiKey: 'AIzaSyB4oFhFqMhg7d3evM41x_0aDeggvItu4Mo',
   authDomain: 'perfumes-mini-store.firebaseapp.com',
   projectId: 'perfumes-mini-store',
   storageBucket: 'perfumes-mini-store.appspot.com',
   messagingSenderId: '298844997540',
   appId: '1:298844997540:web:8ac1e9085968acee286331',
};

//Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
