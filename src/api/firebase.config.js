// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD2uPxkn8RmRKx2pUMDJJQ1TrBdlHDVmU",
  authDomain: "officeflow-449417.firebaseapp.com",
  projectId: "officeflow-449417",
  storageBucket: "officeflow-449417.firebasestorage.app",
  messagingSenderId: "6291519967",
  appId: "1:6291519967:web:013f7d24ee1c3b8ce22c6a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getUsers(db) {
  const users = collection(db, 'users');
  const userSnapshot = await getDocs(users);
  const userList = userSnapshot.docs.map(doc => doc.data());
  return userList;
}
const userList = await getUsers(db);
//console.log(userList);