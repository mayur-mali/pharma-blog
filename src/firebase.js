// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwH_VZiXXhv0xreqLew-MtMZ8gt__uAXc",
  authDomain: "image-storege.firebaseapp.com",
  projectId: "image-storege",
  storageBucket: "image-storege.appspot.com",
  messagingSenderId: "389904354706",
  appId: "1:389904354706:web:9d7a40a89afe039ab1c54b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
