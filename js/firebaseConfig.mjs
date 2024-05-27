// firebaseConfig.mjs
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VERCEL_FIREBASE_API_KEY,
  authDomain: import.meta.env.VERCEL_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VERCEL_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VERCEL_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VERCEL_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VERCEL_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

