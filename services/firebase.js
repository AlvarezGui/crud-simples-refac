// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//importat os recursos do firestore
import  {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgWDYv3-oFs33m77p-brAU3cxmvyHkH-I",
  authDomain: "crud-simples-7652a.firebaseapp.com",
  projectId: "crud-simples-7652a",
  storageBucket: "crud-simples-7652a.appspot.com",
  messagingSenderId: "631950042449",
  appId: "1:631950042449:web:50561285b281dd1219df70"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);