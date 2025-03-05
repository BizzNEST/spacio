// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signInWithCredential,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { gapi } from 'gapi-script'; //Import the Google API client
import { initClient } from './gapi';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
//export const auth = getAuth;
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);

/*const [isAuthorized, setIsAuthorized] = useState(false);
const [events, setEvents] = useState([]);

// Initialize the Google API client
useEffect(() => {
  gapi.load('client:auth2', initClient);
}, []);

// Sign in and authorize the app
export const handleSignIn = async () => {
  const googleAuth = gapi.auth2.getAuthInstance();
  const googleUser = await googleAuth.signIn();

  const token = googleUser.getAuthResponse().id_token;

  const credential = GoogleAuthProvider.credential(token);

  await auth.signInWithCredential(credential);
};

// Sign out of the app
export const handleSignOut = async () => {
  await signOut(auth);
};*/

//DATABASE EXAMPLE
/*async function getUsers(db) {
  const users = collection(db, 'users');
  const userSnapshot = await getDocs(users);
  const userList = userSnapshot.docs.map((doc) => doc.data());
  return userList;
}
const userList = await getUsers(db);*/
//console.log(userList);
