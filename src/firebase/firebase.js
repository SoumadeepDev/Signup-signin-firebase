import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwkcpqHN_-L8cx_jCyPZoX6EqOvYgFw2A",
  authDomain: "signup-signin-2d739.firebaseapp.com",
  projectId: "signup-signin-2d739",
  storageBucket: "signup-signin-2d739.appspot.com",
  messagingSenderId: "887818432230",
  appId: "1:887818432230:web:984b06a0425bce9da65527",
  measurementId: "G-WK812VY8NR",
};

//Initialize firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
