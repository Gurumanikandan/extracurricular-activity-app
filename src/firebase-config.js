// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCh3pJftutWSyuHxD2PrsbL3zje4Zhkssg",
    authDomain: "eventmanagement-e3998.firebaseapp.com",
    projectId: "eventmanagement-e3998",
    storageBucket: "eventmanagement-e3998.appspot.com",
    messagingSenderId: "124866737853",
    appId: "1:124866737853:web:f71c53db527db7e8fb69d4",
    measurementId: "G-2N3SWCYRN2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);