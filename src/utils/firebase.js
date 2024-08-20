// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeWEUod0I0M_Jvp0MjMI2SvE7ysX0VtWU",
  authDomain: "netflixgpt-eb1f7.firebaseapp.com",
  projectId: "netflixgpt-eb1f7",
  storageBucket: "netflixgpt-eb1f7.appspot.com",
  messagingSenderId: "246673797897",
  appId: "1:246673797897:web:de6bdc28ce4512bad359d8",
  measurementId: "G-GVK3T27D32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
