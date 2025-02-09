import { initializeApp } from "firebase/app";
import { getMessaging} from "firebase/messaging";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA7sdwqe52sLBq3vWRv6EoXylkylZbU2YA",
  authDomain: "esp32-fe54f.firebaseapp.com",
  databaseURL: "https://esp32-fe54f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "esp32-fe54f",
  storageBucket: "esp32-fe54f.firebasestorage.app",
  messagingSenderId: "84799114615",
  appId: "1:84799114615:web:5d465995cc2f1649cea572",
  measurementId: "G-21SP8N7L8P"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const database = getDatabase(app);




