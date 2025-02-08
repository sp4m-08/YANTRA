import React from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  GaugeCircle,
  MapPin,
  Shield,
  Smartphone,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Starting() {
  const status = true;
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header / Navbar */}
      <Navbar props={{status}}/>

      {/* Hero Section */}
      <section className="container px-6 py-24 mx-auto text-center flex flex-col justify-center content-center">
        <h1 className="mb-6 text-5xl font-bold text-gray-900 md:text-6xl">
          Smart Pipeline Leak Detection
        </h1>
        <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-600">
          Advanced IoT-based system for real-time monitoring and early leak
          detection in industrial pipelines.
        </p>
       
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container px-6 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">
            Comprehensive Monitoring Features
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 text-center bg-gray-100 rounded-lg shadow hover:shadow-lg flex flex-col items-center"
              >
                {feature.icon}
                <div className="flex items-center">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-600 mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container px-6 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">How It Works</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="p-6 text-center bg-white shadow-sm rounded-lg"
              >
                <div className="w-12 h-12 mx-auto mb-4 text-white bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">{index + 1}</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white flex flex-col justify-center content-center">
        <div className="container px-6 mx-auto flex flex-col justify-center content-center">
          <h2 className="mb-12 text-3xl font-bold text-center">Key Benefits</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 justify-items-center">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4">
                {benefit.icon}
                <div>
                  <h3 className="mb-2 text-xl font-semibold">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-white bg-blue-600">
        <div className="container px-6 mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold">
            Ready to Secure Your Pipeline?
          </h2>
          <button className="px-8 py-3 font-semibold text-blue-600 bg-white rounded-full hover:bg-blue-50">
            Contact Sales
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
}

// Sample Data
const features = [
  {
    icon: <GaugeCircle className="w-12 h-12 text-blue-600" />,
    title: "Real-time Monitoring",
    description: "Continuous tracking of key metrics.",
  },
  {
    icon: <AlertTriangle className="w-12 h-12 text-blue-600" />,
    title: "Early Detection",
    description: "Advanced algorithms detect leaks early.",
  },
  {
    icon: <MapPin className="w-12 h-12 text-blue-600" />,
    title: "Precise Location",
    description: "GPS sensors pinpoint leak locations.",
  },
];

const steps = [
  {
    title: "Data Collection",
    description: "IoT sensors gather pipeline data.",
  },
  {
    title: "Cloud Processing",
    description: "Real-time analysis on our secure cloud.",
  },
  {
    title: "AI Analysis",
    description: "AI detects anomalies and potential leaks.",
  },
  {
    title: "Instant Alerts",
    description: "Immediate notifications when issues arise.",
  },
];

const benefits = [
  {
    icon: <Shield className="w-10 h-10 text-blue-600" />,
    title: "Enhanced Safety",
    description: "Prevent environmental damage.",
  },
  {
    icon: <BarChart3 className="w-10 h-10 text-blue-600" />,
    title: "Cost Reduction",
    description: "Minimize repair costs.",
  },
  {
    icon: <Activity className="w-10 h-10 text-blue-600" />,
    title: "24/7 Monitoring",
    description: "Continuous surveillance.",
  },
  {
    icon: <Smartphone className="w-10 h-10 text-blue-600" />,
    title: "Mobile Access",
    description: "Monitor from anywhere.",
  },
];

export default Starting;
