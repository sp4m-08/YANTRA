import { initializeApp } from "firebase/app";
import { getMessaging, getToken} from "firebase/messaging";

export const firebaseConfig = {
  apiKey: "AIzaSyBIKe4X5dwajvLsmCM9atK7zobY5ZQPgDA",
  authDomain: "voltech-b1146.firebaseapp.com",
  databaseURL: "https://voltech-b1146-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "voltech-b1146",
  storageBucket: "voltech-b1146.firebasestorage.app",
  messagingSenderId: "773003169201",
  appId: "1:773003169201:web:16c66c8ead37d15b120190",
  measurementId: "G-SSZJPTSXS4"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);



