import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Connect to emulators if running on localhost
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  console.log("Development mode: Connecting to Firebase Emulators");
  
  // Point to the Auth emulator
  // Default port is 9099
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  
  // Point to the Firestore emulator
  // Default port is 8080
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
}

// Export services for use in other files
export { app, analytics, auth, db };
export const googleProvider = new GoogleAuthProvider();
