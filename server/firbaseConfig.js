// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEwO5QkUkk6q775cXpRpKdD_q02LKuY8U",
  authDomain: "show-me-your-ingredients.firebaseapp.com",
  projectId: "show-me-your-ingredients",
  storageBucket: "show-me-your-ingredients.appspot.com",
  messagingSenderId: "732014687141",
  appId: "1:732014687141:web:50cd83b8bfc10af7f5ee4c",
  measurementId: "G-WNP5576EHM"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;