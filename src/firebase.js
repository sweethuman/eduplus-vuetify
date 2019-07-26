import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBl4IhqKnjDKGuhZokyYQ5lNbCOVLflUME",
  authDomain: "eduplus-d675a.firebaseapp.com",
  databaseURL: "https://eduplus-d675a.firebaseio.com",
  projectId: "eduplus-d675a",
  storageBucket: "eduplus-d675a.appspot.com",
  messagingSenderId: "308690743929",
  appId: "1:308690743929:web:65845112ee607aa0",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
