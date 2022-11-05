import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {

    apiKey: "AIzaSyD52fctGJgix4vZRVdEl2GfOfkTlWVUWLM",
  
    authDomain: "chataround-e0a27.firebaseapp.com",
  
    projectId: "chataround-e0a27",
  
    storageBucket: "chataround-e0a27.appspot.com",
  
    messagingSenderId: "864357739764",
  
    appId: "1:864357739764:web:36282fb9835bfb3cc602a1",
  
    measurementId: "G-N59MWEL65N"
  
  };
  
  

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);



