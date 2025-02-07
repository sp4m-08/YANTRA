import React from "react";
import Landing from "./pages/landing"
import Starting from "./pages/Starting";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/" element={<Starting />} />
      </Routes>
    </Router>
  );
}

export default App;
