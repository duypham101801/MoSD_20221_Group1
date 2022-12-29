import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAp1S2tjs9fVVcrWwIrNgCeIPCcqzbAZPI",
  authDomain: "travelo-c1f2f.firebaseapp.com",
  projectId: "travelo-c1f2f",
  storageBucket: "travelo-c1f2f.appspot.com",
  messagingSenderId: "592971633247",
  appId: "1:592971633247:web:a13d35b651273e399441ea",
  measurementId: "G-J5BYQV0S3S",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = firebase.firestore();
