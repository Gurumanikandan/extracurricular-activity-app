// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

/*suriya's config dont delete*/
const firebaseConfig = {
  apiKey: "AIzaSyA3KO-KvJzFnBev4fUUfRXSSG2hTinBfNY",
  authDomain: "eventmanagement-kongu.firebaseapp.com",
  projectId: "eventmanagement-kongu",
  storageBucket: "eventmanagement-kongu.appspot.com",
  messagingSenderId: "111257168250",
  appId: "1:111257168250:web:70bfd5f93c5424c206cec3",
  measurementId: "G-30QEM6S6JK",
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCh3pJftutWSyuHxD2PrsbL3zje4Zhkssg",
//   authDomain: "eventmanagement-e3998.firebaseapp.com",
//   projectId: "eventmanagement-e3998",
//   storageBucket: "eventmanagement-e3998.appspot.com",
//   messagingSenderId: "124866737853",
//   appId: "1:124866737853:web:f71c53db527db7e8fb69d4",
//   measurementId: "G-2N3SWCYRN2"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
export default firebase;
