import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = { 
  apiKey : "AIzaSyBxCyzk4hYxwJ3TYGDFdKKwaEMbZrVgDh0" , 
  authDomain : "cms-ticket-f2e41.firebaseapp.com" , 
  projectId : "cms-ticket-f2e41" , 
  storageBucket : "cms-ticket-f2e41.appspot.com" , 
  messagingSenderId : "932958620890" , 
  appId : "1:932958620890:web:ce1a03149590089d2129e3" , 
  measurementId : "G-3HW889FD9H" 
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db

