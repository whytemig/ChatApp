import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cringe-app-32ea4.firebaseapp.com",
  projectId: "cringe-app-32ea4",
  storageBucket: "cringe-app-32ea4.appspot.com",
  messagingSenderId: "673303406790",
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: "G-ENMVQK36VX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication, Database & Storage for Images and get a reference to the service
export const auth = getAuth(app);
export const database = getFirestore(app);
export const storage = getStorage(app);
