// firebaseConfig.mjs
import firebase from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfSd3zbl4iOT_Dw3RA0nk4HVo1SrUcCsc",
  authDomain: "incluacao-fb776.firebaseapp.com",
  projectId: "incluacao-fb776",
  storageBucket: "incluacao-fb776.appspot.com",
  messagingSenderId: "198502388108",
  appId: "1:198502388108:web:bd387b9504810af7d586a9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = getAuth();

export { auth };