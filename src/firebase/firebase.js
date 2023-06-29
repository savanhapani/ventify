import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
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
  increment,
  getDoc,
} from "firebase/firestore";

const firebaseConfigEnv = {
  prod: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY_PROD,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_PROD,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID_PROD,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_PROD,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_PROD,
    appId: import.meta.env.VITE_FIREBASE_APP_ID_PROD,
  },
  dev: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY_DEV,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN_DEV,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID_DEV,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET_DEV,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID_DEV,
    appId: import.meta.env.VITE_FIREBASE_APP_ID_DEV,
  },
};

const firebaseConfig =
  firebaseConfigEnv[import.meta.env.VITE_TESTING_ENVIRONMENT];

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

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
  sendPasswordResetEmail,
  increment,
  getDoc,
};
