import React from 'react'
import logo from '../assets/logo.png'

function Navbar({status}) {
  return (
    <>
    <header className="text-white bg-gradient-to-r from-blue-600 to-blue-800">
        <nav className="container flex items-center justify-between px-6 py-4 mx-auto">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Voltech Logo" style={{height:"40px",width:"40px"}}/>
            <span className="text-xl font-bold">Voltech</span>
          </div>
          {!status &&<div className="hidden space-x-8 md:flex">
            <a href="#features" className="hover:text-blue-200">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-blue-200">
              How it Works
            </a>
            <a href="#benefits" className="hover:text-blue-200">
              Benefits
            </a>
          </div>}
          {!status?<button
            className="px-6 py-2 font-semibold text-blue-600 bg-white rounded-full hover:bg-blue-50"
            onClick={() => (window.location.href = "/loading")}
          >
            Get Started
          </button>:<button
            className="px-6 py-2 font-semibold text-blue-600 bg-white rounded-full hover:bg-blue-50"
            onClick={() => (window.location.href = "/")}
          >
            Home
          </button>}
        </nav>
      </header>
      </>
  )
}

export default Navbar