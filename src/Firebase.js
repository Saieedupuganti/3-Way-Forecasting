// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeO1g0eVOiwncNhfThkdk8pha2bqyI0DY",
  authDomain: "authentication-4c455.firebaseapp.com",
  projectId: "authentication-4c455",
  storageBucket: "authentication-4c455.appspot.com",
  messagingSenderId: "1056928962238",
  appId: "1:1056928962238:web:ba8f00b1fa26c6aae3b0ef",
  measurementId: "G-LN1Z4NQGJH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

export { auth };