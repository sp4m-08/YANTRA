import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// import "../Dashboard.css";
import logo from "../assets/logo.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { firebaseConfig } from "../firebase";

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(FirebaseApp);
const messaging = getMessaging(FirebaseApp);

const Landing = ({ message }) => {
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
    const sensors = [
      { path: "/temperature", setter: setTemperature, label: "Temperature" },
      { path: "/humidity", setter: setHumidity, label: "Humidity" },
      {
        path: "/flame_detected",
        setter: setFlameDetected,
        label: "Flame Detected",
      },
      { path: "/gas_level", setter: setGasLevel, label: "Gas Level" },
      { path: "/tremor_level", setter: setTremorValue, label: "Tremor Value" },
      { path: "/location", setter: setLocationData, label: "Location Data" },
      { path: "/impact_level", setter: setImpact, label: "Impact" },
    ];

    sensors.forEach(({ path, setter, label }) => {
      onValue(ref(database, path), (snapshot) => {
        const data = snapshot.val();
        setter(data);
        if (
          (label === "Gas Level" && data > 100) ||
          (label === "Flame Detected" && data === 1) ||
          (label === "Tremor Value" && data > 5)
        ) {
          setNotifications((prev) => [...prev, `⚠️ ${label} Alert!`]);
        }
      });
    });
  }, []);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const status = true;

  return (
    <>
      <Navbar status={{ status }} />
      <div className="flex flex-col items-center justify-center h-screen w-screen p-10 text-gray-900 bg-gray-50">
        <div className="flex justify-center bg-blue-800 items-center mb-8 border-r-2 rounded-lg">
          <img src={logo} alt="Team Logo" className="w-48" />
        </div>
        <h2 className="font-bold text-3xl text-gray-900 my-4">
          4-DOF Repair Mechanism Rover Control Panel
        </h2>
        <div className="grid grid-cols-4 gap-6 my-4">
        {[
  { title: "Temperature", value: `${temperature}°C` },
  { title: "Humidity", value: `${humidity}%` },
  { title: "Gas Level", value: `${gasLevel} PPM` },
  { title: "Camera Feed", value: "📷 Live Feed" },
  { title: "Location", value: locationData || "Lat: 12° 58' 9.12'' Long: 79° 09' 21.24''" },
  { title: "Flame", value: flameDetected ? "✅ Safe" : "🔥 Detected" },
  { title: "Tremor", value: `${tremorValue} Hz` },
  { title: "Impact", value: impact },
].map(({ title, value }, index) => (
  <React.Fragment key={index}>
    <div className="p-6 text-center bg-white shadow-sm rounded-lg">
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{value}</p>
    </div>
  </React.Fragment>
))}

        </div>
      </div>
      <div
        className={`absolute right-5 bg-black text-white rounded-xl p-4 w-64 transition-all ${
          isNotificationOpen ? "max-h-56" : "max-h-10"
        } overflow-hidden cursor-pointer text-center`}
        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
      >
        <h3 className="font-bold text-white">
          {message} {isNotificationOpen ? "▼" : "▶"}
        </h3>
        {isNotificationOpen && (
          <ul className="mt-2">
            {notifications.map((note, index) => (
              <li
                key={index}
                className="bg-white bg-opacity-20 p-2 rounded my-1 text-gray-900"
              >
                • {note}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Landing;
