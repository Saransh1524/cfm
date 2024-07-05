// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCb9Us9MoaZPHkWmkcuUi3ZryA58r0-WN4",
  authDomain: "cloudefilemanager.firebaseapp.com",
  projectId: "cloudefilemanager",
  storageBucket: "cloudefilemanager.appspot.com",
  messagingSenderId: "453799217015",
  appId: "1:453799217015:web:423e90b56a8b533ee24372",
  measurementId: "G-08S9RYNYMR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Analytics if running in the browser
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}


// const analytics = getAnalytics(app);
export { app, analytics };
export default app;