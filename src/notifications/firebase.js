import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import {getMessaging} from "firebase/messaging";


const firebaseConfig = {
    apiKey: "AIzaSyAB0E1aQ1zjiGAyrN_ElbTRbeD4k5I9kF4",
    authDomain: "dofrover.firebaseapp.com",
    databaseURL: "https://dofrover-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "dofrover",
    storageBucket: "dofrover.firebasestorage.app",
    messagingSenderId: "290800072935",
    appId: "1:290800072935:web:0b34185a1cf0877ff84a42",
    measurementId: "G-YE1J2HL8M7"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(FirebaseApp);
const messaging = getMessaging(FirebaseApp);

export const generateToken = async ()=>{
    const permission = await Notification.requestPermission();
    console.log("Permission")
};