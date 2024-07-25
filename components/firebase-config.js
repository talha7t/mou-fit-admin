// const { initializeApp } = require("firebase/app");
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBME-4ySfC5F4saYIN8ENnfTRZKmMhchV8",
    authDomain: "moufit-prod.firebaseapp.com",
    databaseURL: "https://moufit-prod.firebaseio.com",
    projectId: "moufit-prod",
    storageBucket: "moufit-prod.appspot.com",
    messagingSenderId: "330729356891",
    appId: "1:330729356891:web:a62989616648fc78ed097e",
    measurementId: "G-P0EESMWKPL"
};



export const oldApp = initializeApp(firebaseConfig);
export const oldDB = getFirestore(oldApp);
export const oldAuth = getAuth(oldApp);


