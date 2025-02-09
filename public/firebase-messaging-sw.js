// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");

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
