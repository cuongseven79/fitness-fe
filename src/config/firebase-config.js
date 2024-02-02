import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { FacebookAuthProvider, GoogleAuthProvider, getAuth } from 'firebase/auth'


 const firebaseConfig = {
      databaseURL: process.env.REACT_APP_DATABASE_URL,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_PROJECT_ID,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_APP_ID,
      measurementId: process.env.REACT_APP_MEASUREMENT_ID
 }
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const database = getFirestore(app);
const storage = getStorage(app);

export { auth, googleProvider, facebookProvider, database, storage };