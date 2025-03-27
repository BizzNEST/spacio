// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCD2uPxkn8RmRKx2pUMDJJQ1TrBdlHDVmU',
  authDomain: 'officeflow-449417.firebaseapp.com',
  projectId: 'officeflow-449417',
  storageBucket: 'officeflow-449417.firebasestorage.app',
  messagingSenderId: '6291519967',
  appId: '1:6291519967:web:013f7d24ee1c3b8ce22c6a',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
