import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeKQnFAaG2EmTVtrBxfCAwuWLbV7ME7ys",
  authDomain: "expenses-f52f3.firebaseapp.com",
  databaseURL: "https://expenses-f52f3-default-rtdb.firebaseio.com",
  projectId: "expenses-f52f3",
  storageBucket: "expenses-f52f3.appspot.com",
  messagingSenderId: "700582158035",
  appId: "1:700582158035:web:0a6bb2cc0fd64bd67dfe26",
  measurementId: "G-N768LTR757"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);