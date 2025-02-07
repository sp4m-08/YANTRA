import React, { useEffect, useState } from "react";
import Landing from "./pages/landing";
import Starting from "./pages/Starting";
import { messaging } from "./firebase"; // Remove requestForToken from import
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getToken, onMessage } from "firebase/messaging"; // Import from Firebase directly

function App() {
  const [notification, setNotification] = useState("");

  // Keep the token request function inside the component
  const requestForToken = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: "BJkLUDzt2r49s5UVBYxoPKWXQ1V6lk0h_dWbwrQB0xJRVQugXyNm45bGz8nHC64BhMBb5gi4semDeaz7cWqWylM",
        });
        console.log("FCM Token:", token);
      } else {
        console.log("Permission denied for notifications.");
      }
    } catch (error) {   
      console.error("Error getting FCM token:", error);
    }
  };

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service worker registered');
        })
        .catch((error) => {
          console.log('Service worker registration failed:', error);
        });
    }
  
    // Foreground notification listener
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Foreground message payload:", payload);
      setNotification(payload.notification?.title); // Update UI
    });
  
    requestForToken();
  
    return () => {
      unsubscribe(); // Cleanup on unmount
    };
  }, []);
  

  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/" element={<Starting />} />
      </Routes>
      {notification && <div>🔔 Notification: {notification}</div>}
    </Router>
  );
}

export default App;