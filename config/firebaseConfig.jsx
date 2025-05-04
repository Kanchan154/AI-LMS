// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {initializeAuth,getReactNativePersistence} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCR3NE-fRzddsb9Qblg_9fq4f8swsyx0to",
  authDomain: "ai-lms-app-1c9b8.firebaseapp.com",
  projectId: "ai-lms-app-1c9b8",
  storageBucket: "ai-lms-app-1c9b8.firebasestorage.app",
  messagingSenderId: "38383031079",
  appId: "1:38383031079:web:de071b1d2644115def4f02",
  measurementId: "G-PNJXL3KPWM"
};
export default firebaseConfig;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=initializeAuth(app,{
    persistence:getReactNativePersistence(ReactNativeAsyncStorage)
})
export const db=getFirestore(app)
const analytics = getAnalytics(app);