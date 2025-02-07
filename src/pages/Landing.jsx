import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import {getMessaging} from "firebase/messaging";
import "../Dashboard.css"; // Import custom CSS file
import logo from "../assets/logo.png"; // Add your image path
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Firebase Configuration
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




const Dashboard = () => {
    //console.log("📡 Dashboard Component Rendered");

    // State variables for real-time Firebase data
    const [temperature, setTemperature] = useState("Loading...");
    const [humidity, setHumidity] = useState("Loading...");
    const [flameDetected, setFlameDetected] = useState("Loading...");
    const [gasLevel, setGasLevel] = useState("Loading...");
    const [tremorValue, setTremorValue] = useState("Loading...");
    const [locationData, setLocationData] = useState("Loading...");
    const [impact, setImpact] = useState("Loading...");
    const [notifications, setNotifications] = useState([
        "Initializing system...",
    ]); 

    useEffect(() => {
        const tempRef = ref(database, "/temperature");
        const humiRef = ref(database, "/humidity");
        const flameRef = ref(database, "/flame_detected");
        const gasRef = ref(database, "/gas_level");
        const tremorRef = ref(database, "/tremor_level");
        const locationRef = ref(database, "/location");
        const impactRef = ref(database, "/impact_level");

        const updateState = (snapshot, setState, label) => {
            const data = snapshot.val();
            //console.log(`✅ ${label} Updated:`, data);
            setState(data);

            // Add notification if data is critical
            if (label === "Gas Level" && data > 100) {
                setNotifications(prev => [...prev, "⚠️ High Gas Level!"]);
            }
            if (label === "Flame Detected" && data === 1) {
                setNotifications(prev => [...prev, "🔥 Fire Detected!"]);
            }
            if (label === "Tremor Value" && data > 5) {
                setNotifications(prev => [...prev, "🌍 Seismic Activity Detected!"]);
            }
        };

        // Firebase Listeners
        onValue(tempRef, snapshot => updateState(snapshot, setTemperature, "Temperature"));
        onValue(humiRef, snapshot => updateState(snapshot, setHumidity, "Humidity"));
        onValue(flameRef, snapshot => updateState(snapshot, setFlameDetected, "Flame Detected"));
        onValue(gasRef, snapshot => updateState(snapshot, setGasLevel, "Gas Level"));
        onValue(tremorRef, snapshot => updateState(snapshot, setTremorValue, "Tremor Value"));
        onValue(locationRef, snapshot => updateState(snapshot, setLocationData, "Location Data"));
        onValue(impactRef, snapshot => updateState(snapshot, setImpact, "Impact"));

        return () => {
            //console.log("🛑 Dashboard Unmounted");
        };
    }, []);

    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const status = true;
    return (
        
        <>
        <Navbar status={{status}}/>
        <div className="dashboard" style={{backgroundColor: 'royalblue'}}>
            {/* Centered Logo */}
            <div className="logo-container mb-8">
                <img src={logo} alt="Team Logo" className="team-logo" />
            </div>

            {/* Project Title */}
            <h2 className="project-title my-4">4-DOF Disaster Response Rover Control Panel</h2>

            {/* Data Boxes */}
            <div className="data-boxes my-4">
                <div className="data-box"><h3>Temperature</h3><p>{temperature}°C</p></div>
                <div className="data-box"><h3>Humidity</h3><p>{humidity}%</p></div>
                <div className="data-box"><h3>Gas Level</h3><p>{gasLevel} PPM</p></div>
                <div className="data-box"><h3>Camera Feed</h3><div className="camera-feed">📷 Live Feed</div></div>
                <div className="data-box"><h3>Location</h3><p>{locationData ? "Loading...":"Lat: 12° 58' 9.12''\n\n\n Long: 79° 09' 21.24''"}</p></div>
                <div className="data-box"><h3>Flame</h3><p>{flameDetected ? "✅ Safe":"🔥 Detected" }</p></div>
                <div className="data-box"><h3>Tremor</h3><p>{tremorValue} Hz</p></div>
                <div className="data-box"><h3>Impact</h3><p>{impact}</p></div>
            </div>

            {/* Notification Sidebar */}
            <div className={`notification-sidebar ${isNotificationOpen ? "open" : ""}`}>
                <h3 className="notification-title text-center bg-blue" onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
                    Notifications {isNotificationOpen ? "▼" : "▶"}
                </h3>
                {isNotificationOpen && (
                    <ul className="notification-list">
                        {notifications.map((note, index) => (
                            <li key={index} className="notification-item">• {note}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default Dashboard;
