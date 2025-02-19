import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Loading = ({ status }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        navigate("/landing");
      }, 1000); // 1 second delay

      return () => clearTimeout(timer);
    }
  }, [navigate, status]);

  if (!status) return null; // If status is false, do not render anything

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen p-10 text-gray-900 bg-gray-50">
      <div className="flex justify-center bg-blue-800 items-center mb-8 border-r-2 rounded-lg">
        <img src={logo} alt="Team Logo" className="w-48 animate-pulse" />
      </div>
      <h2 className="font-bold text-3xl text-gray-900 my-4">
        Initializing Rover Control Panel...
      </h2>
      <p className="text-gray-600">Fetching sensor data, please wait...</p>
      <div className="mt-6 w-16 h-16 border-4 border-blue-800 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
