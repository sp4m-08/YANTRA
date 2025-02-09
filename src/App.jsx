import React, { useEffect, useState } from "react";
import Landing from "./pages/landing";
import Starting from "./pages/Starting";
import { messaging } from "./firebase"; // Remove requestForToken from import
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getToken, onMessage } from "firebase/messaging"; // Import from Firebase directly
import Loading from "./pages/Loading";

function App() {
  const [notification, setNotification] = useState("");

  // Keep the token request function inside the component
  const requestForToken = async () => {
  
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
        <Route path="/loading" element={<Loading />} />

      </Routes>
      {notification && <div>🔔 Notification: {notification}</div>}
    </Router>
  );
}

export default App;