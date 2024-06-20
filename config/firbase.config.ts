// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";
import e from "express";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAOMmCR_KDk-HWs0zEZ5ggIpdwFsEM1sqw",
    authDomain: "connectify-94489.firebaseapp.com",
    projectId: "connectify-94489",
    storageBucket: "connectify-94489.appspot.com",
    messagingSenderId: "1023078365568",
    appId: "1:1023078365568:web:7180f1af1efb74cf682965",
    measurementId: "G-RMJRHWY775"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const storage = getStorage(app)


export default { app, storage }

