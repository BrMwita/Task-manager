// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAent2-UFUgteOlFpj9QVenVcBsc2UyLQc",
  authDomain: "task-manager-a1a06.firebaseapp.com",
  projectId: "task-manager-a1a06",
  storageBucket: "task-manager-a1a06.firebasestorage.app",
  messagingSenderId: "869336895349",
  appId: "1:869336895349:web:9cf550a80b9eff3ef90d3c",
  measurementId: "G-YF71P3N928"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app;