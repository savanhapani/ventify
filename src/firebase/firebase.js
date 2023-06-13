import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  or,
  doc,
  updateDoc,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfigProd = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const firebaseConfigDev = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY_DEV,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_DEV,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID_DEV,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_DEV,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_DEV,
  appId: import.meta.env.VITE_FIREBASE_APP_ID_DEV,
};

let firebaseConfig;

if (import.meta.env.VITE_TESTING_ENVIRONMENT === "dev") {
  firebaseConfig = firebaseConfigDev;
} else {
  firebaseConfig = firebaseConfigProd;
}

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {
  auth,
  collection,
  addDoc,
  db,
  getDocs,
  query,
  where,
  or,
  doc,
  updateDoc,
  arrayUnion,
  deleteDoc,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  signInWithEmailAndPassword,
};
