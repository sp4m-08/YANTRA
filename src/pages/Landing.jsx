import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import logo from "../assets/logo.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Landing = ({ message }) => {
  const [sensorData, setSensorData] = useState({
    temperature: "Loading...",
    humidity: "Loading...",
    flameDetected: "Loading...",
    gasLevel: "Loading...",
    tremorValue: "Loading...",
    locationData: "Loading...",
    impact: "Loading...",
  });

  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    const sensorPaths = {
      temperature: "/temperature",
      humidity: "/humidity",
      flameDetected: "/flame_detected",
      gasLevel: "/gas_level",
      tremorValue: "/tremor_level",
      locationData: "/location",
      impact: "/impact_level",
    };

    const unsubscribe = Object.keys(sensorPaths).map((key) => {
      const sensorRef = ref(database, sensorPaths[key]);
      return onValue(sensorRef, (snapshot) => {
        const data = snapshot.val();
        setSensorData((prev) => ({ ...prev, [key]: data }));

        let alertMsg = "";
        if (key === "gasLevel" && data > 100) {
          alertMsg = "⚠️ High Gas Level Alert!";
        } else if (key === "flameDetected" && data === 1) {
          alertMsg = "🔥 Fire Detected!";
        } else if (key === "tremorValue" && data > 0) {
          alertMsg = "🌍 Tremor Level Critical!";
        }

        if (alertMsg) {
          setAlertMessage(alertMsg);
          setNotifications((prev) => [...prev, alertMsg]);
          setTimeout(() => setAlertMessage(null), 10000);
        }
      });
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => unsubscribe.forEach((unsub) => unsub());
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-50 text-gray-900">
        <img src={logo} alt="Loading Logo" className="w-32 mb-4 animate-pulse" />
        <h2 className="text-2xl font-semibold animate-bounce">Loading Data...</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar status={{ status: true }} />
      {alertMessage && (
        <div className="fixed top-5 right-5 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50">
          <p className="font-bold">{alertMessage}</p>
        </div>
      )}
      <div className="flex flex-col items-center justify-center h-screen w-screen p-10 text-gray-900 bg-gray-50">
        <div className="flex justify-center bg-blue-800 items-center mb-8 border-r-2 rounded-lg">
          <img src={logo} alt="Team Logo" className="w-48" />
        </div>
        <h2 className="font-bold text-3xl text-gray-900 my-4">Sensor Data Visualization</h2>
        <div className="grid grid-cols-4 gap-6 my-4">
          {[
            { title: "Temperature", value: `${sensorData.temperature}°C` },
            { title: "Humidity", value: `${sensorData.humidity}%` },
            { title: "Gas Level", value: `${sensorData.gasLevel} PPM` },
            { title: "Camera Feed", value: "📷 Live Feed" },
            { title: "Location", value: sensorData.locationData || "Lat: 12° 58' 9.12'' Long: 79° 09' 21.24''" },
            { title: "Flame", value: sensorData.flameDetected === 1 ? "🔥 Detected" : "✅ Safe" },
            { title: "Tremor", value: `${sensorData.tremorValue} Hz` },
            { title: "Impact", value: sensorData.impact },
          ].map(({ title, value }, index) => (
            <div key={index} className="p-6 text-center bg-white shadow-sm rounded-lg">
              <h3 className="mb-2 text-xl font-semibold">{title}</h3>
              <p className="text-gray-600">{value}</p>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`absolute right-5 bg-black text-white rounded-xl p-4 w-64 transition-all ${isNotificationOpen ? "max-h-56" : "max-h-10"} overflow-hidden cursor-pointer text-center`}
        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
      >
        <h3 className="font-bold text-white">{message} {isNotificationOpen ? "▼" : "▶"}</h3>
        {isNotificationOpen && (
          <ul className="mt-2">
            {notifications.map((note, index) => (
              <li key={index} className="bg-white bg-opacity-20 p-2 rounded my-1 text-red-900">• {note}</li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Landing;
