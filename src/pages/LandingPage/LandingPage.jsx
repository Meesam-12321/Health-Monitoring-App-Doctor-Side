import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center text-white">
      <div className="max-w-lg mx-auto p-8 bg-gray-800 rounded-lg shadow-lg space-y-6 animate-fadeIn">
        <h1 className="text-5xl font-bold text-center">Welcome to Doctor's Hub</h1>
        <p className="text-center text-lg">
          Your go-to platform for managing appointments, patient data, and more.
        </p>

        <div className="flex justify-around space-x-4">
          <Link
            to="/login"
            className="w-1/2 py-3 bg-blue-600 text-center rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="w-1/2 py-3 bg-green-600 text-center rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Sign Up
          </Link>
        </div>

        <p className="text-center mt-4">
          <Link to="/about" className="text-blue-300 hover:underline">Learn more about us</Link>
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
