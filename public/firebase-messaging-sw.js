import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging";

const firebaseConfig = {
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
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Handle background messages
onBackgroundMessage(messaging, (payload) => {
  console.log('[SW] Background message received:', payload);
  const notificationTitle = payload.notification?.title || "New Notification";
  const notificationOptions = {
    body: payload.notification?.body || "You have a new notification",
    icon: '/firebase-logo.png', // Ensure this is in your public folder
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
