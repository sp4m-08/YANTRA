// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");

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

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
  console.log("Background message received:", payload);
  const notificationTitle = payload.notification?.title || "New Notification";
  const notificationOptions = {
    body: payload.notification?.body || "You have a new message",
    icon: "/firebase-logo.png",
  };
  
  return self.registration.showNotification(notificationTitle, notificationOptions);
});
