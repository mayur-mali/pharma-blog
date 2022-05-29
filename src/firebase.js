// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "blog-app-ee668.firebaseapp.com",
  databaseURL: "https://blog-app-ee668-default-rtdb.firebaseio.com",
  projectId: "blog-app-ee668",
  storageBucket: "blog-app-ee668.appspot.com",
  messagingSenderId: "953688793041",
  appId: "1:953688793041:web:8e52dd7bf2f301be1c0af0",
  measurementId: "G-GTV70R3DF1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
