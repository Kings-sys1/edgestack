// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import  {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY ,
  authDomain: "edgestack-3153b.firebaseapp.com",
  projectId: "edgestack-3153b",
  storageBucket: "edgestack-3153b.firebasestorage.app",
  messagingSenderId: "579341133115",
  appId: "1:579341133115:web:7f1c1be35f8e984088c31e"
};

// Initialize Firebase
const app = getApps().length == 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export {db, storage};