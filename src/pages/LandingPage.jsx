import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DarkModeContext } from "../Context/DarkModeContext"; // Import the context

const LandingPage = () => {
  const { darkMode } = useContext(DarkModeContext); // Access darkMode from context

  return (
    <div
      className={`${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
      } h-screen flex items-center justify-center`}
    >
      <div
        className={`max-w-lg mx-auto p-8 rounded-lg shadow-lg space-y-6 animate-fadeIn ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h1
          className={`text-5xl font-bold text-center ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}
        >
          Welcome to Doctor's Hub
        </h1>
        <p
          className={`text-center text-lg ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          Your go-to platform for managing appointments, patient data, and more.
        </p>

        <div className="flex justify-around space-x-4">
          <Link
            to="/login"
            className={`w-1/2 py-3 text-center rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
            }`}
          >
            Login
          </Link>

          <Link
            to="/register"
            className={`w-1/2 py-3 text-center rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 ${
              darkMode ? 'bg-green-600 text-white' : 'bg-green-500 text-white'
            }`}
          >
            Sign Up
          </Link>
        </div>

        <p className="text-center mt-4">
          <Link
            to="/about"
            className={`${
              darkMode ? 'text-blue-300' : 'text-blue-500'
            } hover:underline`}
          >
            Learn more about us
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
